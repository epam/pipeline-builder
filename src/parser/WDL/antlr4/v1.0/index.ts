/* eslint-disable */
import Lexer from './WdlV1Lexer';
import Parser from './WdlV1Parser';
import ParserListener from './WdlV1ParserListener';
import {createParser} from '../common';
import {WdlVersion} from '../../../../model/types';

const draft3Parser = createParser(Lexer, Parser, ParserListener, WdlVersion.draft3);
const v1Parser = createParser(Lexer, Parser, ParserListener, WdlVersion.v1);

export {
  draft3Parser,
  v1Parser,
};

export default v1Parser;
