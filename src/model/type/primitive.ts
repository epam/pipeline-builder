import { CommonType, IPrimitiveType } from './base';
import { PrimitiveTypes, Types } from '../types';

export function getPrimitiveType(type: string | Types): PrimitiveTypes | undefined {
  const r = /^\s*(Int|Float|Boolean|String|File)\s*\??\s*$/.exec(type);
  if (r) {
    return Object.values(PrimitiveTypes).find((t) => t.toString() === r[1]);
  }
  return undefined;
}

class Primitive<P extends PrimitiveTypes>
  extends CommonType<P> implements IPrimitiveType<P> {
  static isPrimitiveType(type: string);
  static isPrimitiveType<T extends Types>(type: T);
  static isPrimitiveType<T extends Types>(type: CommonType<T>);
  static isPrimitiveType<T extends Types>(type: T | CommonType<T> | string) {
    if (typeof type === 'string') {
      return !!getPrimitiveType(type);
    }
    return Primitive.isPrimitiveType(type.type);
  }

  static parsePrimitive(type: string): Primitive<PrimitiveTypes> | undefined {
    const r = /^\s*(Int|Boolean|Float|String|File)(\??)\s*$/.exec(type);
    if (r) {
      const primitiveType = getPrimitiveType(r[1]);
      const optional = r[2] === '?';
      if (primitiveType) {
        return new Primitive(primitiveType, optional);
      }
    }
    return undefined;
  }

  constructor(type: P);
  constructor(type: P, optional: boolean);
  constructor(type: P, optional: boolean = false) {
    super(type, optional);
  }
}

export default Primitive;
