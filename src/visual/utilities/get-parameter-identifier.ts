import {
  getParameterParentIdentifier,
} from './get-entity-identifier';
import {
  IParameter,
} from '../../model/types';
import { IParameterConnection } from '../types';

/**
 * @param {Parameter} parameter
 * @returns {string}
 */
function getParameterIdentifier(parameter: IParameter): string | undefined {
  if (!parameter) {
    return undefined;
  }
  return parameter.uuid;
}

function parseParameterIdentifier(identifier: string | undefined): {
  uuid: string;
} {
  return {
    uuid: identifier,
  };
}

/**
 * @param {IParameter} parameter
 * @returns {{port: string, id: string}}
 */
function getParameterConnection(parameter: IParameter): IParameterConnection {
  return {
    id: getParameterParentIdentifier(parameter),
    port: getParameterIdentifier(parameter),
  };
}

export {
  getParameterIdentifier,
  getParameterConnection,
  parseParameterIdentifier,
};
