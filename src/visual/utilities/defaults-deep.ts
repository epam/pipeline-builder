/* eslint-disable @typescript-eslint/no-explicit-any */

function isObject(o: any): boolean {
  return !!o && typeof o === 'object' && !Array.isArray(o);
}

function deep<T1 extends Record<string, any>, T2 extends Record<string, any>>(
  o1: T1,
  o2: T2,
): Record<keyof (T1 | T2), any> {
  const keysA = Object.keys(o1 || {});
  const keysB = Object.keys(o2 || {});
  const keys = new Set([...keysA, ...keysB]);
  type Result = Record<keyof (T1 | T2), any>;
  const result = [...keys].reduce((r, k) => ({
    ...r,
    [k]: undefined,
  }), {});
  keys.forEach((aKey) => {
    let v1: unknown;
    let v2: unknown;
    if (Object.prototype.hasOwnProperty.call(o1, aKey)) {
      v1 = o1[aKey];
    }
    if (Object.prototype.hasOwnProperty.call(o2, aKey)) {
      v2 = o2[aKey];
    }
    if (isObject(v1) && isObject(v2)) {
      result[aKey] = deep(v1, v2);
    } else if (v1) {
      result[aKey] = v1;
    } else if (v2) {
      result[aKey] = v2;
    }
  });
  return result as Result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function defaultsDeep<T extends Record<string, any>>(
  ...object: Record<string, any>[]
): T {
  if (object.length === 0) {
    return {} as T;
  }
  if (object.length === 1) {
    return { ...(object[0] || {}) } as T;
  }
  const [o1, o2, ...rest] = object;
  return defaultsDeep(
    deep(o1, o2),
    ...rest,
  );
}
