/* eslint-disable */
import Lexer from './WdlV1_1Lexer';
import Parser from './WdlV1_1Parser';
import ParserListener from './WdlV1_1ParserListener';
import { createParser } from '../common';
import {WdlVersion} from "../../../../model/types";

export default createParser(Lexer, Parser, ParserListener, WdlVersion.v1_1);
