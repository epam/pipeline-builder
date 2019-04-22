import _ from 'lodash';

import WDLWorkflow from './WDLWorkflow';
import Task from './Task';
import { WDLParserError, extractExpression, extractType, extractImportsArray } from '../utils/utils';
import Workflow from '../../../model/Workflow';
import * as Constants from '../constants';

/** Class storing the parsing context during the building of destination Object Model */
export default class Context {
  /**
   * Process through the hole entire ast tree and builds the desired Object Model
   * @param {ast} ast - Root ast tree node of parsing result
   * @param {string} src - Source WDL string (needed to extract the task command strings)
   * @param {Object} imports - Object of parsed imports
   */
  constructor(ast, src, imports = {}) {
    this.imports = Context.preprocessCommandMapsRecursively(imports, src);
    this.actionMap = this.buildActionMap(ast);

    try {
      this.workflowList = this.buildWorkflowList(ast);
    } catch (e) {
      throw new WDLParserError(`Context initialization failed due to ${e}`);
    }
  }

  static preprocessCommandMapsRecursively(importsDict, src) {
    const imports = importsDict;
    imports.genericTaskCommandMap = Context.preprocessTheTaskOntoCommandMap(src);
    if (imports.children) {
      Object.keys(imports.children).forEach((childName) => {
        imports.children[childName] =
          Context.preprocessCommandMapsRecursively(imports.children[childName], imports.children[childName].src);
      });
    }

    return imports;
  }

  /**
   * Process through the workflow entities
   * @param {ast} ast - Root ast tree node of parsing result
   */
  buildWorkflowList(ast) {
    const definitions = ast.attributes.body;
    return definitions ? definitions.list
      .filter(item => item.name.toLowerCase() === 'workflow')
      .map(wfNode => (new WDLWorkflow(wfNode.attributes, this)).workflowStep) : [];
  }

  /**
   * Extracts all source command strings from each entire task
   *    (TBD: Not safe. Not all cases supported)
   * @param {string} src - Source WDL script string
   */
  static preprocessTheTaskOntoCommandMap(src) {
    const genericTaskCommandMap = new Map();

    const taskRegex = /\s*^task\s*.+\s*\{/gm;
    const tasks = [];
    let task = taskRegex.exec(src);
    while (task) {
      const message = task[0].replace(/task\s+/, '').trim();
      tasks.push({
        message: message.slice(0, message.length - 1).trim(),
        lastIndex: taskRegex.lastIndex,
      });
      task = taskRegex.exec(src);
    }

    const commandRegex = /\s*command\s*({|<<<)/gm;// [\s\S]*?\s*\n\s*(}|>>>)
    const commands = [];
    let command = commandRegex.exec(src);
    while (command) {
      commands.push({
        lastIndex: commandRegex.lastIndex,
        type: command[1],
      });
      command = commandRegex.exec(src);
    }

    const taskLength = tasks.length;
    const cmdLength = commands.length;

    let cmdIdx = 0;

    _.forEach(tasks, (val, idx, arr) => {
      const nextTask = idx < taskLength - 1 ? arr[idx + 1] : undefined;
      const currCmd = cmdIdx < cmdLength ? commands[cmdIdx] : undefined;

      if (currCmd &&
          (!nextTask || (val.lastIndex < currCmd.lastIndex && currCmd.lastIndex < nextTask.lastIndex))) {
        genericTaskCommandMap.set(val.message, currCmd);
        cmdIdx += 1;
      }
    });

    genericTaskCommandMap.forEach((val, key) => {
      const lastIndex = val.lastIndex;
      const closer = val.type === '{' ? '}' : '>>>';

      genericTaskCommandMap.set(key, {
        command: Context.traceTheCommand(src, lastIndex, closer),
        type: val.type,
      });
    });

    return genericTaskCommandMap;
  }

  static traceTheCommand(str, start, closer) {
    if (closer === '>>>') {
      return str.substr(start, str.indexOf(closer, start) - start).trim();
    }

    let currentParenState = 1;
    let cursor = start;
    let currChar = str[cursor];

    while (!(currChar === closer && currentParenState === 0)) {
      cursor += 1;

      currChar = str[cursor];

      if (currChar === '{') {
        currentParenState += 1;
      }

      if (currChar === '}') {
        currentParenState -= 1;
      }
    }
    return str.substr(start, cursor - start).trim();
  }

  /**
   * Convert WDL tasks to Actions and store them in map for future using
   * @param {ast} ast - Root ast tree node of parsing result
   * @param {Object} imports
   */
  buildActionMap(ast, imports = this.imports) {
    const actionMap = {};
    if (!ast) {
      return actionMap;
    }
    const definitions = ast.attributes.body;
    const tasks = definitions.list.filter(item => item.name.toLowerCase() === Constants.TASK)
      .map(wfNode => new Task(wfNode.attributes));

    const workflows = definitions.list.filter(item => item.name.toLowerCase() === Constants.WORKFLOW)
      .map((wfNode) => {
        const workflow = new Workflow(wfNode.attributes.name.source_string, { ast: _.cloneDeep(wfNode) });
        workflow.i = Context.getInputsWorkflow(_.cloneDeep(wfNode.attributes.body));
        workflow.o = Context.getOutputsWorkflow(_.cloneDeep(wfNode.attributes.body));
        return workflow;
      });

    tasks.forEach((task) => {
      const command = imports.genericTaskCommandMap.get(task.name);
      actionMap[task.name] = task.constructAction(command);
    });

    workflows.forEach((workflow) => {
      actionMap[workflow.name] = workflow;
    });

    const importsArray = extractImportsArray(ast);
    if (importsArray.length) {
      importsArray.forEach((imp) => {
        const childImport = Context.findChildImport(imp.name, imports);
        if (childImport) {
          const childActionMap = this.buildActionMap(childImport.ast, childImport);
          _.forEach(childActionMap, (action, name) => {
            const actionName = `${imp.name}.${name}`;
            action.name = actionName;
            actionMap[actionName] = action;
          });
        }
      });
    }

    return actionMap;
  }

  static findChildImport(namespace, imports) {
    if (imports && imports.imports.length) {
      if (imports.children[namespace]) {
        return imports.children[namespace];
      }
    }
    return null;
  }

  /**
   * Get all workflow inputs
   * @param {ast} wfNodeBody - ast tree node.attributes.body
   */
  static getInputsWorkflow(wfNodeBody) {
    const inputs = {};
    wfNodeBody.list.filter(item => item.name.toLowerCase() === Constants.DECLARATION)
      .forEach((v) => {
        inputs[v.attributes.name.source_string] = {
          type: extractType(v.attributes.type),
        };

        const str = extractExpression(v.attributes.expression).string;
        if (str !== '') {
          inputs[v.attributes.name.source_string].default = str;
        }
      });

    return inputs;
  }

  /**
   * Get all workflow outputs
   * @param {ast} wfNodeBody - ast tree node.attributes.body
   */
  static getOutputsWorkflow(wfNodeBody) {
    const outputs = {};
    wfNodeBody.list.filter(item => item.name.toLowerCase() === Constants.WF_OUTPUTS)
      .forEach((workflowoutputs) => {
        workflowoutputs.attributes.outputs.list.forEach((wfOutput) => {
          const node = wfOutput.attributes;
          Context.proceedExpression(node, outputs);
          Context.proceedWildcard(node, outputs);
        });
      });

    return outputs;
  }

  static proceedWildcard(node, outputs) {
    if (!node.fqn) {
      return;
    }

    const outputString = node.wildcard
      ? `${node.fqn.source_string}.${node.wildcard.source_string}`
      : node.fqn.source_string;

    outputs[outputString] = {
      type: '',
      multi: !!node.wildcard,
      default: outputString,
    };
  }

  static proceedExpression(node, outputs) {
    if (!node.name && !node.type && !node.expression) {
      return;
    }

    outputs[node.name.source_string] = {
      type: extractType(node.type),
      default: extractExpression(node.expression).string,
    };
  }
}

