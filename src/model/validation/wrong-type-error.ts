import WdlError from './error';
import { IWdlEntity, WdlErrorLevel, WdlErrorType } from '../types';
import { CommonType } from '../type/base';

class WrongTypeError extends WdlError<WdlErrorLevel.error, WdlErrorType.wrongType> {
  static check(type: string): boolean {
    return !!CommonType.parseType(type);
  }

  constructor(entity: IWdlEntity, type: string) {
    super(
      entity,
      WdlErrorType.wrongType,
      WdlErrorLevel.error,
      `Invalid type: "${type}"`,
    );
  }
}

export default WrongTypeError;
