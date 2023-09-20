/* eslint-disable */
import Lexer from './WdlDraft2Lexer';
import Parser from './WdlDraft2Parser';
import ParserListener from './WdlDraft2ParserListener';
import { createParser } from '../common';
import {WdlVersion} from "../../../../model/types";

export default createParser(Lexer, Parser, ParserListener, WdlVersion.draft2);
