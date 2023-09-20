import {
  CompoundTypes,
  PrimitiveTypes,
  Types,
  IType,
} from '../types';

export interface IPrimitiveType<P extends PrimitiveTypes> extends IType<P> {
}

export interface ICompoundType<C extends CompoundTypes> extends IType<C> {
}

export interface ICompoundTypeOf<C extends CompoundTypes, P extends IType>
  extends ICompoundType<C> {
  child: P;
}

export interface ICompoundTypeOf2<
  C extends CompoundTypes,
  P1 extends IType,
  P2 extends IType>
  extends ICompoundTypeOf<C, P1> {
  child2: P2;
}

type TTypeChecker = (type: Types | CommonType<Types> | string) => boolean;
type TTypeParser = (type: string) => CommonType<Types>;

interface ITypeInitializer {
  checker: TTypeChecker;
  parser: TTypeParser;
}

abstract class CommonType<T extends Types> implements IType<T> {
  static initializers: ITypeInitializer[] = [];

  static registerInitializer(checker: TTypeChecker, parser: TTypeParser): void {
    this.initializers.push({
      checker,
      parser,
    });
  }

  static parseType(type: string) : CommonType<Types> | undefined {
    const initializer = CommonType.initializers.find((i) => i.checker(type));
    if (initializer) {
      return initializer.parser(type);
    }
    return undefined;
  }

  type: T;

  optional: boolean;

  notEmpty: boolean;

  protected constructor(type: T);
  protected constructor(type: T, optional: boolean);
  protected constructor(type: T, optional: boolean, notEmpty: boolean);
  protected constructor(type: T, optional: boolean = false, notEmpty: boolean = false) {
    this.type = type;
    this.optional = !!optional;
    this.notEmpty = notEmpty;
  }

  toString() {
    return `${this.type}${this.optional ? '?' : ''}`;
  }

  isSubTypeOf<P extends Types>(type: IType<P>): boolean {
    return (this.type as string) === (type.type as string)
      && (
        this.optional === type.optional
        || !this.optional
      );
  }

  makeOptional(optional: boolean = true): IType {
    const clone = this.clone();
    clone.optional = optional;
    return clone;
  }

  makeNotEmpty(): IType;
  makeNotEmpty(notEmpty: boolean): IType;
  makeNotEmpty(notEmpty: boolean = true): IType {
    const clone = this.clone();
    clone.notEmpty = notEmpty;
    return clone;
  }

  makeArray(): IType {
    return CommonType.parseType(`Array[${this.toString()}]`);
  }

  // eslint-disable-next-line class-methods-use-this
  makeArrayItem(): IType {
    return undefined;
  }

  clone(): IType | undefined {
    return CommonType.parseType(this.toString());
  }
}

export { CommonType };
