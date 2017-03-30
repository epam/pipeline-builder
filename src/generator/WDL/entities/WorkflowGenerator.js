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
    };
    this.wfName = wfStep.name;
    this.wfStep = wfStep;

    const action = wfStep.action;
    this.declarations = action.i;
    this.outputMappings = wfStep.o;

    this.children = wfStep.children;

    this.meta = action.data.meta;
    this.parameterMeta = action.data.parameterMeta;

    this.wfBlockString = '';

    this.settings = new Settings(settings);
  }

  renderWorkflow() {
    const EOL = this.settings.getValue('style.eol');

    if (this.wfBlockString === '') {
      this.wfBlockString += `${constants.WORKFLOW} ${this.wfName} ${constants.SCOPE_OPEN}${EOL}`;

      this.wfBlockString += this.renderStepMainBody(this.wfStep);
      this.wfBlockString += this.buildSegment(constants.META, this.meta);
      this.wfBlockString += this.buildSegment(constants.PARAMETER_META, this.parameterMeta);
      this.wfBlockString += this.buildOutputMap(this.outputMappings);

      this.wfBlockString += `${constants.SCOPE_CLOSE}${EOL}${EOL}`;
    }
    return this.wfBlockString;
  }

  renderStepMainBody(step) {
    const declarations = step.action.i;
    const children = step.children;

    let res = '';

    if (!step.type) {
      res += buildDeclarations(declarations, this.settings);
    }

    _.forEach(children, (val) => {
      res += this.wfBodyElementGenerators[val.type || 'call'].call(this, val);
    });

    return res;
  }

  buildPortValue(value) {
    if (value.inputs && _.size(value.inputs) > 0) {
      if (_.size(value.inputs) > 1) {
        throw new Error('Multiple links into one input are prohibited');
      }

      const connection = value.inputs[0];
      if (connection.from instanceof Port) {
        const outStep = connection.from.step;
        const outStepName = outStep.name;
        const outVarName = connection.from.name;

        if (outStepName === this.wfName || outStep.type) {
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
    let callString = `${SCOPE_INDENT}${constants.CALL} `;

    if (val.action.name === val.name) {
      callString += `${val.name}`;
    } else {
      callString += `${val.action.name} ${constants.AS} ${val.name}`;
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

  genScatter(child) {
    const EOL = this.settings.getValue('style.eol');
    const SCOPE_INDENT = this.settings.getValue('style.scope_indent');

    let res = '';

    const item = child.action.data.variable;
    const collection = child.action.data.collection;
    res += `${SCOPE_INDENT}${constants.SCATTER} (${item} ${constants.IN} ${collection}) {${EOL}`;

    return this.genBodyCloser(res, child);
  }

  genIf(child) {
    const EOL = this.settings.getValue('style.eol');
    const SCOPE_INDENT = this.settings.getValue('style.scope_indent');

    let res = '';

    const expression = child.action.data.expression;
    res += `${SCOPE_INDENT}${constants.IF} (${expression}) ${constants.SCOPE_OPEN}${EOL}`;

    return this.genBodyCloser(res, child);
  }

  genWhile(child) {
    const EOL = this.settings.getValue('style.eol');
    const SCOPE_INDENT = this.settings.getValue('style.scope_indent');

    let res = '';

    const expression = child.action.data.expression;
    res += `${SCOPE_INDENT}${constants.WHILE} (${expression}) ${constants.SCOPE_OPEN}${EOL}`;

    return this.genBodyCloser(res, child);
  }

  genBodyCloser(res, child) {
    const EOL = this.settings.getValue('style.eol');
    const SCOPE_INDENT = this.settings.getValue('style.scope_indent');

    const innerBody = this.renderStepMainBody(child);
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
          res += `${this.buildPortValue(val)}${EOL}`;
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
