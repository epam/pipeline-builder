import WdlError from './error';
import { IWdlEntity, WdlErrorLevel, WdlErrorType } from '../types';

const keywords = new Set([
  'import',
  'workflow',
  'task',
  'struct',
  'scatter',
  'call',
  'if',
  'then',
  'else',
  'alias',
  'as',
  'in',
  'input',
  'output',
  'parameter_meta',
  'meta',
  'runtime',
  'Boolean',
  'Int',
  'Float',
  'String',
  'File',
  'Array',
  'Map',
  'Object',
  'object',
  'Pair',
  'after',
  'command',
  'None',
]);

class ReservedKeywordError extends WdlError<WdlErrorLevel.error, WdlErrorType.reservedKeyword> {
  static check(identifier: string): boolean {
    return !keywords.has(identifier);
  }

  constructor(entity: IWdlEntity, identifier: string) {
    super(
      entity,
      WdlErrorType.reservedKeyword,
      WdlErrorLevel.error,
      `keyword "${identifier}" is reserved`,
    );
  }
}

export default ReservedKeywordError;
