import { ContextTypes, IWdlEntity } from '../types';
import Import from '../import';
import WdlDocument from '../document';

/**
 * @param {WdlEntity} context
 * @param {string} identifier
 * @param {Set<ContextTypes>} types
 * @returns {boolean}
 */
function contextMatchIdentifier<T extends ContextTypes>(
  context: IWdlEntity<T>,
  identifier: string,
  types: Set<ContextTypes>,
): boolean {
  if (!context || !identifier) {
    return false;
  }
  return context.reference === identifier
    && types.has(context.contextType);
}

/**
 * @param {WdlEntity} context
 * @param {string} identifier
 * @param {Set<ContextTypes>} types
 * @returns {undefined|WdlEntity}
 */
function resolveIdentifierRecursively(
  context: IWdlEntity,
  identifier: string,
  types: Set<ContextTypes>,
): IWdlEntity | undefined {
  if (!context || !identifier) {
    return undefined;
  }
  if (contextMatchIdentifier(context, identifier, types)) {
    if (context instanceof Import && context.importedDocument) {
      return context.importedDocument;
    }
    return context;
  }
  if (
    context instanceof WdlDocument
    && types.has(ContextTypes.struct)
  ) {
    // Check structs
    const { globalStructs = [] } = context;
    for (let s = 0; s < globalStructs.length; s += 1) {
      if (identifier === globalStructs[s].alias) {
        return globalStructs[s].struct;
      }
    }
  }
  for (let c = 0; c < context.children.length; c += 1) {
    const child = context.children[c];
    const result = resolveIdentifierRecursively(child, identifier, types);
    if (result) {
      return result;
    }
  }
  return undefined;
}

/**
 * @param {WdlEntity} context
 * @param {string} identifier
 * @param {ContextTypes} type
 * @returns {undefined|WdlEntity}
 */
function resolveIdentifier(context: IWdlEntity, identifier: string, ...type: ContextTypes[]) {
  if (!context || !identifier) {
    return undefined;
  }
  const identifiers = identifier.split('.');
  let current = context;
  const types = new Set(type.length === 0 ? Object.values(ContextTypes) : type);
  const containerTypes = new Set([
    ContextTypes.import,
    ContextTypes.workflow,
    ContextTypes.task,
    ContextTypes.call,
    ContextTypes.struct,
  ]);
  for (let i = 0; i < identifiers.length; i += 1) {
    const last = i === identifiers.length - 1;
    current = resolveIdentifierRecursively(
      current,
      identifiers[i],
      last ? types : containerTypes,
    );
    if (!current) {
      return undefined;
    }
  }
  return current;
}

export default resolveIdentifier;
