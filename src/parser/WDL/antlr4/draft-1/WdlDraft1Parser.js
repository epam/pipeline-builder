// Generated from ./WdlDraft1Parser.g4 by ANTLR 4.13.0
// jshint ignore: start
import antlr4 from 'antlr4';
import WdlDraft1ParserListener from './WdlDraft1ParserListener.js';
const serializedATN = [4,1,111,777,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,
2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,2,27,
7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,7,33,2,34,7,
34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,2,40,7,40,2,41,7,41,
2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,7,46,2,47,7,47,2,48,7,48,2,
49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,2,53,7,53,2,54,7,54,2,55,7,55,2,56,
7,56,2,57,7,57,2,58,7,58,2,59,7,59,2,60,7,60,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
1,1,1,1,1,1,1,1,1,1,3,1,135,8,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,3,1,3,1,3,
1,3,3,3,148,8,3,1,4,1,4,1,4,1,4,3,4,154,8,4,1,5,1,5,1,5,1,6,1,6,1,6,1,6,
1,6,1,7,1,7,3,7,166,8,7,1,8,1,8,1,8,1,8,3,8,172,8,8,1,9,1,9,1,10,1,10,1,
11,1,11,1,11,1,11,1,11,1,11,5,11,184,8,11,10,11,12,11,187,9,11,1,12,1,12,
1,12,1,12,1,12,1,12,5,12,195,8,12,10,12,12,12,198,9,12,1,13,1,13,1,13,1,
13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,
1,13,1,13,1,13,5,13,221,8,13,10,13,12,13,224,9,13,1,14,1,14,1,14,1,14,1,
14,1,14,1,14,1,14,1,14,5,14,235,8,14,10,14,12,14,238,9,14,1,15,1,15,1,15,
1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,5,15,252,8,15,10,15,12,15,255,
9,15,1,16,1,16,1,17,1,17,1,17,1,17,1,17,1,17,5,17,265,8,17,10,17,12,17,268,
9,17,1,17,3,17,271,8,17,3,17,273,8,17,1,17,1,17,1,17,1,17,1,17,5,17,280,
8,17,10,17,12,17,283,9,17,1,17,3,17,286,8,17,5,17,288,8,17,10,17,12,17,291,
9,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,
17,1,17,1,17,5,17,309,8,17,10,17,12,17,312,9,17,1,17,3,17,315,8,17,5,17,
317,8,17,10,17,12,17,320,9,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,
17,1,17,5,17,332,8,17,10,17,12,17,335,9,17,1,17,3,17,338,8,17,5,17,340,8,
17,10,17,12,17,343,9,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,
1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,3,17,363,8,17,1,17,1,17,1,17,1,17,
1,17,1,17,1,17,1,17,5,17,373,8,17,10,17,12,17,376,9,17,1,18,1,18,1,19,1,
19,1,19,1,19,3,19,384,8,19,1,19,1,19,1,19,1,19,3,19,390,8,19,1,19,1,19,1,
19,1,19,3,19,396,8,19,3,19,398,8,19,1,20,5,20,401,8,20,10,20,12,20,404,9,
20,1,21,1,21,5,21,408,8,21,10,21,12,21,411,9,21,1,21,1,21,1,21,1,22,1,22,
1,22,1,23,1,23,1,23,5,23,422,8,23,10,23,12,23,425,9,23,1,23,1,23,1,23,1,
23,1,23,5,23,432,8,23,10,23,12,23,435,9,23,1,23,1,23,3,23,439,8,23,1,24,
1,24,1,24,1,25,1,25,1,25,3,25,447,8,25,1,26,1,26,1,26,5,26,452,8,26,10,26,
12,26,455,9,26,1,26,1,26,1,27,5,27,460,8,27,10,27,12,27,463,9,27,1,28,1,
28,5,28,467,8,28,10,28,12,28,470,9,28,1,28,1,28,1,28,1,29,1,29,1,29,1,30,
1,30,1,30,1,30,5,30,482,8,30,10,30,12,30,485,9,30,1,30,1,30,1,30,1,30,1,
30,1,30,5,30,493,8,30,10,30,12,30,496,9,30,1,30,1,30,3,30,500,8,30,1,31,
1,31,1,31,1,31,1,32,1,32,1,32,5,32,509,8,32,10,32,12,32,512,9,32,1,32,1,
32,1,33,1,33,1,33,1,33,1,33,1,33,1,33,3,33,523,8,33,1,34,5,34,526,8,34,10,
34,12,34,529,9,34,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,3,35,539,8,35,
1,36,1,36,1,36,1,36,1,36,5,36,546,8,36,10,36,12,36,549,9,36,1,36,1,36,3,
36,553,8,36,1,37,1,37,1,37,1,37,1,37,5,37,560,8,37,10,37,12,37,563,9,37,
1,37,1,37,3,37,567,8,37,1,38,1,38,1,38,1,38,1,39,1,39,1,39,1,39,1,40,1,40,
1,40,5,40,580,8,40,10,40,12,40,583,9,40,1,40,1,40,1,41,1,41,1,41,5,41,590,
8,41,10,41,12,41,593,9,41,1,41,1,41,1,42,1,42,1,42,1,42,1,42,1,42,3,42,603,
8,42,1,43,1,43,1,43,1,43,4,43,609,8,43,11,43,12,43,610,1,43,1,43,1,44,1,
44,1,44,1,45,1,45,1,45,1,45,1,46,1,46,1,46,1,46,1,46,5,46,627,8,46,10,46,
12,46,630,9,46,1,46,3,46,633,8,46,5,46,635,8,46,10,46,12,46,638,9,46,1,47,
1,47,3,47,642,8,47,1,47,1,47,1,48,1,48,1,48,5,48,649,8,48,10,48,12,48,652,
9,48,1,49,1,49,1,49,3,49,657,8,49,1,49,3,49,660,8,49,1,50,1,50,1,50,1,50,
1,50,1,50,1,50,1,50,5,50,670,8,50,10,50,12,50,673,9,50,1,50,1,50,1,51,1,
51,1,51,1,51,1,51,1,51,5,51,683,8,51,10,51,12,51,686,9,51,1,51,1,51,1,52,
1,52,1,52,1,52,1,52,1,52,5,52,696,8,52,10,52,12,52,699,9,52,1,52,1,52,1,
53,1,53,1,53,1,53,1,53,3,53,708,8,53,1,54,1,54,1,54,1,54,5,54,714,8,54,10,
54,12,54,717,9,54,3,54,719,8,54,1,55,1,55,1,55,1,55,1,56,1,56,1,56,1,56,
1,56,5,56,730,8,56,10,56,12,56,733,9,56,1,56,3,56,736,8,56,5,56,738,8,56,
10,56,12,56,741,9,56,1,56,1,56,1,57,1,57,1,57,1,57,3,57,749,8,57,1,58,1,
58,1,58,1,58,5,58,755,8,58,10,58,12,58,758,9,58,1,58,1,58,1,59,1,59,1,59,
3,59,765,8,59,1,60,3,60,768,8,60,1,60,4,60,771,8,60,11,60,12,60,772,1,60,
1,60,1,60,0,6,22,24,26,28,30,34,61,0,2,4,6,8,10,12,14,16,18,20,22,24,26,
28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,
76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,
118,120,0,5,3,0,22,26,30,30,69,69,1,0,56,57,1,0,34,35,2,0,100,100,102,102,
2,0,107,107,109,109,826,0,122,1,0,0,0,2,129,1,0,0,0,4,136,1,0,0,0,6,147,
1,0,0,0,8,153,1,0,0,0,10,155,1,0,0,0,12,158,1,0,0,0,14,165,1,0,0,0,16,171,
1,0,0,0,18,173,1,0,0,0,20,175,1,0,0,0,22,177,1,0,0,0,24,188,1,0,0,0,26,199,
1,0,0,0,28,225,1,0,0,0,30,239,1,0,0,0,32,256,1,0,0,0,34,362,1,0,0,0,36,377,
1,0,0,0,38,397,1,0,0,0,40,402,1,0,0,0,42,405,1,0,0,0,44,415,1,0,0,0,46,438,
1,0,0,0,48,440,1,0,0,0,50,443,1,0,0,0,52,448,1,0,0,0,54,461,1,0,0,0,56,464,
1,0,0,0,58,474,1,0,0,0,60,499,1,0,0,0,62,501,1,0,0,0,64,505,1,0,0,0,66,522,
1,0,0,0,68,527,1,0,0,0,70,538,1,0,0,0,72,552,1,0,0,0,74,566,1,0,0,0,76,568,
1,0,0,0,78,572,1,0,0,0,80,576,1,0,0,0,82,586,1,0,0,0,84,602,1,0,0,0,86,604,
1,0,0,0,88,614,1,0,0,0,90,617,1,0,0,0,92,621,1,0,0,0,94,639,1,0,0,0,96,645,
1,0,0,0,98,653,1,0,0,0,100,661,1,0,0,0,102,676,1,0,0,0,104,689,1,0,0,0,106,
707,1,0,0,0,108,718,1,0,0,0,110,720,1,0,0,0,112,724,1,0,0,0,114,748,1,0,
0,0,116,750,1,0,0,0,118,764,1,0,0,0,120,767,1,0,0,0,122,123,5,28,0,0,123,
124,5,41,0,0,124,125,3,8,4,0,125,126,5,59,0,0,126,127,3,8,4,0,127,128,5,
42,0,0,128,1,1,0,0,0,129,130,5,27,0,0,130,131,5,41,0,0,131,132,3,8,4,0,132,
134,5,42,0,0,133,135,5,56,0,0,134,133,1,0,0,0,134,135,1,0,0,0,135,3,1,0,
0,0,136,137,5,29,0,0,137,138,5,41,0,0,138,139,3,8,4,0,139,140,5,59,0,0,140,
141,3,8,4,0,141,142,5,42,0,0,142,5,1,0,0,0,143,148,3,2,1,0,144,148,3,0,0,
0,145,148,3,4,2,0,146,148,7,0,0,0,147,143,1,0,0,0,147,144,1,0,0,0,147,145,
1,0,0,0,147,146,1,0,0,0,148,7,1,0,0,0,149,150,3,6,3,0,150,151,5,54,0,0,151,
154,1,0,0,0,152,154,3,6,3,0,153,149,1,0,0,0,153,152,1,0,0,0,154,9,1,0,0,
0,155,156,3,8,4,0,156,157,5,69,0,0,157,11,1,0,0,0,158,159,3,8,4,0,159,160,
5,69,0,0,160,161,5,51,0,0,161,162,3,18,9,0,162,13,1,0,0,0,163,166,3,10,5,
0,164,166,3,12,6,0,165,163,1,0,0,0,165,164,1,0,0,0,166,15,1,0,0,0,167,172,
5,36,0,0,168,172,3,36,18,0,169,172,3,46,23,0,170,172,5,69,0,0,171,167,1,
0,0,0,171,168,1,0,0,0,171,169,1,0,0,0,171,170,1,0,0,0,172,17,1,0,0,0,173,
174,3,20,10,0,174,19,1,0,0,0,175,176,3,22,11,0,176,21,1,0,0,0,177,178,6,
11,-1,0,178,179,3,24,12,0,179,185,1,0,0,0,180,181,10,2,0,0,181,182,5,53,
0,0,182,184,3,24,12,0,183,180,1,0,0,0,184,187,1,0,0,0,185,183,1,0,0,0,185,
186,1,0,0,0,186,23,1,0,0,0,187,185,1,0,0,0,188,189,6,12,-1,0,189,190,3,26,
13,0,190,196,1,0,0,0,191,192,10,2,0,0,192,193,5,52,0,0,193,195,3,26,13,0,
194,191,1,0,0,0,195,198,1,0,0,0,196,194,1,0,0,0,196,197,1,0,0,0,197,25,1,
0,0,0,198,196,1,0,0,0,199,200,6,13,-1,0,200,201,3,28,14,0,201,222,1,0,0,
0,202,203,10,7,0,0,203,204,5,49,0,0,204,221,3,28,14,0,205,206,10,6,0,0,206,
207,5,50,0,0,207,221,3,28,14,0,208,209,10,5,0,0,209,210,5,48,0,0,210,221,
3,28,14,0,211,212,10,4,0,0,212,213,5,47,0,0,213,221,3,28,14,0,214,215,10,
3,0,0,215,216,5,45,0,0,216,221,3,28,14,0,217,218,10,2,0,0,218,219,5,46,0,
0,219,221,3,28,14,0,220,202,1,0,0,0,220,205,1,0,0,0,220,208,1,0,0,0,220,
211,1,0,0,0,220,214,1,0,0,0,220,217,1,0,0,0,221,224,1,0,0,0,222,220,1,0,
0,0,222,223,1,0,0,0,223,27,1,0,0,0,224,222,1,0,0,0,225,226,6,14,-1,0,226,
227,3,30,15,0,227,236,1,0,0,0,228,229,10,3,0,0,229,230,5,56,0,0,230,235,
3,30,15,0,231,232,10,2,0,0,232,233,5,57,0,0,233,235,3,30,15,0,234,228,1,
0,0,0,234,231,1,0,0,0,235,238,1,0,0,0,236,234,1,0,0,0,236,237,1,0,0,0,237,
29,1,0,0,0,238,236,1,0,0,0,239,240,6,15,-1,0,240,241,3,32,16,0,241,253,1,
0,0,0,242,243,10,4,0,0,243,244,5,55,0,0,244,252,3,32,16,0,245,246,10,3,0,
0,246,247,5,64,0,0,247,252,3,32,16,0,248,249,10,2,0,0,249,250,5,65,0,0,250,
252,3,32,16,0,251,242,1,0,0,0,251,245,1,0,0,0,251,248,1,0,0,0,252,255,1,
0,0,0,253,251,1,0,0,0,253,254,1,0,0,0,254,31,1,0,0,0,255,253,1,0,0,0,256,
257,3,34,17,0,257,33,1,0,0,0,258,259,6,17,-1,0,259,260,5,69,0,0,260,272,
5,37,0,0,261,266,3,18,9,0,262,263,5,59,0,0,263,265,3,18,9,0,264,262,1,0,
0,0,265,268,1,0,0,0,266,264,1,0,0,0,266,267,1,0,0,0,267,270,1,0,0,0,268,
266,1,0,0,0,269,271,5,59,0,0,270,269,1,0,0,0,270,271,1,0,0,0,271,273,1,0,
0,0,272,261,1,0,0,0,272,273,1,0,0,0,273,274,1,0,0,0,274,363,5,38,0,0,275,
289,5,41,0,0,276,281,3,18,9,0,277,278,5,59,0,0,278,280,3,18,9,0,279,277,
1,0,0,0,280,283,1,0,0,0,281,279,1,0,0,0,281,282,1,0,0,0,282,285,1,0,0,0,
283,281,1,0,0,0,284,286,5,59,0,0,285,284,1,0,0,0,285,286,1,0,0,0,286,288,
1,0,0,0,287,276,1,0,0,0,288,291,1,0,0,0,289,287,1,0,0,0,289,290,1,0,0,0,
290,292,1,0,0,0,291,289,1,0,0,0,292,363,5,42,0,0,293,294,5,37,0,0,294,295,
3,18,9,0,295,296,5,59,0,0,296,297,3,18,9,0,297,298,5,38,0,0,298,363,1,0,
0,0,299,318,5,39,0,0,300,301,3,18,9,0,301,302,5,44,0,0,302,310,3,18,9,0,
303,304,5,59,0,0,304,305,3,18,9,0,305,306,5,44,0,0,306,307,3,18,9,0,307,
309,1,0,0,0,308,303,1,0,0,0,309,312,1,0,0,0,310,308,1,0,0,0,310,311,1,0,
0,0,311,314,1,0,0,0,312,310,1,0,0,0,313,315,5,59,0,0,314,313,1,0,0,0,314,
315,1,0,0,0,315,317,1,0,0,0,316,300,1,0,0,0,317,320,1,0,0,0,318,316,1,0,
0,0,318,319,1,0,0,0,319,321,1,0,0,0,320,318,1,0,0,0,321,363,5,40,0,0,322,
323,5,31,0,0,323,341,5,39,0,0,324,325,5,69,0,0,325,326,5,44,0,0,326,333,
3,18,9,0,327,328,5,59,0,0,328,329,5,69,0,0,329,330,5,44,0,0,330,332,3,18,
9,0,331,327,1,0,0,0,332,335,1,0,0,0,333,331,1,0,0,0,333,334,1,0,0,0,334,
337,1,0,0,0,335,333,1,0,0,0,336,338,5,59,0,0,337,336,1,0,0,0,337,338,1,0,
0,0,338,340,1,0,0,0,339,324,1,0,0,0,340,343,1,0,0,0,341,339,1,0,0,0,341,
342,1,0,0,0,342,344,1,0,0,0,343,341,1,0,0,0,344,363,5,40,0,0,345,346,5,10,
0,0,346,347,3,18,9,0,347,348,5,11,0,0,348,349,3,18,9,0,349,350,5,12,0,0,
350,351,3,18,9,0,351,363,1,0,0,0,352,353,5,37,0,0,353,354,3,18,9,0,354,355,
5,38,0,0,355,363,1,0,0,0,356,357,5,62,0,0,357,363,3,18,9,0,358,359,7,1,0,
0,359,363,3,18,9,0,360,363,3,16,8,0,361,363,5,69,0,0,362,258,1,0,0,0,362,
275,1,0,0,0,362,293,1,0,0,0,362,299,1,0,0,0,362,322,1,0,0,0,362,345,1,0,
0,0,362,352,1,0,0,0,362,356,1,0,0,0,362,358,1,0,0,0,362,360,1,0,0,0,362,
361,1,0,0,0,363,374,1,0,0,0,364,365,10,6,0,0,365,366,5,41,0,0,366,367,3,
18,9,0,367,368,5,42,0,0,368,373,1,0,0,0,369,370,10,5,0,0,370,371,5,61,0,
0,371,373,5,69,0,0,372,364,1,0,0,0,372,369,1,0,0,0,373,376,1,0,0,0,374,372,
1,0,0,0,374,375,1,0,0,0,375,35,1,0,0,0,376,374,1,0,0,0,377,378,7,2,0,0,378,
37,1,0,0,0,379,380,5,36,0,0,380,383,5,51,0,0,381,384,3,46,23,0,382,384,3,
36,18,0,383,381,1,0,0,0,383,382,1,0,0,0,384,398,1,0,0,0,385,386,5,33,0,0,
386,389,5,51,0,0,387,390,3,46,23,0,388,390,3,36,18,0,389,387,1,0,0,0,389,
388,1,0,0,0,390,398,1,0,0,0,391,392,5,32,0,0,392,395,5,51,0,0,393,396,3,
46,23,0,394,396,3,36,18,0,395,393,1,0,0,0,395,394,1,0,0,0,396,398,1,0,0,
0,397,379,1,0,0,0,397,385,1,0,0,0,397,391,1,0,0,0,398,39,1,0,0,0,399,401,
5,70,0,0,400,399,1,0,0,0,401,404,1,0,0,0,402,400,1,0,0,0,402,403,1,0,0,0,
403,41,1,0,0,0,404,402,1,0,0,0,405,409,5,76,0,0,406,408,3,38,19,0,407,406,
1,0,0,0,408,411,1,0,0,0,409,407,1,0,0,0,409,410,1,0,0,0,410,412,1,0,0,0,
411,409,1,0,0,0,412,413,3,18,9,0,413,414,5,40,0,0,414,43,1,0,0,0,415,416,
3,42,21,0,416,417,3,40,20,0,417,45,1,0,0,0,418,419,5,67,0,0,419,423,3,40,
20,0,420,422,3,44,22,0,421,420,1,0,0,0,422,425,1,0,0,0,423,421,1,0,0,0,423,
424,1,0,0,0,424,426,1,0,0,0,425,423,1,0,0,0,426,427,5,67,0,0,427,439,1,0,
0,0,428,429,5,66,0,0,429,433,3,40,20,0,430,432,3,44,22,0,431,430,1,0,0,0,
432,435,1,0,0,0,433,431,1,0,0,0,433,434,1,0,0,0,434,436,1,0,0,0,435,433,
1,0,0,0,436,437,5,66,0,0,437,439,1,0,0,0,438,418,1,0,0,0,438,428,1,0,0,0,
439,47,1,0,0,0,440,441,5,14,0,0,441,442,5,69,0,0,442,49,1,0,0,0,443,444,
5,3,0,0,444,446,3,46,23,0,445,447,3,48,24,0,446,445,1,0,0,0,446,447,1,0,
0,0,447,51,1,0,0,0,448,449,5,17,0,0,449,453,5,39,0,0,450,452,3,12,6,0,451,
450,1,0,0,0,452,455,1,0,0,0,453,451,1,0,0,0,453,454,1,0,0,0,454,456,1,0,
0,0,455,453,1,0,0,0,456,457,5,40,0,0,457,53,1,0,0,0,458,460,5,78,0,0,459,
458,1,0,0,0,460,463,1,0,0,0,461,459,1,0,0,0,461,462,1,0,0,0,462,55,1,0,0,
0,463,461,1,0,0,0,464,468,5,76,0,0,465,467,3,38,19,0,466,465,1,0,0,0,467,
470,1,0,0,0,468,466,1,0,0,0,468,469,1,0,0,0,469,471,1,0,0,0,470,468,1,0,
0,0,471,472,3,18,9,0,472,473,5,40,0,0,473,57,1,0,0,0,474,475,3,56,28,0,475,
476,3,54,27,0,476,59,1,0,0,0,477,478,5,20,0,0,478,479,5,73,0,0,479,483,3,
54,27,0,480,482,3,58,29,0,481,480,1,0,0,0,482,485,1,0,0,0,483,481,1,0,0,
0,483,484,1,0,0,0,484,486,1,0,0,0,485,483,1,0,0,0,486,487,5,77,0,0,487,500,
1,0,0,0,488,489,5,20,0,0,489,490,5,72,0,0,490,494,3,54,27,0,491,493,3,58,
29,0,492,491,1,0,0,0,493,496,1,0,0,0,494,492,1,0,0,0,494,495,1,0,0,0,495,
497,1,0,0,0,496,494,1,0,0,0,497,498,5,77,0,0,498,500,1,0,0,0,499,477,1,0,
0,0,499,488,1,0,0,0,500,61,1,0,0,0,501,502,5,69,0,0,502,503,5,44,0,0,503,
504,3,18,9,0,504,63,1,0,0,0,505,506,5,21,0,0,506,510,5,39,0,0,507,509,3,
62,31,0,508,507,1,0,0,0,509,512,1,0,0,0,510,508,1,0,0,0,510,511,1,0,0,0,
511,513,1,0,0,0,512,510,1,0,0,0,513,514,5,40,0,0,514,65,1,0,0,0,515,523,
5,90,0,0,516,523,5,87,0,0,517,523,5,88,0,0,518,523,5,89,0,0,519,523,3,70,
35,0,520,523,3,74,37,0,521,523,3,72,36,0,522,515,1,0,0,0,522,516,1,0,0,0,
522,517,1,0,0,0,522,518,1,0,0,0,522,519,1,0,0,0,522,520,1,0,0,0,522,521,
1,0,0,0,523,67,1,0,0,0,524,526,5,98,0,0,525,524,1,0,0,0,526,529,1,0,0,0,
527,525,1,0,0,0,527,528,1,0,0,0,528,69,1,0,0,0,529,527,1,0,0,0,530,531,5,
92,0,0,531,532,3,68,34,0,532,533,5,92,0,0,533,539,1,0,0,0,534,535,5,91,0,
0,535,536,3,68,34,0,536,537,5,91,0,0,537,539,1,0,0,0,538,530,1,0,0,0,538,
534,1,0,0,0,539,71,1,0,0,0,540,553,5,94,0,0,541,542,5,95,0,0,542,547,3,66,
33,0,543,544,5,101,0,0,544,546,3,66,33,0,545,543,1,0,0,0,546,549,1,0,0,0,
547,545,1,0,0,0,547,548,1,0,0,0,548,550,1,0,0,0,549,547,1,0,0,0,550,551,
7,3,0,0,551,553,1,0,0,0,552,540,1,0,0,0,552,541,1,0,0,0,553,73,1,0,0,0,554,
567,5,93,0,0,555,556,5,96,0,0,556,561,3,76,38,0,557,558,5,108,0,0,558,560,
3,76,38,0,559,557,1,0,0,0,560,563,1,0,0,0,561,559,1,0,0,0,561,562,1,0,0,
0,562,564,1,0,0,0,563,561,1,0,0,0,564,565,7,4,0,0,565,567,1,0,0,0,566,554,
1,0,0,0,566,555,1,0,0,0,567,75,1,0,0,0,568,569,5,105,0,0,569,570,5,106,0,
0,570,571,3,66,33,0,571,77,1,0,0,0,572,573,5,82,0,0,573,574,5,83,0,0,574,
575,3,66,33,0,575,79,1,0,0,0,576,577,5,18,0,0,577,581,5,79,0,0,578,580,3,
78,39,0,579,578,1,0,0,0,580,583,1,0,0,0,581,579,1,0,0,0,581,582,1,0,0,0,
582,584,1,0,0,0,583,581,1,0,0,0,584,585,5,84,0,0,585,81,1,0,0,0,586,587,
5,19,0,0,587,591,5,79,0,0,588,590,3,78,39,0,589,588,1,0,0,0,590,593,1,0,
0,0,591,589,1,0,0,0,591,592,1,0,0,0,592,594,1,0,0,0,593,591,1,0,0,0,594,
595,5,84,0,0,595,83,1,0,0,0,596,603,3,52,26,0,597,603,3,60,30,0,598,603,
3,64,32,0,599,603,3,14,7,0,600,603,3,80,40,0,601,603,3,82,41,0,602,596,1,
0,0,0,602,597,1,0,0,0,602,598,1,0,0,0,602,599,1,0,0,0,602,600,1,0,0,0,602,
601,1,0,0,0,603,85,1,0,0,0,604,605,5,5,0,0,605,606,5,69,0,0,606,608,5,39,
0,0,607,609,3,84,42,0,608,607,1,0,0,0,609,610,1,0,0,0,610,608,1,0,0,0,610,
611,1,0,0,0,611,612,1,0,0,0,612,613,5,40,0,0,613,87,1,0,0,0,614,615,5,14,
0,0,615,616,5,69,0,0,616,89,1,0,0,0,617,618,5,69,0,0,618,619,5,51,0,0,619,
620,3,18,9,0,620,91,1,0,0,0,621,622,5,16,0,0,622,636,5,44,0,0,623,628,3,
90,45,0,624,625,5,59,0,0,625,627,3,90,45,0,626,624,1,0,0,0,627,630,1,0,0,
0,628,626,1,0,0,0,628,629,1,0,0,0,629,632,1,0,0,0,630,628,1,0,0,0,631,633,
5,59,0,0,632,631,1,0,0,0,632,633,1,0,0,0,633,635,1,0,0,0,634,623,1,0,0,0,
635,638,1,0,0,0,636,634,1,0,0,0,636,637,1,0,0,0,637,93,1,0,0,0,638,636,1,
0,0,0,639,641,5,39,0,0,640,642,3,92,46,0,641,640,1,0,0,0,641,642,1,0,0,0,
642,643,1,0,0,0,643,644,5,40,0,0,644,95,1,0,0,0,645,650,5,69,0,0,646,647,
5,61,0,0,647,649,5,69,0,0,648,646,1,0,0,0,649,652,1,0,0,0,650,648,1,0,0,
0,650,651,1,0,0,0,651,97,1,0,0,0,652,650,1,0,0,0,653,654,5,9,0,0,654,656,
3,96,48,0,655,657,3,88,44,0,656,655,1,0,0,0,656,657,1,0,0,0,657,659,1,0,
0,0,658,660,3,94,47,0,659,658,1,0,0,0,659,660,1,0,0,0,660,99,1,0,0,0,661,
662,5,7,0,0,662,663,5,37,0,0,663,664,5,69,0,0,664,665,5,15,0,0,665,666,3,
18,9,0,666,667,5,38,0,0,667,671,5,39,0,0,668,670,3,106,53,0,669,668,1,0,
0,0,670,673,1,0,0,0,671,669,1,0,0,0,671,672,1,0,0,0,672,674,1,0,0,0,673,
671,1,0,0,0,674,675,5,40,0,0,675,101,1,0,0,0,676,677,5,10,0,0,677,678,5,
37,0,0,678,679,3,18,9,0,679,680,5,38,0,0,680,684,5,39,0,0,681,683,3,106,
53,0,682,681,1,0,0,0,683,686,1,0,0,0,684,682,1,0,0,0,684,685,1,0,0,0,685,
687,1,0,0,0,686,684,1,0,0,0,687,688,5,40,0,0,688,103,1,0,0,0,689,690,5,8,
0,0,690,691,5,37,0,0,691,692,3,18,9,0,692,693,5,38,0,0,693,697,5,39,0,0,
694,696,3,106,53,0,695,694,1,0,0,0,696,699,1,0,0,0,697,695,1,0,0,0,697,698,
1,0,0,0,698,700,1,0,0,0,699,697,1,0,0,0,700,701,5,40,0,0,701,105,1,0,0,0,
702,708,3,14,7,0,703,708,3,98,49,0,704,708,3,104,52,0,705,708,3,100,50,0,
706,708,3,102,51,0,707,702,1,0,0,0,707,703,1,0,0,0,707,704,1,0,0,0,707,705,
1,0,0,0,707,706,1,0,0,0,708,107,1,0,0,0,709,719,5,55,0,0,710,715,5,69,0,
0,711,712,5,61,0,0,712,714,3,108,54,0,713,711,1,0,0,0,714,717,1,0,0,0,715,
713,1,0,0,0,715,716,1,0,0,0,716,719,1,0,0,0,717,715,1,0,0,0,718,709,1,0,
0,0,718,710,1,0,0,0,719,109,1,0,0,0,720,721,5,69,0,0,721,722,5,61,0,0,722,
723,3,108,54,0,723,111,1,0,0,0,724,725,5,17,0,0,725,739,5,39,0,0,726,731,
3,110,55,0,727,728,5,59,0,0,728,730,3,110,55,0,729,727,1,0,0,0,730,733,1,
0,0,0,731,729,1,0,0,0,731,732,1,0,0,0,732,735,1,0,0,0,733,731,1,0,0,0,734,
736,5,59,0,0,735,734,1,0,0,0,735,736,1,0,0,0,736,738,1,0,0,0,737,726,1,0,
0,0,738,741,1,0,0,0,739,737,1,0,0,0,739,740,1,0,0,0,740,742,1,0,0,0,741,
739,1,0,0,0,742,743,5,40,0,0,743,113,1,0,0,0,744,749,3,112,56,0,745,749,
3,106,53,0,746,749,3,80,40,0,747,749,3,82,41,0,748,744,1,0,0,0,748,745,1,
0,0,0,748,746,1,0,0,0,748,747,1,0,0,0,749,115,1,0,0,0,750,751,5,4,0,0,751,
752,5,69,0,0,752,756,5,39,0,0,753,755,3,114,57,0,754,753,1,0,0,0,755,758,
1,0,0,0,756,754,1,0,0,0,756,757,1,0,0,0,757,759,1,0,0,0,758,756,1,0,0,0,
759,760,5,40,0,0,760,117,1,0,0,0,761,765,3,50,25,0,762,765,3,86,43,0,763,
765,3,116,58,0,764,761,1,0,0,0,764,762,1,0,0,0,764,763,1,0,0,0,765,119,1,
0,0,0,766,768,5,2,0,0,767,766,1,0,0,0,767,768,1,0,0,0,768,770,1,0,0,0,769,
771,3,118,59,0,770,769,1,0,0,0,771,772,1,0,0,0,772,770,1,0,0,0,772,773,1,
0,0,0,773,774,1,0,0,0,774,775,5,0,0,1,775,121,1,0,0,0,77,134,147,153,165,
171,185,196,220,222,234,236,251,253,266,270,272,281,285,289,310,314,318,
333,337,341,362,372,374,383,389,395,397,402,409,423,433,438,446,453,461,
468,483,494,499,510,522,527,538,547,552,561,566,581,591,602,610,628,632,
636,641,650,656,659,671,684,697,707,715,718,731,735,739,748,756,764,767,
772];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class WdlDraft1Parser extends antlr4.Parser {

    static grammarFileName = "WdlDraft1Parser.g4";
    static literalNames = [ null, null, "'version draft-1'", "'import'", 
                            "'workflow'", "'task'", "'struct'", "'scatter'", 
                            "'while'", "'call'", "'if'", "'then'", "'else'", 
                            "'alias'", "'as'", "'in'", "'input'", "'output'", 
                            "'parameter_meta'", "'meta'", "'command'", "'runtime'", 
                            "'Boolean'", "'Int'", "'Float'", "'String'", 
                            "'File'", "'Array'", "'Map'", "'Pair'", "'Object'", 
                            "'object'", "'sep'", "'default'", null, null, 
                            null, "'('", "')'", null, null, "'['", null, 
                            "'\\'", null, "'<'", "'>'", "'>='", "'<='", 
                            "'=='", "'!='", "'='", "'&&'", "'||'", "'?'", 
                            "'*'", "'+'", "'-'", null, null, "';'", "'.'", 
                            "'!'", null, "'/'", "'%'", null, null, null, 
                            null, null, null, "'<<<'", null, null, null, 
                            null, null, null, null, null, null, null, null, 
                            null, null, null, null, null, null, "'null'", 
                            null, null, null, null, null, null, null, null, 
                            null, null, null, null, null, null, null, null, 
                            null, null, null, null, "'\\>>>'" ];
    static symbolicNames = [ null, "LINE_COMMENT", "VERSION", "IMPORT", 
                             "WORKFLOW", "TASK", "STRUCT", "SCATTER", "WHILE", 
                             "CALL", "IF", "THEN", "ELSE", "ALIAS", "AS", 
                             "In", "INPUT", "OUTPUT", "PARAMETERMETA", "META", 
                             "COMMAND", "RUNTIME", "BOOLEAN", "INT", "FLOAT", 
                             "STRING", "FILE", "ARRAY", "MAP", "PAIR", "OBJECT", 
                             "OBJECT_LITERAL", "SEP", "DEFAULT", "IntLiteral", 
                             "FloatLiteral", "BoolLiteral", "LPAREN", "RPAREN", 
                             "LBRACE", "RBRACE", "LBRACK", "RBRACK", "ESC", 
                             "COLON", "LT", "GT", "GTE", "LTE", "EQUALITY", 
                             "NOTEQUAL", "EQUAL", "AND", "OR", "OPTIONAL", 
                             "STAR", "PLUS", "MINUS", "DOLLAR", "COMMA", 
                             "SEMI", "DOT", "NOT", "TILDE", "DIVIDE", "MOD", 
                             "SQUOTE", "DQUOTE", "WHITESPACE", "Identifier", 
                             "StringPart", "BeginWhitespace", "BeginHereDoc", 
                             "BeginLBrace", "HereDocUnicodeEscape", "CommandUnicodeEscape", 
                             "StringCommandStart", "EndCommand", "CommandStringPart", 
                             "BeginMeta", "MetaWhitespace", "MetaBodyComment", 
                             "MetaIdentifier", "MetaColon", "EndMeta", "MetaBodyWhitespace", 
                             "MetaValueComment", "MetaBool", "MetaInt", 
                             "MetaFloat", "MetaNull", "MetaSquote", "MetaDquote", 
                             "MetaEmptyObject", "MetaEmptyArray", "MetaLbrack", 
                             "MetaLbrace", "MetaValueWhitespace", "MetaStringPart", 
                             "MetaArrayComment", "MetaArrayCommaRbrack", 
                             "MetaArrayComma", "MetaRbrack", "MetaArrayWhitespace", 
                             "MetaObjectComment", "MetaObjectIdentifier", 
                             "MetaObjectColon", "MetaObjectCommaRbrace", 
                             "MetaObjectComma", "MetaRbrace", "MetaObjectWhitespace", 
                             "HereDocEscapedEnd" ];
    static ruleNames = [ "map_type", "array_type", "pair_type", "type_base", 
                         "wdl_type", "unbound_decls", "bound_decls", "any_decls", 
                         "primitive_literal", "expr", "expr_infix", "expr_infix0", 
                         "expr_infix1", "expr_infix2", "expr_infix3", "expr_infix4", 
                         "expr_infix5", "expr_core", "number", "expression_placeholder_option", 
                         "string_part", "string_expr_part", "string_expr_with_string_part", 
                         "string", "import_as", "import_doc", "task_output", 
                         "task_command_string_part", "task_command_expr_part", 
                         "task_command_expr_with_string", "task_command", 
                         "task_runtime_kv", "task_runtime", "meta_value", 
                         "meta_string_part", "meta_string", "meta_array", 
                         "meta_object", "meta_object_kv", "meta_kv", "parameter_meta", 
                         "meta", "task_element", "task", "call_alias", "call_input", 
                         "call_inputs", "call_body", "call_name", "call", 
                         "scatter", "conditional", "loop", "inner_workflow_element", 
                         "workflow_output_fqn_part", "workflow_output_fqn", 
                         "workflow_output", "workflow_element", "workflow", 
                         "document_element", "document" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = WdlDraft1Parser.ruleNames;
        this.literalNames = WdlDraft1Parser.literalNames;
        this.symbolicNames = WdlDraft1Parser.symbolicNames;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 11:
    	    		return this.expr_infix0_sempred(localctx, predIndex);
    	case 12:
    	    		return this.expr_infix1_sempred(localctx, predIndex);
    	case 13:
    	    		return this.expr_infix2_sempred(localctx, predIndex);
    	case 14:
    	    		return this.expr_infix3_sempred(localctx, predIndex);
    	case 15:
    	    		return this.expr_infix4_sempred(localctx, predIndex);
    	case 17:
    	    		return this.expr_core_sempred(localctx, predIndex);
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

    expr_core_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 13:
    			return this.precpred(this._ctx, 6);
    		case 14:
    			return this.precpred(this._ctx, 5);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	map_type() {
	    let localctx = new Map_typeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, WdlDraft1Parser.RULE_map_type);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 122;
	        this.match(WdlDraft1Parser.MAP);
	        this.state = 123;
	        this.match(WdlDraft1Parser.LBRACK);
	        this.state = 124;
	        this.wdl_type();
	        this.state = 125;
	        this.match(WdlDraft1Parser.COMMA);
	        this.state = 126;
	        this.wdl_type();
	        this.state = 127;
	        this.match(WdlDraft1Parser.RBRACK);
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



	array_type() {
	    let localctx = new Array_typeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, WdlDraft1Parser.RULE_array_type);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 129;
	        this.match(WdlDraft1Parser.ARRAY);
	        this.state = 130;
	        this.match(WdlDraft1Parser.LBRACK);
	        this.state = 131;
	        this.wdl_type();
	        this.state = 132;
	        this.match(WdlDraft1Parser.RBRACK);
	        this.state = 134;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===56) {
	            this.state = 133;
	            this.match(WdlDraft1Parser.PLUS);
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



	pair_type() {
	    let localctx = new Pair_typeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, WdlDraft1Parser.RULE_pair_type);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 136;
	        this.match(WdlDraft1Parser.PAIR);
	        this.state = 137;
	        this.match(WdlDraft1Parser.LBRACK);
	        this.state = 138;
	        this.wdl_type();
	        this.state = 139;
	        this.match(WdlDraft1Parser.COMMA);
	        this.state = 140;
	        this.wdl_type();
	        this.state = 141;
	        this.match(WdlDraft1Parser.RBRACK);
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



	type_base() {
	    let localctx = new Type_baseContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, WdlDraft1Parser.RULE_type_base);
	    var _la = 0;
	    try {
	        this.state = 147;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 27:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 143;
	            this.array_type();
	            break;
	        case 28:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 144;
	            this.map_type();
	            break;
	        case 29:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 145;
	            this.pair_type();
	            break;
	        case 22:
	        case 23:
	        case 24:
	        case 25:
	        case 26:
	        case 30:
	        case 69:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 146;
	            _la = this._input.LA(1);
	            if(!((((_la) & ~0x1f) === 0 && ((1 << _la) & 1203765248) !== 0) || _la===69)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
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



	wdl_type() {
	    let localctx = new Wdl_typeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, WdlDraft1Parser.RULE_wdl_type);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 153;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
	        switch(la_) {
	        case 1:
	            this.state = 149;
	            this.type_base();
	            this.state = 150;
	            this.match(WdlDraft1Parser.OPTIONAL);
	            break;

	        case 2:
	            this.state = 152;
	            this.type_base();
	            break;

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



	unbound_decls() {
	    let localctx = new Unbound_declsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, WdlDraft1Parser.RULE_unbound_decls);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 155;
	        this.wdl_type();
	        this.state = 156;
	        this.match(WdlDraft1Parser.Identifier);
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



	bound_decls() {
	    let localctx = new Bound_declsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, WdlDraft1Parser.RULE_bound_decls);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 158;
	        this.wdl_type();
	        this.state = 159;
	        this.match(WdlDraft1Parser.Identifier);
	        this.state = 160;
	        this.match(WdlDraft1Parser.EQUAL);
	        this.state = 161;
	        this.expr();
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



	any_decls() {
	    let localctx = new Any_declsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, WdlDraft1Parser.RULE_any_decls);
	    try {
	        this.state = 165;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 163;
	            this.unbound_decls();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 164;
	            this.bound_decls();
	            break;

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
	    this.enterRule(localctx, 16, WdlDraft1Parser.RULE_primitive_literal);
	    try {
	        this.state = 171;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 36:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 167;
	            this.match(WdlDraft1Parser.BoolLiteral);
	            break;
	        case 34:
	        case 35:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 168;
	            this.number();
	            break;
	        case 66:
	        case 67:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 169;
	            this.string();
	            break;
	        case 69:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 170;
	            this.match(WdlDraft1Parser.Identifier);
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
	    this.enterRule(localctx, 18, WdlDraft1Parser.RULE_expr);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 173;
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
	    this.enterRule(localctx, 20, WdlDraft1Parser.RULE_expr_infix);
	    try {
	        localctx = new Infix0Context(this, localctx);
	        this.enterOuterAlt(localctx, 1);
	        this.state = 175;
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
	    const _startState = 22;
	    this.enterRecursionRule(localctx, 22, WdlDraft1Parser.RULE_expr_infix0, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        localctx = new Infix1Context(this, localctx);
	        this._ctx = localctx;
	        _prevctx = localctx;

	        this.state = 178;
	        this.expr_infix1(0);
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 185;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,5,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                localctx = new LorContext(this, new Expr_infix0Context(this, _parentctx, _parentState));
	                this.pushNewRecursionContext(localctx, _startState, WdlDraft1Parser.RULE_expr_infix0);
	                this.state = 180;
	                if (!( this.precpred(this._ctx, 2))) {
	                    throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                }
	                this.state = 181;
	                this.match(WdlDraft1Parser.OR);
	                this.state = 182;
	                this.expr_infix1(0); 
	            }
	            this.state = 187;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,5,this._ctx);
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
	    const _startState = 24;
	    this.enterRecursionRule(localctx, 24, WdlDraft1Parser.RULE_expr_infix1, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        localctx = new Infix2Context(this, localctx);
	        this._ctx = localctx;
	        _prevctx = localctx;

	        this.state = 189;
	        this.expr_infix2(0);
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 196;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,6,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                localctx = new LandContext(this, new Expr_infix1Context(this, _parentctx, _parentState));
	                this.pushNewRecursionContext(localctx, _startState, WdlDraft1Parser.RULE_expr_infix1);
	                this.state = 191;
	                if (!( this.precpred(this._ctx, 2))) {
	                    throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                }
	                this.state = 192;
	                this.match(WdlDraft1Parser.AND);
	                this.state = 193;
	                this.expr_infix2(0); 
	            }
	            this.state = 198;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,6,this._ctx);
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
	    const _startState = 26;
	    this.enterRecursionRule(localctx, 26, WdlDraft1Parser.RULE_expr_infix2, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        localctx = new Infix3Context(this, localctx);
	        this._ctx = localctx;
	        _prevctx = localctx;

	        this.state = 200;
	        this.expr_infix3(0);
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 222;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,8,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 220;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new EqeqContext(this, new Expr_infix2Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, WdlDraft1Parser.RULE_expr_infix2);
	                    this.state = 202;
	                    if (!( this.precpred(this._ctx, 7))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                    }
	                    this.state = 203;
	                    this.match(WdlDraft1Parser.EQUALITY);
	                    this.state = 204;
	                    this.expr_infix3(0);
	                    break;

	                case 2:
	                    localctx = new NeqContext(this, new Expr_infix2Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, WdlDraft1Parser.RULE_expr_infix2);
	                    this.state = 205;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 206;
	                    this.match(WdlDraft1Parser.NOTEQUAL);
	                    this.state = 207;
	                    this.expr_infix3(0);
	                    break;

	                case 3:
	                    localctx = new LteContext(this, new Expr_infix2Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, WdlDraft1Parser.RULE_expr_infix2);
	                    this.state = 208;
	                    if (!( this.precpred(this._ctx, 5))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
	                    }
	                    this.state = 209;
	                    this.match(WdlDraft1Parser.LTE);
	                    this.state = 210;
	                    this.expr_infix3(0);
	                    break;

	                case 4:
	                    localctx = new GteContext(this, new Expr_infix2Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, WdlDraft1Parser.RULE_expr_infix2);
	                    this.state = 211;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 212;
	                    this.match(WdlDraft1Parser.GTE);
	                    this.state = 213;
	                    this.expr_infix3(0);
	                    break;

	                case 5:
	                    localctx = new LtContext(this, new Expr_infix2Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, WdlDraft1Parser.RULE_expr_infix2);
	                    this.state = 214;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 215;
	                    this.match(WdlDraft1Parser.LT);
	                    this.state = 216;
	                    this.expr_infix3(0);
	                    break;

	                case 6:
	                    localctx = new GtContext(this, new Expr_infix2Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, WdlDraft1Parser.RULE_expr_infix2);
	                    this.state = 217;
	                    if (!( this.precpred(this._ctx, 2))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                    }
	                    this.state = 218;
	                    this.match(WdlDraft1Parser.GT);
	                    this.state = 219;
	                    this.expr_infix3(0);
	                    break;

	                } 
	            }
	            this.state = 224;
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


	expr_infix3(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new Expr_infix3Context(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 28;
	    this.enterRecursionRule(localctx, 28, WdlDraft1Parser.RULE_expr_infix3, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        localctx = new Infix4Context(this, localctx);
	        this._ctx = localctx;
	        _prevctx = localctx;

	        this.state = 226;
	        this.expr_infix4(0);
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 236;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,10,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 234;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,9,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new AddContext(this, new Expr_infix3Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, WdlDraft1Parser.RULE_expr_infix3);
	                    this.state = 228;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 229;
	                    this.match(WdlDraft1Parser.PLUS);
	                    this.state = 230;
	                    this.expr_infix4(0);
	                    break;

	                case 2:
	                    localctx = new SubContext(this, new Expr_infix3Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, WdlDraft1Parser.RULE_expr_infix3);
	                    this.state = 231;
	                    if (!( this.precpred(this._ctx, 2))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                    }
	                    this.state = 232;
	                    this.match(WdlDraft1Parser.MINUS);
	                    this.state = 233;
	                    this.expr_infix4(0);
	                    break;

	                } 
	            }
	            this.state = 238;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,10,this._ctx);
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
	    const _startState = 30;
	    this.enterRecursionRule(localctx, 30, WdlDraft1Parser.RULE_expr_infix4, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        localctx = new Infix5Context(this, localctx);
	        this._ctx = localctx;
	        _prevctx = localctx;

	        this.state = 240;
	        this.expr_infix5();
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 253;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,12,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 251;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,11,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new MulContext(this, new Expr_infix4Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, WdlDraft1Parser.RULE_expr_infix4);
	                    this.state = 242;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 243;
	                    this.match(WdlDraft1Parser.STAR);
	                    this.state = 244;
	                    this.expr_infix5();
	                    break;

	                case 2:
	                    localctx = new DivideContext(this, new Expr_infix4Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, WdlDraft1Parser.RULE_expr_infix4);
	                    this.state = 245;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 246;
	                    this.match(WdlDraft1Parser.DIVIDE);
	                    this.state = 247;
	                    this.expr_infix5();
	                    break;

	                case 3:
	                    localctx = new ModContext(this, new Expr_infix4Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, WdlDraft1Parser.RULE_expr_infix4);
	                    this.state = 248;
	                    if (!( this.precpred(this._ctx, 2))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                    }
	                    this.state = 249;
	                    this.match(WdlDraft1Parser.MOD);
	                    this.state = 250;
	                    this.expr_infix5();
	                    break;

	                } 
	            }
	            this.state = 255;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,12,this._ctx);
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
	    this.enterRule(localctx, 32, WdlDraft1Parser.RULE_expr_infix5);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 256;
	        this.expr_core(0);
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


	expr_core(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new Expr_coreContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 34;
	    this.enterRecursionRule(localctx, 34, WdlDraft1Parser.RULE_expr_core, _p);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 362;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,25,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new ApplyContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 259;
	            this.match(WdlDraft1Parser.Identifier);
	            this.state = 260;
	            this.match(WdlDraft1Parser.LPAREN);
	            this.state = 272;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(((((_la - 10)) & ~0x1f) === 0 && ((1 << (_la - 10)) & 2938109953) !== 0) || ((((_la - 56)) & ~0x1f) === 0 && ((1 << (_la - 56)) & 11331) !== 0)) {
	                this.state = 261;
	                this.expr();
	                this.state = 266;
	                this._errHandler.sync(this);
	                var _alt = this._interp.adaptivePredict(this._input,13,this._ctx)
	                while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	                    if(_alt===1) {
	                        this.state = 262;
	                        this.match(WdlDraft1Parser.COMMA);
	                        this.state = 263;
	                        this.expr(); 
	                    }
	                    this.state = 268;
	                    this._errHandler.sync(this);
	                    _alt = this._interp.adaptivePredict(this._input,13,this._ctx);
	                }

	                this.state = 270;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===59) {
	                    this.state = 269;
	                    this.match(WdlDraft1Parser.COMMA);
	                }

	            }

	            this.state = 274;
	            this.match(WdlDraft1Parser.RPAREN);
	            break;

	        case 2:
	            localctx = new Array_literalContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 275;
	            this.match(WdlDraft1Parser.LBRACK);
	            this.state = 289;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(((((_la - 10)) & ~0x1f) === 0 && ((1 << (_la - 10)) & 2938109953) !== 0) || ((((_la - 56)) & ~0x1f) === 0 && ((1 << (_la - 56)) & 11331) !== 0)) {
	                this.state = 276;
	                this.expr();
	                this.state = 281;
	                this._errHandler.sync(this);
	                var _alt = this._interp.adaptivePredict(this._input,16,this._ctx)
	                while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	                    if(_alt===1) {
	                        this.state = 277;
	                        this.match(WdlDraft1Parser.COMMA);
	                        this.state = 278;
	                        this.expr(); 
	                    }
	                    this.state = 283;
	                    this._errHandler.sync(this);
	                    _alt = this._interp.adaptivePredict(this._input,16,this._ctx);
	                }

	                this.state = 285;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===59) {
	                    this.state = 284;
	                    this.match(WdlDraft1Parser.COMMA);
	                }

	                this.state = 291;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 292;
	            this.match(WdlDraft1Parser.RBRACK);
	            break;

	        case 3:
	            localctx = new Pair_literalContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 293;
	            this.match(WdlDraft1Parser.LPAREN);
	            this.state = 294;
	            this.expr();
	            this.state = 295;
	            this.match(WdlDraft1Parser.COMMA);
	            this.state = 296;
	            this.expr();
	            this.state = 297;
	            this.match(WdlDraft1Parser.RPAREN);
	            break;

	        case 4:
	            localctx = new Map_literalContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 299;
	            this.match(WdlDraft1Parser.LBRACE);
	            this.state = 318;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(((((_la - 10)) & ~0x1f) === 0 && ((1 << (_la - 10)) & 2938109953) !== 0) || ((((_la - 56)) & ~0x1f) === 0 && ((1 << (_la - 56)) & 11331) !== 0)) {
	                this.state = 300;
	                this.expr();
	                this.state = 301;
	                this.match(WdlDraft1Parser.COLON);
	                this.state = 302;
	                this.expr();
	                this.state = 310;
	                this._errHandler.sync(this);
	                var _alt = this._interp.adaptivePredict(this._input,19,this._ctx)
	                while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	                    if(_alt===1) {
	                        this.state = 303;
	                        this.match(WdlDraft1Parser.COMMA);
	                        this.state = 304;
	                        this.expr();
	                        this.state = 305;
	                        this.match(WdlDraft1Parser.COLON);
	                        this.state = 306;
	                        this.expr(); 
	                    }
	                    this.state = 312;
	                    this._errHandler.sync(this);
	                    _alt = this._interp.adaptivePredict(this._input,19,this._ctx);
	                }

	                this.state = 314;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===59) {
	                    this.state = 313;
	                    this.match(WdlDraft1Parser.COMMA);
	                }

	                this.state = 320;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 321;
	            this.match(WdlDraft1Parser.RBRACE);
	            break;

	        case 5:
	            localctx = new Object_literalContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 322;
	            this.match(WdlDraft1Parser.OBJECT_LITERAL);
	            this.state = 323;
	            this.match(WdlDraft1Parser.LBRACE);
	            this.state = 341;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===69) {
	                this.state = 324;
	                this.match(WdlDraft1Parser.Identifier);
	                this.state = 325;
	                this.match(WdlDraft1Parser.COLON);
	                this.state = 326;
	                this.expr();
	                this.state = 333;
	                this._errHandler.sync(this);
	                var _alt = this._interp.adaptivePredict(this._input,22,this._ctx)
	                while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	                    if(_alt===1) {
	                        this.state = 327;
	                        this.match(WdlDraft1Parser.COMMA);
	                        this.state = 328;
	                        this.match(WdlDraft1Parser.Identifier);
	                        this.state = 329;
	                        this.match(WdlDraft1Parser.COLON);
	                        this.state = 330;
	                        this.expr(); 
	                    }
	                    this.state = 335;
	                    this._errHandler.sync(this);
	                    _alt = this._interp.adaptivePredict(this._input,22,this._ctx);
	                }

	                this.state = 337;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===59) {
	                    this.state = 336;
	                    this.match(WdlDraft1Parser.COMMA);
	                }

	                this.state = 343;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 344;
	            this.match(WdlDraft1Parser.RBRACE);
	            break;

	        case 6:
	            localctx = new IfthenelseContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 345;
	            this.match(WdlDraft1Parser.IF);
	            this.state = 346;
	            this.expr();
	            this.state = 347;
	            this.match(WdlDraft1Parser.THEN);
	            this.state = 348;
	            this.expr();
	            this.state = 349;
	            this.match(WdlDraft1Parser.ELSE);
	            this.state = 350;
	            this.expr();
	            break;

	        case 7:
	            localctx = new Expression_groupContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 352;
	            this.match(WdlDraft1Parser.LPAREN);
	            this.state = 353;
	            this.expr();
	            this.state = 354;
	            this.match(WdlDraft1Parser.RPAREN);
	            break;

	        case 8:
	            localctx = new NegateContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 356;
	            this.match(WdlDraft1Parser.NOT);
	            this.state = 357;
	            this.expr();
	            break;

	        case 9:
	            localctx = new UnarysignedContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 358;
	            _la = this._input.LA(1);
	            if(!(_la===56 || _la===57)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 359;
	            this.expr();
	            break;

	        case 10:
	            localctx = new PrimitivesContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 360;
	            this.primitive_literal();
	            break;

	        case 11:
	            localctx = new Left_nameContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 361;
	            this.match(WdlDraft1Parser.Identifier);
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 374;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,27,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 372;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,26,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new AtContext(this, new Expr_coreContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, WdlDraft1Parser.RULE_expr_core);
	                    this.state = 364;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 365;
	                    this.match(WdlDraft1Parser.LBRACK);
	                    this.state = 366;
	                    this.expr();
	                    this.state = 367;
	                    this.match(WdlDraft1Parser.RBRACK);
	                    break;

	                case 2:
	                    localctx = new Get_nameContext(this, new Expr_coreContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, WdlDraft1Parser.RULE_expr_core);
	                    this.state = 369;
	                    if (!( this.precpred(this._ctx, 5))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
	                    }
	                    this.state = 370;
	                    this.match(WdlDraft1Parser.DOT);
	                    this.state = 371;
	                    this.match(WdlDraft1Parser.Identifier);
	                    break;

	                } 
	            }
	            this.state = 376;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,27,this._ctx);
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



	number() {
	    let localctx = new NumberContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 36, WdlDraft1Parser.RULE_number);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 377;
	        _la = this._input.LA(1);
	        if(!(_la===34 || _la===35)) {
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
	    this.enterRule(localctx, 38, WdlDraft1Parser.RULE_expression_placeholder_option);
	    try {
	        this.state = 397;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 36:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 379;
	            this.match(WdlDraft1Parser.BoolLiteral);
	            this.state = 380;
	            this.match(WdlDraft1Parser.EQUAL);
	            this.state = 383;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case 66:
	            case 67:
	                this.state = 381;
	                this.string();
	                break;
	            case 34:
	            case 35:
	                this.state = 382;
	                this.number();
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            break;
	        case 33:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 385;
	            this.match(WdlDraft1Parser.DEFAULT);
	            this.state = 386;
	            this.match(WdlDraft1Parser.EQUAL);
	            this.state = 389;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case 66:
	            case 67:
	                this.state = 387;
	                this.string();
	                break;
	            case 34:
	            case 35:
	                this.state = 388;
	                this.number();
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            break;
	        case 32:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 391;
	            this.match(WdlDraft1Parser.SEP);
	            this.state = 392;
	            this.match(WdlDraft1Parser.EQUAL);
	            this.state = 395;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case 66:
	            case 67:
	                this.state = 393;
	                this.string();
	                break;
	            case 34:
	            case 35:
	                this.state = 394;
	                this.number();
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
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
	    this.enterRule(localctx, 40, WdlDraft1Parser.RULE_string_part);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 402;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===70) {
	            this.state = 399;
	            this.match(WdlDraft1Parser.StringPart);
	            this.state = 404;
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
	    this.enterRule(localctx, 42, WdlDraft1Parser.RULE_string_expr_part);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 405;
	        this.match(WdlDraft1Parser.StringCommandStart);
	        this.state = 409;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,33,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 406;
	                this.expression_placeholder_option(); 
	            }
	            this.state = 411;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,33,this._ctx);
	        }

	        this.state = 412;
	        this.expr();
	        this.state = 413;
	        this.match(WdlDraft1Parser.RBRACE);
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
	    this.enterRule(localctx, 44, WdlDraft1Parser.RULE_string_expr_with_string_part);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 415;
	        this.string_expr_part();
	        this.state = 416;
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
	    this.enterRule(localctx, 46, WdlDraft1Parser.RULE_string);
	    var _la = 0;
	    try {
	        this.state = 438;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 67:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 418;
	            this.match(WdlDraft1Parser.DQUOTE);
	            this.state = 419;
	            this.string_part();
	            this.state = 423;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===76) {
	                this.state = 420;
	                this.string_expr_with_string_part();
	                this.state = 425;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 426;
	            this.match(WdlDraft1Parser.DQUOTE);
	            break;
	        case 66:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 428;
	            this.match(WdlDraft1Parser.SQUOTE);
	            this.state = 429;
	            this.string_part();
	            this.state = 433;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===76) {
	                this.state = 430;
	                this.string_expr_with_string_part();
	                this.state = 435;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 436;
	            this.match(WdlDraft1Parser.SQUOTE);
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



	import_as() {
	    let localctx = new Import_asContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 48, WdlDraft1Parser.RULE_import_as);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 440;
	        this.match(WdlDraft1Parser.AS);
	        this.state = 441;
	        this.match(WdlDraft1Parser.Identifier);
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



	import_doc() {
	    let localctx = new Import_docContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 50, WdlDraft1Parser.RULE_import_doc);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 443;
	        this.match(WdlDraft1Parser.IMPORT);
	        this.state = 444;
	        this.string();
	        this.state = 446;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===14) {
	            this.state = 445;
	            this.import_as();
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



	task_output() {
	    let localctx = new Task_outputContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 52, WdlDraft1Parser.RULE_task_output);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 448;
	        this.match(WdlDraft1Parser.OUTPUT);
	        this.state = 449;
	        this.match(WdlDraft1Parser.LBRACE);
	        this.state = 453;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) === 0 && ((1 << _la) & 2143289344) !== 0) || _la===69) {
	            this.state = 450;
	            this.bound_decls();
	            this.state = 455;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 456;
	        this.match(WdlDraft1Parser.RBRACE);
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



	task_command_string_part() {
	    let localctx = new Task_command_string_partContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 54, WdlDraft1Parser.RULE_task_command_string_part);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 461;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===78) {
	            this.state = 458;
	            this.match(WdlDraft1Parser.CommandStringPart);
	            this.state = 463;
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



	task_command_expr_part() {
	    let localctx = new Task_command_expr_partContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 56, WdlDraft1Parser.RULE_task_command_expr_part);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 464;
	        this.match(WdlDraft1Parser.StringCommandStart);
	        this.state = 468;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,40,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 465;
	                this.expression_placeholder_option(); 
	            }
	            this.state = 470;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,40,this._ctx);
	        }

	        this.state = 471;
	        this.expr();
	        this.state = 472;
	        this.match(WdlDraft1Parser.RBRACE);
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



	task_command_expr_with_string() {
	    let localctx = new Task_command_expr_with_stringContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 58, WdlDraft1Parser.RULE_task_command_expr_with_string);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 474;
	        this.task_command_expr_part();
	        this.state = 475;
	        this.task_command_string_part();
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



	task_command() {
	    let localctx = new Task_commandContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 60, WdlDraft1Parser.RULE_task_command);
	    var _la = 0;
	    try {
	        this.state = 499;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,43,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 477;
	            this.match(WdlDraft1Parser.COMMAND);
	            this.state = 478;
	            this.match(WdlDraft1Parser.BeginLBrace);
	            this.state = 479;
	            this.task_command_string_part();
	            this.state = 483;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===76) {
	                this.state = 480;
	                this.task_command_expr_with_string();
	                this.state = 485;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 486;
	            this.match(WdlDraft1Parser.EndCommand);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 488;
	            this.match(WdlDraft1Parser.COMMAND);
	            this.state = 489;
	            this.match(WdlDraft1Parser.BeginHereDoc);
	            this.state = 490;
	            this.task_command_string_part();
	            this.state = 494;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===76) {
	                this.state = 491;
	                this.task_command_expr_with_string();
	                this.state = 496;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 497;
	            this.match(WdlDraft1Parser.EndCommand);
	            break;

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



	task_runtime_kv() {
	    let localctx = new Task_runtime_kvContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 62, WdlDraft1Parser.RULE_task_runtime_kv);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 501;
	        this.match(WdlDraft1Parser.Identifier);
	        this.state = 502;
	        this.match(WdlDraft1Parser.COLON);
	        this.state = 503;
	        this.expr();
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



	task_runtime() {
	    let localctx = new Task_runtimeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 64, WdlDraft1Parser.RULE_task_runtime);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 505;
	        this.match(WdlDraft1Parser.RUNTIME);
	        this.state = 506;
	        this.match(WdlDraft1Parser.LBRACE);
	        this.state = 510;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===69) {
	            this.state = 507;
	            this.task_runtime_kv();
	            this.state = 512;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 513;
	        this.match(WdlDraft1Parser.RBRACE);
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



	meta_value() {
	    let localctx = new Meta_valueContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 66, WdlDraft1Parser.RULE_meta_value);
	    try {
	        this.state = 522;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 90:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 515;
	            this.match(WdlDraft1Parser.MetaNull);
	            break;
	        case 87:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 516;
	            this.match(WdlDraft1Parser.MetaBool);
	            break;
	        case 88:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 517;
	            this.match(WdlDraft1Parser.MetaInt);
	            break;
	        case 89:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 518;
	            this.match(WdlDraft1Parser.MetaFloat);
	            break;
	        case 91:
	        case 92:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 519;
	            this.meta_string();
	            break;
	        case 93:
	        case 96:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 520;
	            this.meta_object();
	            break;
	        case 94:
	        case 95:
	            this.enterOuterAlt(localctx, 7);
	            this.state = 521;
	            this.meta_array();
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



	meta_string_part() {
	    let localctx = new Meta_string_partContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 68, WdlDraft1Parser.RULE_meta_string_part);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 527;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===98) {
	            this.state = 524;
	            this.match(WdlDraft1Parser.MetaStringPart);
	            this.state = 529;
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



	meta_string() {
	    let localctx = new Meta_stringContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 70, WdlDraft1Parser.RULE_meta_string);
	    try {
	        this.state = 538;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 92:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 530;
	            this.match(WdlDraft1Parser.MetaDquote);
	            this.state = 531;
	            this.meta_string_part();
	            this.state = 532;
	            this.match(WdlDraft1Parser.MetaDquote);
	            break;
	        case 91:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 534;
	            this.match(WdlDraft1Parser.MetaSquote);
	            this.state = 535;
	            this.meta_string_part();
	            this.state = 536;
	            this.match(WdlDraft1Parser.MetaSquote);
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



	meta_array() {
	    let localctx = new Meta_arrayContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 72, WdlDraft1Parser.RULE_meta_array);
	    var _la = 0;
	    try {
	        this.state = 552;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 94:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 540;
	            this.match(WdlDraft1Parser.MetaEmptyArray);
	            break;
	        case 95:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 541;
	            this.match(WdlDraft1Parser.MetaLbrack);
	            this.state = 542;
	            this.meta_value();
	            this.state = 547;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===101) {
	                this.state = 543;
	                this.match(WdlDraft1Parser.MetaArrayComma);
	                this.state = 544;
	                this.meta_value();
	                this.state = 549;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 550;
	            _la = this._input.LA(1);
	            if(!(_la===100 || _la===102)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
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



	meta_object() {
	    let localctx = new Meta_objectContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 74, WdlDraft1Parser.RULE_meta_object);
	    var _la = 0;
	    try {
	        this.state = 566;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 93:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 554;
	            this.match(WdlDraft1Parser.MetaEmptyObject);
	            break;
	        case 96:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 555;
	            this.match(WdlDraft1Parser.MetaLbrace);
	            this.state = 556;
	            this.meta_object_kv();
	            this.state = 561;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===108) {
	                this.state = 557;
	                this.match(WdlDraft1Parser.MetaObjectComma);
	                this.state = 558;
	                this.meta_object_kv();
	                this.state = 563;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 564;
	            _la = this._input.LA(1);
	            if(!(_la===107 || _la===109)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
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



	meta_object_kv() {
	    let localctx = new Meta_object_kvContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 76, WdlDraft1Parser.RULE_meta_object_kv);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 568;
	        this.match(WdlDraft1Parser.MetaObjectIdentifier);
	        this.state = 569;
	        this.match(WdlDraft1Parser.MetaObjectColon);
	        this.state = 570;
	        this.meta_value();
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



	meta_kv() {
	    let localctx = new Meta_kvContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 78, WdlDraft1Parser.RULE_meta_kv);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 572;
	        this.match(WdlDraft1Parser.MetaIdentifier);
	        this.state = 573;
	        this.match(WdlDraft1Parser.MetaColon);
	        this.state = 574;
	        this.meta_value();
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



	parameter_meta() {
	    let localctx = new Parameter_metaContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 80, WdlDraft1Parser.RULE_parameter_meta);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 576;
	        this.match(WdlDraft1Parser.PARAMETERMETA);
	        this.state = 577;
	        this.match(WdlDraft1Parser.BeginMeta);
	        this.state = 581;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===82) {
	            this.state = 578;
	            this.meta_kv();
	            this.state = 583;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 584;
	        this.match(WdlDraft1Parser.EndMeta);
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



	meta() {
	    let localctx = new MetaContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 82, WdlDraft1Parser.RULE_meta);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 586;
	        this.match(WdlDraft1Parser.META);
	        this.state = 587;
	        this.match(WdlDraft1Parser.BeginMeta);
	        this.state = 591;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===82) {
	            this.state = 588;
	            this.meta_kv();
	            this.state = 593;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 594;
	        this.match(WdlDraft1Parser.EndMeta);
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



	task_element() {
	    let localctx = new Task_elementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 84, WdlDraft1Parser.RULE_task_element);
	    try {
	        this.state = 602;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 17:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 596;
	            this.task_output();
	            break;
	        case 20:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 597;
	            this.task_command();
	            break;
	        case 21:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 598;
	            this.task_runtime();
	            break;
	        case 22:
	        case 23:
	        case 24:
	        case 25:
	        case 26:
	        case 27:
	        case 28:
	        case 29:
	        case 30:
	        case 69:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 599;
	            this.any_decls();
	            break;
	        case 18:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 600;
	            this.parameter_meta();
	            break;
	        case 19:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 601;
	            this.meta();
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



	task() {
	    let localctx = new TaskContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 86, WdlDraft1Parser.RULE_task);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 604;
	        this.match(WdlDraft1Parser.TASK);
	        this.state = 605;
	        this.match(WdlDraft1Parser.Identifier);
	        this.state = 606;
	        this.match(WdlDraft1Parser.LBRACE);
	        this.state = 608; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 607;
	            this.task_element();
	            this.state = 610; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while((((_la) & ~0x1f) === 0 && ((1 << _la) & 2147352576) !== 0) || _la===69);
	        this.state = 612;
	        this.match(WdlDraft1Parser.RBRACE);
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



	call_alias() {
	    let localctx = new Call_aliasContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 88, WdlDraft1Parser.RULE_call_alias);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 614;
	        this.match(WdlDraft1Parser.AS);
	        this.state = 615;
	        this.match(WdlDraft1Parser.Identifier);
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



	call_input() {
	    let localctx = new Call_inputContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 90, WdlDraft1Parser.RULE_call_input);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 617;
	        this.match(WdlDraft1Parser.Identifier);
	        this.state = 618;
	        this.match(WdlDraft1Parser.EQUAL);
	        this.state = 619;
	        this.expr();
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



	call_inputs() {
	    let localctx = new Call_inputsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 92, WdlDraft1Parser.RULE_call_inputs);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 621;
	        this.match(WdlDraft1Parser.INPUT);
	        this.state = 622;
	        this.match(WdlDraft1Parser.COLON);
	        this.state = 636;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===69) {
	            this.state = 623;
	            this.call_input();
	            this.state = 628;
	            this._errHandler.sync(this);
	            var _alt = this._interp.adaptivePredict(this._input,56,this._ctx)
	            while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	                if(_alt===1) {
	                    this.state = 624;
	                    this.match(WdlDraft1Parser.COMMA);
	                    this.state = 625;
	                    this.call_input(); 
	                }
	                this.state = 630;
	                this._errHandler.sync(this);
	                _alt = this._interp.adaptivePredict(this._input,56,this._ctx);
	            }

	            this.state = 632;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===59) {
	                this.state = 631;
	                this.match(WdlDraft1Parser.COMMA);
	            }

	            this.state = 638;
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



	call_body() {
	    let localctx = new Call_bodyContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 94, WdlDraft1Parser.RULE_call_body);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 639;
	        this.match(WdlDraft1Parser.LBRACE);
	        this.state = 641;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===16) {
	            this.state = 640;
	            this.call_inputs();
	        }

	        this.state = 643;
	        this.match(WdlDraft1Parser.RBRACE);
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



	call_name() {
	    let localctx = new Call_nameContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 96, WdlDraft1Parser.RULE_call_name);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 645;
	        this.match(WdlDraft1Parser.Identifier);
	        this.state = 650;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===61) {
	            this.state = 646;
	            this.match(WdlDraft1Parser.DOT);
	            this.state = 647;
	            this.match(WdlDraft1Parser.Identifier);
	            this.state = 652;
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



	call() {
	    let localctx = new CallContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 98, WdlDraft1Parser.RULE_call);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 653;
	        this.match(WdlDraft1Parser.CALL);
	        this.state = 654;
	        this.call_name();
	        this.state = 656;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===14) {
	            this.state = 655;
	            this.call_alias();
	        }

	        this.state = 659;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===39) {
	            this.state = 658;
	            this.call_body();
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



	scatter() {
	    let localctx = new ScatterContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 100, WdlDraft1Parser.RULE_scatter);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 661;
	        this.match(WdlDraft1Parser.SCATTER);
	        this.state = 662;
	        this.match(WdlDraft1Parser.LPAREN);
	        this.state = 663;
	        this.match(WdlDraft1Parser.Identifier);
	        this.state = 664;
	        this.match(WdlDraft1Parser.In);
	        this.state = 665;
	        this.expr();
	        this.state = 666;
	        this.match(WdlDraft1Parser.RPAREN);
	        this.state = 667;
	        this.match(WdlDraft1Parser.LBRACE);
	        this.state = 671;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) === 0 && ((1 << _la) & 2143291264) !== 0) || _la===69) {
	            this.state = 668;
	            this.inner_workflow_element();
	            this.state = 673;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 674;
	        this.match(WdlDraft1Parser.RBRACE);
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



	conditional() {
	    let localctx = new ConditionalContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 102, WdlDraft1Parser.RULE_conditional);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 676;
	        this.match(WdlDraft1Parser.IF);
	        this.state = 677;
	        this.match(WdlDraft1Parser.LPAREN);
	        this.state = 678;
	        this.expr();
	        this.state = 679;
	        this.match(WdlDraft1Parser.RPAREN);
	        this.state = 680;
	        this.match(WdlDraft1Parser.LBRACE);
	        this.state = 684;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) === 0 && ((1 << _la) & 2143291264) !== 0) || _la===69) {
	            this.state = 681;
	            this.inner_workflow_element();
	            this.state = 686;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 687;
	        this.match(WdlDraft1Parser.RBRACE);
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



	loop() {
	    let localctx = new LoopContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 104, WdlDraft1Parser.RULE_loop);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 689;
	        this.match(WdlDraft1Parser.WHILE);
	        this.state = 690;
	        this.match(WdlDraft1Parser.LPAREN);
	        this.state = 691;
	        this.expr();
	        this.state = 692;
	        this.match(WdlDraft1Parser.RPAREN);
	        this.state = 693;
	        this.match(WdlDraft1Parser.LBRACE);
	        this.state = 697;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) === 0 && ((1 << _la) & 2143291264) !== 0) || _la===69) {
	            this.state = 694;
	            this.inner_workflow_element();
	            this.state = 699;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 700;
	        this.match(WdlDraft1Parser.RBRACE);
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



	inner_workflow_element() {
	    let localctx = new Inner_workflow_elementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 106, WdlDraft1Parser.RULE_inner_workflow_element);
	    try {
	        this.state = 707;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 22:
	        case 23:
	        case 24:
	        case 25:
	        case 26:
	        case 27:
	        case 28:
	        case 29:
	        case 30:
	        case 69:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 702;
	            this.any_decls();
	            break;
	        case 9:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 703;
	            this.call();
	            break;
	        case 8:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 704;
	            this.loop();
	            break;
	        case 7:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 705;
	            this.scatter();
	            break;
	        case 10:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 706;
	            this.conditional();
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



	workflow_output_fqn_part() {
	    let localctx = new Workflow_output_fqn_partContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 108, WdlDraft1Parser.RULE_workflow_output_fqn_part);
	    try {
	        this.state = 718;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 55:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 709;
	            this.match(WdlDraft1Parser.STAR);
	            break;
	        case 69:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 710;
	            this.match(WdlDraft1Parser.Identifier);
	            this.state = 715;
	            this._errHandler.sync(this);
	            var _alt = this._interp.adaptivePredict(this._input,67,this._ctx)
	            while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	                if(_alt===1) {
	                    this.state = 711;
	                    this.match(WdlDraft1Parser.DOT);
	                    this.state = 712;
	                    this.workflow_output_fqn_part(); 
	                }
	                this.state = 717;
	                this._errHandler.sync(this);
	                _alt = this._interp.adaptivePredict(this._input,67,this._ctx);
	            }

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



	workflow_output_fqn() {
	    let localctx = new Workflow_output_fqnContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 110, WdlDraft1Parser.RULE_workflow_output_fqn);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 720;
	        this.match(WdlDraft1Parser.Identifier);
	        this.state = 721;
	        this.match(WdlDraft1Parser.DOT);
	        this.state = 722;
	        this.workflow_output_fqn_part();
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



	workflow_output() {
	    let localctx = new Workflow_outputContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 112, WdlDraft1Parser.RULE_workflow_output);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 724;
	        this.match(WdlDraft1Parser.OUTPUT);
	        this.state = 725;
	        this.match(WdlDraft1Parser.LBRACE);
	        this.state = 739;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===69) {
	            this.state = 726;
	            this.workflow_output_fqn();
	            this.state = 731;
	            this._errHandler.sync(this);
	            var _alt = this._interp.adaptivePredict(this._input,69,this._ctx)
	            while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	                if(_alt===1) {
	                    this.state = 727;
	                    this.match(WdlDraft1Parser.COMMA);
	                    this.state = 728;
	                    this.workflow_output_fqn(); 
	                }
	                this.state = 733;
	                this._errHandler.sync(this);
	                _alt = this._interp.adaptivePredict(this._input,69,this._ctx);
	            }

	            this.state = 735;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===59) {
	                this.state = 734;
	                this.match(WdlDraft1Parser.COMMA);
	            }

	            this.state = 741;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 742;
	        this.match(WdlDraft1Parser.RBRACE);
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



	workflow_element() {
	    let localctx = new Workflow_elementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 114, WdlDraft1Parser.RULE_workflow_element);
	    try {
	        this.state = 748;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 17:
	            localctx = new OutputContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 744;
	            this.workflow_output();
	            break;
	        case 7:
	        case 8:
	        case 9:
	        case 10:
	        case 22:
	        case 23:
	        case 24:
	        case 25:
	        case 26:
	        case 27:
	        case 28:
	        case 29:
	        case 30:
	        case 69:
	            localctx = new Inner_elementContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 745;
	            this.inner_workflow_element();
	            break;
	        case 18:
	            localctx = new Parameter_meta_elementContext(this, localctx);
	            this.enterOuterAlt(localctx, 3);
	            this.state = 746;
	            this.parameter_meta();
	            break;
	        case 19:
	            localctx = new Meta_elementContext(this, localctx);
	            this.enterOuterAlt(localctx, 4);
	            this.state = 747;
	            this.meta();
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



	workflow() {
	    let localctx = new WorkflowContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 116, WdlDraft1Parser.RULE_workflow);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 750;
	        this.match(WdlDraft1Parser.WORKFLOW);
	        this.state = 751;
	        this.match(WdlDraft1Parser.Identifier);
	        this.state = 752;
	        this.match(WdlDraft1Parser.LBRACE);
	        this.state = 756;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) === 0 && ((1 << _la) & 2144208768) !== 0) || _la===69) {
	            this.state = 753;
	            this.workflow_element();
	            this.state = 758;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 759;
	        this.match(WdlDraft1Parser.RBRACE);
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



	document_element() {
	    let localctx = new Document_elementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 118, WdlDraft1Parser.RULE_document_element);
	    try {
	        this.state = 764;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 3:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 761;
	            this.import_doc();
	            break;
	        case 5:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 762;
	            this.task();
	            break;
	        case 4:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 763;
	            this.workflow();
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



	document() {
	    let localctx = new DocumentContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 120, WdlDraft1Parser.RULE_document);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 767;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===2) {
	            this.state = 766;
	            this.match(WdlDraft1Parser.VERSION);
	        }

	        this.state = 770; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 769;
	            this.document_element();
	            this.state = 772; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while((((_la) & ~0x1f) === 0 && ((1 << _la) & 56) !== 0));
	        this.state = 774;
	        this.match(WdlDraft1Parser.EOF);
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

WdlDraft1Parser.EOF = antlr4.Token.EOF;
WdlDraft1Parser.LINE_COMMENT = 1;
WdlDraft1Parser.VERSION = 2;
WdlDraft1Parser.IMPORT = 3;
WdlDraft1Parser.WORKFLOW = 4;
WdlDraft1Parser.TASK = 5;
WdlDraft1Parser.STRUCT = 6;
WdlDraft1Parser.SCATTER = 7;
WdlDraft1Parser.WHILE = 8;
WdlDraft1Parser.CALL = 9;
WdlDraft1Parser.IF = 10;
WdlDraft1Parser.THEN = 11;
WdlDraft1Parser.ELSE = 12;
WdlDraft1Parser.ALIAS = 13;
WdlDraft1Parser.AS = 14;
WdlDraft1Parser.In = 15;
WdlDraft1Parser.INPUT = 16;
WdlDraft1Parser.OUTPUT = 17;
WdlDraft1Parser.PARAMETERMETA = 18;
WdlDraft1Parser.META = 19;
WdlDraft1Parser.COMMAND = 20;
WdlDraft1Parser.RUNTIME = 21;
WdlDraft1Parser.BOOLEAN = 22;
WdlDraft1Parser.INT = 23;
WdlDraft1Parser.FLOAT = 24;
WdlDraft1Parser.STRING = 25;
WdlDraft1Parser.FILE = 26;
WdlDraft1Parser.ARRAY = 27;
WdlDraft1Parser.MAP = 28;
WdlDraft1Parser.PAIR = 29;
WdlDraft1Parser.OBJECT = 30;
WdlDraft1Parser.OBJECT_LITERAL = 31;
WdlDraft1Parser.SEP = 32;
WdlDraft1Parser.DEFAULT = 33;
WdlDraft1Parser.IntLiteral = 34;
WdlDraft1Parser.FloatLiteral = 35;
WdlDraft1Parser.BoolLiteral = 36;
WdlDraft1Parser.LPAREN = 37;
WdlDraft1Parser.RPAREN = 38;
WdlDraft1Parser.LBRACE = 39;
WdlDraft1Parser.RBRACE = 40;
WdlDraft1Parser.LBRACK = 41;
WdlDraft1Parser.RBRACK = 42;
WdlDraft1Parser.ESC = 43;
WdlDraft1Parser.COLON = 44;
WdlDraft1Parser.LT = 45;
WdlDraft1Parser.GT = 46;
WdlDraft1Parser.GTE = 47;
WdlDraft1Parser.LTE = 48;
WdlDraft1Parser.EQUALITY = 49;
WdlDraft1Parser.NOTEQUAL = 50;
WdlDraft1Parser.EQUAL = 51;
WdlDraft1Parser.AND = 52;
WdlDraft1Parser.OR = 53;
WdlDraft1Parser.OPTIONAL = 54;
WdlDraft1Parser.STAR = 55;
WdlDraft1Parser.PLUS = 56;
WdlDraft1Parser.MINUS = 57;
WdlDraft1Parser.DOLLAR = 58;
WdlDraft1Parser.COMMA = 59;
WdlDraft1Parser.SEMI = 60;
WdlDraft1Parser.DOT = 61;
WdlDraft1Parser.NOT = 62;
WdlDraft1Parser.TILDE = 63;
WdlDraft1Parser.DIVIDE = 64;
WdlDraft1Parser.MOD = 65;
WdlDraft1Parser.SQUOTE = 66;
WdlDraft1Parser.DQUOTE = 67;
WdlDraft1Parser.WHITESPACE = 68;
WdlDraft1Parser.Identifier = 69;
WdlDraft1Parser.StringPart = 70;
WdlDraft1Parser.BeginWhitespace = 71;
WdlDraft1Parser.BeginHereDoc = 72;
WdlDraft1Parser.BeginLBrace = 73;
WdlDraft1Parser.HereDocUnicodeEscape = 74;
WdlDraft1Parser.CommandUnicodeEscape = 75;
WdlDraft1Parser.StringCommandStart = 76;
WdlDraft1Parser.EndCommand = 77;
WdlDraft1Parser.CommandStringPart = 78;
WdlDraft1Parser.BeginMeta = 79;
WdlDraft1Parser.MetaWhitespace = 80;
WdlDraft1Parser.MetaBodyComment = 81;
WdlDraft1Parser.MetaIdentifier = 82;
WdlDraft1Parser.MetaColon = 83;
WdlDraft1Parser.EndMeta = 84;
WdlDraft1Parser.MetaBodyWhitespace = 85;
WdlDraft1Parser.MetaValueComment = 86;
WdlDraft1Parser.MetaBool = 87;
WdlDraft1Parser.MetaInt = 88;
WdlDraft1Parser.MetaFloat = 89;
WdlDraft1Parser.MetaNull = 90;
WdlDraft1Parser.MetaSquote = 91;
WdlDraft1Parser.MetaDquote = 92;
WdlDraft1Parser.MetaEmptyObject = 93;
WdlDraft1Parser.MetaEmptyArray = 94;
WdlDraft1Parser.MetaLbrack = 95;
WdlDraft1Parser.MetaLbrace = 96;
WdlDraft1Parser.MetaValueWhitespace = 97;
WdlDraft1Parser.MetaStringPart = 98;
WdlDraft1Parser.MetaArrayComment = 99;
WdlDraft1Parser.MetaArrayCommaRbrack = 100;
WdlDraft1Parser.MetaArrayComma = 101;
WdlDraft1Parser.MetaRbrack = 102;
WdlDraft1Parser.MetaArrayWhitespace = 103;
WdlDraft1Parser.MetaObjectComment = 104;
WdlDraft1Parser.MetaObjectIdentifier = 105;
WdlDraft1Parser.MetaObjectColon = 106;
WdlDraft1Parser.MetaObjectCommaRbrace = 107;
WdlDraft1Parser.MetaObjectComma = 108;
WdlDraft1Parser.MetaRbrace = 109;
WdlDraft1Parser.MetaObjectWhitespace = 110;
WdlDraft1Parser.HereDocEscapedEnd = 111;

WdlDraft1Parser.RULE_map_type = 0;
WdlDraft1Parser.RULE_array_type = 1;
WdlDraft1Parser.RULE_pair_type = 2;
WdlDraft1Parser.RULE_type_base = 3;
WdlDraft1Parser.RULE_wdl_type = 4;
WdlDraft1Parser.RULE_unbound_decls = 5;
WdlDraft1Parser.RULE_bound_decls = 6;
WdlDraft1Parser.RULE_any_decls = 7;
WdlDraft1Parser.RULE_primitive_literal = 8;
WdlDraft1Parser.RULE_expr = 9;
WdlDraft1Parser.RULE_expr_infix = 10;
WdlDraft1Parser.RULE_expr_infix0 = 11;
WdlDraft1Parser.RULE_expr_infix1 = 12;
WdlDraft1Parser.RULE_expr_infix2 = 13;
WdlDraft1Parser.RULE_expr_infix3 = 14;
WdlDraft1Parser.RULE_expr_infix4 = 15;
WdlDraft1Parser.RULE_expr_infix5 = 16;
WdlDraft1Parser.RULE_expr_core = 17;
WdlDraft1Parser.RULE_number = 18;
WdlDraft1Parser.RULE_expression_placeholder_option = 19;
WdlDraft1Parser.RULE_string_part = 20;
WdlDraft1Parser.RULE_string_expr_part = 21;
WdlDraft1Parser.RULE_string_expr_with_string_part = 22;
WdlDraft1Parser.RULE_string = 23;
WdlDraft1Parser.RULE_import_as = 24;
WdlDraft1Parser.RULE_import_doc = 25;
WdlDraft1Parser.RULE_task_output = 26;
WdlDraft1Parser.RULE_task_command_string_part = 27;
WdlDraft1Parser.RULE_task_command_expr_part = 28;
WdlDraft1Parser.RULE_task_command_expr_with_string = 29;
WdlDraft1Parser.RULE_task_command = 30;
WdlDraft1Parser.RULE_task_runtime_kv = 31;
WdlDraft1Parser.RULE_task_runtime = 32;
WdlDraft1Parser.RULE_meta_value = 33;
WdlDraft1Parser.RULE_meta_string_part = 34;
WdlDraft1Parser.RULE_meta_string = 35;
WdlDraft1Parser.RULE_meta_array = 36;
WdlDraft1Parser.RULE_meta_object = 37;
WdlDraft1Parser.RULE_meta_object_kv = 38;
WdlDraft1Parser.RULE_meta_kv = 39;
WdlDraft1Parser.RULE_parameter_meta = 40;
WdlDraft1Parser.RULE_meta = 41;
WdlDraft1Parser.RULE_task_element = 42;
WdlDraft1Parser.RULE_task = 43;
WdlDraft1Parser.RULE_call_alias = 44;
WdlDraft1Parser.RULE_call_input = 45;
WdlDraft1Parser.RULE_call_inputs = 46;
WdlDraft1Parser.RULE_call_body = 47;
WdlDraft1Parser.RULE_call_name = 48;
WdlDraft1Parser.RULE_call = 49;
WdlDraft1Parser.RULE_scatter = 50;
WdlDraft1Parser.RULE_conditional = 51;
WdlDraft1Parser.RULE_loop = 52;
WdlDraft1Parser.RULE_inner_workflow_element = 53;
WdlDraft1Parser.RULE_workflow_output_fqn_part = 54;
WdlDraft1Parser.RULE_workflow_output_fqn = 55;
WdlDraft1Parser.RULE_workflow_output = 56;
WdlDraft1Parser.RULE_workflow_element = 57;
WdlDraft1Parser.RULE_workflow = 58;
WdlDraft1Parser.RULE_document_element = 59;
WdlDraft1Parser.RULE_document = 60;

class Map_typeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_map_type;
    }

	MAP() {
	    return this.getToken(WdlDraft1Parser.MAP, 0);
	};

	LBRACK() {
	    return this.getToken(WdlDraft1Parser.LBRACK, 0);
	};

	wdl_type = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Wdl_typeContext);
	    } else {
	        return this.getTypedRuleContext(Wdl_typeContext,i);
	    }
	};

	COMMA() {
	    return this.getToken(WdlDraft1Parser.COMMA, 0);
	};

	RBRACK() {
	    return this.getToken(WdlDraft1Parser.RBRACK, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterMap_type(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitMap_type(this);
		}
	}


}



class Array_typeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_array_type;
    }

	ARRAY() {
	    return this.getToken(WdlDraft1Parser.ARRAY, 0);
	};

	LBRACK() {
	    return this.getToken(WdlDraft1Parser.LBRACK, 0);
	};

	wdl_type() {
	    return this.getTypedRuleContext(Wdl_typeContext,0);
	};

	RBRACK() {
	    return this.getToken(WdlDraft1Parser.RBRACK, 0);
	};

	PLUS() {
	    return this.getToken(WdlDraft1Parser.PLUS, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterArray_type(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitArray_type(this);
		}
	}


}



class Pair_typeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_pair_type;
    }

	PAIR() {
	    return this.getToken(WdlDraft1Parser.PAIR, 0);
	};

	LBRACK() {
	    return this.getToken(WdlDraft1Parser.LBRACK, 0);
	};

	wdl_type = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Wdl_typeContext);
	    } else {
	        return this.getTypedRuleContext(Wdl_typeContext,i);
	    }
	};

	COMMA() {
	    return this.getToken(WdlDraft1Parser.COMMA, 0);
	};

	RBRACK() {
	    return this.getToken(WdlDraft1Parser.RBRACK, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterPair_type(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitPair_type(this);
		}
	}


}



class Type_baseContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_type_base;
    }

	array_type() {
	    return this.getTypedRuleContext(Array_typeContext,0);
	};

	map_type() {
	    return this.getTypedRuleContext(Map_typeContext,0);
	};

	pair_type() {
	    return this.getTypedRuleContext(Pair_typeContext,0);
	};

	STRING() {
	    return this.getToken(WdlDraft1Parser.STRING, 0);
	};

	FILE() {
	    return this.getToken(WdlDraft1Parser.FILE, 0);
	};

	BOOLEAN() {
	    return this.getToken(WdlDraft1Parser.BOOLEAN, 0);
	};

	OBJECT() {
	    return this.getToken(WdlDraft1Parser.OBJECT, 0);
	};

	INT() {
	    return this.getToken(WdlDraft1Parser.INT, 0);
	};

	FLOAT() {
	    return this.getToken(WdlDraft1Parser.FLOAT, 0);
	};

	Identifier() {
	    return this.getToken(WdlDraft1Parser.Identifier, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterType_base(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitType_base(this);
		}
	}


}



class Wdl_typeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_wdl_type;
    }

	type_base() {
	    return this.getTypedRuleContext(Type_baseContext,0);
	};

	OPTIONAL() {
	    return this.getToken(WdlDraft1Parser.OPTIONAL, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterWdl_type(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitWdl_type(this);
		}
	}


}



class Unbound_declsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_unbound_decls;
    }

	wdl_type() {
	    return this.getTypedRuleContext(Wdl_typeContext,0);
	};

	Identifier() {
	    return this.getToken(WdlDraft1Parser.Identifier, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterUnbound_decls(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitUnbound_decls(this);
		}
	}


}



class Bound_declsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_bound_decls;
    }

	wdl_type() {
	    return this.getTypedRuleContext(Wdl_typeContext,0);
	};

	Identifier() {
	    return this.getToken(WdlDraft1Parser.Identifier, 0);
	};

	EQUAL() {
	    return this.getToken(WdlDraft1Parser.EQUAL, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterBound_decls(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitBound_decls(this);
		}
	}


}



class Any_declsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_any_decls;
    }

	unbound_decls() {
	    return this.getTypedRuleContext(Unbound_declsContext,0);
	};

	bound_decls() {
	    return this.getTypedRuleContext(Bound_declsContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterAny_decls(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitAny_decls(this);
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
        this.ruleIndex = WdlDraft1Parser.RULE_primitive_literal;
    }

	BoolLiteral() {
	    return this.getToken(WdlDraft1Parser.BoolLiteral, 0);
	};

	number() {
	    return this.getTypedRuleContext(NumberContext,0);
	};

	string() {
	    return this.getTypedRuleContext(StringContext,0);
	};

	Identifier() {
	    return this.getToken(WdlDraft1Parser.Identifier, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterPrimitive_literal(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
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
        this.ruleIndex = WdlDraft1Parser.RULE_expr;
    }

	expr_infix() {
	    return this.getTypedRuleContext(Expr_infixContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
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
        this.ruleIndex = WdlDraft1Parser.RULE_expr_infix;
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
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterInfix0(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitInfix0(this);
		}
	}


}

WdlDraft1Parser.Infix0Context = Infix0Context;

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
        this.ruleIndex = WdlDraft1Parser.RULE_expr_infix0;
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
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterInfix1(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitInfix1(this);
		}
	}


}

WdlDraft1Parser.Infix1Context = Infix1Context;

class LorContext extends Expr_infix0Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix0() {
	    return this.getTypedRuleContext(Expr_infix0Context,0);
	};

	OR() {
	    return this.getToken(WdlDraft1Parser.OR, 0);
	};

	expr_infix1() {
	    return this.getTypedRuleContext(Expr_infix1Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterLor(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitLor(this);
		}
	}


}

WdlDraft1Parser.LorContext = LorContext;

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
        this.ruleIndex = WdlDraft1Parser.RULE_expr_infix1;
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
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterInfix2(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitInfix2(this);
		}
	}


}

WdlDraft1Parser.Infix2Context = Infix2Context;

class LandContext extends Expr_infix1Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix1() {
	    return this.getTypedRuleContext(Expr_infix1Context,0);
	};

	AND() {
	    return this.getToken(WdlDraft1Parser.AND, 0);
	};

	expr_infix2() {
	    return this.getTypedRuleContext(Expr_infix2Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterLand(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitLand(this);
		}
	}


}

WdlDraft1Parser.LandContext = LandContext;

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
        this.ruleIndex = WdlDraft1Parser.RULE_expr_infix2;
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
	    return this.getToken(WdlDraft1Parser.EQUALITY, 0);
	};

	expr_infix3() {
	    return this.getTypedRuleContext(Expr_infix3Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterEqeq(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitEqeq(this);
		}
	}


}

WdlDraft1Parser.EqeqContext = EqeqContext;

class LtContext extends Expr_infix2Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix2() {
	    return this.getTypedRuleContext(Expr_infix2Context,0);
	};

	LT() {
	    return this.getToken(WdlDraft1Parser.LT, 0);
	};

	expr_infix3() {
	    return this.getTypedRuleContext(Expr_infix3Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterLt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitLt(this);
		}
	}


}

WdlDraft1Parser.LtContext = LtContext;

class Infix3Context extends Expr_infix2Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix3() {
	    return this.getTypedRuleContext(Expr_infix3Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterInfix3(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitInfix3(this);
		}
	}


}

WdlDraft1Parser.Infix3Context = Infix3Context;

class GteContext extends Expr_infix2Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix2() {
	    return this.getTypedRuleContext(Expr_infix2Context,0);
	};

	GTE() {
	    return this.getToken(WdlDraft1Parser.GTE, 0);
	};

	expr_infix3() {
	    return this.getTypedRuleContext(Expr_infix3Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterGte(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitGte(this);
		}
	}


}

WdlDraft1Parser.GteContext = GteContext;

class NeqContext extends Expr_infix2Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix2() {
	    return this.getTypedRuleContext(Expr_infix2Context,0);
	};

	NOTEQUAL() {
	    return this.getToken(WdlDraft1Parser.NOTEQUAL, 0);
	};

	expr_infix3() {
	    return this.getTypedRuleContext(Expr_infix3Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterNeq(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitNeq(this);
		}
	}


}

WdlDraft1Parser.NeqContext = NeqContext;

class LteContext extends Expr_infix2Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix2() {
	    return this.getTypedRuleContext(Expr_infix2Context,0);
	};

	LTE() {
	    return this.getToken(WdlDraft1Parser.LTE, 0);
	};

	expr_infix3() {
	    return this.getTypedRuleContext(Expr_infix3Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterLte(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitLte(this);
		}
	}


}

WdlDraft1Parser.LteContext = LteContext;

class GtContext extends Expr_infix2Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix2() {
	    return this.getTypedRuleContext(Expr_infix2Context,0);
	};

	GT() {
	    return this.getToken(WdlDraft1Parser.GT, 0);
	};

	expr_infix3() {
	    return this.getTypedRuleContext(Expr_infix3Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterGt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitGt(this);
		}
	}


}

WdlDraft1Parser.GtContext = GtContext;

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
        this.ruleIndex = WdlDraft1Parser.RULE_expr_infix3;
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
	    return this.getToken(WdlDraft1Parser.PLUS, 0);
	};

	expr_infix4() {
	    return this.getTypedRuleContext(Expr_infix4Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterAdd(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitAdd(this);
		}
	}


}

WdlDraft1Parser.AddContext = AddContext;

class SubContext extends Expr_infix3Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix3() {
	    return this.getTypedRuleContext(Expr_infix3Context,0);
	};

	MINUS() {
	    return this.getToken(WdlDraft1Parser.MINUS, 0);
	};

	expr_infix4() {
	    return this.getTypedRuleContext(Expr_infix4Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterSub(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitSub(this);
		}
	}


}

WdlDraft1Parser.SubContext = SubContext;

class Infix4Context extends Expr_infix3Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix4() {
	    return this.getTypedRuleContext(Expr_infix4Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterInfix4(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitInfix4(this);
		}
	}


}

WdlDraft1Parser.Infix4Context = Infix4Context;

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
        this.ruleIndex = WdlDraft1Parser.RULE_expr_infix4;
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
	    return this.getToken(WdlDraft1Parser.MOD, 0);
	};

	expr_infix5() {
	    return this.getTypedRuleContext(Expr_infix5Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterMod(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitMod(this);
		}
	}


}

WdlDraft1Parser.ModContext = ModContext;

class MulContext extends Expr_infix4Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix4() {
	    return this.getTypedRuleContext(Expr_infix4Context,0);
	};

	STAR() {
	    return this.getToken(WdlDraft1Parser.STAR, 0);
	};

	expr_infix5() {
	    return this.getTypedRuleContext(Expr_infix5Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterMul(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitMul(this);
		}
	}


}

WdlDraft1Parser.MulContext = MulContext;

class DivideContext extends Expr_infix4Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix4() {
	    return this.getTypedRuleContext(Expr_infix4Context,0);
	};

	DIVIDE() {
	    return this.getToken(WdlDraft1Parser.DIVIDE, 0);
	};

	expr_infix5() {
	    return this.getTypedRuleContext(Expr_infix5Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterDivide(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitDivide(this);
		}
	}


}

WdlDraft1Parser.DivideContext = DivideContext;

class Infix5Context extends Expr_infix4Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix5() {
	    return this.getTypedRuleContext(Expr_infix5Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterInfix5(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitInfix5(this);
		}
	}


}

WdlDraft1Parser.Infix5Context = Infix5Context;

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
        this.ruleIndex = WdlDraft1Parser.RULE_expr_infix5;
    }

	expr_core() {
	    return this.getTypedRuleContext(Expr_coreContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterExpr_infix5(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitExpr_infix5(this);
		}
	}


}



class Expr_coreContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_expr_core;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class Pair_literalContext extends Expr_coreContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	LPAREN() {
	    return this.getToken(WdlDraft1Parser.LPAREN, 0);
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
	    return this.getToken(WdlDraft1Parser.COMMA, 0);
	};

	RPAREN() {
	    return this.getToken(WdlDraft1Parser.RPAREN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterPair_literal(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitPair_literal(this);
		}
	}


}

WdlDraft1Parser.Pair_literalContext = Pair_literalContext;

class UnarysignedContext extends Expr_coreContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	PLUS() {
	    return this.getToken(WdlDraft1Parser.PLUS, 0);
	};

	MINUS() {
	    return this.getToken(WdlDraft1Parser.MINUS, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterUnarysigned(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitUnarysigned(this);
		}
	}


}

WdlDraft1Parser.UnarysignedContext = UnarysignedContext;

class ApplyContext extends Expr_coreContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	Identifier() {
	    return this.getToken(WdlDraft1Parser.Identifier, 0);
	};

	LPAREN() {
	    return this.getToken(WdlDraft1Parser.LPAREN, 0);
	};

	RPAREN() {
	    return this.getToken(WdlDraft1Parser.RPAREN, 0);
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
	        return this.getTokens(WdlDraft1Parser.COMMA);
	    } else {
	        return this.getToken(WdlDraft1Parser.COMMA, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterApply(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitApply(this);
		}
	}


}

WdlDraft1Parser.ApplyContext = ApplyContext;

class Expression_groupContext extends Expr_coreContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	LPAREN() {
	    return this.getToken(WdlDraft1Parser.LPAREN, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	RPAREN() {
	    return this.getToken(WdlDraft1Parser.RPAREN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterExpression_group(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitExpression_group(this);
		}
	}


}

WdlDraft1Parser.Expression_groupContext = Expression_groupContext;

class PrimitivesContext extends Expr_coreContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	primitive_literal() {
	    return this.getTypedRuleContext(Primitive_literalContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterPrimitives(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitPrimitives(this);
		}
	}


}

WdlDraft1Parser.PrimitivesContext = PrimitivesContext;

class Left_nameContext extends Expr_coreContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	Identifier() {
	    return this.getToken(WdlDraft1Parser.Identifier, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterLeft_name(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitLeft_name(this);
		}
	}


}

WdlDraft1Parser.Left_nameContext = Left_nameContext;

class AtContext extends Expr_coreContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_core() {
	    return this.getTypedRuleContext(Expr_coreContext,0);
	};

	LBRACK() {
	    return this.getToken(WdlDraft1Parser.LBRACK, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	RBRACK() {
	    return this.getToken(WdlDraft1Parser.RBRACK, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterAt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitAt(this);
		}
	}


}

WdlDraft1Parser.AtContext = AtContext;

class NegateContext extends Expr_coreContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	NOT() {
	    return this.getToken(WdlDraft1Parser.NOT, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterNegate(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitNegate(this);
		}
	}


}

WdlDraft1Parser.NegateContext = NegateContext;

class Map_literalContext extends Expr_coreContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	LBRACE() {
	    return this.getToken(WdlDraft1Parser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(WdlDraft1Parser.RBRACE, 0);
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
	        return this.getTokens(WdlDraft1Parser.COLON);
	    } else {
	        return this.getToken(WdlDraft1Parser.COLON, i);
	    }
	};


	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlDraft1Parser.COMMA);
	    } else {
	        return this.getToken(WdlDraft1Parser.COMMA, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterMap_literal(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitMap_literal(this);
		}
	}


}

WdlDraft1Parser.Map_literalContext = Map_literalContext;

class IfthenelseContext extends Expr_coreContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	IF() {
	    return this.getToken(WdlDraft1Parser.IF, 0);
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
	    return this.getToken(WdlDraft1Parser.THEN, 0);
	};

	ELSE() {
	    return this.getToken(WdlDraft1Parser.ELSE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterIfthenelse(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitIfthenelse(this);
		}
	}


}

WdlDraft1Parser.IfthenelseContext = IfthenelseContext;

class Get_nameContext extends Expr_coreContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_core() {
	    return this.getTypedRuleContext(Expr_coreContext,0);
	};

	DOT() {
	    return this.getToken(WdlDraft1Parser.DOT, 0);
	};

	Identifier() {
	    return this.getToken(WdlDraft1Parser.Identifier, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterGet_name(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitGet_name(this);
		}
	}


}

WdlDraft1Parser.Get_nameContext = Get_nameContext;

class Object_literalContext extends Expr_coreContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	OBJECT_LITERAL() {
	    return this.getToken(WdlDraft1Parser.OBJECT_LITERAL, 0);
	};

	LBRACE() {
	    return this.getToken(WdlDraft1Parser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(WdlDraft1Parser.RBRACE, 0);
	};

	Identifier = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlDraft1Parser.Identifier);
	    } else {
	        return this.getToken(WdlDraft1Parser.Identifier, i);
	    }
	};


	COLON = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlDraft1Parser.COLON);
	    } else {
	        return this.getToken(WdlDraft1Parser.COLON, i);
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
	        return this.getTokens(WdlDraft1Parser.COMMA);
	    } else {
	        return this.getToken(WdlDraft1Parser.COMMA, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterObject_literal(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitObject_literal(this);
		}
	}


}

WdlDraft1Parser.Object_literalContext = Object_literalContext;

class Array_literalContext extends Expr_coreContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	LBRACK() {
	    return this.getToken(WdlDraft1Parser.LBRACK, 0);
	};

	RBRACK() {
	    return this.getToken(WdlDraft1Parser.RBRACK, 0);
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
	        return this.getTokens(WdlDraft1Parser.COMMA);
	    } else {
	        return this.getToken(WdlDraft1Parser.COMMA, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterArray_literal(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitArray_literal(this);
		}
	}


}

WdlDraft1Parser.Array_literalContext = Array_literalContext;

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
        this.ruleIndex = WdlDraft1Parser.RULE_number;
    }

	IntLiteral() {
	    return this.getToken(WdlDraft1Parser.IntLiteral, 0);
	};

	FloatLiteral() {
	    return this.getToken(WdlDraft1Parser.FloatLiteral, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterNumber(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
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
        this.ruleIndex = WdlDraft1Parser.RULE_expression_placeholder_option;
    }

	BoolLiteral() {
	    return this.getToken(WdlDraft1Parser.BoolLiteral, 0);
	};

	EQUAL() {
	    return this.getToken(WdlDraft1Parser.EQUAL, 0);
	};

	string() {
	    return this.getTypedRuleContext(StringContext,0);
	};

	number() {
	    return this.getTypedRuleContext(NumberContext,0);
	};

	DEFAULT() {
	    return this.getToken(WdlDraft1Parser.DEFAULT, 0);
	};

	SEP() {
	    return this.getToken(WdlDraft1Parser.SEP, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterExpression_placeholder_option(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
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
        this.ruleIndex = WdlDraft1Parser.RULE_string_part;
    }

	StringPart = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlDraft1Parser.StringPart);
	    } else {
	        return this.getToken(WdlDraft1Parser.StringPart, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterString_part(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
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
        this.ruleIndex = WdlDraft1Parser.RULE_string_expr_part;
    }

	StringCommandStart() {
	    return this.getToken(WdlDraft1Parser.StringCommandStart, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	RBRACE() {
	    return this.getToken(WdlDraft1Parser.RBRACE, 0);
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
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterString_expr_part(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
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
        this.ruleIndex = WdlDraft1Parser.RULE_string_expr_with_string_part;
    }

	string_expr_part() {
	    return this.getTypedRuleContext(String_expr_partContext,0);
	};

	string_part() {
	    return this.getTypedRuleContext(String_partContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterString_expr_with_string_part(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
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
        this.ruleIndex = WdlDraft1Parser.RULE_string;
    }

	DQUOTE = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlDraft1Parser.DQUOTE);
	    } else {
	        return this.getToken(WdlDraft1Parser.DQUOTE, i);
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
	        return this.getTokens(WdlDraft1Parser.SQUOTE);
	    } else {
	        return this.getToken(WdlDraft1Parser.SQUOTE, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterString(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitString(this);
		}
	}


}



class Import_asContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_import_as;
    }

	AS() {
	    return this.getToken(WdlDraft1Parser.AS, 0);
	};

	Identifier() {
	    return this.getToken(WdlDraft1Parser.Identifier, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterImport_as(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitImport_as(this);
		}
	}


}



class Import_docContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_import_doc;
    }

	IMPORT() {
	    return this.getToken(WdlDraft1Parser.IMPORT, 0);
	};

	string() {
	    return this.getTypedRuleContext(StringContext,0);
	};

	import_as() {
	    return this.getTypedRuleContext(Import_asContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterImport_doc(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitImport_doc(this);
		}
	}


}



class Task_outputContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_task_output;
    }

	OUTPUT() {
	    return this.getToken(WdlDraft1Parser.OUTPUT, 0);
	};

	LBRACE() {
	    return this.getToken(WdlDraft1Parser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(WdlDraft1Parser.RBRACE, 0);
	};

	bound_decls = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Bound_declsContext);
	    } else {
	        return this.getTypedRuleContext(Bound_declsContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterTask_output(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitTask_output(this);
		}
	}


}



class Task_command_string_partContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_task_command_string_part;
    }

	CommandStringPart = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlDraft1Parser.CommandStringPart);
	    } else {
	        return this.getToken(WdlDraft1Parser.CommandStringPart, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterTask_command_string_part(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitTask_command_string_part(this);
		}
	}


}



class Task_command_expr_partContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_task_command_expr_part;
    }

	StringCommandStart() {
	    return this.getToken(WdlDraft1Parser.StringCommandStart, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	RBRACE() {
	    return this.getToken(WdlDraft1Parser.RBRACE, 0);
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
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterTask_command_expr_part(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitTask_command_expr_part(this);
		}
	}


}



class Task_command_expr_with_stringContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_task_command_expr_with_string;
    }

	task_command_expr_part() {
	    return this.getTypedRuleContext(Task_command_expr_partContext,0);
	};

	task_command_string_part() {
	    return this.getTypedRuleContext(Task_command_string_partContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterTask_command_expr_with_string(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitTask_command_expr_with_string(this);
		}
	}


}



class Task_commandContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_task_command;
    }

	COMMAND() {
	    return this.getToken(WdlDraft1Parser.COMMAND, 0);
	};

	BeginLBrace() {
	    return this.getToken(WdlDraft1Parser.BeginLBrace, 0);
	};

	task_command_string_part() {
	    return this.getTypedRuleContext(Task_command_string_partContext,0);
	};

	EndCommand() {
	    return this.getToken(WdlDraft1Parser.EndCommand, 0);
	};

	task_command_expr_with_string = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Task_command_expr_with_stringContext);
	    } else {
	        return this.getTypedRuleContext(Task_command_expr_with_stringContext,i);
	    }
	};

	BeginHereDoc() {
	    return this.getToken(WdlDraft1Parser.BeginHereDoc, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterTask_command(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitTask_command(this);
		}
	}


}



class Task_runtime_kvContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_task_runtime_kv;
    }

	Identifier() {
	    return this.getToken(WdlDraft1Parser.Identifier, 0);
	};

	COLON() {
	    return this.getToken(WdlDraft1Parser.COLON, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterTask_runtime_kv(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitTask_runtime_kv(this);
		}
	}


}



class Task_runtimeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_task_runtime;
    }

	RUNTIME() {
	    return this.getToken(WdlDraft1Parser.RUNTIME, 0);
	};

	LBRACE() {
	    return this.getToken(WdlDraft1Parser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(WdlDraft1Parser.RBRACE, 0);
	};

	task_runtime_kv = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Task_runtime_kvContext);
	    } else {
	        return this.getTypedRuleContext(Task_runtime_kvContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterTask_runtime(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitTask_runtime(this);
		}
	}


}



class Meta_valueContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_meta_value;
    }

	MetaNull() {
	    return this.getToken(WdlDraft1Parser.MetaNull, 0);
	};

	MetaBool() {
	    return this.getToken(WdlDraft1Parser.MetaBool, 0);
	};

	MetaInt() {
	    return this.getToken(WdlDraft1Parser.MetaInt, 0);
	};

	MetaFloat() {
	    return this.getToken(WdlDraft1Parser.MetaFloat, 0);
	};

	meta_string() {
	    return this.getTypedRuleContext(Meta_stringContext,0);
	};

	meta_object() {
	    return this.getTypedRuleContext(Meta_objectContext,0);
	};

	meta_array() {
	    return this.getTypedRuleContext(Meta_arrayContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterMeta_value(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitMeta_value(this);
		}
	}


}



class Meta_string_partContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_meta_string_part;
    }

	MetaStringPart = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlDraft1Parser.MetaStringPart);
	    } else {
	        return this.getToken(WdlDraft1Parser.MetaStringPart, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterMeta_string_part(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitMeta_string_part(this);
		}
	}


}



class Meta_stringContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_meta_string;
    }

	MetaDquote = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlDraft1Parser.MetaDquote);
	    } else {
	        return this.getToken(WdlDraft1Parser.MetaDquote, i);
	    }
	};


	meta_string_part() {
	    return this.getTypedRuleContext(Meta_string_partContext,0);
	};

	MetaSquote = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlDraft1Parser.MetaSquote);
	    } else {
	        return this.getToken(WdlDraft1Parser.MetaSquote, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterMeta_string(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitMeta_string(this);
		}
	}


}



class Meta_arrayContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_meta_array;
    }

	MetaEmptyArray() {
	    return this.getToken(WdlDraft1Parser.MetaEmptyArray, 0);
	};

	MetaLbrack() {
	    return this.getToken(WdlDraft1Parser.MetaLbrack, 0);
	};

	meta_value = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Meta_valueContext);
	    } else {
	        return this.getTypedRuleContext(Meta_valueContext,i);
	    }
	};

	MetaArrayCommaRbrack() {
	    return this.getToken(WdlDraft1Parser.MetaArrayCommaRbrack, 0);
	};

	MetaRbrack() {
	    return this.getToken(WdlDraft1Parser.MetaRbrack, 0);
	};

	MetaArrayComma = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlDraft1Parser.MetaArrayComma);
	    } else {
	        return this.getToken(WdlDraft1Parser.MetaArrayComma, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterMeta_array(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitMeta_array(this);
		}
	}


}



class Meta_objectContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_meta_object;
    }

	MetaEmptyObject() {
	    return this.getToken(WdlDraft1Parser.MetaEmptyObject, 0);
	};

	MetaLbrace() {
	    return this.getToken(WdlDraft1Parser.MetaLbrace, 0);
	};

	meta_object_kv = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Meta_object_kvContext);
	    } else {
	        return this.getTypedRuleContext(Meta_object_kvContext,i);
	    }
	};

	MetaObjectCommaRbrace() {
	    return this.getToken(WdlDraft1Parser.MetaObjectCommaRbrace, 0);
	};

	MetaRbrace() {
	    return this.getToken(WdlDraft1Parser.MetaRbrace, 0);
	};

	MetaObjectComma = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlDraft1Parser.MetaObjectComma);
	    } else {
	        return this.getToken(WdlDraft1Parser.MetaObjectComma, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterMeta_object(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitMeta_object(this);
		}
	}


}



class Meta_object_kvContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_meta_object_kv;
    }

	MetaObjectIdentifier() {
	    return this.getToken(WdlDraft1Parser.MetaObjectIdentifier, 0);
	};

	MetaObjectColon() {
	    return this.getToken(WdlDraft1Parser.MetaObjectColon, 0);
	};

	meta_value() {
	    return this.getTypedRuleContext(Meta_valueContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterMeta_object_kv(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitMeta_object_kv(this);
		}
	}


}



class Meta_kvContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_meta_kv;
    }

	MetaIdentifier() {
	    return this.getToken(WdlDraft1Parser.MetaIdentifier, 0);
	};

	MetaColon() {
	    return this.getToken(WdlDraft1Parser.MetaColon, 0);
	};

	meta_value() {
	    return this.getTypedRuleContext(Meta_valueContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterMeta_kv(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitMeta_kv(this);
		}
	}


}



class Parameter_metaContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_parameter_meta;
    }

	PARAMETERMETA() {
	    return this.getToken(WdlDraft1Parser.PARAMETERMETA, 0);
	};

	BeginMeta() {
	    return this.getToken(WdlDraft1Parser.BeginMeta, 0);
	};

	EndMeta() {
	    return this.getToken(WdlDraft1Parser.EndMeta, 0);
	};

	meta_kv = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Meta_kvContext);
	    } else {
	        return this.getTypedRuleContext(Meta_kvContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterParameter_meta(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitParameter_meta(this);
		}
	}


}



class MetaContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_meta;
    }

	META() {
	    return this.getToken(WdlDraft1Parser.META, 0);
	};

	BeginMeta() {
	    return this.getToken(WdlDraft1Parser.BeginMeta, 0);
	};

	EndMeta() {
	    return this.getToken(WdlDraft1Parser.EndMeta, 0);
	};

	meta_kv = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Meta_kvContext);
	    } else {
	        return this.getTypedRuleContext(Meta_kvContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterMeta(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitMeta(this);
		}
	}


}



class Task_elementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_task_element;
    }

	task_output() {
	    return this.getTypedRuleContext(Task_outputContext,0);
	};

	task_command() {
	    return this.getTypedRuleContext(Task_commandContext,0);
	};

	task_runtime() {
	    return this.getTypedRuleContext(Task_runtimeContext,0);
	};

	any_decls() {
	    return this.getTypedRuleContext(Any_declsContext,0);
	};

	parameter_meta() {
	    return this.getTypedRuleContext(Parameter_metaContext,0);
	};

	meta() {
	    return this.getTypedRuleContext(MetaContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterTask_element(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitTask_element(this);
		}
	}


}



class TaskContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_task;
    }

	TASK() {
	    return this.getToken(WdlDraft1Parser.TASK, 0);
	};

	Identifier() {
	    return this.getToken(WdlDraft1Parser.Identifier, 0);
	};

	LBRACE() {
	    return this.getToken(WdlDraft1Parser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(WdlDraft1Parser.RBRACE, 0);
	};

	task_element = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Task_elementContext);
	    } else {
	        return this.getTypedRuleContext(Task_elementContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterTask(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitTask(this);
		}
	}


}



class Call_aliasContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_call_alias;
    }

	AS() {
	    return this.getToken(WdlDraft1Parser.AS, 0);
	};

	Identifier() {
	    return this.getToken(WdlDraft1Parser.Identifier, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterCall_alias(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitCall_alias(this);
		}
	}


}



class Call_inputContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_call_input;
    }

	Identifier() {
	    return this.getToken(WdlDraft1Parser.Identifier, 0);
	};

	EQUAL() {
	    return this.getToken(WdlDraft1Parser.EQUAL, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterCall_input(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitCall_input(this);
		}
	}


}



class Call_inputsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_call_inputs;
    }

	INPUT() {
	    return this.getToken(WdlDraft1Parser.INPUT, 0);
	};

	COLON() {
	    return this.getToken(WdlDraft1Parser.COLON, 0);
	};

	call_input = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Call_inputContext);
	    } else {
	        return this.getTypedRuleContext(Call_inputContext,i);
	    }
	};

	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlDraft1Parser.COMMA);
	    } else {
	        return this.getToken(WdlDraft1Parser.COMMA, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterCall_inputs(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitCall_inputs(this);
		}
	}


}



class Call_bodyContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_call_body;
    }

	LBRACE() {
	    return this.getToken(WdlDraft1Parser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(WdlDraft1Parser.RBRACE, 0);
	};

	call_inputs() {
	    return this.getTypedRuleContext(Call_inputsContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterCall_body(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitCall_body(this);
		}
	}


}



class Call_nameContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_call_name;
    }

	Identifier = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlDraft1Parser.Identifier);
	    } else {
	        return this.getToken(WdlDraft1Parser.Identifier, i);
	    }
	};


	DOT = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlDraft1Parser.DOT);
	    } else {
	        return this.getToken(WdlDraft1Parser.DOT, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterCall_name(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitCall_name(this);
		}
	}


}



class CallContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_call;
    }

	CALL() {
	    return this.getToken(WdlDraft1Parser.CALL, 0);
	};

	call_name() {
	    return this.getTypedRuleContext(Call_nameContext,0);
	};

	call_alias() {
	    return this.getTypedRuleContext(Call_aliasContext,0);
	};

	call_body() {
	    return this.getTypedRuleContext(Call_bodyContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterCall(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitCall(this);
		}
	}


}



class ScatterContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_scatter;
    }

	SCATTER() {
	    return this.getToken(WdlDraft1Parser.SCATTER, 0);
	};

	LPAREN() {
	    return this.getToken(WdlDraft1Parser.LPAREN, 0);
	};

	Identifier() {
	    return this.getToken(WdlDraft1Parser.Identifier, 0);
	};

	In() {
	    return this.getToken(WdlDraft1Parser.In, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	RPAREN() {
	    return this.getToken(WdlDraft1Parser.RPAREN, 0);
	};

	LBRACE() {
	    return this.getToken(WdlDraft1Parser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(WdlDraft1Parser.RBRACE, 0);
	};

	inner_workflow_element = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Inner_workflow_elementContext);
	    } else {
	        return this.getTypedRuleContext(Inner_workflow_elementContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterScatter(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitScatter(this);
		}
	}


}



class ConditionalContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_conditional;
    }

	IF() {
	    return this.getToken(WdlDraft1Parser.IF, 0);
	};

	LPAREN() {
	    return this.getToken(WdlDraft1Parser.LPAREN, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	RPAREN() {
	    return this.getToken(WdlDraft1Parser.RPAREN, 0);
	};

	LBRACE() {
	    return this.getToken(WdlDraft1Parser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(WdlDraft1Parser.RBRACE, 0);
	};

	inner_workflow_element = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Inner_workflow_elementContext);
	    } else {
	        return this.getTypedRuleContext(Inner_workflow_elementContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterConditional(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitConditional(this);
		}
	}


}



class LoopContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_loop;
    }

	WHILE() {
	    return this.getToken(WdlDraft1Parser.WHILE, 0);
	};

	LPAREN() {
	    return this.getToken(WdlDraft1Parser.LPAREN, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	RPAREN() {
	    return this.getToken(WdlDraft1Parser.RPAREN, 0);
	};

	LBRACE() {
	    return this.getToken(WdlDraft1Parser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(WdlDraft1Parser.RBRACE, 0);
	};

	inner_workflow_element = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Inner_workflow_elementContext);
	    } else {
	        return this.getTypedRuleContext(Inner_workflow_elementContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterLoop(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitLoop(this);
		}
	}


}



class Inner_workflow_elementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_inner_workflow_element;
    }

	any_decls() {
	    return this.getTypedRuleContext(Any_declsContext,0);
	};

	call() {
	    return this.getTypedRuleContext(CallContext,0);
	};

	loop() {
	    return this.getTypedRuleContext(LoopContext,0);
	};

	scatter() {
	    return this.getTypedRuleContext(ScatterContext,0);
	};

	conditional() {
	    return this.getTypedRuleContext(ConditionalContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterInner_workflow_element(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitInner_workflow_element(this);
		}
	}


}



class Workflow_output_fqn_partContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_workflow_output_fqn_part;
    }

	STAR() {
	    return this.getToken(WdlDraft1Parser.STAR, 0);
	};

	Identifier() {
	    return this.getToken(WdlDraft1Parser.Identifier, 0);
	};

	DOT = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlDraft1Parser.DOT);
	    } else {
	        return this.getToken(WdlDraft1Parser.DOT, i);
	    }
	};


	workflow_output_fqn_part = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Workflow_output_fqn_partContext);
	    } else {
	        return this.getTypedRuleContext(Workflow_output_fqn_partContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterWorkflow_output_fqn_part(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitWorkflow_output_fqn_part(this);
		}
	}


}



class Workflow_output_fqnContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_workflow_output_fqn;
    }

	Identifier() {
	    return this.getToken(WdlDraft1Parser.Identifier, 0);
	};

	DOT() {
	    return this.getToken(WdlDraft1Parser.DOT, 0);
	};

	workflow_output_fqn_part() {
	    return this.getTypedRuleContext(Workflow_output_fqn_partContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterWorkflow_output_fqn(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitWorkflow_output_fqn(this);
		}
	}


}



class Workflow_outputContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_workflow_output;
    }

	OUTPUT() {
	    return this.getToken(WdlDraft1Parser.OUTPUT, 0);
	};

	LBRACE() {
	    return this.getToken(WdlDraft1Parser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(WdlDraft1Parser.RBRACE, 0);
	};

	workflow_output_fqn = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Workflow_output_fqnContext);
	    } else {
	        return this.getTypedRuleContext(Workflow_output_fqnContext,i);
	    }
	};

	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlDraft1Parser.COMMA);
	    } else {
	        return this.getToken(WdlDraft1Parser.COMMA, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterWorkflow_output(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitWorkflow_output(this);
		}
	}


}



class Workflow_elementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_workflow_element;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class OutputContext extends Workflow_elementContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	workflow_output() {
	    return this.getTypedRuleContext(Workflow_outputContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterOutput(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitOutput(this);
		}
	}


}

WdlDraft1Parser.OutputContext = OutputContext;

class Parameter_meta_elementContext extends Workflow_elementContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	parameter_meta() {
	    return this.getTypedRuleContext(Parameter_metaContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterParameter_meta_element(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitParameter_meta_element(this);
		}
	}


}

WdlDraft1Parser.Parameter_meta_elementContext = Parameter_meta_elementContext;

class Meta_elementContext extends Workflow_elementContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	meta() {
	    return this.getTypedRuleContext(MetaContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterMeta_element(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitMeta_element(this);
		}
	}


}

WdlDraft1Parser.Meta_elementContext = Meta_elementContext;

class Inner_elementContext extends Workflow_elementContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	inner_workflow_element() {
	    return this.getTypedRuleContext(Inner_workflow_elementContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterInner_element(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitInner_element(this);
		}
	}


}

WdlDraft1Parser.Inner_elementContext = Inner_elementContext;

class WorkflowContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_workflow;
    }

	WORKFLOW() {
	    return this.getToken(WdlDraft1Parser.WORKFLOW, 0);
	};

	Identifier() {
	    return this.getToken(WdlDraft1Parser.Identifier, 0);
	};

	LBRACE() {
	    return this.getToken(WdlDraft1Parser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(WdlDraft1Parser.RBRACE, 0);
	};

	workflow_element = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Workflow_elementContext);
	    } else {
	        return this.getTypedRuleContext(Workflow_elementContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterWorkflow(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitWorkflow(this);
		}
	}


}



class Document_elementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlDraft1Parser.RULE_document_element;
    }

	import_doc() {
	    return this.getTypedRuleContext(Import_docContext,0);
	};

	task() {
	    return this.getTypedRuleContext(TaskContext,0);
	};

	workflow() {
	    return this.getTypedRuleContext(WorkflowContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterDocument_element(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitDocument_element(this);
		}
	}


}



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
        this.ruleIndex = WdlDraft1Parser.RULE_document;
    }

	EOF() {
	    return this.getToken(WdlDraft1Parser.EOF, 0);
	};

	VERSION() {
	    return this.getToken(WdlDraft1Parser.VERSION, 0);
	};

	document_element = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Document_elementContext);
	    } else {
	        return this.getTypedRuleContext(Document_elementContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.enterDocument(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlDraft1ParserListener ) {
	        listener.exitDocument(this);
		}
	}


}




WdlDraft1Parser.Map_typeContext = Map_typeContext; 
WdlDraft1Parser.Array_typeContext = Array_typeContext; 
WdlDraft1Parser.Pair_typeContext = Pair_typeContext; 
WdlDraft1Parser.Type_baseContext = Type_baseContext; 
WdlDraft1Parser.Wdl_typeContext = Wdl_typeContext; 
WdlDraft1Parser.Unbound_declsContext = Unbound_declsContext; 
WdlDraft1Parser.Bound_declsContext = Bound_declsContext; 
WdlDraft1Parser.Any_declsContext = Any_declsContext; 
WdlDraft1Parser.Primitive_literalContext = Primitive_literalContext; 
WdlDraft1Parser.ExprContext = ExprContext; 
WdlDraft1Parser.Expr_infixContext = Expr_infixContext; 
WdlDraft1Parser.Expr_infix0Context = Expr_infix0Context; 
WdlDraft1Parser.Expr_infix1Context = Expr_infix1Context; 
WdlDraft1Parser.Expr_infix2Context = Expr_infix2Context; 
WdlDraft1Parser.Expr_infix3Context = Expr_infix3Context; 
WdlDraft1Parser.Expr_infix4Context = Expr_infix4Context; 
WdlDraft1Parser.Expr_infix5Context = Expr_infix5Context; 
WdlDraft1Parser.Expr_coreContext = Expr_coreContext; 
WdlDraft1Parser.NumberContext = NumberContext; 
WdlDraft1Parser.Expression_placeholder_optionContext = Expression_placeholder_optionContext; 
WdlDraft1Parser.String_partContext = String_partContext; 
WdlDraft1Parser.String_expr_partContext = String_expr_partContext; 
WdlDraft1Parser.String_expr_with_string_partContext = String_expr_with_string_partContext; 
WdlDraft1Parser.StringContext = StringContext; 
WdlDraft1Parser.Import_asContext = Import_asContext; 
WdlDraft1Parser.Import_docContext = Import_docContext; 
WdlDraft1Parser.Task_outputContext = Task_outputContext; 
WdlDraft1Parser.Task_command_string_partContext = Task_command_string_partContext; 
WdlDraft1Parser.Task_command_expr_partContext = Task_command_expr_partContext; 
WdlDraft1Parser.Task_command_expr_with_stringContext = Task_command_expr_with_stringContext; 
WdlDraft1Parser.Task_commandContext = Task_commandContext; 
WdlDraft1Parser.Task_runtime_kvContext = Task_runtime_kvContext; 
WdlDraft1Parser.Task_runtimeContext = Task_runtimeContext; 
WdlDraft1Parser.Meta_valueContext = Meta_valueContext; 
WdlDraft1Parser.Meta_string_partContext = Meta_string_partContext; 
WdlDraft1Parser.Meta_stringContext = Meta_stringContext; 
WdlDraft1Parser.Meta_arrayContext = Meta_arrayContext; 
WdlDraft1Parser.Meta_objectContext = Meta_objectContext; 
WdlDraft1Parser.Meta_object_kvContext = Meta_object_kvContext; 
WdlDraft1Parser.Meta_kvContext = Meta_kvContext; 
WdlDraft1Parser.Parameter_metaContext = Parameter_metaContext; 
WdlDraft1Parser.MetaContext = MetaContext; 
WdlDraft1Parser.Task_elementContext = Task_elementContext; 
WdlDraft1Parser.TaskContext = TaskContext; 
WdlDraft1Parser.Call_aliasContext = Call_aliasContext; 
WdlDraft1Parser.Call_inputContext = Call_inputContext; 
WdlDraft1Parser.Call_inputsContext = Call_inputsContext; 
WdlDraft1Parser.Call_bodyContext = Call_bodyContext; 
WdlDraft1Parser.Call_nameContext = Call_nameContext; 
WdlDraft1Parser.CallContext = CallContext; 
WdlDraft1Parser.ScatterContext = ScatterContext; 
WdlDraft1Parser.ConditionalContext = ConditionalContext; 
WdlDraft1Parser.LoopContext = LoopContext; 
WdlDraft1Parser.Inner_workflow_elementContext = Inner_workflow_elementContext; 
WdlDraft1Parser.Workflow_output_fqn_partContext = Workflow_output_fqn_partContext; 
WdlDraft1Parser.Workflow_output_fqnContext = Workflow_output_fqnContext; 
WdlDraft1Parser.Workflow_outputContext = Workflow_outputContext; 
WdlDraft1Parser.Workflow_elementContext = Workflow_elementContext; 
WdlDraft1Parser.WorkflowContext = WorkflowContext; 
WdlDraft1Parser.Document_elementContext = Document_elementContext; 
WdlDraft1Parser.DocumentContext = DocumentContext; 
