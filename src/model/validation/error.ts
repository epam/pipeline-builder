import {
  IWdlEntity, IWdlError, WdlErrorLevel, WdlErrorType,
} from '../types';
import WdlErrorMessages from './messages';

abstract class WdlError<
  L extends WdlErrorLevel = WdlErrorLevel.error,
  T extends WdlErrorType = WdlErrorType,
>
  extends Error
  implements IWdlError<L, T> {
  private readonly _entity: IWdlEntity;

  private readonly _type: T;

  private readonly _level: L;

  protected constructor(entity: IWdlEntity, type: T);
  protected constructor(entity: IWdlEntity, type: T, level: L);
  protected constructor(entity: IWdlEntity, type: T, level: L, message: string);
  protected constructor(
    entity: IWdlEntity,
    type: T,
    level: WdlErrorLevel = WdlErrorLevel.error,
    message: string = undefined,
  ) {
    super(message ?? WdlErrorMessages[type] ?? type.toString());
    this._entity = entity;
    this._type = type;
    this._level = level as L;
  }

  get entity(): IWdlEntity {
    return this._entity;
  }

  get type(): T {
    return this._type;
  }

  get level(): L {
    return this._level as L;
  }

  get description(): string {
    return `${this.entity.toString()}: ${this.message}`;
  }

  print() {
    switch (this.level) {
      case WdlErrorLevel.error:
        console.error(this.description);
        break;
      case WdlErrorLevel.warning:
      default:
        console.warn(this.description);
    }
  }
}

export default WdlError;
