import _ from 'lodash';

import Workflow from '../../../model/Workflow';
import Step from '../../../model/Step';
import { extractExpression, extractType, extractMetaBlock, WDLParserError } from '../utils/utils';

/** Class representing a Workflow object of WDL script entity */
export default class WDLWorkflow {
  /**
   * Process through the hole entire ast tree and builds the desired Object Model
   * @param {ast} wfNode - Workflow ast tree node
   * @param {Context} context - Parsing context
   */
  constructor(wfNode, context) {
    wfNode.body.list.forEach((item) => {
      if (item.name.toLowerCase() === 'scatter') {
        throw new WDLParserError('Currently scatter is not supported');
      }
    });

    this.desc = {
      i: {},
      o: {},
      data: {},
    };

    this.context = context;
    this.name = wfNode.name.source_string;
    this.linksList = [];
    this.wfOutLinksList = [];

    this.fillWorkflowInputs(wfNode.body);
    this.fillWorkflowOutputs(wfNode);

    extractMetaBlock(wfNode.body.list, 'meta', this.desc);
    extractMetaBlock(wfNode.body.list, 'parameterMeta', this.desc);

    this.workflowStep = new Workflow(this.name, this.desc);
    this.fillChildSteps(wfNode.body);

    this.bindChilds();
    this.bindOutputs();
  }

  /**
   * Bind all workflow step child after them all created
   */
  bindChilds() {
    this.linksList.forEach((item) => {
      const startStep = this.workflowStep.children[item.start_lhs];
      const endStep = this.workflowStep.children[item.end_lhs];

      if (startStep && endStep) {
        endStep.i[item.end_rhs].bind(startStep.o[item.start_rhs]);
      }
    });
  }

  /**
   * Bind all workflow step child after them all created
   */
  bindOutputs() {
    this.wfOutLinksList.forEach((item) => {
      const startStep = this.workflowStep.children[item.lhs];

      if (startStep) {
        this.workflowStep.o[item.to].bind(startStep.o[item.rhs]);
      }
    });
  }

  /**
   * Pass through the call list and prepare steps and links
   * @param {ast} wfNode - Root ast tree node of the calls list
   */
  fillChildSteps(wfNode) {
    WDLWorkflow.getSubNodes(wfNode, 'call').forEach((callNode) => {
      const task = callNode.task.source_string;
      const alias = callNode.alias ? callNode.alias.source_string : task;

      if (!_.has(this.context.actionMap, task)) {
        throw new WDLParserError(`Undeclared task call: '${task}'.`);
      }

      const childStep = new Step(alias, _.get(this.context.actionMap, task));
      this.workflowStep.add(childStep);

      this.findCallInputBinding(callNode, childStep);
    });
  }

  findCallInputBinding(callNode, step) {
    if (callNode.body) {
      callNode.body.attributes.io.list
        .map(node => node)
        .reduce((prev, curr) => prev.concat(curr), [])
        .map(node => node.attributes.map.list)
        .reduce((prev, curr) => prev.concat(curr), [])
        .forEach(node => this.resolveBinding(node, step));
    }
  }

  resolveBinding(node, step) {
    const nodeValue = node.attributes.value;
    const attributes = nodeValue.attributes;

    const declaration = node.attributes.key ? node.attributes.key.source_string : undefined;

    if (declaration && nodeValue.name === 'MemberAccess') {
      const rhsPart = attributes && attributes.rhs ? attributes.rhs.source_string : '';
      const lhsPart = attributes && attributes.lhs ? attributes.lhs.source_string : '';

      this.linksList.push({
        start_lhs: lhsPart,
        start_rhs: rhsPart,
        end_lhs: step.name,
        end_rhs: declaration,
      });
    } else if (declaration && nodeValue.str === 'identifier') {
      step.i[declaration].bind(this.workflowStep.i[nodeValue.source_string]);
    } else {
      const expression = extractExpression(nodeValue);
      step.i[declaration].bind(expression.string);
    }
  }

  /**
   * Pass through the declaration section of workflow
   * @param {ast} wfNode - Root ast tree node of current workflow
   */
  fillWorkflowInputs(wfNode) {
    WDLWorkflow.getSubNodes(wfNode, 'declaration')
      .forEach((v) => {
        this.desc.i[v.name.source_string] = {
          type: extractType(v.type),
        };

        const str = extractExpression(v.expression).string;
        if (str !== '') {
          this.desc.i[v.name.source_string].default = str;
        }
      });
  }

  /**
   * Pass through the output section of workflow
   * @param {ast} wfNode - Root ast tree node of current workflow
   */
  fillWorkflowOutputs(wfNode) {
    const outputList = WDLWorkflow.getSubNodes(wfNode.body, 'workflowoutputs')
      .map(node => node.outputs.list)
      .reduce((i, j) => [...i, ...j], [])
      .map(item => item.attributes);

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

      this.desc.o[name] = {
        type,
      };
      if (expression.type !== 'MemberAccess') {
        this.desc.o[name].default = expression.string;
      } else {
        expression.accesses.forEach(v => (v.to = name));
        this.wfOutLinksList = this.wfOutLinksList.concat(expression.accesses);
      }
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

      this.desc.o[res] = {
        default: res,
      };
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
}
