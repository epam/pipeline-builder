import _ from 'lodash';

import WDLWorkflow from './WDLWorkflow';
import Task from './Task';
import { WDLParserError } from '../utils/utils';

/** Class storing the parsing context during the building of destination Object Model */
export default class Context {
  /**
   * Process through the hole entire ast tree and builds the desired Object Model
   * @param {ast} ast - Root ast tree node of parsing result
   * @param {string} src - Source WDL string (needed to extract the task command strings)
   */
  constructor(ast, src) {
    this.genericTaskCommandMap = new Map();
    this.preprocessTheTaskOntoCommandMap(src);
    this.actionMap = this.buildActionMap(ast);
    try {
      this.workflowList = this.buildWorkflowList(ast);
    } catch (e) {
      throw new WDLParserError(`Context initialization failed due to ${e}`);
    }
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
  preprocessTheTaskOntoCommandMap(src) {
    this.genericTaskCommandMap = new Map();

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
        this.genericTaskCommandMap.set(val.message, currCmd);
        cmdIdx += 1;
      }
    });

    this.genericTaskCommandMap.forEach((val, key) => {
      const lastIndex = val.lastIndex;
      const closer = val.type === '{' ? '}' : '>>>';

      this.genericTaskCommandMap.set(key, {
        command: Context.traceTheCommand(src, lastIndex, closer),
        type: val.type,
      });
    });
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
   */
  buildActionMap(ast) {
    const actionMap = {};
    const definitions = ast.attributes.body;
    const tasks = definitions.list.filter(item => item.name.toLowerCase() === 'task')
      .map(wfNode => new Task(wfNode.attributes));

    tasks.forEach((task) => {
      const command = this.genericTaskCommandMap.get(task.name);
      actionMap[task.name] = task.constructAction(command);
    });

    return actionMap;
  }
}

