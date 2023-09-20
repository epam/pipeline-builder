// Generated from ./ExpressionParser.g4 by ANTLR 4.13.0
// jshint ignore: start
import antlr4 from 'antlr4';
import ExpressionParserListener from './ExpressionParserListener.js';
const serializedATN = [4,1,47,338,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,
2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,1,0,1,0,1,1,1,1,1,1,1,
1,1,1,1,1,3,1,45,8,1,1,1,1,1,3,1,49,8,1,1,2,5,2,52,8,2,10,2,12,2,55,9,2,
1,3,1,3,5,3,59,8,3,10,3,12,3,62,9,3,1,3,1,3,1,3,1,4,1,4,1,4,1,5,1,5,1,5,
5,5,73,8,5,10,5,12,5,76,9,5,1,5,1,5,1,5,1,5,1,5,5,5,83,8,5,10,5,12,5,86,
9,5,1,5,1,5,3,5,90,8,5,1,6,1,6,1,6,1,6,1,6,3,6,97,8,6,1,7,1,7,1,8,1,8,1,
9,1,9,1,9,1,9,1,9,1,9,5,9,109,8,9,10,9,12,9,112,9,9,1,10,1,10,1,10,1,10,
1,10,1,10,5,10,120,8,10,10,10,12,10,123,9,10,1,11,1,11,1,11,1,11,1,11,1,
11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,
1,11,5,11,146,8,11,10,11,12,11,149,9,11,1,12,1,12,1,12,1,12,1,12,1,12,1,
12,1,12,1,12,5,12,160,8,12,10,12,12,12,163,9,12,1,13,1,13,1,13,1,13,1,13,
1,13,1,13,1,13,1,13,1,13,1,13,1,13,5,13,177,8,13,10,13,12,13,180,9,13,1,
14,1,14,1,15,1,15,1,16,1,16,1,16,1,16,1,16,1,16,5,16,192,8,16,10,16,12,16,
195,9,16,1,16,3,16,198,8,16,3,16,200,8,16,1,16,1,16,1,16,1,16,1,16,5,16,
207,8,16,10,16,12,16,210,9,16,1,16,3,16,213,8,16,5,16,215,8,16,10,16,12,
16,218,9,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,
1,16,1,16,1,16,1,16,5,16,236,8,16,10,16,12,16,239,9,16,1,16,3,16,242,8,16,
5,16,244,8,16,10,16,12,16,247,9,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,
16,1,16,1,16,1,16,5,16,260,8,16,10,16,12,16,263,9,16,1,16,3,16,266,8,16,
5,16,268,8,16,10,16,12,16,271,9,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,
16,1,16,1,16,1,16,5,16,284,8,16,10,16,12,16,287,9,16,1,16,3,16,290,8,16,
5,16,292,8,16,10,16,12,16,295,9,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,
16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,1,16,3,16,315,8,16,1,16,
1,16,1,16,1,16,1,16,1,16,1,16,1,16,5,16,325,8,16,10,16,12,16,328,9,16,1,
17,5,17,331,8,17,10,17,12,17,334,9,17,1,17,1,17,1,17,0,6,18,20,22,24,26,
32,18,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,0,2,1,0,8,9,1,0,29,
30,373,0,36,1,0,0,0,2,48,1,0,0,0,4,53,1,0,0,0,6,56,1,0,0,0,8,66,1,0,0,0,
10,89,1,0,0,0,12,96,1,0,0,0,14,98,1,0,0,0,16,100,1,0,0,0,18,102,1,0,0,0,
20,113,1,0,0,0,22,124,1,0,0,0,24,150,1,0,0,0,26,164,1,0,0,0,28,181,1,0,0,
0,30,183,1,0,0,0,32,314,1,0,0,0,34,332,1,0,0,0,36,37,7,0,0,0,37,1,1,0,0,
0,38,39,5,10,0,0,39,40,5,24,0,0,40,49,3,10,5,0,41,44,5,6,0,0,42,45,3,10,
5,0,43,45,3,0,0,0,44,42,1,0,0,0,44,43,1,0,0,0,45,49,1,0,0,0,46,47,5,5,0,
0,47,49,3,10,5,0,48,38,1,0,0,0,48,41,1,0,0,0,48,46,1,0,0,0,49,3,1,0,0,0,
50,52,5,43,0,0,51,50,1,0,0,0,52,55,1,0,0,0,53,51,1,0,0,0,53,54,1,0,0,0,54,
5,1,0,0,0,55,53,1,0,0,0,56,60,5,45,0,0,57,59,3,2,1,0,58,57,1,0,0,0,59,62,
1,0,0,0,60,58,1,0,0,0,60,61,1,0,0,0,61,63,1,0,0,0,62,60,1,0,0,0,63,64,3,
14,7,0,64,65,5,14,0,0,65,7,1,0,0,0,66,67,3,6,3,0,67,68,3,4,2,0,68,9,1,0,
0,0,69,70,5,40,0,0,70,74,3,4,2,0,71,73,3,8,4,0,72,71,1,0,0,0,73,76,1,0,0,
0,74,72,1,0,0,0,74,75,1,0,0,0,75,77,1,0,0,0,76,74,1,0,0,0,77,78,5,40,0,0,
78,90,1,0,0,0,79,80,5,39,0,0,80,84,3,4,2,0,81,83,3,8,4,0,82,81,1,0,0,0,83,
86,1,0,0,0,84,82,1,0,0,0,84,85,1,0,0,0,85,87,1,0,0,0,86,84,1,0,0,0,87,88,
5,39,0,0,88,90,1,0,0,0,89,69,1,0,0,0,89,79,1,0,0,0,90,11,1,0,0,0,91,97,5,
10,0,0,92,97,3,0,0,0,93,97,3,10,5,0,94,97,5,7,0,0,95,97,5,42,0,0,96,91,1,
0,0,0,96,92,1,0,0,0,96,93,1,0,0,0,96,94,1,0,0,0,96,95,1,0,0,0,97,13,1,0,
0,0,98,99,3,16,8,0,99,15,1,0,0,0,100,101,3,18,9,0,101,17,1,0,0,0,102,103,
6,9,-1,0,103,104,3,20,10,0,104,110,1,0,0,0,105,106,10,2,0,0,106,107,5,26,
0,0,107,109,3,20,10,0,108,105,1,0,0,0,109,112,1,0,0,0,110,108,1,0,0,0,110,
111,1,0,0,0,111,19,1,0,0,0,112,110,1,0,0,0,113,114,6,10,-1,0,114,115,3,22,
11,0,115,121,1,0,0,0,116,117,10,2,0,0,117,118,5,25,0,0,118,120,3,22,11,0,
119,116,1,0,0,0,120,123,1,0,0,0,121,119,1,0,0,0,121,122,1,0,0,0,122,21,1,
0,0,0,123,121,1,0,0,0,124,125,6,11,-1,0,125,126,3,24,12,0,126,147,1,0,0,
0,127,128,10,7,0,0,128,129,5,22,0,0,129,146,3,24,12,0,130,131,10,6,0,0,131,
132,5,23,0,0,132,146,3,24,12,0,133,134,10,5,0,0,134,135,5,21,0,0,135,146,
3,24,12,0,136,137,10,4,0,0,137,138,5,20,0,0,138,146,3,24,12,0,139,140,10,
3,0,0,140,141,5,18,0,0,141,146,3,24,12,0,142,143,10,2,0,0,143,144,5,19,0,
0,144,146,3,24,12,0,145,127,1,0,0,0,145,130,1,0,0,0,145,133,1,0,0,0,145,
136,1,0,0,0,145,139,1,0,0,0,145,142,1,0,0,0,146,149,1,0,0,0,147,145,1,0,
0,0,147,148,1,0,0,0,148,23,1,0,0,0,149,147,1,0,0,0,150,151,6,12,-1,0,151,
152,3,26,13,0,152,161,1,0,0,0,153,154,10,3,0,0,154,155,5,29,0,0,155,160,
3,26,13,0,156,157,10,2,0,0,157,158,5,30,0,0,158,160,3,26,13,0,159,153,1,
0,0,0,159,156,1,0,0,0,160,163,1,0,0,0,161,159,1,0,0,0,161,162,1,0,0,0,162,
25,1,0,0,0,163,161,1,0,0,0,164,165,6,13,-1,0,165,166,3,28,14,0,166,178,1,
0,0,0,167,168,10,4,0,0,168,169,5,28,0,0,169,177,3,28,14,0,170,171,10,3,0,
0,171,172,5,37,0,0,172,177,3,28,14,0,173,174,10,2,0,0,174,175,5,38,0,0,175,
177,3,28,14,0,176,167,1,0,0,0,176,170,1,0,0,0,176,173,1,0,0,0,177,180,1,
0,0,0,178,176,1,0,0,0,178,179,1,0,0,0,179,27,1,0,0,0,180,178,1,0,0,0,181,
182,3,32,16,0,182,29,1,0,0,0,183,184,5,42,0,0,184,31,1,0,0,0,185,186,6,16,
-1,0,186,187,5,42,0,0,187,199,5,11,0,0,188,193,3,14,7,0,189,190,5,32,0,0,
190,192,3,14,7,0,191,189,1,0,0,0,192,195,1,0,0,0,193,191,1,0,0,0,193,194,
1,0,0,0,194,197,1,0,0,0,195,193,1,0,0,0,196,198,5,32,0,0,197,196,1,0,0,0,
197,198,1,0,0,0,198,200,1,0,0,0,199,188,1,0,0,0,199,200,1,0,0,0,200,201,
1,0,0,0,201,315,5,12,0,0,202,216,5,15,0,0,203,208,3,14,7,0,204,205,5,32,
0,0,205,207,3,14,7,0,206,204,1,0,0,0,207,210,1,0,0,0,208,206,1,0,0,0,208,
209,1,0,0,0,209,212,1,0,0,0,210,208,1,0,0,0,211,213,5,32,0,0,212,211,1,0,
0,0,212,213,1,0,0,0,213,215,1,0,0,0,214,203,1,0,0,0,215,218,1,0,0,0,216,
214,1,0,0,0,216,217,1,0,0,0,217,219,1,0,0,0,218,216,1,0,0,0,219,315,5,16,
0,0,220,221,5,11,0,0,221,222,3,14,7,0,222,223,5,32,0,0,223,224,3,14,7,0,
224,225,5,12,0,0,225,315,1,0,0,0,226,245,5,13,0,0,227,228,3,14,7,0,228,229,
5,17,0,0,229,237,3,14,7,0,230,231,5,32,0,0,231,232,3,14,7,0,232,233,5,17,
0,0,233,234,3,14,7,0,234,236,1,0,0,0,235,230,1,0,0,0,236,239,1,0,0,0,237,
235,1,0,0,0,237,238,1,0,0,0,238,241,1,0,0,0,239,237,1,0,0,0,240,242,5,32,
0,0,241,240,1,0,0,0,241,242,1,0,0,0,242,244,1,0,0,0,243,227,1,0,0,0,244,
247,1,0,0,0,245,243,1,0,0,0,245,246,1,0,0,0,246,248,1,0,0,0,247,245,1,0,
0,0,248,315,5,14,0,0,249,250,5,4,0,0,250,269,5,13,0,0,251,252,3,30,15,0,
252,253,5,17,0,0,253,261,3,14,7,0,254,255,5,32,0,0,255,256,3,30,15,0,256,
257,5,17,0,0,257,258,3,14,7,0,258,260,1,0,0,0,259,254,1,0,0,0,260,263,1,
0,0,0,261,259,1,0,0,0,261,262,1,0,0,0,262,265,1,0,0,0,263,261,1,0,0,0,264,
266,5,32,0,0,265,264,1,0,0,0,265,266,1,0,0,0,266,268,1,0,0,0,267,251,1,0,
0,0,268,271,1,0,0,0,269,267,1,0,0,0,269,270,1,0,0,0,270,272,1,0,0,0,271,
269,1,0,0,0,272,315,5,14,0,0,273,274,5,42,0,0,274,293,5,13,0,0,275,276,3,
30,15,0,276,277,5,17,0,0,277,285,3,14,7,0,278,279,5,32,0,0,279,280,3,30,
15,0,280,281,5,17,0,0,281,282,3,14,7,0,282,284,1,0,0,0,283,278,1,0,0,0,284,
287,1,0,0,0,285,283,1,0,0,0,285,286,1,0,0,0,286,289,1,0,0,0,287,285,1,0,
0,0,288,290,5,32,0,0,289,288,1,0,0,0,289,290,1,0,0,0,290,292,1,0,0,0,291,
275,1,0,0,0,292,295,1,0,0,0,293,291,1,0,0,0,293,294,1,0,0,0,294,296,1,0,
0,0,295,293,1,0,0,0,296,315,5,14,0,0,297,298,5,1,0,0,298,299,3,14,7,0,299,
300,5,2,0,0,300,301,3,14,7,0,301,302,5,3,0,0,302,303,3,14,7,0,303,315,1,
0,0,0,304,305,5,11,0,0,305,306,3,14,7,0,306,307,5,12,0,0,307,315,1,0,0,0,
308,309,5,35,0,0,309,315,3,14,7,0,310,311,7,1,0,0,311,315,3,14,7,0,312,315,
3,12,6,0,313,315,5,42,0,0,314,185,1,0,0,0,314,202,1,0,0,0,314,220,1,0,0,
0,314,226,1,0,0,0,314,249,1,0,0,0,314,273,1,0,0,0,314,297,1,0,0,0,314,304,
1,0,0,0,314,308,1,0,0,0,314,310,1,0,0,0,314,312,1,0,0,0,314,313,1,0,0,0,
315,326,1,0,0,0,316,317,10,6,0,0,317,318,5,15,0,0,318,319,3,14,7,0,319,320,
5,16,0,0,320,325,1,0,0,0,321,322,10,5,0,0,322,323,5,34,0,0,323,325,5,42,
0,0,324,316,1,0,0,0,324,321,1,0,0,0,325,328,1,0,0,0,326,324,1,0,0,0,326,
327,1,0,0,0,327,33,1,0,0,0,328,326,1,0,0,0,329,331,3,14,7,0,330,329,1,0,
0,0,331,334,1,0,0,0,332,330,1,0,0,0,332,333,1,0,0,0,333,335,1,0,0,0,334,
332,1,0,0,0,335,336,5,0,0,1,336,35,1,0,0,0,35,44,48,53,60,74,84,89,96,110,
121,145,147,159,161,176,178,193,197,199,208,212,216,237,241,245,261,265,
269,285,289,293,314,324,326,332];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class ExpressionParser extends antlr4.Parser {

    static grammarFileName = "ExpressionParser.g4";
    static literalNames = [ null, "'if'", "'then'", "'else'", "'object'", 
                            "'sep='", "'default='", "'None'", null, null, 
                            null, "'('", "')'", null, null, "'['", "']'", 
                            "':'", "'<'", "'>'", "'>='", "'<='", "'=='", 
                            "'!='", "'='", "'&&'", "'||'", "'?'", "'*'", 
                            "'+'", "'-'", null, "','", "';'", "'.'", "'!'", 
                            null, "'/'", "'%'" ];
    static symbolicNames = [ null, "IF", "THEN", "ELSE", "OBJECTLITERAL", 
                             "SEPEQUAL", "DEFAULTEQUAL", "NONELITERAL", 
                             "IntLiteral", "FloatLiteral", "BoolLiteral", 
                             "LPAREN", "RPAREN", "LBRACE", "RBRACE", "LBRACK", 
                             "RBRACK", "COLON", "LT", "GT", "GTE", "LTE", 
                             "EQUALITY", "NOTEQUAL", "EQUAL", "AND", "OR", 
                             "OPTIONAL", "STAR", "PLUS", "MINUS", "DOLLAR", 
                             "COMMA", "SEMI", "DOT", "NOT", "TILDE", "DIVIDE", 
                             "MOD", "SQUOTE", "DQUOTE", "WHITESPACE", "Identifier", 
                             "StringPart", "CommandUnicodeEscape", "StringCommandStart", 
                             "EndCommand", "CommandStringPart" ];
    static ruleNames = [ "number", "expression_placeholder_option", "string_part", 
                         "string_expr_part", "string_expr_with_string_part", 
                         "string", "primitive_literal", "expr", "expr_infix", 
                         "expr_infix0", "expr_infix1", "expr_infix2", "expr_infix3", 
                         "expr_infix4", "expr_infix5", "member", "expression", 
                         "document" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = ExpressionParser.ruleNames;
        this.literalNames = ExpressionParser.literalNames;
        this.symbolicNames = ExpressionParser.symbolicNames;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 9:
    	    		return this.expr_infix0_sempred(localctx, predIndex);
    	case 10:
    	    		return this.expr_infix1_sempred(localctx, predIndex);
    	case 11:
    	    		return this.expr_infix2_sempred(localctx, predIndex);
    	case 12:
    	    		return this.expr_infix3_sempred(localctx, predIndex);
    	case 13:
    	    		return this.expr_infix4_sempred(localctx, predIndex);
    	case 16:
    	    		return this.expression_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    expr_infix0_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 2);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };

    expr_infix1_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 1:
    			return this.precpred(this._ctx, 2);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };

    expr_infix2_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 2:
    			return this.precpred(this._ctx, 7);
    		case 3:
    			return this.precpred(this._ctx, 6);
    		case 4:
    			return this.precpred(this._ctx, 5);
    		case 5:
    			return this.precpred(this._ctx, 4);
    		case 6:
    			return this.precpred(this._ctx, 3);
    		case 7:
    			return this.precpred(this._ctx, 2);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };

    expr_infix3_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 8:
    			return this.precpred(this._ctx, 3);
    		case 9:
    			return this.precpred(this._ctx, 2);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };

    expr_infix4_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 10:
    			return this.precpred(this._ctx, 4);
    		case 11:
    			return this.precpred(this._ctx, 3);
    		case 12:
    			return this.precpred(this._ctx, 2);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };

    expression_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 13:
    			return this.precpred(this._ctx, 6);
    		case 14:
    			return this.precpred(this._ctx, 5);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	number() {
	    let localctx = new NumberContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, ExpressionParser.RULE_number);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 36;
	        _la = this._input.LA(1);
	        if(!(_la===8 || _la===9)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	expression_placeholder_option() {
	    let localctx = new Expression_placeholder_optionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, ExpressionParser.RULE_expression_placeholder_option);
	    try {
	        this.state = 48;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 10:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 38;
	            this.match(ExpressionParser.BoolLiteral);
	            this.state = 39;
	            this.match(ExpressionParser.EQUAL);
	            this.state = 40;
	            this.string();
	            break;
	        case 6:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 41;
	            this.match(ExpressionParser.DEFAULTEQUAL);
	            this.state = 44;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case 39:
	            case 40:
	                this.state = 42;
	                this.string();
	                break;
	            case 8:
	            case 9:
	                this.state = 43;
	                this.number();
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            break;
	        case 5:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 46;
	            this.match(ExpressionParser.SEPEQUAL);
	            this.state = 47;
	            this.string();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	string_part() {
	    let localctx = new String_partContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, ExpressionParser.RULE_string_part);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 53;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===43) {
	            this.state = 50;
	            this.match(ExpressionParser.StringPart);
	            this.state = 55;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	string_expr_part() {
	    let localctx = new String_expr_partContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, ExpressionParser.RULE_string_expr_part);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 56;
	        this.match(ExpressionParser.StringCommandStart);
	        this.state = 60;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,3,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 57;
	                this.expression_placeholder_option(); 
	            }
	            this.state = 62;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,3,this._ctx);
	        }

	        this.state = 63;
	        this.expr();
	        this.state = 64;
	        this.match(ExpressionParser.RBRACE);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	string_expr_with_string_part() {
	    let localctx = new String_expr_with_string_partContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, ExpressionParser.RULE_string_expr_with_string_part);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 66;
	        this.string_expr_part();
	        this.state = 67;
	        this.string_part();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	string() {
	    let localctx = new StringContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, ExpressionParser.RULE_string);
	    var _la = 0;
	    try {
	        this.state = 89;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 40:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 69;
	            this.match(ExpressionParser.DQUOTE);
	            this.state = 70;
	            this.string_part();
	            this.state = 74;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===45) {
	                this.state = 71;
	                this.string_expr_with_string_part();
	                this.state = 76;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 77;
	            this.match(ExpressionParser.DQUOTE);
	            break;
	        case 39:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 79;
	            this.match(ExpressionParser.SQUOTE);
	            this.state = 80;
	            this.string_part();
	            this.state = 84;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===45) {
	                this.state = 81;
	                this.string_expr_with_string_part();
	                this.state = 86;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 87;
	            this.match(ExpressionParser.SQUOTE);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	primitive_literal() {
	    let localctx = new Primitive_literalContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, ExpressionParser.RULE_primitive_literal);
	    try {
	        this.state = 96;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 10:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 91;
	            this.match(ExpressionParser.BoolLiteral);
	            break;
	        case 8:
	        case 9:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 92;
	            this.number();
	            break;
	        case 39:
	        case 40:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 93;
	            this.string();
	            break;
	        case 7:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 94;
	            this.match(ExpressionParser.NONELITERAL);
	            break;
	        case 42:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 95;
	            this.match(ExpressionParser.Identifier);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	expr() {
	    let localctx = new ExprContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, ExpressionParser.RULE_expr);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 98;
	        this.expr_infix();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	expr_infix() {
	    let localctx = new Expr_infixContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, ExpressionParser.RULE_expr_infix);
	    try {
	        localctx = new Infix0Context(this, localctx);
	        this.enterOuterAlt(localctx, 1);
	        this.state = 100;
	        this.expr_infix0(0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


	expr_infix0(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new Expr_infix0Context(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 18;
	    this.enterRecursionRule(localctx, 18, ExpressionParser.RULE_expr_infix0, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        localctx = new Infix1Context(this, localctx);
	        this._ctx = localctx;
	        _prevctx = localctx;

	        this.state = 103;
	        this.expr_infix1(0);
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 110;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,8,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                localctx = new LorContext(this, new Expr_infix0Context(this, _parentctx, _parentState));
	                this.pushNewRecursionContext(localctx, _startState, ExpressionParser.RULE_expr_infix0);
	                this.state = 105;
	                if (!( this.precpred(this._ctx, 2))) {
	                    throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                }
	                this.state = 106;
	                this.match(ExpressionParser.OR);
	                this.state = 107;
	                this.expr_infix1(0); 
	            }
	            this.state = 112;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,8,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}


	expr_infix1(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new Expr_infix1Context(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 20;
	    this.enterRecursionRule(localctx, 20, ExpressionParser.RULE_expr_infix1, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        localctx = new Infix2Context(this, localctx);
	        this._ctx = localctx;
	        _prevctx = localctx;

	        this.state = 114;
	        this.expr_infix2(0);
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 121;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,9,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                localctx = new LandContext(this, new Expr_infix1Context(this, _parentctx, _parentState));
	                this.pushNewRecursionContext(localctx, _startState, ExpressionParser.RULE_expr_infix1);
	                this.state = 116;
	                if (!( this.precpred(this._ctx, 2))) {
	                    throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                }
	                this.state = 117;
	                this.match(ExpressionParser.AND);
	                this.state = 118;
	                this.expr_infix2(0); 
	            }
	            this.state = 123;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,9,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}


	expr_infix2(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new Expr_infix2Context(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 22;
	    this.enterRecursionRule(localctx, 22, ExpressionParser.RULE_expr_infix2, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        localctx = new Infix3Context(this, localctx);
	        this._ctx = localctx;
	        _prevctx = localctx;

	        this.state = 125;
	        this.expr_infix3(0);
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 147;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,11,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 145;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,10,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new EqeqContext(this, new Expr_infix2Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, ExpressionParser.RULE_expr_infix2);
	                    this.state = 127;
	                    if (!( this.precpred(this._ctx, 7))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                    }
	                    this.state = 128;
	                    this.match(ExpressionParser.EQUALITY);
	                    this.state = 129;
	                    this.expr_infix3(0);
	                    break;

	                case 2:
	                    localctx = new NeqContext(this, new Expr_infix2Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, ExpressionParser.RULE_expr_infix2);
	                    this.state = 130;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 131;
	                    this.match(ExpressionParser.NOTEQUAL);
	                    this.state = 132;
	                    this.expr_infix3(0);
	                    break;

	                case 3:
	                    localctx = new LteContext(this, new Expr_infix2Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, ExpressionParser.RULE_expr_infix2);
	                    this.state = 133;
	                    if (!( this.precpred(this._ctx, 5))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
	                    }
	                    this.state = 134;
	                    this.match(ExpressionParser.LTE);
	                    this.state = 135;
	                    this.expr_infix3(0);
	                    break;

	                case 4:
	                    localctx = new GteContext(this, new Expr_infix2Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, ExpressionParser.RULE_expr_infix2);
	                    this.state = 136;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 137;
	                    this.match(ExpressionParser.GTE);
	                    this.state = 138;
	                    this.expr_infix3(0);
	                    break;

	                case 5:
	                    localctx = new LtContext(this, new Expr_infix2Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, ExpressionParser.RULE_expr_infix2);
	                    this.state = 139;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 140;
	                    this.match(ExpressionParser.LT);
	                    this.state = 141;
	                    this.expr_infix3(0);
	                    break;

	                case 6:
	                    localctx = new GtContext(this, new Expr_infix2Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, ExpressionParser.RULE_expr_infix2);
	                    this.state = 142;
	                    if (!( this.precpred(this._ctx, 2))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                    }
	                    this.state = 143;
	                    this.match(ExpressionParser.GT);
	                    this.state = 144;
	                    this.expr_infix3(0);
	                    break;

	                } 
	            }
	            this.state = 149;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,11,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}


	expr_infix3(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new Expr_infix3Context(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 24;
	    this.enterRecursionRule(localctx, 24, ExpressionParser.RULE_expr_infix3, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        localctx = new Infix4Context(this, localctx);
	        this._ctx = localctx;
	        _prevctx = localctx;

	        this.state = 151;
	        this.expr_infix4(0);
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 161;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,13,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 159;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,12,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new AddContext(this, new Expr_infix3Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, ExpressionParser.RULE_expr_infix3);
	                    this.state = 153;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 154;
	                    this.match(ExpressionParser.PLUS);
	                    this.state = 155;
	                    this.expr_infix4(0);
	                    break;

	                case 2:
	                    localctx = new SubContext(this, new Expr_infix3Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, ExpressionParser.RULE_expr_infix3);
	                    this.state = 156;
	                    if (!( this.precpred(this._ctx, 2))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                    }
	                    this.state = 157;
	                    this.match(ExpressionParser.MINUS);
	                    this.state = 158;
	                    this.expr_infix4(0);
	                    break;

	                } 
	            }
	            this.state = 163;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,13,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}


	expr_infix4(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new Expr_infix4Context(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 26;
	    this.enterRecursionRule(localctx, 26, ExpressionParser.RULE_expr_infix4, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        localctx = new Infix5Context(this, localctx);
	        this._ctx = localctx;
	        _prevctx = localctx;

	        this.state = 165;
	        this.expr_infix5();
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 178;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,15,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 176;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,14,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new MulContext(this, new Expr_infix4Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, ExpressionParser.RULE_expr_infix4);
	                    this.state = 167;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 168;
	                    this.match(ExpressionParser.STAR);
	                    this.state = 169;
	                    this.expr_infix5();
	                    break;

	                case 2:
	                    localctx = new DivideContext(this, new Expr_infix4Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, ExpressionParser.RULE_expr_infix4);
	                    this.state = 170;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 171;
	                    this.match(ExpressionParser.DIVIDE);
	                    this.state = 172;
	                    this.expr_infix5();
	                    break;

	                case 3:
	                    localctx = new ModContext(this, new Expr_infix4Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, ExpressionParser.RULE_expr_infix4);
	                    this.state = 173;
	                    if (!( this.precpred(this._ctx, 2))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                    }
	                    this.state = 174;
	                    this.match(ExpressionParser.MOD);
	                    this.state = 175;
	                    this.expr_infix5();
	                    break;

	                } 
	            }
	            this.state = 180;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,15,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}



	expr_infix5() {
	    let localctx = new Expr_infix5Context(this, this._ctx, this.state);
	    this.enterRule(localctx, 28, ExpressionParser.RULE_expr_infix5);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 181;
	        this.expression(0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	member() {
	    let localctx = new MemberContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 30, ExpressionParser.RULE_member);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 183;
	        this.match(ExpressionParser.Identifier);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


	expression(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new ExpressionContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 32;
	    this.enterRecursionRule(localctx, 32, ExpressionParser.RULE_expression, _p);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 314;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,31,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new ApplyContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 186;
	            this.match(ExpressionParser.Identifier);
	            this.state = 187;
	            this.match(ExpressionParser.LPAREN);
	            this.state = 199;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if((((_la) & ~0x1f) === 0 && ((1 << _la) & 1610657682) !== 0) || ((((_la - 35)) & ~0x1f) === 0 && ((1 << (_la - 35)) & 177) !== 0)) {
	                this.state = 188;
	                this.expr();
	                this.state = 193;
	                this._errHandler.sync(this);
	                var _alt = this._interp.adaptivePredict(this._input,16,this._ctx)
	                while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	                    if(_alt===1) {
	                        this.state = 189;
	                        this.match(ExpressionParser.COMMA);
	                        this.state = 190;
	                        this.expr(); 
	                    }
	                    this.state = 195;
	                    this._errHandler.sync(this);
	                    _alt = this._interp.adaptivePredict(this._input,16,this._ctx);
	                }

	                this.state = 197;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===32) {
	                    this.state = 196;
	                    this.match(ExpressionParser.COMMA);
	                }

	            }

	            this.state = 201;
	            this.match(ExpressionParser.RPAREN);
	            break;

	        case 2:
	            localctx = new Array_literalContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 202;
	            this.match(ExpressionParser.LBRACK);
	            this.state = 216;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while((((_la) & ~0x1f) === 0 && ((1 << _la) & 1610657682) !== 0) || ((((_la - 35)) & ~0x1f) === 0 && ((1 << (_la - 35)) & 177) !== 0)) {
	                this.state = 203;
	                this.expr();
	                this.state = 208;
	                this._errHandler.sync(this);
	                var _alt = this._interp.adaptivePredict(this._input,19,this._ctx)
	                while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	                    if(_alt===1) {
	                        this.state = 204;
	                        this.match(ExpressionParser.COMMA);
	                        this.state = 205;
	                        this.expr(); 
	                    }
	                    this.state = 210;
	                    this._errHandler.sync(this);
	                    _alt = this._interp.adaptivePredict(this._input,19,this._ctx);
	                }

	                this.state = 212;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===32) {
	                    this.state = 211;
	                    this.match(ExpressionParser.COMMA);
	                }

	                this.state = 218;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 219;
	            this.match(ExpressionParser.RBRACK);
	            break;

	        case 3:
	            localctx = new Pair_literalContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 220;
	            this.match(ExpressionParser.LPAREN);
	            this.state = 221;
	            this.expr();
	            this.state = 222;
	            this.match(ExpressionParser.COMMA);
	            this.state = 223;
	            this.expr();
	            this.state = 224;
	            this.match(ExpressionParser.RPAREN);
	            break;

	        case 4:
	            localctx = new Map_literalContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 226;
	            this.match(ExpressionParser.LBRACE);
	            this.state = 245;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while((((_la) & ~0x1f) === 0 && ((1 << _la) & 1610657682) !== 0) || ((((_la - 35)) & ~0x1f) === 0 && ((1 << (_la - 35)) & 177) !== 0)) {
	                this.state = 227;
	                this.expr();
	                this.state = 228;
	                this.match(ExpressionParser.COLON);
	                this.state = 229;
	                this.expr();
	                this.state = 237;
	                this._errHandler.sync(this);
	                var _alt = this._interp.adaptivePredict(this._input,22,this._ctx)
	                while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	                    if(_alt===1) {
	                        this.state = 230;
	                        this.match(ExpressionParser.COMMA);
	                        this.state = 231;
	                        this.expr();
	                        this.state = 232;
	                        this.match(ExpressionParser.COLON);
	                        this.state = 233;
	                        this.expr(); 
	                    }
	                    this.state = 239;
	                    this._errHandler.sync(this);
	                    _alt = this._interp.adaptivePredict(this._input,22,this._ctx);
	                }

	                this.state = 241;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===32) {
	                    this.state = 240;
	                    this.match(ExpressionParser.COMMA);
	                }

	                this.state = 247;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 248;
	            this.match(ExpressionParser.RBRACE);
	            break;

	        case 5:
	            localctx = new Object_literalContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 249;
	            this.match(ExpressionParser.OBJECTLITERAL);
	            this.state = 250;
	            this.match(ExpressionParser.LBRACE);
	            this.state = 269;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===42) {
	                this.state = 251;
	                this.member();
	                this.state = 252;
	                this.match(ExpressionParser.COLON);
	                this.state = 253;
	                this.expr();
	                this.state = 261;
	                this._errHandler.sync(this);
	                var _alt = this._interp.adaptivePredict(this._input,25,this._ctx)
	                while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	                    if(_alt===1) {
	                        this.state = 254;
	                        this.match(ExpressionParser.COMMA);
	                        this.state = 255;
	                        this.member();
	                        this.state = 256;
	                        this.match(ExpressionParser.COLON);
	                        this.state = 257;
	                        this.expr(); 
	                    }
	                    this.state = 263;
	                    this._errHandler.sync(this);
	                    _alt = this._interp.adaptivePredict(this._input,25,this._ctx);
	                }

	                this.state = 265;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===32) {
	                    this.state = 264;
	                    this.match(ExpressionParser.COMMA);
	                }

	                this.state = 271;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 272;
	            this.match(ExpressionParser.RBRACE);
	            break;

	        case 6:
	            localctx = new Struct_literalContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 273;
	            this.match(ExpressionParser.Identifier);
	            this.state = 274;
	            this.match(ExpressionParser.LBRACE);
	            this.state = 293;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===42) {
	                this.state = 275;
	                this.member();
	                this.state = 276;
	                this.match(ExpressionParser.COLON);
	                this.state = 277;
	                this.expr();
	                this.state = 285;
	                this._errHandler.sync(this);
	                var _alt = this._interp.adaptivePredict(this._input,28,this._ctx)
	                while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	                    if(_alt===1) {
	                        this.state = 278;
	                        this.match(ExpressionParser.COMMA);
	                        this.state = 279;
	                        this.member();
	                        this.state = 280;
	                        this.match(ExpressionParser.COLON);
	                        this.state = 281;
	                        this.expr(); 
	                    }
	                    this.state = 287;
	                    this._errHandler.sync(this);
	                    _alt = this._interp.adaptivePredict(this._input,28,this._ctx);
	                }

	                this.state = 289;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===32) {
	                    this.state = 288;
	                    this.match(ExpressionParser.COMMA);
	                }

	                this.state = 295;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 296;
	            this.match(ExpressionParser.RBRACE);
	            break;

	        case 7:
	            localctx = new IfthenelseContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 297;
	            this.match(ExpressionParser.IF);
	            this.state = 298;
	            this.expr();
	            this.state = 299;
	            this.match(ExpressionParser.THEN);
	            this.state = 300;
	            this.expr();
	            this.state = 301;
	            this.match(ExpressionParser.ELSE);
	            this.state = 302;
	            this.expr();
	            break;

	        case 8:
	            localctx = new Expression_groupContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 304;
	            this.match(ExpressionParser.LPAREN);
	            this.state = 305;
	            this.expr();
	            this.state = 306;
	            this.match(ExpressionParser.RPAREN);
	            break;

	        case 9:
	            localctx = new NegateContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 308;
	            this.match(ExpressionParser.NOT);
	            this.state = 309;
	            this.expr();
	            break;

	        case 10:
	            localctx = new UnarysignedContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 310;
	            _la = this._input.LA(1);
	            if(!(_la===29 || _la===30)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 311;
	            this.expr();
	            break;

	        case 11:
	            localctx = new PrimitivesContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 312;
	            this.primitive_literal();
	            break;

	        case 12:
	            localctx = new Left_nameContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 313;
	            this.match(ExpressionParser.Identifier);
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 326;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,33,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 324;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,32,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new AtContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, ExpressionParser.RULE_expression);
	                    this.state = 316;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 317;
	                    this.match(ExpressionParser.LBRACK);
	                    this.state = 318;
	                    this.expr();
	                    this.state = 319;
	                    this.match(ExpressionParser.RBRACK);
	                    break;

	                case 2:
	                    localctx = new Get_nameContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, ExpressionParser.RULE_expression);
	                    this.state = 321;
	                    if (!( this.precpred(this._ctx, 5))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
	                    }
	                    this.state = 322;
	                    this.match(ExpressionParser.DOT);
	                    this.state = 323;
	                    this.match(ExpressionParser.Identifier);
	                    break;

	                } 
	            }
	            this.state = 328;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,33,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}



	document() {
	    let localctx = new DocumentContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 34, ExpressionParser.RULE_document);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 332;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) === 0 && ((1 << _la) & 1610657682) !== 0) || ((((_la - 35)) & ~0x1f) === 0 && ((1 << (_la - 35)) & 177) !== 0)) {
	            this.state = 329;
	            this.expr();
	            this.state = 334;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 335;
	        this.match(ExpressionParser.EOF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

ExpressionParser.EOF = antlr4.Token.EOF;
ExpressionParser.IF = 1;
ExpressionParser.THEN = 2;
ExpressionParser.ELSE = 3;
ExpressionParser.OBJECTLITERAL = 4;
ExpressionParser.SEPEQUAL = 5;
ExpressionParser.DEFAULTEQUAL = 6;
ExpressionParser.NONELITERAL = 7;
ExpressionParser.IntLiteral = 8;
ExpressionParser.FloatLiteral = 9;
ExpressionParser.BoolLiteral = 10;
ExpressionParser.LPAREN = 11;
ExpressionParser.RPAREN = 12;
ExpressionParser.LBRACE = 13;
ExpressionParser.RBRACE = 14;
ExpressionParser.LBRACK = 15;
ExpressionParser.RBRACK = 16;
ExpressionParser.COLON = 17;
ExpressionParser.LT = 18;
ExpressionParser.GT = 19;
ExpressionParser.GTE = 20;
ExpressionParser.LTE = 21;
ExpressionParser.EQUALITY = 22;
ExpressionParser.NOTEQUAL = 23;
ExpressionParser.EQUAL = 24;
ExpressionParser.AND = 25;
ExpressionParser.OR = 26;
ExpressionParser.OPTIONAL = 27;
ExpressionParser.STAR = 28;
ExpressionParser.PLUS = 29;
ExpressionParser.MINUS = 30;
ExpressionParser.DOLLAR = 31;
ExpressionParser.COMMA = 32;
ExpressionParser.SEMI = 33;
ExpressionParser.DOT = 34;
ExpressionParser.NOT = 35;
ExpressionParser.TILDE = 36;
ExpressionParser.DIVIDE = 37;
ExpressionParser.MOD = 38;
ExpressionParser.SQUOTE = 39;
ExpressionParser.DQUOTE = 40;
ExpressionParser.WHITESPACE = 41;
ExpressionParser.Identifier = 42;
ExpressionParser.StringPart = 43;
ExpressionParser.CommandUnicodeEscape = 44;
ExpressionParser.StringCommandStart = 45;
ExpressionParser.EndCommand = 46;
ExpressionParser.CommandStringPart = 47;

ExpressionParser.RULE_number = 0;
ExpressionParser.RULE_expression_placeholder_option = 1;
ExpressionParser.RULE_string_part = 2;
ExpressionParser.RULE_string_expr_part = 3;
ExpressionParser.RULE_string_expr_with_string_part = 4;
ExpressionParser.RULE_string = 5;
ExpressionParser.RULE_primitive_literal = 6;
ExpressionParser.RULE_expr = 7;
ExpressionParser.RULE_expr_infix = 8;
ExpressionParser.RULE_expr_infix0 = 9;
ExpressionParser.RULE_expr_infix1 = 10;
ExpressionParser.RULE_expr_infix2 = 11;
ExpressionParser.RULE_expr_infix3 = 12;
ExpressionParser.RULE_expr_infix4 = 13;
ExpressionParser.RULE_expr_infix5 = 14;
ExpressionParser.RULE_member = 15;
ExpressionParser.RULE_expression = 16;
ExpressionParser.RULE_document = 17;

class NumberContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExpressionParser.RULE_number;
    }

	IntLiteral() {
	    return this.getToken(ExpressionParser.IntLiteral, 0);
	};

	FloatLiteral() {
	    return this.getToken(ExpressionParser.FloatLiteral, 0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterNumber(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitNumber(this);
		}
	}


}



class Expression_placeholder_optionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExpressionParser.RULE_expression_placeholder_option;
    }

	BoolLiteral() {
	    return this.getToken(ExpressionParser.BoolLiteral, 0);
	};

	EQUAL() {
	    return this.getToken(ExpressionParser.EQUAL, 0);
	};

	string() {
	    return this.getTypedRuleContext(StringContext,0);
	};

	DEFAULTEQUAL() {
	    return this.getToken(ExpressionParser.DEFAULTEQUAL, 0);
	};

	number() {
	    return this.getTypedRuleContext(NumberContext,0);
	};

	SEPEQUAL() {
	    return this.getToken(ExpressionParser.SEPEQUAL, 0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterExpression_placeholder_option(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitExpression_placeholder_option(this);
		}
	}


}



class String_partContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExpressionParser.RULE_string_part;
    }

	StringPart = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(ExpressionParser.StringPart);
	    } else {
	        return this.getToken(ExpressionParser.StringPart, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterString_part(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitString_part(this);
		}
	}


}



class String_expr_partContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExpressionParser.RULE_string_expr_part;
    }

	StringCommandStart() {
	    return this.getToken(ExpressionParser.StringCommandStart, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	RBRACE() {
	    return this.getToken(ExpressionParser.RBRACE, 0);
	};

	expression_placeholder_option = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Expression_placeholder_optionContext);
	    } else {
	        return this.getTypedRuleContext(Expression_placeholder_optionContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterString_expr_part(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitString_expr_part(this);
		}
	}


}



class String_expr_with_string_partContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExpressionParser.RULE_string_expr_with_string_part;
    }

	string_expr_part() {
	    return this.getTypedRuleContext(String_expr_partContext,0);
	};

	string_part() {
	    return this.getTypedRuleContext(String_partContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterString_expr_with_string_part(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitString_expr_with_string_part(this);
		}
	}


}



class StringContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExpressionParser.RULE_string;
    }

	DQUOTE = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(ExpressionParser.DQUOTE);
	    } else {
	        return this.getToken(ExpressionParser.DQUOTE, i);
	    }
	};


	string_part() {
	    return this.getTypedRuleContext(String_partContext,0);
	};

	string_expr_with_string_part = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(String_expr_with_string_partContext);
	    } else {
	        return this.getTypedRuleContext(String_expr_with_string_partContext,i);
	    }
	};

	SQUOTE = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(ExpressionParser.SQUOTE);
	    } else {
	        return this.getToken(ExpressionParser.SQUOTE, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterString(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitString(this);
		}
	}


}



class Primitive_literalContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExpressionParser.RULE_primitive_literal;
    }

	BoolLiteral() {
	    return this.getToken(ExpressionParser.BoolLiteral, 0);
	};

	number() {
	    return this.getTypedRuleContext(NumberContext,0);
	};

	string() {
	    return this.getTypedRuleContext(StringContext,0);
	};

	NONELITERAL() {
	    return this.getToken(ExpressionParser.NONELITERAL, 0);
	};

	Identifier() {
	    return this.getToken(ExpressionParser.Identifier, 0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterPrimitive_literal(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitPrimitive_literal(this);
		}
	}


}



class ExprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExpressionParser.RULE_expr;
    }

	expr_infix() {
	    return this.getTypedRuleContext(Expr_infixContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitExpr(this);
		}
	}


}



class Expr_infixContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExpressionParser.RULE_expr_infix;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class Infix0Context extends Expr_infixContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix0() {
	    return this.getTypedRuleContext(Expr_infix0Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterInfix0(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitInfix0(this);
		}
	}


}

ExpressionParser.Infix0Context = Infix0Context;

class Expr_infix0Context extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExpressionParser.RULE_expr_infix0;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class Infix1Context extends Expr_infix0Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix1() {
	    return this.getTypedRuleContext(Expr_infix1Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterInfix1(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitInfix1(this);
		}
	}


}

ExpressionParser.Infix1Context = Infix1Context;

class LorContext extends Expr_infix0Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix0() {
	    return this.getTypedRuleContext(Expr_infix0Context,0);
	};

	OR() {
	    return this.getToken(ExpressionParser.OR, 0);
	};

	expr_infix1() {
	    return this.getTypedRuleContext(Expr_infix1Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterLor(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitLor(this);
		}
	}


}

ExpressionParser.LorContext = LorContext;

class Expr_infix1Context extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExpressionParser.RULE_expr_infix1;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class Infix2Context extends Expr_infix1Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix2() {
	    return this.getTypedRuleContext(Expr_infix2Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterInfix2(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitInfix2(this);
		}
	}


}

ExpressionParser.Infix2Context = Infix2Context;

class LandContext extends Expr_infix1Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix1() {
	    return this.getTypedRuleContext(Expr_infix1Context,0);
	};

	AND() {
	    return this.getToken(ExpressionParser.AND, 0);
	};

	expr_infix2() {
	    return this.getTypedRuleContext(Expr_infix2Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterLand(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitLand(this);
		}
	}


}

ExpressionParser.LandContext = LandContext;

class Expr_infix2Context extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExpressionParser.RULE_expr_infix2;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class EqeqContext extends Expr_infix2Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix2() {
	    return this.getTypedRuleContext(Expr_infix2Context,0);
	};

	EQUALITY() {
	    return this.getToken(ExpressionParser.EQUALITY, 0);
	};

	expr_infix3() {
	    return this.getTypedRuleContext(Expr_infix3Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterEqeq(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitEqeq(this);
		}
	}


}

ExpressionParser.EqeqContext = EqeqContext;

class LtContext extends Expr_infix2Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix2() {
	    return this.getTypedRuleContext(Expr_infix2Context,0);
	};

	LT() {
	    return this.getToken(ExpressionParser.LT, 0);
	};

	expr_infix3() {
	    return this.getTypedRuleContext(Expr_infix3Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterLt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitLt(this);
		}
	}


}

ExpressionParser.LtContext = LtContext;

class Infix3Context extends Expr_infix2Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix3() {
	    return this.getTypedRuleContext(Expr_infix3Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterInfix3(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitInfix3(this);
		}
	}


}

ExpressionParser.Infix3Context = Infix3Context;

class GteContext extends Expr_infix2Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix2() {
	    return this.getTypedRuleContext(Expr_infix2Context,0);
	};

	GTE() {
	    return this.getToken(ExpressionParser.GTE, 0);
	};

	expr_infix3() {
	    return this.getTypedRuleContext(Expr_infix3Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterGte(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitGte(this);
		}
	}


}

ExpressionParser.GteContext = GteContext;

class NeqContext extends Expr_infix2Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix2() {
	    return this.getTypedRuleContext(Expr_infix2Context,0);
	};

	NOTEQUAL() {
	    return this.getToken(ExpressionParser.NOTEQUAL, 0);
	};

	expr_infix3() {
	    return this.getTypedRuleContext(Expr_infix3Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterNeq(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitNeq(this);
		}
	}


}

ExpressionParser.NeqContext = NeqContext;

class LteContext extends Expr_infix2Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix2() {
	    return this.getTypedRuleContext(Expr_infix2Context,0);
	};

	LTE() {
	    return this.getToken(ExpressionParser.LTE, 0);
	};

	expr_infix3() {
	    return this.getTypedRuleContext(Expr_infix3Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterLte(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitLte(this);
		}
	}


}

ExpressionParser.LteContext = LteContext;

class GtContext extends Expr_infix2Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix2() {
	    return this.getTypedRuleContext(Expr_infix2Context,0);
	};

	GT() {
	    return this.getToken(ExpressionParser.GT, 0);
	};

	expr_infix3() {
	    return this.getTypedRuleContext(Expr_infix3Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterGt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitGt(this);
		}
	}


}

ExpressionParser.GtContext = GtContext;

class Expr_infix3Context extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExpressionParser.RULE_expr_infix3;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class AddContext extends Expr_infix3Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix3() {
	    return this.getTypedRuleContext(Expr_infix3Context,0);
	};

	PLUS() {
	    return this.getToken(ExpressionParser.PLUS, 0);
	};

	expr_infix4() {
	    return this.getTypedRuleContext(Expr_infix4Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterAdd(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitAdd(this);
		}
	}


}

ExpressionParser.AddContext = AddContext;

class SubContext extends Expr_infix3Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix3() {
	    return this.getTypedRuleContext(Expr_infix3Context,0);
	};

	MINUS() {
	    return this.getToken(ExpressionParser.MINUS, 0);
	};

	expr_infix4() {
	    return this.getTypedRuleContext(Expr_infix4Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterSub(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitSub(this);
		}
	}


}

ExpressionParser.SubContext = SubContext;

class Infix4Context extends Expr_infix3Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix4() {
	    return this.getTypedRuleContext(Expr_infix4Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterInfix4(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitInfix4(this);
		}
	}


}

ExpressionParser.Infix4Context = Infix4Context;

class Expr_infix4Context extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExpressionParser.RULE_expr_infix4;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class ModContext extends Expr_infix4Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix4() {
	    return this.getTypedRuleContext(Expr_infix4Context,0);
	};

	MOD() {
	    return this.getToken(ExpressionParser.MOD, 0);
	};

	expr_infix5() {
	    return this.getTypedRuleContext(Expr_infix5Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterMod(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitMod(this);
		}
	}


}

ExpressionParser.ModContext = ModContext;

class MulContext extends Expr_infix4Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix4() {
	    return this.getTypedRuleContext(Expr_infix4Context,0);
	};

	STAR() {
	    return this.getToken(ExpressionParser.STAR, 0);
	};

	expr_infix5() {
	    return this.getTypedRuleContext(Expr_infix5Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterMul(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitMul(this);
		}
	}


}

ExpressionParser.MulContext = MulContext;

class DivideContext extends Expr_infix4Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix4() {
	    return this.getTypedRuleContext(Expr_infix4Context,0);
	};

	DIVIDE() {
	    return this.getToken(ExpressionParser.DIVIDE, 0);
	};

	expr_infix5() {
	    return this.getTypedRuleContext(Expr_infix5Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterDivide(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitDivide(this);
		}
	}


}

ExpressionParser.DivideContext = DivideContext;

class Infix5Context extends Expr_infix4Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix5() {
	    return this.getTypedRuleContext(Expr_infix5Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterInfix5(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitInfix5(this);
		}
	}


}

ExpressionParser.Infix5Context = Infix5Context;

class Expr_infix5Context extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExpressionParser.RULE_expr_infix5;
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterExpr_infix5(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitExpr_infix5(this);
		}
	}


}



class MemberContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExpressionParser.RULE_member;
    }

	Identifier() {
	    return this.getToken(ExpressionParser.Identifier, 0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterMember(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitMember(this);
		}
	}


}



class ExpressionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExpressionParser.RULE_expression;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class Pair_literalContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	LPAREN() {
	    return this.getToken(ExpressionParser.LPAREN, 0);
	};

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	COMMA() {
	    return this.getToken(ExpressionParser.COMMA, 0);
	};

	RPAREN() {
	    return this.getToken(ExpressionParser.RPAREN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterPair_literal(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitPair_literal(this);
		}
	}


}

ExpressionParser.Pair_literalContext = Pair_literalContext;

class UnarysignedContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	PLUS() {
	    return this.getToken(ExpressionParser.PLUS, 0);
	};

	MINUS() {
	    return this.getToken(ExpressionParser.MINUS, 0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterUnarysigned(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitUnarysigned(this);
		}
	}


}

ExpressionParser.UnarysignedContext = UnarysignedContext;

class ApplyContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	Identifier() {
	    return this.getToken(ExpressionParser.Identifier, 0);
	};

	LPAREN() {
	    return this.getToken(ExpressionParser.LPAREN, 0);
	};

	RPAREN() {
	    return this.getToken(ExpressionParser.RPAREN, 0);
	};

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(ExpressionParser.COMMA);
	    } else {
	        return this.getToken(ExpressionParser.COMMA, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterApply(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitApply(this);
		}
	}


}

ExpressionParser.ApplyContext = ApplyContext;

class Expression_groupContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	LPAREN() {
	    return this.getToken(ExpressionParser.LPAREN, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	RPAREN() {
	    return this.getToken(ExpressionParser.RPAREN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterExpression_group(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitExpression_group(this);
		}
	}


}

ExpressionParser.Expression_groupContext = Expression_groupContext;

class PrimitivesContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	primitive_literal() {
	    return this.getTypedRuleContext(Primitive_literalContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterPrimitives(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitPrimitives(this);
		}
	}


}

ExpressionParser.PrimitivesContext = PrimitivesContext;

class Left_nameContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	Identifier() {
	    return this.getToken(ExpressionParser.Identifier, 0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterLeft_name(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitLeft_name(this);
		}
	}


}

ExpressionParser.Left_nameContext = Left_nameContext;

class AtContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	LBRACK() {
	    return this.getToken(ExpressionParser.LBRACK, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	RBRACK() {
	    return this.getToken(ExpressionParser.RBRACK, 0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterAt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitAt(this);
		}
	}


}

ExpressionParser.AtContext = AtContext;

class NegateContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	NOT() {
	    return this.getToken(ExpressionParser.NOT, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterNegate(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitNegate(this);
		}
	}


}

ExpressionParser.NegateContext = NegateContext;

class Map_literalContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	LBRACE() {
	    return this.getToken(ExpressionParser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(ExpressionParser.RBRACE, 0);
	};

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	COLON = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(ExpressionParser.COLON);
	    } else {
	        return this.getToken(ExpressionParser.COLON, i);
	    }
	};


	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(ExpressionParser.COMMA);
	    } else {
	        return this.getToken(ExpressionParser.COMMA, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterMap_literal(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitMap_literal(this);
		}
	}


}

ExpressionParser.Map_literalContext = Map_literalContext;

class IfthenelseContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	IF() {
	    return this.getToken(ExpressionParser.IF, 0);
	};

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	THEN() {
	    return this.getToken(ExpressionParser.THEN, 0);
	};

	ELSE() {
	    return this.getToken(ExpressionParser.ELSE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterIfthenelse(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitIfthenelse(this);
		}
	}


}

ExpressionParser.IfthenelseContext = IfthenelseContext;

class Get_nameContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	DOT() {
	    return this.getToken(ExpressionParser.DOT, 0);
	};

	Identifier() {
	    return this.getToken(ExpressionParser.Identifier, 0);
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterGet_name(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitGet_name(this);
		}
	}


}

ExpressionParser.Get_nameContext = Get_nameContext;

class Object_literalContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	OBJECTLITERAL() {
	    return this.getToken(ExpressionParser.OBJECTLITERAL, 0);
	};

	LBRACE() {
	    return this.getToken(ExpressionParser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(ExpressionParser.RBRACE, 0);
	};

	member = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(MemberContext);
	    } else {
	        return this.getTypedRuleContext(MemberContext,i);
	    }
	};

	COLON = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(ExpressionParser.COLON);
	    } else {
	        return this.getToken(ExpressionParser.COLON, i);
	    }
	};


	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(ExpressionParser.COMMA);
	    } else {
	        return this.getToken(ExpressionParser.COMMA, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterObject_literal(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitObject_literal(this);
		}
	}


}

ExpressionParser.Object_literalContext = Object_literalContext;

class Array_literalContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	LBRACK() {
	    return this.getToken(ExpressionParser.LBRACK, 0);
	};

	RBRACK() {
	    return this.getToken(ExpressionParser.RBRACK, 0);
	};

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(ExpressionParser.COMMA);
	    } else {
	        return this.getToken(ExpressionParser.COMMA, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterArray_literal(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitArray_literal(this);
		}
	}


}

ExpressionParser.Array_literalContext = Array_literalContext;

class Struct_literalContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	Identifier() {
	    return this.getToken(ExpressionParser.Identifier, 0);
	};

	LBRACE() {
	    return this.getToken(ExpressionParser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(ExpressionParser.RBRACE, 0);
	};

	member = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(MemberContext);
	    } else {
	        return this.getTypedRuleContext(MemberContext,i);
	    }
	};

	COLON = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(ExpressionParser.COLON);
	    } else {
	        return this.getToken(ExpressionParser.COLON, i);
	    }
	};


	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(ExpressionParser.COMMA);
	    } else {
	        return this.getToken(ExpressionParser.COMMA, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterStruct_literal(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitStruct_literal(this);
		}
	}


}

ExpressionParser.Struct_literalContext = Struct_literalContext;

class DocumentContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExpressionParser.RULE_document;
    }

	EOF() {
	    return this.getToken(ExpressionParser.EOF, 0);
	};

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.enterDocument(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExpressionParserListener ) {
	        listener.exitDocument(this);
		}
	}


}




ExpressionParser.NumberContext = NumberContext; 
ExpressionParser.Expression_placeholder_optionContext = Expression_placeholder_optionContext; 
ExpressionParser.String_partContext = String_partContext; 
ExpressionParser.String_expr_partContext = String_expr_partContext; 
ExpressionParser.String_expr_with_string_partContext = String_expr_with_string_partContext; 
ExpressionParser.StringContext = StringContext; 
ExpressionParser.Primitive_literalContext = Primitive_literalContext; 
ExpressionParser.ExprContext = ExprContext; 
ExpressionParser.Expr_infixContext = Expr_infixContext; 
ExpressionParser.Expr_infix0Context = Expr_infix0Context; 
ExpressionParser.Expr_infix1Context = Expr_infix1Context; 
ExpressionParser.Expr_infix2Context = Expr_infix2Context; 
ExpressionParser.Expr_infix3Context = Expr_infix3Context; 
ExpressionParser.Expr_infix4Context = Expr_infix4Context; 
ExpressionParser.Expr_infix5Context = Expr_infix5Context; 
ExpressionParser.MemberContext = MemberContext; 
ExpressionParser.ExpressionContext = ExpressionContext; 
ExpressionParser.DocumentContext = DocumentContext; 
