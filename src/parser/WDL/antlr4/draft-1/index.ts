/* eslint-disable */
import Lexer from './WdlDraft1Lexer';
import Parser from './WdlDraft1Parser';
import ParserListener from './WdlDraft1ParserListener';
import { createParser } from '../common';
import {WdlVersion} from '../../../../model/types';

export default createParser(Lexer, Parser, ParserListener, WdlVersion.draft1);
