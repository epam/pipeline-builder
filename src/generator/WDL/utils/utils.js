import _ from 'lodash';
import * as constants from '../constants';

export function buildDeclarations(declarations, settings) { // eslint-disable-line import/prefer-default-export
  const buildDeclarationValue = value => ` ${constants.EQ} ${value.toString()}`;

  const EOL = settings.getValue('style.eol');
  const SCOPE_INDENT = settings.getValue('style.scope_indent');

  let res = '';

  _.forEach(declarations, (decl, name) => {
    res += `${SCOPE_INDENT}${decl.type} ${name}${decl.default ? buildDeclarationValue(decl.default) : ''}${EOL}`;
  });

  return res;
}
