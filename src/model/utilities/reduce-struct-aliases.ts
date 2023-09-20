import { IStructAlias } from '../types';

function pickFirstStructByAliasAsArray(alias: string, structs: IStructAlias[]): IStructAlias[] {
  const s = structs.find((o) => o.alias === alias);
  if (s) {
    return [s];
  }
  return [];
}

export default function reduceStructAliases(...structs: IStructAlias[][]): IStructAlias[] {
  const all = structs.reduce<IStructAlias[]>((r, set) => ([
    ...r,
    ...set,
  ]), []);
  return [...new Set(all.map((alias) => alias.alias))]
    .reduce<IStructAlias[]>((r, alias) => ([
    ...r,
    ...pickFirstStructByAliasAsArray(alias, all),
  ]), []);
}
