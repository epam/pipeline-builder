import _ from 'lodash';

import Workflow from '../../../model/Workflow';
import Step from '../../../model/Step';
import Group from '../../../model/Group';
import { extractExpression, extractType, extractMetaBlock, WDLParserError } from '../utils/utils';

/** Class representing a Workflow object of WDL script entity */
export default class WDLWorkflow {
  /**
   * Process through the hole entire ast tree and builds the desired Object Model
   * @param {ast} wfNode - Workflow ast tree node
   * @param {Context} context - Parsing context
   */
  constructor(wfNode, context) {
    this.parsingProcessors = {
      declaration: this.parseDeclaration,
      workflowoutputs: this.parseWfOutputs,
      meta: this.parseMeta,
      parametermeta: this.parseMeta,
      call: this.parseCall,
      scatter: this.parseScatter,
      if: this.parseIf,
      whileloop: this.parseWhile,
    };

    this.scatterIndex = 0;
    this.loopIndex = 0;
    this.ifIndex = 0;

    this.context = context;
    this.name = wfNode.name.source_string;
    this.workflowStep = new Workflow(this.name);

    this.parseBody(wfNode.body.list, 'workflow');
  }

  /**
   * Passes through the body of each wf element
   * @param {list} bodyList - list of the current parsing wdl body node
   * @param {string} name - current body name
   * @param {Step} parent - parent step
   * @param {list} opts - nodes that prohibited for current stage to parse (in lower case)
   */
  parseBody(bodyList, name, parent, opts = []) {
    const parentStep = parent || this.workflowStep;
    let declarationsPassed = false;
    bodyList.forEach((item) => {
      const lcName = item.name.toLowerCase();
      if (_.indexOf(opts, lcName) < 0) {
        if (lcName !== 'declaration') {
          declarationsPassed = true;
        } else if (declarationsPassed) {
          throw new WDLParserError('Declarations are allowed only before other things of current scope');
        }
        this.parsingProcessors[lcName].call(this, item.attributes, parentStep);
      } else {
        throw new WDLParserError(`In ${name} body keys in ${opts} are not allowed`);
      }
    });
  }


  /**
   * Parse the meta block
   * @param {ast} item - Root ast tree node of current meta block
   */
  parseMeta(item) {
    extractMetaBlock(item.map.list, item.name, this.workflowStep.action);
  }

  /**
   * Parse the scatter block
   * @param {ast} item - Root ast tree node of current scatter block
   * @param {Step} parent - parent step
   */
  parseScatter(item, parent = undefined) {
    const opts = {
      i: {},
    };

    opts.data = {
      variable: item.item.source_string,
      collection: extractExpression(item.collection).string,
    };

    const scatter = new Group(`scatter_${this.scatterIndex}`, 'scatter', opts);

    this.scatterIndex += 1;
    parent.add(scatter);

    this.parseBody(item.body.list, 'scatter', scatter, ['workflowoutputs', 'meta', 'parametermeta']);
  }

  /**
   * Parse the if block
   * @param {ast} item - Root ast tree node of current if block
   * @param {Step} parent - parent step
   */
  parseIf(item, parent = undefined) {
    const opts = {
      i: {},
    };

    opts.data = {
      expression: extractExpression(item.expression).string,
    };

    const ifStatement = new Group(`if_${this.ifIndex}`, 'if', opts);

    this.ifIndex += 1;
    parent.add(ifStatement);

    this.parseBody(item.body.list, 'if', ifStatement, ['workflowoutputs', 'meta', 'parametermeta']);
  }

  /**
   * Parse the while block
   * @param {ast} item - Root ast tree node of current while block
   * @param {Step} parent - parent step
   */
  parseWhile(item, parent = undefined) {
    const opts = {
      i: {},
    };

    opts.data = {
      expression: extractExpression(item.expression).string,
    };

    const whileLoop = new Group(`whileloop_${this.loopIndex}`, 'whileloop', opts);

    this.loopIndex += 1;
    parent.add(whileLoop);

    this.parseBody(item.body.list, 'whileloop', whileLoop, ['workflowoutputs', 'meta', 'parametermeta']);
  }

  /**
   * Parse the call instance
   * @param {ast} item - Root ast tree node of the current call
   * @param {Step} parent - parent step
   */
  parseCall(item, parent = undefined) {
    const parentStep = parent || this.workflowStep;
    const task = item.task.source_string;
    const alias = item.alias ? item.alias.source_string : task;

    if (!_.has(this.context.actionMap, task)) {
      throw new WDLParserError(`Undeclared task call: '${task}'.`);
    }

    const childStep = new Step(alias, _.get(this.context.actionMap, task));
    parentStep.add(childStep);

    this.findCallInputBinding(item, childStep, parentStep);
  }

  findCallInputBinding(callNode, step, parentStep) {
    if (callNode.body) {
      callNode.body.attributes.io.list
        .map(node => node)
        .reduce((prev, curr) => prev.concat(curr), [])
        .map(node => node.attributes.map.list)
        .reduce((prev, curr) => prev.concat(curr), [])
        .forEach(node => this.resolveBinding(node, step, parentStep));
    }
  }

  resolveBinding(node, step, parentStep) {
    const nodeValue = node.attributes.value;
    const attributes = nodeValue.attributes;

    const declaration = node.attributes.key ? node.attributes.key.source_string : undefined;

    if (declaration && nodeValue.name === 'MemberAccess') {
      const rhsPart = attributes && attributes.rhs ? attributes.rhs.source_string : '';
      const lhsPart = attributes && attributes.lhs ? attributes.lhs.source_string : '';

      const startStep = WDLWorkflow.findStepInStructureRecursively(this.workflowStep, lhsPart);
      if (startStep && step) {
        step.i[declaration].bind(startStep.o[rhsPart]);
      }
    } else if (declaration && nodeValue.str === 'identifier') {
      const portName = nodeValue.source_string;
      step.i[declaration].bind(WDLWorkflow.groupNameResolver(parentStep, portName).i[portName]);
    } else {
      const expression = extractExpression(nodeValue);
      step.i[declaration].bind(expression.string);
    }
  }

  /**
   * Bind the declaration
   * @param {ast} item - Root ast tree node of current declaration
   * @param {Step} parent - parent step
   */
  parseDeclaration(item, parent = undefined) {
    const parentStep = parent || this.workflowStep;
    const decl = item;
    const name = decl.name.source_string;
    const type = extractType(decl.type);

    const obj = {};
    obj[name] = {
      type,
    };

    const str = extractExpression(decl.expression).string;
    if (str !== '') {
      obj[name].default = str;
    }

    parentStep.action.addPorts({
      i: obj,
    });
  }

  /**
   * Pass through the output section of workflow
   * @param {ast} item - Root ast tree node of current outputs declaration
   */
  parseWfOutputs(item) {
    const outputList = item.outputs.list.map(i => i.attributes);

    this.processWilds(outputList);
    this.processExpressions(outputList);
  }

  /**
   * Build the expressioned outputs
   * @param {list<ast>} outputList - Array of ast nodes representing each output
   */
  processExpressions(outputList) {
    return outputList.forEach((item) => {
      if (!item.name && !item.type && !item.expression) {
        return;
      }

      const name = item.name.source_string;
      const type = extractType(item.type);
      const expression = extractExpression(item.expression);

      const obj = {};
      obj[name] = {
        type,
      };

      let wfOutLinksList = [];
      if (expression.type !== 'MemberAccess') {
        obj[name].default = expression.string;
      } else {
        expression.accesses.forEach(v => (v.to = name));
        wfOutLinksList = expression.accesses;
      }

      this.workflowStep.action.addPorts({
        o: obj,
      });

      wfOutLinksList.forEach((i) => {
        const startStep = this.workflowStep.children[i.lhs];

        if (startStep) {
          this.workflowStep.o[i.to].bind(startStep.o[i.rhs]);
        }
      });
    });
  }

  /**
   * Build the wildcard outputs <deprecated syntax>
   * @param {list<ast>} outputList - Array of ast nodes representing each output
   */
  processWilds(outputList) {
    return outputList.forEach((item) => {
      if (!item.fqn || !item.wildcard) {
        return;
      }
      const fqn = item.fqn;
      const wildcard = item.wildcard;
      const res = ((fqn ? fqn.source_string : '') + (wildcard ? `.${wildcard.source_string}` : '')).trim();

      const obj = {};
      obj[res] = {
        default: res,
      };

      this.workflowStep.action.addPorts({
        o: obj,
      });
    });
  }

  /**
   * Filter the entire child nodes of first param by determined in second param field name
   * @param {ast} wfNode - Ast tree node to filter
   * @param {string} field - AST node name to be extracted
   */
  static getSubNodes(wfNode, field) {
    return wfNode.list
      .filter(node => node.name.toLowerCase() === field)
      .map(ast => ast.attributes);
  }

  static findStepInStructureRecursively(step, name) {
    let result = null;
    _.forEach(step.children, (item, key) => {
      if (key === name) {
        result = item;
        return false;
      }

      result = WDLWorkflow.findStepInStructureRecursively(item, name);

      if (result) {
        return false;
      }

      return undefined;
    });

    return result;
  }

  static groupNameResolver(step, portName) {
    if (step) {
      if (_.has(step.i, portName) || _.has(step.o, portName)) {
        return step;
      }

      return WDLWorkflow.groupNameResolver(step.parent, portName);
    }

    return undefined;
  }

}
