import _ from 'lodash';

import * as constants from '../constants';
import Settings from '../WDLSettings';
import Port from '../../../model/Port';

import { buildDeclarations } from '../utils/utils';

export default class WorkflowGenerator {
  constructor(wfStep, settings) {
    this.wfBodyElementGenerators = {
      call: this.genCall,
      scatter: this.genScatter,
      whileloop: this.genWhile,
      if: this.genIf,
      workflow: this.genCall,
    };
    this.wfName = wfStep.name;
    this.wfStep = wfStep;

    const action = wfStep.action;
    this.declarations = this.getDeclarations(wfStep);
    this.outputMappings = wfStep.o;

    this.children = wfStep.children;

    this.meta = action.data.meta;
    this.parameterMeta = action.data.parameterMeta;

    this.wfBlockString = '';

    this.settings = new Settings(settings);
  }

  // eslint-disable-next-line class-methods-use-this
  getDeclarations(step) {
    const declarations = {};
    _.forEach(step.action.i || {}, (input, name) => {
      declarations[name] = input;
    });
    _.forEach(step.ownDeclarations || {}, (declaration, name) => {
      declarations[name] = {
        default: declaration.expression.string,
        type: declaration.desc.type,
      };
    });
    return declarations;
  }

  renderWorkflow() {
    const EOL = this.settings.getValue('style.eol');

    if (this.wfBlockString === '') {
      this.wfBlockString += `${constants.WORKFLOW} ${this.wfName} ${constants.SCOPE_OPEN}${EOL}`;

      const prosessed = [];
      this.wfBlockString += this.renderStepMainBody(this.wfStep, prosessed);
      this.wfBlockString += this.buildSegment(constants.META, this.meta);
      this.wfBlockString += this.buildSegment(constants.PARAMETER_META, this.parameterMeta);
      this.wfBlockString += this.buildOutputMap(this.outputMappings);

      this.wfBlockString += `${constants.SCOPE_CLOSE}${EOL}${EOL}`;
    }
    return this.wfBlockString;
  }

  renderStepMainBody(step, prosessed) {
    const declarations = this.getDeclarations(step);
    const children = step.children;

    let res = '';

    res += buildDeclarations(declarations, this.settings);

    for (let i = 0, size = _.size(children); i < size; ++i) {
      const childName = this.getNextOrderedChild(children, prosessed);
      prosessed.push(childName);

      const child = children[childName];
      res += this.wfBodyElementGenerators[child.type || 'call'].call(this, child, prosessed);
    }

    return res;
  }

  // eslint-disable-next-line class-methods-use-this
  getNextOrderedChild(children, processed) {
    let res = '';

    _.forEach(children, (child) => {
      if (_.indexOf(processed, child.name) < 0) {
        res = child.name;
        return false;
      }

      return true;
    });

    if (res === '') {
      throw new Error('Cycled links are not allowed');
    }
    return res;
  }

  buildPortValue(value) {
    if (value.desc && value.desc.expression && !_.isUndefined(value.desc.expression)) {
      return `${value.desc.expression}`;
    } else if (value.expression && value.expression.type.toLowerCase() !== 'identifier'
      && value.expression.type.toLowerCase() !== 'memberaccess' && !_.isUndefined(value.expression.string)) {
      return `${value.expression.string}`;
    } else if (value.inputs && _.size(value.inputs) > 0) {
      if (_.size(value.inputs) > 1) {
        throw new Error('Multiple links into one input are prohibited');
      }

      const connection = value.inputs[0];
      if (connection.from instanceof Port) {
        const outStep = connection.from.step;
        const outStepName = outStep.name;
        const outVarName = connection.from.name;

        if (outStepName === this.wfName || (outStep.type && outStep.type.toLowerCase() !== constants.WORKFLOW)) {
          return outVarName;
        }
        return `${outStepName}.${outVarName}`;
      }
      return connection.from;
    }
    return '';
  }

  genCall(child) {
    const EOL = this.settings.getValue('style.eol');
    const SCOPE_INDENT = this.settings.getValue('style.scope_indent');
    const DOUBLE_SCOPE_INDENT = `${SCOPE_INDENT}${SCOPE_INDENT}`;
    const TRIPLE_SCOPE_INDENT = `${DOUBLE_SCOPE_INDENT}${SCOPE_INDENT}`;

    let res = '';

    const val = child;
    const namespace = val.namespace ? `${val.namespace}.` : '';
    let callString = `${SCOPE_INDENT}${constants.CALL} `;

    if (val.name === val.initialName || val.initialName === `${namespace}${val.name}`) {
      if (val.action.name === `${namespace}${val.name}`) {
        callString += `${namespace}${val.name}`;
      } else {
        callString += `${val.action.name} ${constants.AS} ${val.name}`;
      }
    } else {
      callString += `${val.initialName} ${constants.AS} ${val.name}`;
    }

    res += `${callString}`;

    if (_.size(val.i) > 0) {
      let mappingWasFounded = false;

      _.forEach(val.i, (pVal, pKey) => {
        if (pVal.inputs && _.size(pVal.inputs) > 0) {
          if (!mappingWasFounded) {
            res += ` ${constants.SCOPE_OPEN}${EOL}`;
            res += `${DOUBLE_SCOPE_INDENT}${constants.INPUT}${constants.COLON}${EOL}`;
            mappingWasFounded = true;
          }
          res += `${TRIPLE_SCOPE_INDENT}${pKey} ${constants.EQ} ${this.buildPortValue(pVal)},${EOL}`;
        }
      });
      if (mappingWasFounded) {
        res += `${SCOPE_INDENT}${constants.SCOPE_CLOSE}`;
      }
    }

    return `${res}${EOL}`;
  }

  genScatter(child, prosessed) {
    const EOL = this.settings.getValue('style.eol');
    const SCOPE_INDENT = this.settings.getValue('style.scope_indent');

    let res = '';

    let item;
    _.forEach(child.i, (val) => {
      if (val.desc.type === 'ScatterItem') {
        item = val;
      }
    });

    if (_.isUndefined(item)) {
      throw new Error('Scatter model is not valid');
    }

    res += `${SCOPE_INDENT}${constants.SCATTER} (${item.name} ${constants.IN} ${this.buildPortValue(item)}) {${EOL}`;

    return this.genBodyCloser(res, child, prosessed);
  }

  genIf(child, prosessed) {
    const EOL = this.settings.getValue('style.eol');
    const SCOPE_INDENT = this.settings.getValue('style.scope_indent');

    let res = '';

    const expression = child.action.data.expression;
    res += `${SCOPE_INDENT}${constants.IF} (${expression}) ${constants.SCOPE_OPEN}${EOL}`;

    return this.genBodyCloser(res, child, prosessed);
  }

  genWhile(child, prosessed) {
    const EOL = this.settings.getValue('style.eol');
    const SCOPE_INDENT = this.settings.getValue('style.scope_indent');

    let res = '';

    const expression = child.action.data.expression;
    res += `${SCOPE_INDENT}${constants.WHILE} (${expression}) ${constants.SCOPE_OPEN}${EOL}`;

    return this.genBodyCloser(res, child, prosessed);
  }

  genBodyCloser(res, child, prosessed) {
    const EOL = this.settings.getValue('style.eol');
    const SCOPE_INDENT = this.settings.getValue('style.scope_indent');

    const innerBody = this.renderStepMainBody(child, prosessed);
    const bodyStringArr = innerBody.split(EOL);

    _.forEach(bodyStringArr, (str) => {
      if (str !== '') {
        res += `${SCOPE_INDENT}${str}${EOL}`;
      }
    });

    res += `${SCOPE_INDENT}${constants.SCOPE_CLOSE}${EOL}`;
    return res;
  }

  buildOutputMap(outputMappings) {
    const EOL = this.settings.getValue('style.eol');
    const SCOPE_INDENT = this.settings.getValue('style.scope_indent');
    const DOUBLE_SCOPE_INDENT = `${SCOPE_INDENT}${SCOPE_INDENT}`;

    let res = '';
    if (outputMappings && _.size(outputMappings) > 0) {
      res += `${SCOPE_INDENT}${constants.OUTPUT} ${constants.SCOPE_OPEN}${EOL}`;

      _.forEach(outputMappings, (val, key) => {
        if (key.indexOf('.') >= 0) {
          res += `${DOUBLE_SCOPE_INDENT}${key}${EOL}`;
        } else {
          res += `${DOUBLE_SCOPE_INDENT}${val.desc.type} ${key} ${constants.EQ} ${this.buildPortValue(val)}${EOL}`;
        }
      });

      res += `${SCOPE_INDENT}${constants.SCOPE_CLOSE}${EOL}`;
    }

    return res;
  }

  buildSegment(segmentName, data) {
    const EOL = this.settings.getValue('style.eol');
    const SCOPE_INDENT = this.settings.getValue('style.scope_indent');
    const DOUBLE_SCOPE_INDENT = `${SCOPE_INDENT}${SCOPE_INDENT}`;

    const buildValue = value => ` ${constants.EQ} ${value.toString()}`;

    let res = '';
    if (data && _.size(data) > 0) {
      res += `${SCOPE_INDENT}${segmentName} ${constants.SCOPE_OPEN}${EOL}`;

      _.forEach(data, (val, key) => {
        res += `${DOUBLE_SCOPE_INDENT}${key}${buildValue(val)}${EOL}`;
      });

      res += `${SCOPE_INDENT}${constants.SCOPE_CLOSE}${EOL}`;
    }

    return res;
  }
}
