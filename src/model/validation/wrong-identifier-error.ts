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

const identifierRegExp = /^[a-zA-Z][a-zA-Z0-9_]*$/;

class WrongIdentifierError extends WdlError<WdlErrorLevel.error, WdlErrorType.wrongIdentifier> {
  static check(identifier: string): boolean {
    return identifierRegExp.test(identifier) && !keywords.has(identifier);
  }

  constructor(entity: IWdlEntity, identifier: string) {
    super(
      entity,
      WdlErrorType.wrongIdentifier,
      WdlErrorLevel.error,
      `Invalid identifier: reserved keyword "${identifier}"`,
    );
  }
}

export default WrongIdentifierError;
