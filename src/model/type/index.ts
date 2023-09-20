import { CommonType } from './base';
import Primitive from './primitive';
import {
  Compound, WdlArray, WdlMap, WdlPair,
} from './compound';
import WdlEntity from '../base/wdl-entity';
import {
  CompoundTypes,
  ContextTypes,
  IParameterType,
  IType,
  IWdlError,
  PrimitiveTypes,
  Types,
  WdlEvent,
} from '../types';
import { TypeRequiredError, WrongTypeError } from '../validation';

CommonType.registerInitializer(
  Primitive.isPrimitiveType,
  Primitive.parsePrimitive,
);
CommonType.registerInitializer(
  WdlMap.isWdlMapType,
  WdlMap.parseWdlMap,
);
CommonType.registerInitializer(
  WdlPair.isWdlPairType,
  WdlPair.parseWdlPair,
);
CommonType.registerInitializer(
  WdlArray.isWdlArrayType,
  WdlArray.parseWdlArray,
);
CommonType.registerInitializer(
  Compound.isCompoundType,
  Compound.parseCompound,
);

class ParameterType extends WdlEntity<ContextTypes.type> implements IParameterType {
  private _parsedType: CommonType<Types> | undefined;

  private _rawType: string | undefined;

  constructor(type: string | undefined) {
    super(ContextTypes.type);
    this._parsedType = undefined;
    this.setType(type);
  }

  protected get eventsRequireValidation(): Set<WdlEvent> {
    return new Set([
      ...super.eventsRequireValidation,
      WdlEvent.typeChanged,
    ]);
  }

  get type(): Types {
    if (this._parsedType) {
      return this._parsedType.type;
    }
    return undefined;
  }

  get value(): string | undefined {
    if (this._parsedType) {
      return this._parsedType.toString();
    }
    return this._rawType;
  }

  set value(value: string | undefined) {
    this.setType(value);
  }

  get struct(): string | undefined {
    if (
      this._parsedType
      && this._parsedType.type === CompoundTypes.struct
    ) {
      return (this._parsedType as Compound<CompoundTypes.struct>).name;
    }
    return undefined;
  }

  get isObject(): boolean {
    return this._parsedType
      && this._parsedType.type === CompoundTypes.object;
  }

  get optional(): boolean {
    return this._parsedType
      && this._parsedType.optional;
  }

  set optional(optional: boolean) {
    if (this._parsedType) {
      this.setType(this._parsedType.makeOptional(optional).toString());
    }
  }

  get isArray(): boolean {
    return this._parsedType
      && this._parsedType.type === CompoundTypes.array;
  }

  get isNotEmpty(): boolean {
    return this.isArray
      && this._parsedType.notEmpty;
  }

  set isNotEmpty(isNotEmpty: boolean) {
    if (this._parsedType) {
      this.setType(this._parsedType.makeNotEmpty(isNotEmpty).toString());
    }
  }

  get isMap(): boolean {
    return this._parsedType
      && this._parsedType.type === CompoundTypes.map;
  }

  get isPair(): boolean {
    return this._parsedType
      && this._parsedType.type === CompoundTypes.pair;
  }

  get isPrimitive(): boolean {
    return this._parsedType
      && ([
        PrimitiveTypes.file,
        PrimitiveTypes.boolean,
        PrimitiveTypes.int,
        PrimitiveTypes.float,
        PrimitiveTypes.string,
      ] as Types[]).includes(this._parsedType.type);
  }

  get notEmpty(): boolean {
    if (this._parsedType) {
      return this._parsedType.notEmpty;
    }
    return false;
  }

  set notEmpty(notEmpty: boolean) {
    if (this._parsedType) {
      this.setType(this._parsedType.makeNotEmpty(notEmpty).toString());
    }
  }

  private setType(type: string | undefined) {
    if (
      !!this._rawType !== !!type
      || (this._rawType && type && this._rawType !== type)
    ) {
      this._rawType = type;
      try {
        this._parsedType = type ? CommonType.parseType(type) : undefined;
      } catch (error) {
        this._parsedType = undefined;
        console.warn(error.message);
      } finally {
        this.bubble(WdlEvent.typeChanged);
        this.bubble(WdlEvent.changed, { changed: 'type' });
      }
    }
  }

  clone(): IType | undefined {
    if (this._parsedType) {
      return this._parsedType.clone();
    }
    return undefined;
  }

  isSubTypeOf<P extends Types>(type: IType<P>): boolean {
    if (this._parsedType) {
      return this._parsedType.isSubTypeOf(type);
    }
    return false;
  }

  makeArray(): IType | undefined {
    if (this._parsedType) {
      return this._parsedType.makeArray();
    }
    return undefined;
  }

  makeArrayItem(): IType | undefined {
    if (this._parsedType) {
      return this._parsedType.makeArrayItem();
    }
    return undefined;
  }

  makeNotEmpty(): IType;
  makeNotEmpty(notEmpty: boolean): IType;
  makeNotEmpty(notEmpty?: boolean): IType {
    if (this._parsedType) {
      return this._parsedType.makeNotEmpty(notEmpty);
    }
    return undefined;
  }

  makeOptional(): IType;
  makeOptional(optional: boolean): IType;
  makeOptional(optional?: boolean): IType {
    if (this._parsedType) {
      return this._parsedType.makeOptional(optional);
    }
    return undefined;
  }

  protected getValidationErrors(): IWdlError[] {
    const issues = super.getValidationErrors();
    if (
      !this._parsedType
      && this._rawType
      && WrongTypeError.check(this._rawType)
    ) {
      issues.push(new WrongTypeError(this, this._rawType));
    } else if (!this._parsedType) {
      issues.push(new TypeRequiredError(this));
    }
    return issues;
  }
}

export default ParameterType;
