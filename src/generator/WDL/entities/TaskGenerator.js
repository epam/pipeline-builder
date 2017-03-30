import _ from 'lodash';

import * as constants from '../constants';
import Settings from '../WDLSettings';

import { buildDeclarations } from '../utils/utils';

export default class TaskGenerator {
  constructor(action, settings) {
    this.taskName = action.name;
    this.declarations = action.i;
    this.outputMappings = action.o;

    this.command = action.data.command;
    this.commandStyle = action.data.commandStyle;

    this.meta = action.data.meta;
    this.parameterMeta = action.data.parameterMeta;
    this.runtime = action.data.runtime;

    this.taskBlockString = '';

    this.settings = new Settings(settings);
  }

  renderTask() {
    const EOL = this.settings.getValue('style.eol');

    if (this.taskBlockString === '') {
      this.taskBlockString += `${constants.TASK} ${this.taskName} ${constants.SCOPE_OPEN}${EOL}`;

      this.taskBlockString += buildDeclarations(this.declarations, this.settings);
      this.taskBlockString += this.buildCommand(this.command, this.commandStyle);
      this.taskBlockString += this.buildSegment(constants.OUTPUT, this.outputMappings);
      this.taskBlockString += this.buildSegment(constants.META, this.meta);
      this.taskBlockString += this.buildSegment(constants.PARAMETER_META, this.parameterMeta);
      this.taskBlockString += this.buildSegment(constants.RUNTIME, this.runtime);

      this.taskBlockString += `${constants.SCOPE_CLOSE}${EOL}${EOL}`;
    }
    return this.taskBlockString;
  }

  buildCommand(command, commandStyle) {
    let res = '';

    if (command) {
      const EOL = this.settings.getValue('style.eol');
      const SCOPE_INDENT = this.settings.getValue('style.scope_indent');
      const DOUBLE_SCOPE_INDENT = `${SCOPE_INDENT}${SCOPE_INDENT}`;

      const { start: commandStart, end: commandEnd } = TaskGenerator.getCommandStarterCloser(commandStyle);

      // insert the "command <open parenthesis>"
      res = `${SCOPE_INDENT}${constants.COMMAND} ${commandStart}${EOL}`;

      // insert the command string
      res += `${DOUBLE_SCOPE_INDENT}${command}${EOL}`;

      // put the close parenthesis for command block
      res += `${SCOPE_INDENT}${commandEnd}${EOL}${EOL}`;
    }
    return res;
  }

  buildSegment(segmentName, data) {
    const EOL = this.settings.getValue('style.eol');
    const SCOPE_INDENT = this.settings.getValue('style.scope_indent');
    const DOUBLE_SCOPE_INDENT = `${SCOPE_INDENT}${SCOPE_INDENT}`;

    const buildValue = (value) => {
      if (value.default) {
        return `${value.default}`;
      }
      return `${value}`;
    };

    let res = '';

    if (data && _.size(data) > 0) {
      res += `${SCOPE_INDENT}${segmentName} ${constants.SCOPE_OPEN}${EOL}`;

      _.forEach(data, (val, key) => {
        res += `${DOUBLE_SCOPE_INDENT}${segmentName === constants.OUTPUT ? val.type : ''} `;
        res += `${key} ${segmentName === constants.OUTPUT ? constants.EQ : constants.COLON} ${buildValue(val)}${EOL}`;
      });

      res += `${SCOPE_INDENT}${constants.SCOPE_CLOSE}${EOL}`;
    }

    return res;
  }

  static getCommandStarterCloser(commandStyle) {
    const start = commandStyle || '{';
    const end = start === '{' ? '}' : '>>>';

    return {
      start,
      end,
    };
  }
}
