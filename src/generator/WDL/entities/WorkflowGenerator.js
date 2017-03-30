import _ from 'lodash';

import * as constants from '../constants';
import Settings from '../WDLSettings';
import Port from '../../../model/Port';

import { buildDeclarations } from '../utils/utils';

export default class WorkflowGenerator {
  constructor(wfStep, settings) {
    this.wfName = wfStep.name;

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

      this.wfBlockString += buildDeclarations(this.declarations, this.settings);
      this.wfBlockString += this.buildCallMapping(this.children);
      this.wfBlockString += this.buildSegment(constants.META, this.meta);
      this.wfBlockString += this.buildSegment(constants.PARAMETER_META, this.parameterMeta);
      this.wfBlockString += this.buildOutputMap(this.outputMappings);

      this.wfBlockString += `${constants.SCOPE_CLOSE}${EOL}${EOL}`;
    }
    return this.wfBlockString;
  }

  buildPortValue(value) {
    if (value.inputs && _.size(value.inputs) > 0) {
      if (_.size(value.inputs) > 1) {
        throw new Error('Multiple links into one input are prohibited');
      }

      const connection = value.inputs[0];
      if (connection.from instanceof Port) {
        const outStepName = connection.from.step.name;
        const outVarName = connection.from.name;

        if (outStepName === this.wfName) {
          return outVarName;
        }
        return `${outStepName}.${outVarName}`;
      }
      return connection.from;
    }
    return '';
  }

  buildCallMapping(children) {
    const EOL = this.settings.getValue('style.eol');
    const SCOPE_INDENT = this.settings.getValue('style.scope_indent');
    const DOUBLE_SCOPE_INDENT = `${SCOPE_INDENT}${SCOPE_INDENT}`;
    const TRIPLE_SCOPE_INDENT = `${DOUBLE_SCOPE_INDENT}${SCOPE_INDENT}`;

    let res = '';

    _.forEach(children, (val) => {
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

      res += `${EOL}`;
    });

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
