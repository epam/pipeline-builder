import { IAction, IParameter } from '../../model/types';
import { parseParameterIdentifier } from './get-parameter-identifier';

export default function getParameter(action: IAction, portId: string): IParameter | undefined {
  if (!action) {
    return undefined;
  }
  const {
    uuid,
  } = parseParameterIdentifier(portId);
  return action.getParameterByUUID(uuid);
}
