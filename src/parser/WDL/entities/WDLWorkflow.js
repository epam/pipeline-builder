import _ from 'lodash';

import Workflow from '../../../model/Workflow';
import Step from '../../../model/Step';
import Group from '../../../model/Group';
import Declaration from '../../../model/Declaration';
import { extractExpression, extractType, extractMetaBlock, WDLParserError } from '../utils/utils';
import * as Constants from '../constants';

/** Class representing a Workflow object of WDL script entity */
export default class WDLWorkflow {
  /**
   * Process through the hole entire ast tree and builds the desired Object Model
   * @param {ast} wfNode - Workflow ast tree node
   * @param {Context} context - Parsing context
   * @param {String?} [initialName=null] - initial Name
   * @param {Boolean?} [isSubWorkflow=false] - is Sub Workflow
   */
  constructor(wfNode, context, initialName = null, isSubWorkflow = false) {
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
    this.workflowStep = new Workflow(this.name, { initialName: initialName || null, isSubWorkflow });
    if (Object.prototype.hasOwnProperty.call(context, 'hasImports')) {
      this.workflowStep.hasImports = !!context.hasImports;
    }

    this.parseBody(wfNode.body.list, 'workflow');
  }

  /**
   * Passes through the body of each wf element
   * @param {list} bodyList - list of the current parsing wdl body node
   * @param {string} name - current body name
   * @param {Step} parent - parent step
   * @param {[list]} opts - nodes that prohibited for current stage to parse (in lower case)
   */
  parseBody(bodyList, name, parent, opts = []) {
    const parentStep = parent || this.workflowStep;
    bodyList.forEach((item) => {
      const lcName = item.name.toLowerCase();
      if (_.indexOf(opts, lcName) < 0) {
        this.parsingProcessors[lcName].call(this, item, parentStep);
      } else {
        throw new WDLParserError(`In ${name} body keys [${opts}] are not allowed`);
      }
    });
  }


  /**
   * Parse the meta block
   * @param {ast} item - Root ast tree node of current meta block
   */
  parseMeta(item) {
    extractMetaBlock(item.attributes.map.list, item.name.toLowerCase(), this.workflowStep.action);
  }

  /**
   * Parse the scatter block
   * @param {ast} item - Root ast tree node of current scatter block
   * @param {Step} parent - parent step
   */
  parseScatter(item, parent) {
    const itemName = item.attributes.item.source_string;
    const opts = {
      i: {
      },
    };

    const collection = extractExpression(item.attributes.collection);

    // in scatter the item is always an identifier, so it'll always be one port returned from .getPortForBinding() not an array
    const port = WDLWorkflow.getPortForBinding(this.workflowStep, parent, collection);

    opts.i[itemName] = {};
    opts.i[itemName].type = 'ScatterItem';

    const scatter = new Group(`${this.name}_scatter_${this.scatterIndex}`, 'scatter', opts);
    scatter.i[itemName].bind(port);

    this.scatterIndex += 1;
    parent.add(scatter);

    this.parseBody(item.attributes.body.list, 'scatter', scatter, ['workflowoutputs', 'meta', 'parametermeta']);
  }

  /**
   * Parse the if block
   * @param {ast} item - Root ast tree node of current if block
   * @param {Step} parent - parent step
   */
  parseIf(item, parent) {
    const opts = {
      data: {
        expression: extractExpression(item.attributes.expression).string,
      },
    };

    const ifStatement = new Group(`${this.name}_if_${this.ifIndex}`, 'if', opts);

    this.ifIndex += 1;
    parent.add(ifStatement);

    this.parseBody(item.attributes.body.list, 'if', ifStatement, ['workflowoutputs', 'meta', 'parametermeta']);
  }

  /**
   * Parse the while block
   * @param {ast} item - Root ast tree node of current while block
   * @param {Step} parent - parent step
   */
  parseWhile(item, parent) {
    const opts = {
      data: {
        expression: extractExpression(item.attributes.expression).string,
      },
    };

    const whileLoop = new Group(`${this.name}_whileloop_${this.loopIndex}`, 'whileloop', opts);

    this.loopIndex += 1;
    parent.add(whileLoop);

    this.parseBody(item.attributes.body.list, 'whileloop', whileLoop, ['workflowoutputs', 'meta', 'parametermeta']);
  }

  /**
   * Parse the call instance
   * @param {ast} item - Root ast tree node of the current call
   * @param {Step} parent - parent step
   */
  parseCall(item, parent) {
    const parentStep = parent;
    const task = item.attributes.task.source_string;
    const alias = item.attributes.alias ? item.attributes.alias.source_string : task;
    const initialName = task;

    if (!_.has(this.context.actionMap, task)) {
      throw new WDLParserError(`Undeclared task call: '${task}'.`);
    }

    const action = _.get(this.context.actionMap, task);

    let childStep;
    if (action.type === Constants.WORKFLOW) {
      const cloneAst = _.clone(action.ast);
      cloneAst.attributes.name.source_string = alias;
      childStep = new WDLWorkflow(cloneAst.attributes, this.context, initialName, true).workflowStep;
    } else {
      childStep = new Step(alias, action);
    }

    parentStep.add(childStep);

    this.findCallInputBinding(item.attributes, childStep, parentStep);
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
    const declaration = node.attributes.key.source_string;
    const expression = extractExpression(nodeValue);

    if (step.i[declaration]) {
      const bindings = WDLWorkflow.getPortForBinding(this.workflowStep, parentStep, expression);
      if (bindings && !Array.isArray(bindings)) {
        step.i[declaration].bind(bindings);
      } else if (bindings) {
        _.forEach(bindings, binding => step.i[declaration].bind(binding));
      }
    } else {
      throw new WDLParserError(`Undeclared variable trying to be assigned: call '${step.name}' --> '${declaration}'`);
    }
  }

  /**
   * Bind the declaration
   * @param {ast} item - Root ast tree node of current declaration
   * @param {Step} parent - parent step
   */
  // eslint-disable-next-line class-methods-use-this
  parseDeclaration(item, parent) {
    const parentStep = parent;
    const decl = item.attributes;
    const name = decl.name.source_string;
    const type = extractType(decl.type);

    if (decl.expression === null) { // declaration is an input type
      const obj = {};
      obj[name] = {
        type,
      };
      parentStep.action.addPorts({
        i: obj,
      });
    } else if (parentStep instanceof Group) { // declaration is a "variable" type
      const declaration = new Declaration(name, decl, parentStep);
      const bindings = WDLWorkflow.getPortForBinding(this.workflowStep, declaration.step, declaration.expression);
      if (bindings && !Array.isArray(bindings)) {
        declaration.bind(bindings);
      } else if (bindings) {
        _.forEach(bindings, binding => declaration.bind(binding));
      }

      parentStep.addDeclaration(declaration);
    }
  }

  /**
   * Pass through the output section of workflow
   * @param {ast} item - Root ast tree node of current outputs declaration
   */
  parseWfOutputs(item) {
    const outputList = item.attributes.outputs.list.map(i => i.attributes);

    this.processWilds(outputList);
    this.processExpressions(outputList);
  }

  /**
   * Build the expressioned outputs
   * @param {[<ast>]} outputList - Array of ast nodes representing each output
   */
  processExpressions(outputList) {
    outputList.forEach((item) => {
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
        expression.accesses.forEach((v) => { v.to = name; });
        wfOutLinksList = expression.accesses;
      }

      this.workflowStep.action.addPorts({
        o: obj,
      });

      wfOutLinksList.forEach((i) => {
        const startStep = WDLWorkflow.findStepInStructureRecursively(this.workflowStep, i.lhs);

        if (startStep) {
          if (startStep.o[i.rhs]) {
            this.workflowStep.o[i.to].bind(startStep.o[i.rhs]);
          } else {
            throw new WDLParserError(
              `In '${this.workflowStep.name}' 
              output block undeclared variable is referenced: '${i.lhs}.${i.rhs}'`);
          }
        } else {
          throw new WDLParserError(
            `In '${this.workflowStep.name}' 
            output block undeclared call is referenced: '${i.lhs}'`);
        }
      });
    });
  }

  /**
   * Build the wildcard outputs <deprecated syntax>
   * @param {[<ast>]} outputList - Array of ast nodes representing each output
   */
  processWilds(outputList) {
    outputList.forEach((item) => {
      if (!item.fqn) {
        return;
      }
      const fqn = item.fqn;
      const wildcard = item.wildcard;
      const res = (fqn.source_string + (wildcard ? `.${wildcard.source_string}` : '')).trim();

      const obj = {};
      obj[res] = {
        default: res,
      };

      this.workflowStep.action.addPorts({
        o: obj,
      });
      // WF output connections
      if (!wildcard) { // syntax: call_name.output_name
        const [callName, outputName] = fqn.source_string.split('.');
        const startStep = WDLWorkflow.findStepInStructureRecursively(this.workflowStep, callName);

        if (startStep) {
          if (startStep.o[outputName]) {
            this.workflowStep.o[fqn.source_string].bind(startStep.o[outputName]);
          } else {
            throw new WDLParserError(
              `In '${this.workflowStep.name}' 
              output block undeclared variable is referenced: '${callName}.${outputName}'`);
          }
        } else {
          throw new WDLParserError(
            `In '${this.workflowStep.name}' 
            output block undeclared call is referenced: '${callName}'`);
        }
      } else { // syntax: call_name.* (all call's outputs)
        const callName = fqn.source_string;
        const startStep = WDLWorkflow.findStepInStructureRecursively(this.workflowStep, callName);

        if (startStep) {
          if (_.size(startStep.o)) {
            _.forEach(startStep.o, (output, outputName) => {
              this.workflowStep.o[`${fqn.source_string}.*`].bind(startStep.o[outputName]);
            });
          } else {
            throw new WDLParserError(
              `In '${this.workflowStep.name}' 
              output block undeclared variable is referenced: '${callName}.* (${callName} doesn't have any outputs)`);
          }
        } else {
          throw new WDLParserError(
            `In '${this.workflowStep.name}' 
            output block undeclared call is referenced: '${callName}'`);
        }
      }
    });
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
      const root = step.workflow();
      if (_.has(root.declarations, portName)) {
        return root;
      }

      return WDLWorkflow.groupNameResolver(step.parent, portName);
    }

    return undefined;
  }

  static getPortForBinding(workflow, parent, expression) {
    const accessesTypes = [
      'ArrayOrMapLookup',
      'FunctionCall',
      'ArrayLiteral',
      'ObjectLiteral',
      'MapLiteral',
      'TupleLiteral',
      'LogicalNot',
      'UnaryPlus',
      'UnaryNegation',
      'Add',
      'Subtract',
      'Multiply',
      'Divide',
      'Remainder',
      'LogicalOr',
      'LogicalAnd',
      'Equals',
      'NotEquals',
      'LessThan',
      'LessThanOrEqual',
      'GreaterThan',
      'GreaterThanOrEqual',
      'TernaryIf',
      'MapLiteralKv',
      'ObjectKV',
    ];
    let binder = expression.string;
    if (expression.type === 'MemberAccess') {
      const rhsPart = expression.accesses[0].rhs;
      const lhsPart = expression.accesses[0].lhs;

      const outputStep = WDLWorkflow.findStepInStructureRecursively(workflow, lhsPart);
      if (outputStep) {
        if (outputStep.o[rhsPart]) {
          binder = outputStep.o[rhsPart];
        } else {
          throw new WDLParserError(`Undeclared variable is referenced: '${lhsPart}.${rhsPart}'`);
        }
      } else {
        throw new WDLParserError(`Undeclared call is referenced: '${lhsPart}'`);
      }
    } else if (accessesTypes.includes(expression.type) && expression.accesses.length) {
      binder = [];
      _.forEach(expression.accesses, (accesses) => {
        if (_.isObject(accesses)) {
          const outputStep = WDLWorkflow.findStepInStructureRecursively(workflow, accesses.lhs);
          if (outputStep) {
            if (outputStep.o[accesses.rhs]) {
              binder.push(outputStep.o[accesses.rhs]);
            } else {
              throw new WDLParserError(`Undeclared variable is referenced: '${accesses.lhs}.${accesses.rhs}'`);
            }
          } else {
            throw new WDLParserError(`Undeclared call is referenced: '${accesses.lhs}'`);
          }
        } else if (_.isString(accesses)) {
          const desiredStep = WDLWorkflow.groupNameResolver(parent, accesses);
          if (desiredStep) {
            if (desiredStep.i[accesses]) {
              binder.push(desiredStep.i[accesses]);
            } else {
              binder.push(desiredStep.declarations[accesses]);
            }
          } else {
            throw new WDLParserError(`Undeclared variable is referenced: '${expression.string}'`);
          }
        }
      });
    } else if (expression.type === 'identifier') {
      const desiredStep = WDLWorkflow.groupNameResolver(parent, expression.string);
      if (desiredStep) {
        if (desiredStep.i[expression.string]) {
          binder = desiredStep.i[expression.string];
        } else {
          binder = desiredStep.declarations[expression.string];
        }
      } else {
        throw new WDLParserError(`Undeclared variable is referenced: '${expression.string}'`);
      }
    }

    return binder;
  }

}
