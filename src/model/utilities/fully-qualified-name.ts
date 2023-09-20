import { IWdlEntity } from '../types';

type ArrayOrItem<T> = T | T[];

function toArray<T>(o: ArrayOrItem<T>): T[] {
  return Array.isArray(o) ? o : [o];
}

function reduce<T>(o: ArrayOrItem<T>[]): T[] {
  return o.reduce<T[]>(
    (result, current) => result.concat(
      toArray(current),
    ),
    [],
  );
}

export default function getFullyQualifiedName(
  ...executionStack: (IWdlEntity | IWdlEntity[])[]
): string {
  const ref = reduce(executionStack)
    .map((e) => e.reference)
    .filter(Boolean)
    .join('.');
  if (ref.length === 0) {
    return this.reference;
  }
  return ref;
}
