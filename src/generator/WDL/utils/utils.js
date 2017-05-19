import _ from 'lodash';
import * as constants from '../constants';

export function escapeWDLString(src) {
  const escapes = {
    '\\\\': '\\\\',
    '\\\\0': '\\\\0',
    '\\\\n': '\\\\n',
    '\\\\r': '\\\\r',
    '\\\\b': '\\\\b',
    '\\\\t': '\\\\t',
    '\\\\f': '\\\\f',
    '\\\\a': '\\\\a',
    '\\\\v': '\\\\v',
  };

  _.forEach(escapes, (val, key) => {
    src = src.replace(new RegExp(key, 'g'), escapes[key]);
  });

  return src;
}

export function buildDeclarations(declarations, settings) { // eslint-disable-line import/prefer-default-export
  const buildDeclarationValue = value => ` ${constants.EQ} ${escapeWDLString(value.toString())}`;

  const EOL = settings.getValue('style.eol');
  const SCOPE_INDENT = settings.getValue('style.scope_indent');

  let res = '';

  _.forEach(declarations, (decl, name) => {
    if (decl.type !== 'Condition' && decl.type !== 'ScatterItem') {
      res += `${SCOPE_INDENT}${decl.type} ${name}${decl.default ? buildDeclarationValue(decl.default) : ''}${EOL}`;
    }
  });

  return `${res}${EOL}`;
}
