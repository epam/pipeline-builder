/* eslint-disable max-classes-per-file */
import {
  CommonType,
  ICompoundType,
  ICompoundTypeOf,
  ICompoundTypeOf2,
  IPrimitiveType,
} from './base';
import {
  CompoundTypes,
  PrimitiveTypes,
  IType,
  Types,
} from '../types';
import Primitive, { getPrimitiveType } from './primitive';

function splitParameters(input: string): string[] {
  let openBracket = 0;
  const parameters = [''];
  const add = (i: number): void => {
    parameters[parameters.length - 1] = parameters[parameters.length - 1].concat(input[i]);
  };
  for (let i = 0; i < input.length; i += 1) {
    if (input[i] === '[') {
      openBracket += 1;
      add(i);
    } else if (input[i] === ']') {
      openBracket -= 1;
      add(i);
    } else if (input[i] === ',' && openBracket === 0) {
      parameters.push('');
    } else {
      add(i);
    }
  }
  return parameters.filter((p) => p.length > 0);
}

function getCompoundType(
  type: string | Types,
  ...types: CompoundTypes[]
): CompoundTypes {
  const values = types.length > 0 ? types : Object.values(CompoundTypes);
  const compound = values.find((t) => t.toString() === type.toString());
  if (compound) {
    return compound;
  }
  if (getPrimitiveType(type)) {
    return undefined;
  }
  if (values.includes(CompoundTypes.struct)) {
    // It is not a compound type and not a primitive - so this is a struct with
    // custom name
    return CompoundTypes.struct;
  }
  return undefined;
}

function isCompoundType<T extends Types>(
  type: T | CommonType<T> | string,
  ...types: CompoundTypes[]
): boolean {
  if (typeof type === 'string') {
    const r = /^\s*([a-zA-Z][a-zA-Z0-9_]*)/.exec(type);
    if (r) {
      const typeString = r[1];
      if (Primitive.isPrimitiveType(typeString)) {
        return false;
      }
      return !!getCompoundType(typeString, ...types);
    }
    return false;
  }
  return isCompoundType(type.type, ...types);
}

class Compound<C extends CompoundTypes>
  extends CommonType<C> implements ICompoundType<C> {
  static isCompoundType(type: string);
  static isCompoundType<T extends Types>(type: T);
  static isCompoundType<T extends Types>(type: CommonType<T>);
  static isCompoundType<T extends Types>(type: T | CommonType<T> | string) {
    return isCompoundType(type, CompoundTypes.object, CompoundTypes.struct);
  }

  static parseCompound(
    type: string,
  ): Compound<CompoundTypes.object | CompoundTypes.struct> | undefined {
    const r = /^\s*(Object|[a-zA-Z][a-zA-Z0-9_]*)(\??)\s*$/.exec(type);
    if (r) {
      const compoundType = getCompoundType(r[1], CompoundTypes.object, CompoundTypes.struct);
      const optional = r[2] === '?';
      if (
        compoundType === CompoundTypes.struct
        || compoundType === CompoundTypes.object
      ) {
        return new Compound(compoundType, optional, false, r[1]);
      }
    }
    return undefined;
  }

  name: string;

  constructor(type: C);
  constructor(type: C, optional: boolean);
  constructor(type: C, optional: boolean, notEmpty: boolean);
  constructor(type: C, optional: boolean, notEmpty: boolean, name: string);
  constructor(
    type: C,
    optional: boolean = false,
    notEmpty: boolean = false,
    name: string = type.toString(),
  ) {
    super(type, optional, notEmpty);
    this.name = name;
  }

  toString() {
    if (this.type === CompoundTypes.struct) {
      return `${this.name}${this.optional ? '?' : ''}`;
    }
    return super.toString();
  }
}

class WdlArray<T extends Types>
  extends Compound<CompoundTypes.array>
  implements ICompoundTypeOf<CompoundTypes.array, IType<T>> {
  static isWdlArrayType(type: string);
  static isWdlArrayType<T extends Types>(type: T);
  static isWdlArrayType<T extends Types>(type: CommonType<T>);
  static isWdlArrayType<T extends Types>(type: T | CommonType<T> | string) {
    return isCompoundType(type, CompoundTypes.array);
  }

  static parseWdlArray(
    type: string,
  ): WdlArray<Types> | undefined {
    const r = /^\s*Array\s*\[\s*(.+)\s*](\+)?(\??)\s*$/.exec(type);
    if (r) {
      const inner = CommonType.parseType(r[1]);
      const notEmpty = r[2] === '+';
      const optional = r[3] === '?';
      if (inner) {
        return new WdlArray(inner, optional, notEmpty);
      }
    }
    return undefined;
  }

  child: IType<T>;

  constructor(inner: IType<T>);
  constructor(inner: IType<T>, optional: boolean);
  constructor(inner: IType<T>, optional: boolean, notEmpty: boolean);
  constructor(
    inner: IType<T>,
    optional: boolean = false,
    notEmpty: boolean = false,
  ) {
    super(CompoundTypes.array, optional, notEmpty);
    this.child = inner;
    this.notEmpty = notEmpty;
  }

  isSubTypeOf<P extends Types>(type: IType<P>): boolean {
    return super.isSubTypeOf(type)
      && type instanceof WdlArray
      && this.child.isSubTypeOf(type.child);
  }

  toString() {
    return `${this.type}[${this.child.toString()}]${this.notEmpty ? '+' : ''}${this.optional ? '?' : ''}`;
  }

  makeArrayItem(): IType | undefined {
    return this.child.clone();
  }
}

class WdlPair<T1 extends Types, T2 extends Types>
  extends Compound<CompoundTypes.pair>
  implements ICompoundTypeOf2<CompoundTypes.pair, IType<T1>, IType<T2>> {
  static isWdlPairType(type: string);
  static isWdlPairType<T extends Types>(type: T);
  static isWdlPairType<T extends Types>(type: CommonType<T>);
  static isWdlPairType<T extends Types>(type: T | CommonType<T> | string) {
    return isCompoundType(type, CompoundTypes.pair);
  }

  static parseWdlPair(
    type: string,
  ): WdlPair<Types, Types> | undefined {
    const r = /^Pair\s*\[\s*(.+)\s*](\??)\s*$/.exec(type);
    if (r) {
      const [p1, p2] = splitParameters(r[1]);
      const inner1 = CommonType.parseType(p1);
      const inner2 = CommonType.parseType(p2);
      const optional = r[2] === '?';
      if (inner1 && inner2) {
        return new WdlPair(inner1, inner2, optional);
      }
    }
    return undefined;
  }

  child: IType<T1>;

  child2: IType<T2>;

  notEmpty: boolean;

  constructor(inner1: IType<T1>, inner2: IType<T2>);
  constructor(inner1: IType<T1>, inner2: IType<T2>, optional: boolean);
  constructor(inner1: IType<T1>, inner2: IType<T2>, optional: boolean = false) {
    super(CompoundTypes.pair, optional);
    this.child = inner1;
    this.child2 = inner2;
  }

  isSubTypeOf<P extends Types>(type: IType<P>): boolean {
    return super.isSubTypeOf(type)
      && type instanceof WdlPair
      && this.child.isSubTypeOf(type.child)
      && this.child2.isSubTypeOf(type.child2);
  }

  toString() {
    return `${this.type}[${this.child.toString()},${this.child2.toString()}]${this.optional ? '?' : ''}`;
  }
}

class WdlMap<T1 extends PrimitiveTypes, T2 extends Types>
  extends Compound<CompoundTypes.map>
  implements ICompoundTypeOf2<CompoundTypes.map, IPrimitiveType<T1>, IType<T2>> {
  static isWdlMapType(type: string);
  static isWdlMapType<T extends Types>(type: T);
  static isWdlMapType<T extends Types>(type: CommonType<T>);
  static isWdlMapType<T extends Types>(type: T | CommonType<T> | string) {
    return isCompoundType(type, CompoundTypes.map);
  }

  static parseWdlMap(
    type: string,
  ): WdlMap<PrimitiveTypes, Types> | undefined {
    const r = /^\s*Map\s*\[\s*(.+)\s*](\??)\s*$/.exec(type);
    if (r) {
      const [p1, p2] = splitParameters(r[1]);
      const inner1 = Primitive.parsePrimitive(p1);
      const inner2 = CommonType.parseType(p2);
      const optional = r[2] === '?';
      if (inner1 && inner2) {
        return new WdlMap(inner1, inner2, optional);
      }
    }
    return undefined;
  }

  child: IPrimitiveType<T1>;

  child2: IType<T2>;

  constructor(inner1: IType<T1>, inner2: IType<T2>);
  constructor(inner1: IType<T1>, inner2: IType<T2>, optional: boolean);
  constructor(inner1: IType<T1>, inner2: IType<T2>, optional: boolean = false) {
    super(CompoundTypes.map, optional);
    this.child = inner1;
    this.child2 = inner2;
  }

  isSubTypeOf<P extends Types>(type: IType<P>): boolean {
    return super.isSubTypeOf(type)
      && type instanceof WdlMap
      && this.child.isSubTypeOf(type.child)
      && this.child2.isSubTypeOf(type.child2);
  }

  toString() {
    return `${this.type}[${this.child.toString()},${this.child2.toString()}]${this.optional ? '?' : ''}`;
  }
}

export {
  Compound,
  WdlArray,
  WdlPair,
  WdlMap,
};
