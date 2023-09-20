import {
  IParameter,
  IWdlEntity,
} from '../../model/types';

function getEntityIdentifier(entity: IWdlEntity): string | undefined;
function getEntityIdentifier(entity: IWdlEntity, postFix: string,): string | undefined;
/**
 * @param {IWdlEntity} entity
 * @param {string} [postFix]
 * @returns {string|undefined}
 */
function getEntityIdentifier(
  entity: IWdlEntity,
  postFix: string = undefined,
): string | undefined {
  if (!entity) {
    return undefined;
  }
  const p = postFix && postFix.length ? `/${postFix}` : '';
  return `${entity.uuid}${p}`;
}

const DECLARATION_BLOCK_POSTFIX = 'declarations';

/**
 * @param {Parameter} parameter
 * @returns {string}
 */
function getParameterParentIdentifier(parameter: IParameter): string | undefined {
  return getEntityIdentifier(
    parameter.parent,
    parameter.isDeclaration
      ? DECLARATION_BLOCK_POSTFIX
      : undefined,
  );
}

export {
  getEntityIdentifier,
  getParameterParentIdentifier,
  DECLARATION_BLOCK_POSTFIX,
};
