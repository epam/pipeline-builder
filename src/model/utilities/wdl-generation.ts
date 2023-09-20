import {
  IAction, IWdlDocument, IWdlGenerator,
} from '../types';

function makeIdent(
  line: string,
): string {
  return `  ${line}`;
}

export function ident(...text: (string | undefined)[]): string {
  return text
    .reduce<string[]>((result, block) => ([
    ...result,
    ...(block ? block.split('\n').map((line) => makeIdent(line)) : []),
  ]), []).join('\n');
}

export type IWdlContentItem = string | IWdlGenerator | IWdlGenerator[];

function getWdlContentItemString(
  contentItem: IWdlContentItem,
  join = '\n',
): string | undefined {
  if (typeof contentItem === 'string') {
    return contentItem;
  }
  if (Array.isArray(contentItem)) {
    if (contentItem.length > 0) {
      return contentItem.map((item) => item.generateWdl()).join(join);
    }
    return undefined;
  }
  return contentItem.generateWdl();
}

export function getContent(
  entities: (IWdlContentItem | undefined)[],
  join: string = '\n',
): string | undefined {
  const processed: (string | undefined)[] = entities
    .filter((entity) => !!entity)
    .map((entity) => getWdlContentItemString(entity, join));
  const filtered = processed.filter((p) => !!p && p.length);
  if (filtered.length > 0) {
    return filtered.join(join);
  }
  return undefined;
}

export interface IWdlContentScopeOptions {
  scope: string;
  open: string;
  close: string;
  join?: string;
  allowEmpty?: boolean;
}

export type IWdlContentScope = string | IWdlContentScopeOptions;

function getScopeOptions(scope: IWdlContentScope): IWdlContentScopeOptions {
  if (typeof scope === 'string') {
    return {
      scope,
      open: '{',
      close: '}',
      join: '\n',
      allowEmpty: false,
    };
  }
  return scope;
}

export function getScopedContent(
  scope: IWdlContentScope,
  ...entities: (IWdlContentItem | undefined)[]
): string | undefined {
  const opts = getScopeOptions(scope);
  const name = opts.scope || '';
  const open = opts.open ? ' '.concat(opts.open).concat('\n') : '\n';
  const close = opts.close ? '\n'.concat(opts.close) : '';
  const join = opts.join || '\n';
  const scopeContent = getContent(entities, join);
  if (!scopeContent) {
    if (opts.allowEmpty) {
      return name;
    }
    return undefined;
  }
  return `${name}${open}${ident(scopeContent)}${close}`;
}

export function ensureString(value: string | undefined): string {
  return value || '""';
}

export function generate(
  entity: IWdlDocument,
): string | never;
export function generate(
  entity: IAction,
): string | never;
export function generate(
  entity: IWdlDocument,
  throwError: boolean,
): string | never;
export function generate(
  entity: IAction,
  throwError: boolean,
): string | never;
export function generate(
  entity: IWdlDocument | IAction,
  throwError: boolean,
): string | never;
export function generate(
  entity: IWdlDocument | IAction,
  throwError: boolean = true,
): string | never {
  try {
    if (entity.validate(throwError)) {
      return entity.generateWdl();
    }
  } catch (error) {
    if (throwError) {
      throw error;
    }
  }
  return undefined;
}
