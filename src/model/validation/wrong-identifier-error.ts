import WdlError from './error';
import { IWdlEntity, WdlErrorLevel, WdlErrorType } from '../types';

const identifierRegExp = /^[a-zA-Z][a-zA-Z0-9_]*$/;

class WrongIdentifierError extends WdlError<WdlErrorLevel.error, WdlErrorType.wrongIdentifier> {
  static check(identifier: string): boolean {
    return identifierRegExp.test(identifier);
  }

  constructor(entity: IWdlEntity, identifier: string) {
    super(
      entity,
      WdlErrorType.wrongIdentifier,
      WdlErrorLevel.error,
      `invalid identifier "${identifier}"`,
    );
  }
}

export default WrongIdentifierError;
