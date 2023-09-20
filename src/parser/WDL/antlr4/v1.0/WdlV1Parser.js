// Generated from ./WdlV1Parser.g4 by ANTLR 4.13.0
// jshint ignore: start
import antlr4 from 'antlr4';
import WdlV1ParserListener from './WdlV1ParserListener.js';
const serializedATN = [4,1,111,794,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,
2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,2,27,
7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,7,33,2,34,7,
34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,2,40,7,40,2,41,7,41,
2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,7,46,2,47,7,47,2,48,7,48,2,
49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,2,53,7,53,2,54,7,54,2,55,7,55,2,56,
7,56,2,57,7,57,2,58,7,58,2,59,7,59,2,60,7,60,2,61,7,61,1,0,1,0,1,0,1,0,1,
0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,3,1,137,8,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
3,1,3,1,3,1,3,3,3,150,8,3,1,4,1,4,1,4,1,4,3,4,156,8,4,1,5,1,5,1,5,1,6,1,
6,1,6,1,6,1,6,1,7,1,7,3,7,168,8,7,1,8,1,8,1,9,1,9,1,9,1,9,3,9,176,8,9,1,
9,1,9,1,9,1,9,3,9,182,8,9,1,9,1,9,1,9,1,9,3,9,188,8,9,3,9,190,8,9,1,10,5,
10,193,8,10,10,10,12,10,196,9,10,1,11,1,11,5,11,200,8,11,10,11,12,11,203,
9,11,1,11,1,11,1,11,1,12,1,12,1,12,1,13,1,13,1,13,5,13,214,8,13,10,13,12,
13,217,9,13,1,13,1,13,1,13,1,13,1,13,5,13,224,8,13,10,13,12,13,227,9,13,
1,13,1,13,3,13,231,8,13,1,14,1,14,1,14,1,14,3,14,237,8,14,1,15,1,15,1,16,
1,16,1,17,1,17,1,17,1,17,1,17,1,17,5,17,249,8,17,10,17,12,17,252,9,17,1,
18,1,18,1,18,1,18,1,18,1,18,5,18,260,8,18,10,18,12,18,263,9,18,1,19,1,19,
1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,19,1,
19,1,19,1,19,1,19,1,19,5,19,286,8,19,10,19,12,19,289,9,19,1,20,1,20,1,20,
1,20,1,20,1,20,1,20,1,20,1,20,5,20,300,8,20,10,20,12,20,303,9,20,1,21,1,
21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,1,21,5,21,317,8,21,10,21,
12,21,320,9,21,1,22,1,22,1,23,1,23,1,23,1,23,1,23,1,23,5,23,330,8,23,10,
23,12,23,333,9,23,1,23,3,23,336,8,23,3,23,338,8,23,1,23,1,23,1,23,1,23,1,
23,5,23,345,8,23,10,23,12,23,348,9,23,1,23,3,23,351,8,23,5,23,353,8,23,10,
23,12,23,356,9,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,
1,23,1,23,1,23,1,23,1,23,5,23,374,8,23,10,23,12,23,377,9,23,1,23,3,23,380,
8,23,5,23,382,8,23,10,23,12,23,385,9,23,1,23,1,23,1,23,1,23,1,23,1,23,1,
23,1,23,1,23,1,23,5,23,397,8,23,10,23,12,23,400,9,23,1,23,3,23,403,8,23,
5,23,405,8,23,10,23,12,23,408,9,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,
23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,3,23,428,8,23,1,23,
1,23,1,23,1,23,1,23,1,23,1,23,1,23,5,23,438,8,23,10,23,12,23,441,9,23,1,
24,1,24,1,24,1,24,1,24,1,25,1,25,1,25,1,26,1,26,1,26,3,26,454,8,26,1,26,
5,26,457,8,26,10,26,12,26,460,9,26,1,27,1,27,1,27,1,27,5,27,466,8,27,10,
27,12,27,469,9,27,1,27,1,27,1,28,1,28,1,28,1,28,1,28,1,28,1,28,3,28,480,
8,28,1,29,5,29,483,8,29,10,29,12,29,486,9,29,1,30,1,30,1,30,1,30,1,30,1,
30,1,30,1,30,3,30,496,8,30,1,31,1,31,1,31,1,31,1,31,5,31,503,8,31,10,31,
12,31,506,9,31,1,31,1,31,3,31,510,8,31,1,32,1,32,1,32,1,32,1,32,5,32,517,
8,32,10,32,12,32,520,9,32,1,32,1,32,3,32,524,8,32,1,33,1,33,1,33,1,33,1,
34,1,34,1,34,1,34,1,35,1,35,1,35,5,35,537,8,35,10,35,12,35,540,9,35,1,35,
1,35,1,36,1,36,1,36,5,36,547,8,36,10,36,12,36,550,9,36,1,36,1,36,1,37,1,
37,1,37,1,37,1,38,1,38,1,38,5,38,561,8,38,10,38,12,38,564,9,38,1,38,1,38,
1,39,1,39,1,39,5,39,571,8,39,10,39,12,39,574,9,39,1,39,1,39,1,40,1,40,1,
40,5,40,581,8,40,10,40,12,40,584,9,40,1,40,1,40,1,41,5,41,589,8,41,10,41,
12,41,592,9,41,1,42,1,42,5,42,596,8,42,10,42,12,42,599,9,42,1,42,1,42,1,
42,1,43,1,43,1,43,1,44,1,44,1,44,1,44,5,44,611,8,44,10,44,12,44,614,9,44,
1,44,1,44,1,44,1,44,1,44,1,44,5,44,622,8,44,10,44,12,44,625,9,44,1,44,1,
44,3,44,629,8,44,1,45,1,45,1,45,1,45,1,45,1,45,1,45,3,45,638,8,45,1,46,1,
46,1,46,1,46,4,46,644,8,46,11,46,12,46,645,1,46,1,46,1,47,1,47,1,47,1,47,
3,47,654,8,47,1,48,1,48,1,48,1,49,1,49,1,49,1,49,1,50,1,50,1,50,1,50,1,50,
5,50,668,8,50,10,50,12,50,671,9,50,1,50,3,50,674,8,50,5,50,676,8,50,10,50,
12,50,679,9,50,1,51,1,51,3,51,683,8,51,1,51,1,51,1,52,1,52,1,52,5,52,690,
8,52,10,52,12,52,693,9,52,1,53,1,53,1,53,3,53,698,8,53,1,53,3,53,701,8,53,
1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,5,54,711,8,54,10,54,12,54,714,9,
54,1,54,1,54,1,55,1,55,1,55,1,55,1,55,1,55,5,55,724,8,55,10,55,12,55,727,
9,55,1,55,1,55,1,56,1,56,1,56,5,56,734,8,56,10,56,12,56,737,9,56,1,56,1,
56,1,57,1,57,1,57,5,57,744,8,57,10,57,12,57,747,9,57,1,57,1,57,1,58,1,58,
1,58,1,58,1,58,3,58,756,8,58,1,59,1,59,1,59,1,59,5,59,762,8,59,10,59,12,
59,765,9,59,1,59,1,59,1,60,1,60,1,60,3,60,772,8,60,1,61,3,61,775,8,61,1,
61,5,61,778,8,61,10,61,12,61,781,9,61,1,61,1,61,5,61,785,8,61,10,61,12,61,
788,9,61,3,61,790,8,61,1,61,1,61,1,61,0,6,34,36,38,40,42,46,62,0,2,4,6,8,
10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,
58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,
106,108,110,112,114,116,118,120,122,0,5,3,0,21,25,29,29,68,68,1,0,33,34,
1,0,55,56,2,0,100,100,102,102,2,0,107,107,109,109,844,0,124,1,0,0,0,2,131,
1,0,0,0,4,138,1,0,0,0,6,149,1,0,0,0,8,155,1,0,0,0,10,157,1,0,0,0,12,160,
1,0,0,0,14,167,1,0,0,0,16,169,1,0,0,0,18,189,1,0,0,0,20,194,1,0,0,0,22,197,
1,0,0,0,24,207,1,0,0,0,26,230,1,0,0,0,28,236,1,0,0,0,30,238,1,0,0,0,32,240,
1,0,0,0,34,242,1,0,0,0,36,253,1,0,0,0,38,264,1,0,0,0,40,290,1,0,0,0,42,304,
1,0,0,0,44,321,1,0,0,0,46,427,1,0,0,0,48,442,1,0,0,0,50,447,1,0,0,0,52,450,
1,0,0,0,54,461,1,0,0,0,56,479,1,0,0,0,58,484,1,0,0,0,60,495,1,0,0,0,62,509,
1,0,0,0,64,523,1,0,0,0,66,525,1,0,0,0,68,529,1,0,0,0,70,533,1,0,0,0,72,543,
1,0,0,0,74,553,1,0,0,0,76,557,1,0,0,0,78,567,1,0,0,0,80,577,1,0,0,0,82,590,
1,0,0,0,84,593,1,0,0,0,86,603,1,0,0,0,88,628,1,0,0,0,90,637,1,0,0,0,92,639,
1,0,0,0,94,653,1,0,0,0,96,655,1,0,0,0,98,658,1,0,0,0,100,662,1,0,0,0,102,
680,1,0,0,0,104,686,1,0,0,0,106,694,1,0,0,0,108,702,1,0,0,0,110,717,1,0,
0,0,112,730,1,0,0,0,114,740,1,0,0,0,116,755,1,0,0,0,118,757,1,0,0,0,120,
771,1,0,0,0,122,774,1,0,0,0,124,125,5,27,0,0,125,126,5,40,0,0,126,127,3,
8,4,0,127,128,5,58,0,0,128,129,3,8,4,0,129,130,5,41,0,0,130,1,1,0,0,0,131,
132,5,26,0,0,132,133,5,40,0,0,133,134,3,8,4,0,134,136,5,41,0,0,135,137,5,
55,0,0,136,135,1,0,0,0,136,137,1,0,0,0,137,3,1,0,0,0,138,139,5,28,0,0,139,
140,5,40,0,0,140,141,3,8,4,0,141,142,5,58,0,0,142,143,3,8,4,0,143,144,5,
41,0,0,144,5,1,0,0,0,145,150,3,2,1,0,146,150,3,0,0,0,147,150,3,4,2,0,148,
150,7,0,0,0,149,145,1,0,0,0,149,146,1,0,0,0,149,147,1,0,0,0,149,148,1,0,
0,0,150,7,1,0,0,0,151,152,3,6,3,0,152,153,5,53,0,0,153,156,1,0,0,0,154,156,
3,6,3,0,155,151,1,0,0,0,155,154,1,0,0,0,156,9,1,0,0,0,157,158,3,8,4,0,158,
159,5,68,0,0,159,11,1,0,0,0,160,161,3,8,4,0,161,162,5,68,0,0,162,163,5,50,
0,0,163,164,3,30,15,0,164,13,1,0,0,0,165,168,3,10,5,0,166,168,3,12,6,0,167,
165,1,0,0,0,167,166,1,0,0,0,168,15,1,0,0,0,169,170,7,1,0,0,170,17,1,0,0,
0,171,172,5,35,0,0,172,175,5,50,0,0,173,176,3,26,13,0,174,176,3,16,8,0,175,
173,1,0,0,0,175,174,1,0,0,0,176,190,1,0,0,0,177,178,5,32,0,0,178,181,5,50,
0,0,179,182,3,26,13,0,180,182,3,16,8,0,181,179,1,0,0,0,181,180,1,0,0,0,182,
190,1,0,0,0,183,184,5,31,0,0,184,187,5,50,0,0,185,188,3,26,13,0,186,188,
3,16,8,0,187,185,1,0,0,0,187,186,1,0,0,0,188,190,1,0,0,0,189,171,1,0,0,0,
189,177,1,0,0,0,189,183,1,0,0,0,190,19,1,0,0,0,191,193,5,69,0,0,192,191,
1,0,0,0,193,196,1,0,0,0,194,192,1,0,0,0,194,195,1,0,0,0,195,21,1,0,0,0,196,
194,1,0,0,0,197,201,5,75,0,0,198,200,3,18,9,0,199,198,1,0,0,0,200,203,1,
0,0,0,201,199,1,0,0,0,201,202,1,0,0,0,202,204,1,0,0,0,203,201,1,0,0,0,204,
205,3,30,15,0,205,206,5,39,0,0,206,23,1,0,0,0,207,208,3,22,11,0,208,209,
3,20,10,0,209,25,1,0,0,0,210,211,5,66,0,0,211,215,3,20,10,0,212,214,3,24,
12,0,213,212,1,0,0,0,214,217,1,0,0,0,215,213,1,0,0,0,215,216,1,0,0,0,216,
218,1,0,0,0,217,215,1,0,0,0,218,219,5,66,0,0,219,231,1,0,0,0,220,221,5,65,
0,0,221,225,3,20,10,0,222,224,3,24,12,0,223,222,1,0,0,0,224,227,1,0,0,0,
225,223,1,0,0,0,225,226,1,0,0,0,226,228,1,0,0,0,227,225,1,0,0,0,228,229,
5,65,0,0,229,231,1,0,0,0,230,210,1,0,0,0,230,220,1,0,0,0,231,27,1,0,0,0,
232,237,5,35,0,0,233,237,3,16,8,0,234,237,3,26,13,0,235,237,5,68,0,0,236,
232,1,0,0,0,236,233,1,0,0,0,236,234,1,0,0,0,236,235,1,0,0,0,237,29,1,0,0,
0,238,239,3,32,16,0,239,31,1,0,0,0,240,241,3,34,17,0,241,33,1,0,0,0,242,
243,6,17,-1,0,243,244,3,36,18,0,244,250,1,0,0,0,245,246,10,2,0,0,246,247,
5,52,0,0,247,249,3,36,18,0,248,245,1,0,0,0,249,252,1,0,0,0,250,248,1,0,0,
0,250,251,1,0,0,0,251,35,1,0,0,0,252,250,1,0,0,0,253,254,6,18,-1,0,254,255,
3,38,19,0,255,261,1,0,0,0,256,257,10,2,0,0,257,258,5,51,0,0,258,260,3,38,
19,0,259,256,1,0,0,0,260,263,1,0,0,0,261,259,1,0,0,0,261,262,1,0,0,0,262,
37,1,0,0,0,263,261,1,0,0,0,264,265,6,19,-1,0,265,266,3,40,20,0,266,287,1,
0,0,0,267,268,10,7,0,0,268,269,5,48,0,0,269,286,3,40,20,0,270,271,10,6,0,
0,271,272,5,49,0,0,272,286,3,40,20,0,273,274,10,5,0,0,274,275,5,47,0,0,275,
286,3,40,20,0,276,277,10,4,0,0,277,278,5,46,0,0,278,286,3,40,20,0,279,280,
10,3,0,0,280,281,5,44,0,0,281,286,3,40,20,0,282,283,10,2,0,0,283,284,5,45,
0,0,284,286,3,40,20,0,285,267,1,0,0,0,285,270,1,0,0,0,285,273,1,0,0,0,285,
276,1,0,0,0,285,279,1,0,0,0,285,282,1,0,0,0,286,289,1,0,0,0,287,285,1,0,
0,0,287,288,1,0,0,0,288,39,1,0,0,0,289,287,1,0,0,0,290,291,6,20,-1,0,291,
292,3,42,21,0,292,301,1,0,0,0,293,294,10,3,0,0,294,295,5,55,0,0,295,300,
3,42,21,0,296,297,10,2,0,0,297,298,5,56,0,0,298,300,3,42,21,0,299,293,1,
0,0,0,299,296,1,0,0,0,300,303,1,0,0,0,301,299,1,0,0,0,301,302,1,0,0,0,302,
41,1,0,0,0,303,301,1,0,0,0,304,305,6,21,-1,0,305,306,3,44,22,0,306,318,1,
0,0,0,307,308,10,4,0,0,308,309,5,54,0,0,309,317,3,44,22,0,310,311,10,3,0,
0,311,312,5,63,0,0,312,317,3,44,22,0,313,314,10,2,0,0,314,315,5,64,0,0,315,
317,3,44,22,0,316,307,1,0,0,0,316,310,1,0,0,0,316,313,1,0,0,0,317,320,1,
0,0,0,318,316,1,0,0,0,318,319,1,0,0,0,319,43,1,0,0,0,320,318,1,0,0,0,321,
322,3,46,23,0,322,45,1,0,0,0,323,324,6,23,-1,0,324,325,5,68,0,0,325,337,
5,36,0,0,326,331,3,30,15,0,327,328,5,58,0,0,328,330,3,30,15,0,329,327,1,
0,0,0,330,333,1,0,0,0,331,329,1,0,0,0,331,332,1,0,0,0,332,335,1,0,0,0,333,
331,1,0,0,0,334,336,5,58,0,0,335,334,1,0,0,0,335,336,1,0,0,0,336,338,1,0,
0,0,337,326,1,0,0,0,337,338,1,0,0,0,338,339,1,0,0,0,339,428,5,37,0,0,340,
354,5,40,0,0,341,346,3,30,15,0,342,343,5,58,0,0,343,345,3,30,15,0,344,342,
1,0,0,0,345,348,1,0,0,0,346,344,1,0,0,0,346,347,1,0,0,0,347,350,1,0,0,0,
348,346,1,0,0,0,349,351,5,58,0,0,350,349,1,0,0,0,350,351,1,0,0,0,351,353,
1,0,0,0,352,341,1,0,0,0,353,356,1,0,0,0,354,352,1,0,0,0,354,355,1,0,0,0,
355,357,1,0,0,0,356,354,1,0,0,0,357,428,5,41,0,0,358,359,5,36,0,0,359,360,
3,30,15,0,360,361,5,58,0,0,361,362,3,30,15,0,362,363,5,37,0,0,363,428,1,
0,0,0,364,383,5,38,0,0,365,366,3,30,15,0,366,367,5,43,0,0,367,375,3,30,15,
0,368,369,5,58,0,0,369,370,3,30,15,0,370,371,5,43,0,0,371,372,3,30,15,0,
372,374,1,0,0,0,373,368,1,0,0,0,374,377,1,0,0,0,375,373,1,0,0,0,375,376,
1,0,0,0,376,379,1,0,0,0,377,375,1,0,0,0,378,380,5,58,0,0,379,378,1,0,0,0,
379,380,1,0,0,0,380,382,1,0,0,0,381,365,1,0,0,0,382,385,1,0,0,0,383,381,
1,0,0,0,383,384,1,0,0,0,384,386,1,0,0,0,385,383,1,0,0,0,386,428,5,39,0,0,
387,388,5,30,0,0,388,406,5,38,0,0,389,390,5,68,0,0,390,391,5,43,0,0,391,
398,3,30,15,0,392,393,5,58,0,0,393,394,5,68,0,0,394,395,5,43,0,0,395,397,
3,30,15,0,396,392,1,0,0,0,397,400,1,0,0,0,398,396,1,0,0,0,398,399,1,0,0,
0,399,402,1,0,0,0,400,398,1,0,0,0,401,403,5,58,0,0,402,401,1,0,0,0,402,403,
1,0,0,0,403,405,1,0,0,0,404,389,1,0,0,0,405,408,1,0,0,0,406,404,1,0,0,0,
406,407,1,0,0,0,407,409,1,0,0,0,408,406,1,0,0,0,409,428,5,39,0,0,410,411,
5,9,0,0,411,412,3,30,15,0,412,413,5,10,0,0,413,414,3,30,15,0,414,415,5,11,
0,0,415,416,3,30,15,0,416,428,1,0,0,0,417,418,5,36,0,0,418,419,3,30,15,0,
419,420,5,37,0,0,420,428,1,0,0,0,421,422,5,61,0,0,422,428,3,30,15,0,423,
424,7,2,0,0,424,428,3,30,15,0,425,428,3,28,14,0,426,428,5,68,0,0,427,323,
1,0,0,0,427,340,1,0,0,0,427,358,1,0,0,0,427,364,1,0,0,0,427,387,1,0,0,0,
427,410,1,0,0,0,427,417,1,0,0,0,427,421,1,0,0,0,427,423,1,0,0,0,427,425,
1,0,0,0,427,426,1,0,0,0,428,439,1,0,0,0,429,430,10,6,0,0,430,431,5,40,0,
0,431,432,3,30,15,0,432,433,5,41,0,0,433,438,1,0,0,0,434,435,10,5,0,0,435,
436,5,60,0,0,436,438,5,68,0,0,437,429,1,0,0,0,437,434,1,0,0,0,438,441,1,
0,0,0,439,437,1,0,0,0,439,440,1,0,0,0,440,47,1,0,0,0,441,439,1,0,0,0,442,
443,5,12,0,0,443,444,5,68,0,0,444,445,5,13,0,0,445,446,5,68,0,0,446,49,1,
0,0,0,447,448,5,13,0,0,448,449,5,68,0,0,449,51,1,0,0,0,450,451,5,3,0,0,451,
453,3,26,13,0,452,454,3,50,25,0,453,452,1,0,0,0,453,454,1,0,0,0,454,458,
1,0,0,0,455,457,3,48,24,0,456,455,1,0,0,0,457,460,1,0,0,0,458,456,1,0,0,
0,458,459,1,0,0,0,459,53,1,0,0,0,460,458,1,0,0,0,461,462,5,6,0,0,462,463,
5,68,0,0,463,467,5,38,0,0,464,466,3,10,5,0,465,464,1,0,0,0,466,469,1,0,0,
0,467,465,1,0,0,0,467,468,1,0,0,0,468,470,1,0,0,0,469,467,1,0,0,0,470,471,
5,39,0,0,471,55,1,0,0,0,472,480,5,90,0,0,473,480,5,87,0,0,474,480,5,88,0,
0,475,480,5,89,0,0,476,480,3,60,30,0,477,480,3,64,32,0,478,480,3,62,31,0,
479,472,1,0,0,0,479,473,1,0,0,0,479,474,1,0,0,0,479,475,1,0,0,0,479,476,
1,0,0,0,479,477,1,0,0,0,479,478,1,0,0,0,480,57,1,0,0,0,481,483,5,98,0,0,
482,481,1,0,0,0,483,486,1,0,0,0,484,482,1,0,0,0,484,485,1,0,0,0,485,59,1,
0,0,0,486,484,1,0,0,0,487,488,5,92,0,0,488,489,3,58,29,0,489,490,5,92,0,
0,490,496,1,0,0,0,491,492,5,91,0,0,492,493,3,58,29,0,493,494,5,91,0,0,494,
496,1,0,0,0,495,487,1,0,0,0,495,491,1,0,0,0,496,61,1,0,0,0,497,510,5,94,
0,0,498,499,5,95,0,0,499,504,3,56,28,0,500,501,5,101,0,0,501,503,3,56,28,
0,502,500,1,0,0,0,503,506,1,0,0,0,504,502,1,0,0,0,504,505,1,0,0,0,505,507,
1,0,0,0,506,504,1,0,0,0,507,508,7,3,0,0,508,510,1,0,0,0,509,497,1,0,0,0,
509,498,1,0,0,0,510,63,1,0,0,0,511,524,5,93,0,0,512,513,5,96,0,0,513,518,
3,66,33,0,514,515,5,108,0,0,515,517,3,66,33,0,516,514,1,0,0,0,517,520,1,
0,0,0,518,516,1,0,0,0,518,519,1,0,0,0,519,521,1,0,0,0,520,518,1,0,0,0,521,
522,7,4,0,0,522,524,1,0,0,0,523,511,1,0,0,0,523,512,1,0,0,0,524,65,1,0,0,
0,525,526,5,105,0,0,526,527,5,106,0,0,527,528,3,56,28,0,528,67,1,0,0,0,529,
530,5,82,0,0,530,531,5,83,0,0,531,532,3,56,28,0,532,69,1,0,0,0,533,534,5,
17,0,0,534,538,5,79,0,0,535,537,3,68,34,0,536,535,1,0,0,0,537,540,1,0,0,
0,538,536,1,0,0,0,538,539,1,0,0,0,539,541,1,0,0,0,540,538,1,0,0,0,541,542,
5,84,0,0,542,71,1,0,0,0,543,544,5,18,0,0,544,548,5,79,0,0,545,547,3,68,34,
0,546,545,1,0,0,0,547,550,1,0,0,0,548,546,1,0,0,0,548,549,1,0,0,0,549,551,
1,0,0,0,550,548,1,0,0,0,551,552,5,84,0,0,552,73,1,0,0,0,553,554,5,68,0,0,
554,555,5,43,0,0,555,556,3,30,15,0,556,75,1,0,0,0,557,558,5,20,0,0,558,562,
5,38,0,0,559,561,3,74,37,0,560,559,1,0,0,0,561,564,1,0,0,0,562,560,1,0,0,
0,562,563,1,0,0,0,563,565,1,0,0,0,564,562,1,0,0,0,565,566,5,39,0,0,566,77,
1,0,0,0,567,568,5,15,0,0,568,572,5,38,0,0,569,571,3,14,7,0,570,569,1,0,0,
0,571,574,1,0,0,0,572,570,1,0,0,0,572,573,1,0,0,0,573,575,1,0,0,0,574,572,
1,0,0,0,575,576,5,39,0,0,576,79,1,0,0,0,577,578,5,16,0,0,578,582,5,38,0,
0,579,581,3,12,6,0,580,579,1,0,0,0,581,584,1,0,0,0,582,580,1,0,0,0,582,583,
1,0,0,0,583,585,1,0,0,0,584,582,1,0,0,0,585,586,5,39,0,0,586,81,1,0,0,0,
587,589,5,77,0,0,588,587,1,0,0,0,589,592,1,0,0,0,590,588,1,0,0,0,590,591,
1,0,0,0,591,83,1,0,0,0,592,590,1,0,0,0,593,597,5,75,0,0,594,596,3,18,9,0,
595,594,1,0,0,0,596,599,1,0,0,0,597,595,1,0,0,0,597,598,1,0,0,0,598,600,
1,0,0,0,599,597,1,0,0,0,600,601,3,30,15,0,601,602,5,39,0,0,602,85,1,0,0,
0,603,604,3,84,42,0,604,605,3,82,41,0,605,87,1,0,0,0,606,607,5,19,0,0,607,
608,5,72,0,0,608,612,3,82,41,0,609,611,3,86,43,0,610,609,1,0,0,0,611,614,
1,0,0,0,612,610,1,0,0,0,612,613,1,0,0,0,613,615,1,0,0,0,614,612,1,0,0,0,
615,616,5,76,0,0,616,629,1,0,0,0,617,618,5,19,0,0,618,619,5,71,0,0,619,623,
3,82,41,0,620,622,3,86,43,0,621,620,1,0,0,0,622,625,1,0,0,0,623,621,1,0,
0,0,623,624,1,0,0,0,624,626,1,0,0,0,625,623,1,0,0,0,626,627,5,76,0,0,627,
629,1,0,0,0,628,606,1,0,0,0,628,617,1,0,0,0,629,89,1,0,0,0,630,638,3,78,
39,0,631,638,3,80,40,0,632,638,3,88,44,0,633,638,3,76,38,0,634,638,3,12,
6,0,635,638,3,70,35,0,636,638,3,72,36,0,637,630,1,0,0,0,637,631,1,0,0,0,
637,632,1,0,0,0,637,633,1,0,0,0,637,634,1,0,0,0,637,635,1,0,0,0,637,636,
1,0,0,0,638,91,1,0,0,0,639,640,5,5,0,0,640,641,5,68,0,0,641,643,5,38,0,0,
642,644,3,90,45,0,643,642,1,0,0,0,644,645,1,0,0,0,645,643,1,0,0,0,645,646,
1,0,0,0,646,647,1,0,0,0,647,648,5,39,0,0,648,93,1,0,0,0,649,654,3,12,6,0,
650,654,3,106,53,0,651,654,3,108,54,0,652,654,3,110,55,0,653,649,1,0,0,0,
653,650,1,0,0,0,653,651,1,0,0,0,653,652,1,0,0,0,654,95,1,0,0,0,655,656,5,
13,0,0,656,657,5,68,0,0,657,97,1,0,0,0,658,659,5,68,0,0,659,660,5,50,0,0,
660,661,3,30,15,0,661,99,1,0,0,0,662,663,5,15,0,0,663,677,5,43,0,0,664,669,
3,98,49,0,665,666,5,58,0,0,666,668,3,98,49,0,667,665,1,0,0,0,668,671,1,0,
0,0,669,667,1,0,0,0,669,670,1,0,0,0,670,673,1,0,0,0,671,669,1,0,0,0,672,
674,5,58,0,0,673,672,1,0,0,0,673,674,1,0,0,0,674,676,1,0,0,0,675,664,1,0,
0,0,676,679,1,0,0,0,677,675,1,0,0,0,677,678,1,0,0,0,678,101,1,0,0,0,679,
677,1,0,0,0,680,682,5,38,0,0,681,683,3,100,50,0,682,681,1,0,0,0,682,683,
1,0,0,0,683,684,1,0,0,0,684,685,5,39,0,0,685,103,1,0,0,0,686,691,5,68,0,
0,687,688,5,60,0,0,688,690,5,68,0,0,689,687,1,0,0,0,690,693,1,0,0,0,691,
689,1,0,0,0,691,692,1,0,0,0,692,105,1,0,0,0,693,691,1,0,0,0,694,695,5,8,
0,0,695,697,3,104,52,0,696,698,3,96,48,0,697,696,1,0,0,0,697,698,1,0,0,0,
698,700,1,0,0,0,699,701,3,102,51,0,700,699,1,0,0,0,700,701,1,0,0,0,701,107,
1,0,0,0,702,703,5,7,0,0,703,704,5,36,0,0,704,705,5,68,0,0,705,706,5,14,0,
0,706,707,3,30,15,0,707,708,5,37,0,0,708,712,5,38,0,0,709,711,3,94,47,0,
710,709,1,0,0,0,711,714,1,0,0,0,712,710,1,0,0,0,712,713,1,0,0,0,713,715,
1,0,0,0,714,712,1,0,0,0,715,716,5,39,0,0,716,109,1,0,0,0,717,718,5,9,0,0,
718,719,5,36,0,0,719,720,3,30,15,0,720,721,5,37,0,0,721,725,5,38,0,0,722,
724,3,94,47,0,723,722,1,0,0,0,724,727,1,0,0,0,725,723,1,0,0,0,725,726,1,
0,0,0,726,728,1,0,0,0,727,725,1,0,0,0,728,729,5,39,0,0,729,111,1,0,0,0,730,
731,5,15,0,0,731,735,5,38,0,0,732,734,3,14,7,0,733,732,1,0,0,0,734,737,1,
0,0,0,735,733,1,0,0,0,735,736,1,0,0,0,736,738,1,0,0,0,737,735,1,0,0,0,738,
739,5,39,0,0,739,113,1,0,0,0,740,741,5,16,0,0,741,745,5,38,0,0,742,744,3,
12,6,0,743,742,1,0,0,0,744,747,1,0,0,0,745,743,1,0,0,0,745,746,1,0,0,0,746,
748,1,0,0,0,747,745,1,0,0,0,748,749,5,39,0,0,749,115,1,0,0,0,750,756,3,112,
56,0,751,756,3,114,57,0,752,756,3,94,47,0,753,756,3,70,35,0,754,756,3,72,
36,0,755,750,1,0,0,0,755,751,1,0,0,0,755,752,1,0,0,0,755,753,1,0,0,0,755,
754,1,0,0,0,756,117,1,0,0,0,757,758,5,4,0,0,758,759,5,68,0,0,759,763,5,38,
0,0,760,762,3,116,58,0,761,760,1,0,0,0,762,765,1,0,0,0,763,761,1,0,0,0,763,
764,1,0,0,0,764,766,1,0,0,0,765,763,1,0,0,0,766,767,5,39,0,0,767,119,1,0,
0,0,768,772,3,52,26,0,769,772,3,54,27,0,770,772,3,92,46,0,771,768,1,0,0,
0,771,769,1,0,0,0,771,770,1,0,0,0,772,121,1,0,0,0,773,775,5,2,0,0,774,773,
1,0,0,0,774,775,1,0,0,0,775,779,1,0,0,0,776,778,3,120,60,0,777,776,1,0,0,
0,778,781,1,0,0,0,779,777,1,0,0,0,779,780,1,0,0,0,780,789,1,0,0,0,781,779,
1,0,0,0,782,786,3,118,59,0,783,785,3,120,60,0,784,783,1,0,0,0,785,788,1,
0,0,0,786,784,1,0,0,0,786,787,1,0,0,0,787,790,1,0,0,0,788,786,1,0,0,0,789,
782,1,0,0,0,789,790,1,0,0,0,790,791,1,0,0,0,791,792,5,0,0,1,792,123,1,0,
0,0,78,136,149,155,167,175,181,187,189,194,201,215,225,230,236,250,261,285,
287,299,301,316,318,331,335,337,346,350,354,375,379,383,398,402,406,427,
437,439,453,458,467,479,484,495,504,509,518,523,538,548,562,572,582,590,
597,612,623,628,637,645,653,669,673,677,682,691,697,700,712,725,735,745,
755,763,771,774,779,786,789];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class WdlV1Parser extends antlr4.Parser {

    static grammarFileName = "WdlV1Parser.g4";
    static literalNames = [ null, null, "'version 1.0'", "'import'", "'workflow'", 
                            "'task'", "'struct'", "'scatter'", "'call'", 
                            "'if'", "'then'", "'else'", "'alias'", "'as'", 
                            "'in'", "'input'", "'output'", "'parameter_meta'", 
                            "'meta'", "'command'", "'runtime'", "'Boolean'", 
                            "'Int'", "'Float'", "'String'", "'File'", "'Array'", 
                            "'Map'", "'Pair'", "'Object'", "'object'", "'sep'", 
                            "'default'", null, null, null, "'('", "')'", 
                            null, null, "'['", null, "'\\'", null, "'<'", 
                            "'>'", "'>='", "'<='", "'=='", "'!='", "'='", 
                            "'&&'", "'||'", "'?'", "'*'", "'+'", "'-'", 
                            null, null, "';'", "'.'", "'!'", null, "'/'", 
                            "'%'", null, null, null, null, null, null, "'<<<'", 
                            null, null, null, null, null, null, null, null, 
                            null, null, null, null, null, null, null, null, 
                            null, null, "'null'", null, null, null, null, 
                            null, null, null, null, null, null, null, null, 
                            null, null, null, null, null, null, null, null, 
                            "'\\>>>'" ];
    static symbolicNames = [ null, "LINE_COMMENT", "VERSION", "IMPORT", 
                             "WORKFLOW", "TASK", "STRUCT", "SCATTER", "CALL", 
                             "IF", "THEN", "ELSE", "ALIAS", "AS", "In", 
                             "INPUT", "OUTPUT", "PARAMETERMETA", "META", 
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
                             "VersionWhitespace", "BeginMeta", "MetaWhitespace", 
                             "MetaBodyComment", "MetaIdentifier", "MetaColon", 
                             "EndMeta", "MetaBodyWhitespace", "MetaValueComment", 
                             "MetaBool", "MetaInt", "MetaFloat", "MetaNull", 
                             "MetaSquote", "MetaDquote", "MetaEmptyObject", 
                             "MetaEmptyArray", "MetaLbrack", "MetaLbrace", 
                             "MetaValueWhitespace", "MetaStringPart", "MetaArrayComment", 
                             "MetaArrayCommaRbrack", "MetaArrayComma", "MetaRbrack", 
                             "MetaArrayWhitespace", "MetaObjectComment", 
                             "MetaObjectIdentifier", "MetaObjectColon", 
                             "MetaObjectCommaRbrace", "MetaObjectComma", 
                             "MetaRbrace", "MetaObjectWhitespace", "HereDocEscapedEnd" ];
    static ruleNames = [ "map_type", "array_type", "pair_type", "type_base", 
                         "wdl_type", "unbound_decls", "bound_decls", "any_decls", 
                         "number", "expression_placeholder_option", "string_part", 
                         "string_expr_part", "string_expr_with_string_part", 
                         "string", "primitive_literal", "expr", "expr_infix", 
                         "expr_infix0", "expr_infix1", "expr_infix2", "expr_infix3", 
                         "expr_infix4", "expr_infix5", "expr_core", "import_alias", 
                         "import_as", "import_doc", "struct", "meta_value", 
                         "meta_string_part", "meta_string", "meta_array", 
                         "meta_object", "meta_object_kv", "meta_kv", "parameter_meta", 
                         "meta", "task_runtime_kv", "task_runtime", "task_input", 
                         "task_output", "task_command_string_part", "task_command_expr_part", 
                         "task_command_expr_with_string", "task_command", 
                         "task_element", "task", "inner_workflow_element", 
                         "call_alias", "call_input", "call_inputs", "call_body", 
                         "call_name", "call", "scatter", "conditional", 
                         "workflow_input", "workflow_output", "workflow_element", 
                         "workflow", "document_element", "document" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = WdlV1Parser.ruleNames;
        this.literalNames = WdlV1Parser.literalNames;
        this.symbolicNames = WdlV1Parser.symbolicNames;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 17:
    	    		return this.expr_infix0_sempred(localctx, predIndex);
    	case 18:
    	    		return this.expr_infix1_sempred(localctx, predIndex);
    	case 19:
    	    		return this.expr_infix2_sempred(localctx, predIndex);
    	case 20:
    	    		return this.expr_infix3_sempred(localctx, predIndex);
    	case 21:
    	    		return this.expr_infix4_sempred(localctx, predIndex);
    	case 23:
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
	    this.enterRule(localctx, 0, WdlV1Parser.RULE_map_type);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 124;
	        this.match(WdlV1Parser.MAP);
	        this.state = 125;
	        this.match(WdlV1Parser.LBRACK);
	        this.state = 126;
	        this.wdl_type();
	        this.state = 127;
	        this.match(WdlV1Parser.COMMA);
	        this.state = 128;
	        this.wdl_type();
	        this.state = 129;
	        this.match(WdlV1Parser.RBRACK);
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
	    this.enterRule(localctx, 2, WdlV1Parser.RULE_array_type);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 131;
	        this.match(WdlV1Parser.ARRAY);
	        this.state = 132;
	        this.match(WdlV1Parser.LBRACK);
	        this.state = 133;
	        this.wdl_type();
	        this.state = 134;
	        this.match(WdlV1Parser.RBRACK);
	        this.state = 136;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===55) {
	            this.state = 135;
	            this.match(WdlV1Parser.PLUS);
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
	    this.enterRule(localctx, 4, WdlV1Parser.RULE_pair_type);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 138;
	        this.match(WdlV1Parser.PAIR);
	        this.state = 139;
	        this.match(WdlV1Parser.LBRACK);
	        this.state = 140;
	        this.wdl_type();
	        this.state = 141;
	        this.match(WdlV1Parser.COMMA);
	        this.state = 142;
	        this.wdl_type();
	        this.state = 143;
	        this.match(WdlV1Parser.RBRACK);
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
	    this.enterRule(localctx, 6, WdlV1Parser.RULE_type_base);
	    var _la = 0;
	    try {
	        this.state = 149;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 26:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 145;
	            this.array_type();
	            break;
	        case 27:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 146;
	            this.map_type();
	            break;
	        case 28:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 147;
	            this.pair_type();
	            break;
	        case 21:
	        case 22:
	        case 23:
	        case 24:
	        case 25:
	        case 29:
	        case 68:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 148;
	            _la = this._input.LA(1);
	            if(!((((_la) & ~0x1f) === 0 && ((1 << _la) & 601882624) !== 0) || _la===68)) {
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
	    this.enterRule(localctx, 8, WdlV1Parser.RULE_wdl_type);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 155;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
	        switch(la_) {
	        case 1:
	            this.state = 151;
	            this.type_base();
	            this.state = 152;
	            this.match(WdlV1Parser.OPTIONAL);
	            break;

	        case 2:
	            this.state = 154;
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
	    this.enterRule(localctx, 10, WdlV1Parser.RULE_unbound_decls);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 157;
	        this.wdl_type();
	        this.state = 158;
	        this.match(WdlV1Parser.Identifier);
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
	    this.enterRule(localctx, 12, WdlV1Parser.RULE_bound_decls);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 160;
	        this.wdl_type();
	        this.state = 161;
	        this.match(WdlV1Parser.Identifier);
	        this.state = 162;
	        this.match(WdlV1Parser.EQUAL);
	        this.state = 163;
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
	    this.enterRule(localctx, 14, WdlV1Parser.RULE_any_decls);
	    try {
	        this.state = 167;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 165;
	            this.unbound_decls();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 166;
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



	number() {
	    let localctx = new NumberContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, WdlV1Parser.RULE_number);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 169;
	        _la = this._input.LA(1);
	        if(!(_la===33 || _la===34)) {
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
	    this.enterRule(localctx, 18, WdlV1Parser.RULE_expression_placeholder_option);
	    try {
	        this.state = 189;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 35:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 171;
	            this.match(WdlV1Parser.BoolLiteral);
	            this.state = 172;
	            this.match(WdlV1Parser.EQUAL);
	            this.state = 175;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case 65:
	            case 66:
	                this.state = 173;
	                this.string();
	                break;
	            case 33:
	            case 34:
	                this.state = 174;
	                this.number();
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            break;
	        case 32:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 177;
	            this.match(WdlV1Parser.DEFAULT);
	            this.state = 178;
	            this.match(WdlV1Parser.EQUAL);
	            this.state = 181;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case 65:
	            case 66:
	                this.state = 179;
	                this.string();
	                break;
	            case 33:
	            case 34:
	                this.state = 180;
	                this.number();
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            break;
	        case 31:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 183;
	            this.match(WdlV1Parser.SEP);
	            this.state = 184;
	            this.match(WdlV1Parser.EQUAL);
	            this.state = 187;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case 65:
	            case 66:
	                this.state = 185;
	                this.string();
	                break;
	            case 33:
	            case 34:
	                this.state = 186;
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
	    this.enterRule(localctx, 20, WdlV1Parser.RULE_string_part);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 194;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===69) {
	            this.state = 191;
	            this.match(WdlV1Parser.StringPart);
	            this.state = 196;
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
	    this.enterRule(localctx, 22, WdlV1Parser.RULE_string_expr_part);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 197;
	        this.match(WdlV1Parser.StringCommandStart);
	        this.state = 201;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,9,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 198;
	                this.expression_placeholder_option(); 
	            }
	            this.state = 203;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,9,this._ctx);
	        }

	        this.state = 204;
	        this.expr();
	        this.state = 205;
	        this.match(WdlV1Parser.RBRACE);
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
	    this.enterRule(localctx, 24, WdlV1Parser.RULE_string_expr_with_string_part);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 207;
	        this.string_expr_part();
	        this.state = 208;
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
	    this.enterRule(localctx, 26, WdlV1Parser.RULE_string);
	    var _la = 0;
	    try {
	        this.state = 230;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 66:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 210;
	            this.match(WdlV1Parser.DQUOTE);
	            this.state = 211;
	            this.string_part();
	            this.state = 215;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===75) {
	                this.state = 212;
	                this.string_expr_with_string_part();
	                this.state = 217;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 218;
	            this.match(WdlV1Parser.DQUOTE);
	            break;
	        case 65:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 220;
	            this.match(WdlV1Parser.SQUOTE);
	            this.state = 221;
	            this.string_part();
	            this.state = 225;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===75) {
	                this.state = 222;
	                this.string_expr_with_string_part();
	                this.state = 227;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 228;
	            this.match(WdlV1Parser.SQUOTE);
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
	    this.enterRule(localctx, 28, WdlV1Parser.RULE_primitive_literal);
	    try {
	        this.state = 236;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 35:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 232;
	            this.match(WdlV1Parser.BoolLiteral);
	            break;
	        case 33:
	        case 34:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 233;
	            this.number();
	            break;
	        case 65:
	        case 66:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 234;
	            this.string();
	            break;
	        case 68:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 235;
	            this.match(WdlV1Parser.Identifier);
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
	    this.enterRule(localctx, 30, WdlV1Parser.RULE_expr);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 238;
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
	    this.enterRule(localctx, 32, WdlV1Parser.RULE_expr_infix);
	    try {
	        localctx = new Infix0Context(this, localctx);
	        this.enterOuterAlt(localctx, 1);
	        this.state = 240;
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
	    const _startState = 34;
	    this.enterRecursionRule(localctx, 34, WdlV1Parser.RULE_expr_infix0, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        localctx = new Infix1Context(this, localctx);
	        this._ctx = localctx;
	        _prevctx = localctx;

	        this.state = 243;
	        this.expr_infix1(0);
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 250;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,14,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                localctx = new LorContext(this, new Expr_infix0Context(this, _parentctx, _parentState));
	                this.pushNewRecursionContext(localctx, _startState, WdlV1Parser.RULE_expr_infix0);
	                this.state = 245;
	                if (!( this.precpred(this._ctx, 2))) {
	                    throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                }
	                this.state = 246;
	                this.match(WdlV1Parser.OR);
	                this.state = 247;
	                this.expr_infix1(0); 
	            }
	            this.state = 252;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,14,this._ctx);
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
	    const _startState = 36;
	    this.enterRecursionRule(localctx, 36, WdlV1Parser.RULE_expr_infix1, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        localctx = new Infix2Context(this, localctx);
	        this._ctx = localctx;
	        _prevctx = localctx;

	        this.state = 254;
	        this.expr_infix2(0);
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 261;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,15,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                localctx = new LandContext(this, new Expr_infix1Context(this, _parentctx, _parentState));
	                this.pushNewRecursionContext(localctx, _startState, WdlV1Parser.RULE_expr_infix1);
	                this.state = 256;
	                if (!( this.precpred(this._ctx, 2))) {
	                    throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                }
	                this.state = 257;
	                this.match(WdlV1Parser.AND);
	                this.state = 258;
	                this.expr_infix2(0); 
	            }
	            this.state = 263;
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


	expr_infix2(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new Expr_infix2Context(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 38;
	    this.enterRecursionRule(localctx, 38, WdlV1Parser.RULE_expr_infix2, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        localctx = new Infix3Context(this, localctx);
	        this._ctx = localctx;
	        _prevctx = localctx;

	        this.state = 265;
	        this.expr_infix3(0);
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 287;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,17,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 285;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,16,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new EqeqContext(this, new Expr_infix2Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, WdlV1Parser.RULE_expr_infix2);
	                    this.state = 267;
	                    if (!( this.precpred(this._ctx, 7))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                    }
	                    this.state = 268;
	                    this.match(WdlV1Parser.EQUALITY);
	                    this.state = 269;
	                    this.expr_infix3(0);
	                    break;

	                case 2:
	                    localctx = new NeqContext(this, new Expr_infix2Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, WdlV1Parser.RULE_expr_infix2);
	                    this.state = 270;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 271;
	                    this.match(WdlV1Parser.NOTEQUAL);
	                    this.state = 272;
	                    this.expr_infix3(0);
	                    break;

	                case 3:
	                    localctx = new LteContext(this, new Expr_infix2Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, WdlV1Parser.RULE_expr_infix2);
	                    this.state = 273;
	                    if (!( this.precpred(this._ctx, 5))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
	                    }
	                    this.state = 274;
	                    this.match(WdlV1Parser.LTE);
	                    this.state = 275;
	                    this.expr_infix3(0);
	                    break;

	                case 4:
	                    localctx = new GteContext(this, new Expr_infix2Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, WdlV1Parser.RULE_expr_infix2);
	                    this.state = 276;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 277;
	                    this.match(WdlV1Parser.GTE);
	                    this.state = 278;
	                    this.expr_infix3(0);
	                    break;

	                case 5:
	                    localctx = new LtContext(this, new Expr_infix2Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, WdlV1Parser.RULE_expr_infix2);
	                    this.state = 279;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 280;
	                    this.match(WdlV1Parser.LT);
	                    this.state = 281;
	                    this.expr_infix3(0);
	                    break;

	                case 6:
	                    localctx = new GtContext(this, new Expr_infix2Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, WdlV1Parser.RULE_expr_infix2);
	                    this.state = 282;
	                    if (!( this.precpred(this._ctx, 2))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                    }
	                    this.state = 283;
	                    this.match(WdlV1Parser.GT);
	                    this.state = 284;
	                    this.expr_infix3(0);
	                    break;

	                } 
	            }
	            this.state = 289;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,17,this._ctx);
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
	    const _startState = 40;
	    this.enterRecursionRule(localctx, 40, WdlV1Parser.RULE_expr_infix3, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        localctx = new Infix4Context(this, localctx);
	        this._ctx = localctx;
	        _prevctx = localctx;

	        this.state = 291;
	        this.expr_infix4(0);
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 301;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,19,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 299;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,18,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new AddContext(this, new Expr_infix3Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, WdlV1Parser.RULE_expr_infix3);
	                    this.state = 293;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 294;
	                    this.match(WdlV1Parser.PLUS);
	                    this.state = 295;
	                    this.expr_infix4(0);
	                    break;

	                case 2:
	                    localctx = new SubContext(this, new Expr_infix3Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, WdlV1Parser.RULE_expr_infix3);
	                    this.state = 296;
	                    if (!( this.precpred(this._ctx, 2))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                    }
	                    this.state = 297;
	                    this.match(WdlV1Parser.MINUS);
	                    this.state = 298;
	                    this.expr_infix4(0);
	                    break;

	                } 
	            }
	            this.state = 303;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,19,this._ctx);
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
	    const _startState = 42;
	    this.enterRecursionRule(localctx, 42, WdlV1Parser.RULE_expr_infix4, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        localctx = new Infix5Context(this, localctx);
	        this._ctx = localctx;
	        _prevctx = localctx;

	        this.state = 305;
	        this.expr_infix5();
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 318;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,21,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 316;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,20,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new MulContext(this, new Expr_infix4Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, WdlV1Parser.RULE_expr_infix4);
	                    this.state = 307;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 308;
	                    this.match(WdlV1Parser.STAR);
	                    this.state = 309;
	                    this.expr_infix5();
	                    break;

	                case 2:
	                    localctx = new DivideContext(this, new Expr_infix4Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, WdlV1Parser.RULE_expr_infix4);
	                    this.state = 310;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 311;
	                    this.match(WdlV1Parser.DIVIDE);
	                    this.state = 312;
	                    this.expr_infix5();
	                    break;

	                case 3:
	                    localctx = new ModContext(this, new Expr_infix4Context(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, WdlV1Parser.RULE_expr_infix4);
	                    this.state = 313;
	                    if (!( this.precpred(this._ctx, 2))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                    }
	                    this.state = 314;
	                    this.match(WdlV1Parser.MOD);
	                    this.state = 315;
	                    this.expr_infix5();
	                    break;

	                } 
	            }
	            this.state = 320;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,21,this._ctx);
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
	    this.enterRule(localctx, 44, WdlV1Parser.RULE_expr_infix5);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 321;
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
	    const _startState = 46;
	    this.enterRecursionRule(localctx, 46, WdlV1Parser.RULE_expr_core, _p);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 427;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,34,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new ApplyContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 324;
	            this.match(WdlV1Parser.Identifier);
	            this.state = 325;
	            this.match(WdlV1Parser.LPAREN);
	            this.state = 337;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(((((_la - 9)) & ~0x1f) === 0 && ((1 << (_la - 9)) & 2938109953) !== 0) || ((((_la - 55)) & ~0x1f) === 0 && ((1 << (_la - 55)) & 11331) !== 0)) {
	                this.state = 326;
	                this.expr();
	                this.state = 331;
	                this._errHandler.sync(this);
	                var _alt = this._interp.adaptivePredict(this._input,22,this._ctx)
	                while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	                    if(_alt===1) {
	                        this.state = 327;
	                        this.match(WdlV1Parser.COMMA);
	                        this.state = 328;
	                        this.expr(); 
	                    }
	                    this.state = 333;
	                    this._errHandler.sync(this);
	                    _alt = this._interp.adaptivePredict(this._input,22,this._ctx);
	                }

	                this.state = 335;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===58) {
	                    this.state = 334;
	                    this.match(WdlV1Parser.COMMA);
	                }

	            }

	            this.state = 339;
	            this.match(WdlV1Parser.RPAREN);
	            break;

	        case 2:
	            localctx = new Array_literalContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 340;
	            this.match(WdlV1Parser.LBRACK);
	            this.state = 354;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(((((_la - 9)) & ~0x1f) === 0 && ((1 << (_la - 9)) & 2938109953) !== 0) || ((((_la - 55)) & ~0x1f) === 0 && ((1 << (_la - 55)) & 11331) !== 0)) {
	                this.state = 341;
	                this.expr();
	                this.state = 346;
	                this._errHandler.sync(this);
	                var _alt = this._interp.adaptivePredict(this._input,25,this._ctx)
	                while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	                    if(_alt===1) {
	                        this.state = 342;
	                        this.match(WdlV1Parser.COMMA);
	                        this.state = 343;
	                        this.expr(); 
	                    }
	                    this.state = 348;
	                    this._errHandler.sync(this);
	                    _alt = this._interp.adaptivePredict(this._input,25,this._ctx);
	                }

	                this.state = 350;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===58) {
	                    this.state = 349;
	                    this.match(WdlV1Parser.COMMA);
	                }

	                this.state = 356;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 357;
	            this.match(WdlV1Parser.RBRACK);
	            break;

	        case 3:
	            localctx = new Pair_literalContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 358;
	            this.match(WdlV1Parser.LPAREN);
	            this.state = 359;
	            this.expr();
	            this.state = 360;
	            this.match(WdlV1Parser.COMMA);
	            this.state = 361;
	            this.expr();
	            this.state = 362;
	            this.match(WdlV1Parser.RPAREN);
	            break;

	        case 4:
	            localctx = new Map_literalContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 364;
	            this.match(WdlV1Parser.LBRACE);
	            this.state = 383;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(((((_la - 9)) & ~0x1f) === 0 && ((1 << (_la - 9)) & 2938109953) !== 0) || ((((_la - 55)) & ~0x1f) === 0 && ((1 << (_la - 55)) & 11331) !== 0)) {
	                this.state = 365;
	                this.expr();
	                this.state = 366;
	                this.match(WdlV1Parser.COLON);
	                this.state = 367;
	                this.expr();
	                this.state = 375;
	                this._errHandler.sync(this);
	                var _alt = this._interp.adaptivePredict(this._input,28,this._ctx)
	                while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	                    if(_alt===1) {
	                        this.state = 368;
	                        this.match(WdlV1Parser.COMMA);
	                        this.state = 369;
	                        this.expr();
	                        this.state = 370;
	                        this.match(WdlV1Parser.COLON);
	                        this.state = 371;
	                        this.expr(); 
	                    }
	                    this.state = 377;
	                    this._errHandler.sync(this);
	                    _alt = this._interp.adaptivePredict(this._input,28,this._ctx);
	                }

	                this.state = 379;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===58) {
	                    this.state = 378;
	                    this.match(WdlV1Parser.COMMA);
	                }

	                this.state = 385;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 386;
	            this.match(WdlV1Parser.RBRACE);
	            break;

	        case 5:
	            localctx = new Object_literalContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 387;
	            this.match(WdlV1Parser.OBJECT_LITERAL);
	            this.state = 388;
	            this.match(WdlV1Parser.LBRACE);
	            this.state = 406;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===68) {
	                this.state = 389;
	                this.match(WdlV1Parser.Identifier);
	                this.state = 390;
	                this.match(WdlV1Parser.COLON);
	                this.state = 391;
	                this.expr();
	                this.state = 398;
	                this._errHandler.sync(this);
	                var _alt = this._interp.adaptivePredict(this._input,31,this._ctx)
	                while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	                    if(_alt===1) {
	                        this.state = 392;
	                        this.match(WdlV1Parser.COMMA);
	                        this.state = 393;
	                        this.match(WdlV1Parser.Identifier);
	                        this.state = 394;
	                        this.match(WdlV1Parser.COLON);
	                        this.state = 395;
	                        this.expr(); 
	                    }
	                    this.state = 400;
	                    this._errHandler.sync(this);
	                    _alt = this._interp.adaptivePredict(this._input,31,this._ctx);
	                }

	                this.state = 402;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===58) {
	                    this.state = 401;
	                    this.match(WdlV1Parser.COMMA);
	                }

	                this.state = 408;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 409;
	            this.match(WdlV1Parser.RBRACE);
	            break;

	        case 6:
	            localctx = new IfthenelseContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 410;
	            this.match(WdlV1Parser.IF);
	            this.state = 411;
	            this.expr();
	            this.state = 412;
	            this.match(WdlV1Parser.THEN);
	            this.state = 413;
	            this.expr();
	            this.state = 414;
	            this.match(WdlV1Parser.ELSE);
	            this.state = 415;
	            this.expr();
	            break;

	        case 7:
	            localctx = new Expression_groupContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 417;
	            this.match(WdlV1Parser.LPAREN);
	            this.state = 418;
	            this.expr();
	            this.state = 419;
	            this.match(WdlV1Parser.RPAREN);
	            break;

	        case 8:
	            localctx = new NegateContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 421;
	            this.match(WdlV1Parser.NOT);
	            this.state = 422;
	            this.expr();
	            break;

	        case 9:
	            localctx = new UnarysignedContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 423;
	            _la = this._input.LA(1);
	            if(!(_la===55 || _la===56)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 424;
	            this.expr();
	            break;

	        case 10:
	            localctx = new PrimitivesContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 425;
	            this.primitive_literal();
	            break;

	        case 11:
	            localctx = new Left_nameContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 426;
	            this.match(WdlV1Parser.Identifier);
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 439;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,36,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 437;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,35,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new AtContext(this, new Expr_coreContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, WdlV1Parser.RULE_expr_core);
	                    this.state = 429;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 430;
	                    this.match(WdlV1Parser.LBRACK);
	                    this.state = 431;
	                    this.expr();
	                    this.state = 432;
	                    this.match(WdlV1Parser.RBRACK);
	                    break;

	                case 2:
	                    localctx = new Get_nameContext(this, new Expr_coreContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, WdlV1Parser.RULE_expr_core);
	                    this.state = 434;
	                    if (!( this.precpred(this._ctx, 5))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
	                    }
	                    this.state = 435;
	                    this.match(WdlV1Parser.DOT);
	                    this.state = 436;
	                    this.match(WdlV1Parser.Identifier);
	                    break;

	                } 
	            }
	            this.state = 441;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,36,this._ctx);
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



	import_alias() {
	    let localctx = new Import_aliasContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 48, WdlV1Parser.RULE_import_alias);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 442;
	        this.match(WdlV1Parser.ALIAS);
	        this.state = 443;
	        this.match(WdlV1Parser.Identifier);
	        this.state = 444;
	        this.match(WdlV1Parser.AS);
	        this.state = 445;
	        this.match(WdlV1Parser.Identifier);
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
	    this.enterRule(localctx, 50, WdlV1Parser.RULE_import_as);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 447;
	        this.match(WdlV1Parser.AS);
	        this.state = 448;
	        this.match(WdlV1Parser.Identifier);
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
	    this.enterRule(localctx, 52, WdlV1Parser.RULE_import_doc);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 450;
	        this.match(WdlV1Parser.IMPORT);
	        this.state = 451;
	        this.string();
	        this.state = 453;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===13) {
	            this.state = 452;
	            this.import_as();
	        }

	        this.state = 458;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===12) {
	            this.state = 455;
	            this.import_alias();
	            this.state = 460;
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



	struct() {
	    let localctx = new StructContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 54, WdlV1Parser.RULE_struct);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 461;
	        this.match(WdlV1Parser.STRUCT);
	        this.state = 462;
	        this.match(WdlV1Parser.Identifier);
	        this.state = 463;
	        this.match(WdlV1Parser.LBRACE);
	        this.state = 467;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) === 0 && ((1 << _la) & 1071644672) !== 0) || _la===68) {
	            this.state = 464;
	            this.unbound_decls();
	            this.state = 469;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 470;
	        this.match(WdlV1Parser.RBRACE);
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
	    this.enterRule(localctx, 56, WdlV1Parser.RULE_meta_value);
	    try {
	        this.state = 479;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 90:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 472;
	            this.match(WdlV1Parser.MetaNull);
	            break;
	        case 87:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 473;
	            this.match(WdlV1Parser.MetaBool);
	            break;
	        case 88:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 474;
	            this.match(WdlV1Parser.MetaInt);
	            break;
	        case 89:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 475;
	            this.match(WdlV1Parser.MetaFloat);
	            break;
	        case 91:
	        case 92:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 476;
	            this.meta_string();
	            break;
	        case 93:
	        case 96:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 477;
	            this.meta_object();
	            break;
	        case 94:
	        case 95:
	            this.enterOuterAlt(localctx, 7);
	            this.state = 478;
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
	    this.enterRule(localctx, 58, WdlV1Parser.RULE_meta_string_part);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 484;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===98) {
	            this.state = 481;
	            this.match(WdlV1Parser.MetaStringPart);
	            this.state = 486;
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
	    this.enterRule(localctx, 60, WdlV1Parser.RULE_meta_string);
	    try {
	        this.state = 495;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 92:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 487;
	            this.match(WdlV1Parser.MetaDquote);
	            this.state = 488;
	            this.meta_string_part();
	            this.state = 489;
	            this.match(WdlV1Parser.MetaDquote);
	            break;
	        case 91:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 491;
	            this.match(WdlV1Parser.MetaSquote);
	            this.state = 492;
	            this.meta_string_part();
	            this.state = 493;
	            this.match(WdlV1Parser.MetaSquote);
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
	    this.enterRule(localctx, 62, WdlV1Parser.RULE_meta_array);
	    var _la = 0;
	    try {
	        this.state = 509;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 94:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 497;
	            this.match(WdlV1Parser.MetaEmptyArray);
	            break;
	        case 95:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 498;
	            this.match(WdlV1Parser.MetaLbrack);
	            this.state = 499;
	            this.meta_value();
	            this.state = 504;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===101) {
	                this.state = 500;
	                this.match(WdlV1Parser.MetaArrayComma);
	                this.state = 501;
	                this.meta_value();
	                this.state = 506;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 507;
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
	    this.enterRule(localctx, 64, WdlV1Parser.RULE_meta_object);
	    var _la = 0;
	    try {
	        this.state = 523;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 93:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 511;
	            this.match(WdlV1Parser.MetaEmptyObject);
	            break;
	        case 96:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 512;
	            this.match(WdlV1Parser.MetaLbrace);
	            this.state = 513;
	            this.meta_object_kv();
	            this.state = 518;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===108) {
	                this.state = 514;
	                this.match(WdlV1Parser.MetaObjectComma);
	                this.state = 515;
	                this.meta_object_kv();
	                this.state = 520;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 521;
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
	    this.enterRule(localctx, 66, WdlV1Parser.RULE_meta_object_kv);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 525;
	        this.match(WdlV1Parser.MetaObjectIdentifier);
	        this.state = 526;
	        this.match(WdlV1Parser.MetaObjectColon);
	        this.state = 527;
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
	    this.enterRule(localctx, 68, WdlV1Parser.RULE_meta_kv);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 529;
	        this.match(WdlV1Parser.MetaIdentifier);
	        this.state = 530;
	        this.match(WdlV1Parser.MetaColon);
	        this.state = 531;
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
	    this.enterRule(localctx, 70, WdlV1Parser.RULE_parameter_meta);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 533;
	        this.match(WdlV1Parser.PARAMETERMETA);
	        this.state = 534;
	        this.match(WdlV1Parser.BeginMeta);
	        this.state = 538;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===82) {
	            this.state = 535;
	            this.meta_kv();
	            this.state = 540;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 541;
	        this.match(WdlV1Parser.EndMeta);
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
	    this.enterRule(localctx, 72, WdlV1Parser.RULE_meta);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 543;
	        this.match(WdlV1Parser.META);
	        this.state = 544;
	        this.match(WdlV1Parser.BeginMeta);
	        this.state = 548;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===82) {
	            this.state = 545;
	            this.meta_kv();
	            this.state = 550;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 551;
	        this.match(WdlV1Parser.EndMeta);
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
	    this.enterRule(localctx, 74, WdlV1Parser.RULE_task_runtime_kv);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 553;
	        this.match(WdlV1Parser.Identifier);
	        this.state = 554;
	        this.match(WdlV1Parser.COLON);
	        this.state = 555;
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
	    this.enterRule(localctx, 76, WdlV1Parser.RULE_task_runtime);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 557;
	        this.match(WdlV1Parser.RUNTIME);
	        this.state = 558;
	        this.match(WdlV1Parser.LBRACE);
	        this.state = 562;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===68) {
	            this.state = 559;
	            this.task_runtime_kv();
	            this.state = 564;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 565;
	        this.match(WdlV1Parser.RBRACE);
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



	task_input() {
	    let localctx = new Task_inputContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 78, WdlV1Parser.RULE_task_input);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 567;
	        this.match(WdlV1Parser.INPUT);
	        this.state = 568;
	        this.match(WdlV1Parser.LBRACE);
	        this.state = 572;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) === 0 && ((1 << _la) & 1071644672) !== 0) || _la===68) {
	            this.state = 569;
	            this.any_decls();
	            this.state = 574;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 575;
	        this.match(WdlV1Parser.RBRACE);
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
	    this.enterRule(localctx, 80, WdlV1Parser.RULE_task_output);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 577;
	        this.match(WdlV1Parser.OUTPUT);
	        this.state = 578;
	        this.match(WdlV1Parser.LBRACE);
	        this.state = 582;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) === 0 && ((1 << _la) & 1071644672) !== 0) || _la===68) {
	            this.state = 579;
	            this.bound_decls();
	            this.state = 584;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 585;
	        this.match(WdlV1Parser.RBRACE);
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
	    this.enterRule(localctx, 82, WdlV1Parser.RULE_task_command_string_part);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 590;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===77) {
	            this.state = 587;
	            this.match(WdlV1Parser.CommandStringPart);
	            this.state = 592;
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
	    this.enterRule(localctx, 84, WdlV1Parser.RULE_task_command_expr_part);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 593;
	        this.match(WdlV1Parser.StringCommandStart);
	        this.state = 597;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,53,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 594;
	                this.expression_placeholder_option(); 
	            }
	            this.state = 599;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,53,this._ctx);
	        }

	        this.state = 600;
	        this.expr();
	        this.state = 601;
	        this.match(WdlV1Parser.RBRACE);
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
	    this.enterRule(localctx, 86, WdlV1Parser.RULE_task_command_expr_with_string);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 603;
	        this.task_command_expr_part();
	        this.state = 604;
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
	    this.enterRule(localctx, 88, WdlV1Parser.RULE_task_command);
	    var _la = 0;
	    try {
	        this.state = 628;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,56,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 606;
	            this.match(WdlV1Parser.COMMAND);
	            this.state = 607;
	            this.match(WdlV1Parser.BeginLBrace);
	            this.state = 608;
	            this.task_command_string_part();
	            this.state = 612;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===75) {
	                this.state = 609;
	                this.task_command_expr_with_string();
	                this.state = 614;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 615;
	            this.match(WdlV1Parser.EndCommand);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 617;
	            this.match(WdlV1Parser.COMMAND);
	            this.state = 618;
	            this.match(WdlV1Parser.BeginHereDoc);
	            this.state = 619;
	            this.task_command_string_part();
	            this.state = 623;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===75) {
	                this.state = 620;
	                this.task_command_expr_with_string();
	                this.state = 625;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 626;
	            this.match(WdlV1Parser.EndCommand);
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



	task_element() {
	    let localctx = new Task_elementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 90, WdlV1Parser.RULE_task_element);
	    try {
	        this.state = 637;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 15:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 630;
	            this.task_input();
	            break;
	        case 16:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 631;
	            this.task_output();
	            break;
	        case 19:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 632;
	            this.task_command();
	            break;
	        case 20:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 633;
	            this.task_runtime();
	            break;
	        case 21:
	        case 22:
	        case 23:
	        case 24:
	        case 25:
	        case 26:
	        case 27:
	        case 28:
	        case 29:
	        case 68:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 634;
	            this.bound_decls();
	            break;
	        case 17:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 635;
	            this.parameter_meta();
	            break;
	        case 18:
	            this.enterOuterAlt(localctx, 7);
	            this.state = 636;
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
	    this.enterRule(localctx, 92, WdlV1Parser.RULE_task);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 639;
	        this.match(WdlV1Parser.TASK);
	        this.state = 640;
	        this.match(WdlV1Parser.Identifier);
	        this.state = 641;
	        this.match(WdlV1Parser.LBRACE);
	        this.state = 643; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 642;
	            this.task_element();
	            this.state = 645; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while((((_la) & ~0x1f) === 0 && ((1 << _la) & 1073709056) !== 0) || _la===68);
	        this.state = 647;
	        this.match(WdlV1Parser.RBRACE);
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
	    this.enterRule(localctx, 94, WdlV1Parser.RULE_inner_workflow_element);
	    try {
	        this.state = 653;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 21:
	        case 22:
	        case 23:
	        case 24:
	        case 25:
	        case 26:
	        case 27:
	        case 28:
	        case 29:
	        case 68:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 649;
	            this.bound_decls();
	            break;
	        case 8:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 650;
	            this.call();
	            break;
	        case 7:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 651;
	            this.scatter();
	            break;
	        case 9:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 652;
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



	call_alias() {
	    let localctx = new Call_aliasContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 96, WdlV1Parser.RULE_call_alias);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 655;
	        this.match(WdlV1Parser.AS);
	        this.state = 656;
	        this.match(WdlV1Parser.Identifier);
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
	    this.enterRule(localctx, 98, WdlV1Parser.RULE_call_input);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 658;
	        this.match(WdlV1Parser.Identifier);
	        this.state = 659;
	        this.match(WdlV1Parser.EQUAL);
	        this.state = 660;
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
	    this.enterRule(localctx, 100, WdlV1Parser.RULE_call_inputs);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 662;
	        this.match(WdlV1Parser.INPUT);
	        this.state = 663;
	        this.match(WdlV1Parser.COLON);
	        this.state = 677;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===68) {
	            this.state = 664;
	            this.call_input();
	            this.state = 669;
	            this._errHandler.sync(this);
	            var _alt = this._interp.adaptivePredict(this._input,60,this._ctx)
	            while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	                if(_alt===1) {
	                    this.state = 665;
	                    this.match(WdlV1Parser.COMMA);
	                    this.state = 666;
	                    this.call_input(); 
	                }
	                this.state = 671;
	                this._errHandler.sync(this);
	                _alt = this._interp.adaptivePredict(this._input,60,this._ctx);
	            }

	            this.state = 673;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===58) {
	                this.state = 672;
	                this.match(WdlV1Parser.COMMA);
	            }

	            this.state = 679;
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
	    this.enterRule(localctx, 102, WdlV1Parser.RULE_call_body);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 680;
	        this.match(WdlV1Parser.LBRACE);
	        this.state = 682;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===15) {
	            this.state = 681;
	            this.call_inputs();
	        }

	        this.state = 684;
	        this.match(WdlV1Parser.RBRACE);
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
	    this.enterRule(localctx, 104, WdlV1Parser.RULE_call_name);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 686;
	        this.match(WdlV1Parser.Identifier);
	        this.state = 691;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===60) {
	            this.state = 687;
	            this.match(WdlV1Parser.DOT);
	            this.state = 688;
	            this.match(WdlV1Parser.Identifier);
	            this.state = 693;
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
	    this.enterRule(localctx, 106, WdlV1Parser.RULE_call);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 694;
	        this.match(WdlV1Parser.CALL);
	        this.state = 695;
	        this.call_name();
	        this.state = 697;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===13) {
	            this.state = 696;
	            this.call_alias();
	        }

	        this.state = 700;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===38) {
	            this.state = 699;
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
	    this.enterRule(localctx, 108, WdlV1Parser.RULE_scatter);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 702;
	        this.match(WdlV1Parser.SCATTER);
	        this.state = 703;
	        this.match(WdlV1Parser.LPAREN);
	        this.state = 704;
	        this.match(WdlV1Parser.Identifier);
	        this.state = 705;
	        this.match(WdlV1Parser.In);
	        this.state = 706;
	        this.expr();
	        this.state = 707;
	        this.match(WdlV1Parser.RPAREN);
	        this.state = 708;
	        this.match(WdlV1Parser.LBRACE);
	        this.state = 712;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) === 0 && ((1 << _la) & 1071645568) !== 0) || _la===68) {
	            this.state = 709;
	            this.inner_workflow_element();
	            this.state = 714;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 715;
	        this.match(WdlV1Parser.RBRACE);
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
	    this.enterRule(localctx, 110, WdlV1Parser.RULE_conditional);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 717;
	        this.match(WdlV1Parser.IF);
	        this.state = 718;
	        this.match(WdlV1Parser.LPAREN);
	        this.state = 719;
	        this.expr();
	        this.state = 720;
	        this.match(WdlV1Parser.RPAREN);
	        this.state = 721;
	        this.match(WdlV1Parser.LBRACE);
	        this.state = 725;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) === 0 && ((1 << _la) & 1071645568) !== 0) || _la===68) {
	            this.state = 722;
	            this.inner_workflow_element();
	            this.state = 727;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 728;
	        this.match(WdlV1Parser.RBRACE);
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



	workflow_input() {
	    let localctx = new Workflow_inputContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 112, WdlV1Parser.RULE_workflow_input);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 730;
	        this.match(WdlV1Parser.INPUT);
	        this.state = 731;
	        this.match(WdlV1Parser.LBRACE);
	        this.state = 735;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) === 0 && ((1 << _la) & 1071644672) !== 0) || _la===68) {
	            this.state = 732;
	            this.any_decls();
	            this.state = 737;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 738;
	        this.match(WdlV1Parser.RBRACE);
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
	    this.enterRule(localctx, 114, WdlV1Parser.RULE_workflow_output);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 740;
	        this.match(WdlV1Parser.OUTPUT);
	        this.state = 741;
	        this.match(WdlV1Parser.LBRACE);
	        this.state = 745;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) === 0 && ((1 << _la) & 1071644672) !== 0) || _la===68) {
	            this.state = 742;
	            this.bound_decls();
	            this.state = 747;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 748;
	        this.match(WdlV1Parser.RBRACE);
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
	    this.enterRule(localctx, 116, WdlV1Parser.RULE_workflow_element);
	    try {
	        this.state = 755;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 15:
	            localctx = new InputContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 750;
	            this.workflow_input();
	            break;
	        case 16:
	            localctx = new OutputContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 751;
	            this.workflow_output();
	            break;
	        case 7:
	        case 8:
	        case 9:
	        case 21:
	        case 22:
	        case 23:
	        case 24:
	        case 25:
	        case 26:
	        case 27:
	        case 28:
	        case 29:
	        case 68:
	            localctx = new Inner_elementContext(this, localctx);
	            this.enterOuterAlt(localctx, 3);
	            this.state = 752;
	            this.inner_workflow_element();
	            break;
	        case 17:
	            localctx = new Parameter_meta_elementContext(this, localctx);
	            this.enterOuterAlt(localctx, 4);
	            this.state = 753;
	            this.parameter_meta();
	            break;
	        case 18:
	            localctx = new Meta_elementContext(this, localctx);
	            this.enterOuterAlt(localctx, 5);
	            this.state = 754;
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
	    this.enterRule(localctx, 118, WdlV1Parser.RULE_workflow);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 757;
	        this.match(WdlV1Parser.WORKFLOW);
	        this.state = 758;
	        this.match(WdlV1Parser.Identifier);
	        this.state = 759;
	        this.match(WdlV1Parser.LBRACE);
	        this.state = 763;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) === 0 && ((1 << _la) & 1072137088) !== 0) || _la===68) {
	            this.state = 760;
	            this.workflow_element();
	            this.state = 765;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 766;
	        this.match(WdlV1Parser.RBRACE);
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
	    this.enterRule(localctx, 120, WdlV1Parser.RULE_document_element);
	    try {
	        this.state = 771;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 3:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 768;
	            this.import_doc();
	            break;
	        case 6:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 769;
	            this.struct();
	            break;
	        case 5:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 770;
	            this.task();
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
	    this.enterRule(localctx, 122, WdlV1Parser.RULE_document);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 774;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===2) {
	            this.state = 773;
	            this.match(WdlV1Parser.VERSION);
	        }

	        this.state = 779;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) === 0 && ((1 << _la) & 104) !== 0)) {
	            this.state = 776;
	            this.document_element();
	            this.state = 781;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 789;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===4) {
	            this.state = 782;
	            this.workflow();
	            this.state = 786;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while((((_la) & ~0x1f) === 0 && ((1 << _la) & 104) !== 0)) {
	                this.state = 783;
	                this.document_element();
	                this.state = 788;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	        }

	        this.state = 791;
	        this.match(WdlV1Parser.EOF);
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

WdlV1Parser.EOF = antlr4.Token.EOF;
WdlV1Parser.LINE_COMMENT = 1;
WdlV1Parser.VERSION = 2;
WdlV1Parser.IMPORT = 3;
WdlV1Parser.WORKFLOW = 4;
WdlV1Parser.TASK = 5;
WdlV1Parser.STRUCT = 6;
WdlV1Parser.SCATTER = 7;
WdlV1Parser.CALL = 8;
WdlV1Parser.IF = 9;
WdlV1Parser.THEN = 10;
WdlV1Parser.ELSE = 11;
WdlV1Parser.ALIAS = 12;
WdlV1Parser.AS = 13;
WdlV1Parser.In = 14;
WdlV1Parser.INPUT = 15;
WdlV1Parser.OUTPUT = 16;
WdlV1Parser.PARAMETERMETA = 17;
WdlV1Parser.META = 18;
WdlV1Parser.COMMAND = 19;
WdlV1Parser.RUNTIME = 20;
WdlV1Parser.BOOLEAN = 21;
WdlV1Parser.INT = 22;
WdlV1Parser.FLOAT = 23;
WdlV1Parser.STRING = 24;
WdlV1Parser.FILE = 25;
WdlV1Parser.ARRAY = 26;
WdlV1Parser.MAP = 27;
WdlV1Parser.PAIR = 28;
WdlV1Parser.OBJECT = 29;
WdlV1Parser.OBJECT_LITERAL = 30;
WdlV1Parser.SEP = 31;
WdlV1Parser.DEFAULT = 32;
WdlV1Parser.IntLiteral = 33;
WdlV1Parser.FloatLiteral = 34;
WdlV1Parser.BoolLiteral = 35;
WdlV1Parser.LPAREN = 36;
WdlV1Parser.RPAREN = 37;
WdlV1Parser.LBRACE = 38;
WdlV1Parser.RBRACE = 39;
WdlV1Parser.LBRACK = 40;
WdlV1Parser.RBRACK = 41;
WdlV1Parser.ESC = 42;
WdlV1Parser.COLON = 43;
WdlV1Parser.LT = 44;
WdlV1Parser.GT = 45;
WdlV1Parser.GTE = 46;
WdlV1Parser.LTE = 47;
WdlV1Parser.EQUALITY = 48;
WdlV1Parser.NOTEQUAL = 49;
WdlV1Parser.EQUAL = 50;
WdlV1Parser.AND = 51;
WdlV1Parser.OR = 52;
WdlV1Parser.OPTIONAL = 53;
WdlV1Parser.STAR = 54;
WdlV1Parser.PLUS = 55;
WdlV1Parser.MINUS = 56;
WdlV1Parser.DOLLAR = 57;
WdlV1Parser.COMMA = 58;
WdlV1Parser.SEMI = 59;
WdlV1Parser.DOT = 60;
WdlV1Parser.NOT = 61;
WdlV1Parser.TILDE = 62;
WdlV1Parser.DIVIDE = 63;
WdlV1Parser.MOD = 64;
WdlV1Parser.SQUOTE = 65;
WdlV1Parser.DQUOTE = 66;
WdlV1Parser.WHITESPACE = 67;
WdlV1Parser.Identifier = 68;
WdlV1Parser.StringPart = 69;
WdlV1Parser.BeginWhitespace = 70;
WdlV1Parser.BeginHereDoc = 71;
WdlV1Parser.BeginLBrace = 72;
WdlV1Parser.HereDocUnicodeEscape = 73;
WdlV1Parser.CommandUnicodeEscape = 74;
WdlV1Parser.StringCommandStart = 75;
WdlV1Parser.EndCommand = 76;
WdlV1Parser.CommandStringPart = 77;
WdlV1Parser.VersionWhitespace = 78;
WdlV1Parser.BeginMeta = 79;
WdlV1Parser.MetaWhitespace = 80;
WdlV1Parser.MetaBodyComment = 81;
WdlV1Parser.MetaIdentifier = 82;
WdlV1Parser.MetaColon = 83;
WdlV1Parser.EndMeta = 84;
WdlV1Parser.MetaBodyWhitespace = 85;
WdlV1Parser.MetaValueComment = 86;
WdlV1Parser.MetaBool = 87;
WdlV1Parser.MetaInt = 88;
WdlV1Parser.MetaFloat = 89;
WdlV1Parser.MetaNull = 90;
WdlV1Parser.MetaSquote = 91;
WdlV1Parser.MetaDquote = 92;
WdlV1Parser.MetaEmptyObject = 93;
WdlV1Parser.MetaEmptyArray = 94;
WdlV1Parser.MetaLbrack = 95;
WdlV1Parser.MetaLbrace = 96;
WdlV1Parser.MetaValueWhitespace = 97;
WdlV1Parser.MetaStringPart = 98;
WdlV1Parser.MetaArrayComment = 99;
WdlV1Parser.MetaArrayCommaRbrack = 100;
WdlV1Parser.MetaArrayComma = 101;
WdlV1Parser.MetaRbrack = 102;
WdlV1Parser.MetaArrayWhitespace = 103;
WdlV1Parser.MetaObjectComment = 104;
WdlV1Parser.MetaObjectIdentifier = 105;
WdlV1Parser.MetaObjectColon = 106;
WdlV1Parser.MetaObjectCommaRbrace = 107;
WdlV1Parser.MetaObjectComma = 108;
WdlV1Parser.MetaRbrace = 109;
WdlV1Parser.MetaObjectWhitespace = 110;
WdlV1Parser.HereDocEscapedEnd = 111;

WdlV1Parser.RULE_map_type = 0;
WdlV1Parser.RULE_array_type = 1;
WdlV1Parser.RULE_pair_type = 2;
WdlV1Parser.RULE_type_base = 3;
WdlV1Parser.RULE_wdl_type = 4;
WdlV1Parser.RULE_unbound_decls = 5;
WdlV1Parser.RULE_bound_decls = 6;
WdlV1Parser.RULE_any_decls = 7;
WdlV1Parser.RULE_number = 8;
WdlV1Parser.RULE_expression_placeholder_option = 9;
WdlV1Parser.RULE_string_part = 10;
WdlV1Parser.RULE_string_expr_part = 11;
WdlV1Parser.RULE_string_expr_with_string_part = 12;
WdlV1Parser.RULE_string = 13;
WdlV1Parser.RULE_primitive_literal = 14;
WdlV1Parser.RULE_expr = 15;
WdlV1Parser.RULE_expr_infix = 16;
WdlV1Parser.RULE_expr_infix0 = 17;
WdlV1Parser.RULE_expr_infix1 = 18;
WdlV1Parser.RULE_expr_infix2 = 19;
WdlV1Parser.RULE_expr_infix3 = 20;
WdlV1Parser.RULE_expr_infix4 = 21;
WdlV1Parser.RULE_expr_infix5 = 22;
WdlV1Parser.RULE_expr_core = 23;
WdlV1Parser.RULE_import_alias = 24;
WdlV1Parser.RULE_import_as = 25;
WdlV1Parser.RULE_import_doc = 26;
WdlV1Parser.RULE_struct = 27;
WdlV1Parser.RULE_meta_value = 28;
WdlV1Parser.RULE_meta_string_part = 29;
WdlV1Parser.RULE_meta_string = 30;
WdlV1Parser.RULE_meta_array = 31;
WdlV1Parser.RULE_meta_object = 32;
WdlV1Parser.RULE_meta_object_kv = 33;
WdlV1Parser.RULE_meta_kv = 34;
WdlV1Parser.RULE_parameter_meta = 35;
WdlV1Parser.RULE_meta = 36;
WdlV1Parser.RULE_task_runtime_kv = 37;
WdlV1Parser.RULE_task_runtime = 38;
WdlV1Parser.RULE_task_input = 39;
WdlV1Parser.RULE_task_output = 40;
WdlV1Parser.RULE_task_command_string_part = 41;
WdlV1Parser.RULE_task_command_expr_part = 42;
WdlV1Parser.RULE_task_command_expr_with_string = 43;
WdlV1Parser.RULE_task_command = 44;
WdlV1Parser.RULE_task_element = 45;
WdlV1Parser.RULE_task = 46;
WdlV1Parser.RULE_inner_workflow_element = 47;
WdlV1Parser.RULE_call_alias = 48;
WdlV1Parser.RULE_call_input = 49;
WdlV1Parser.RULE_call_inputs = 50;
WdlV1Parser.RULE_call_body = 51;
WdlV1Parser.RULE_call_name = 52;
WdlV1Parser.RULE_call = 53;
WdlV1Parser.RULE_scatter = 54;
WdlV1Parser.RULE_conditional = 55;
WdlV1Parser.RULE_workflow_input = 56;
WdlV1Parser.RULE_workflow_output = 57;
WdlV1Parser.RULE_workflow_element = 58;
WdlV1Parser.RULE_workflow = 59;
WdlV1Parser.RULE_document_element = 60;
WdlV1Parser.RULE_document = 61;

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
        this.ruleIndex = WdlV1Parser.RULE_map_type;
    }

	MAP() {
	    return this.getToken(WdlV1Parser.MAP, 0);
	};

	LBRACK() {
	    return this.getToken(WdlV1Parser.LBRACK, 0);
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
	    return this.getToken(WdlV1Parser.COMMA, 0);
	};

	RBRACK() {
	    return this.getToken(WdlV1Parser.RBRACK, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterMap_type(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_array_type;
    }

	ARRAY() {
	    return this.getToken(WdlV1Parser.ARRAY, 0);
	};

	LBRACK() {
	    return this.getToken(WdlV1Parser.LBRACK, 0);
	};

	wdl_type() {
	    return this.getTypedRuleContext(Wdl_typeContext,0);
	};

	RBRACK() {
	    return this.getToken(WdlV1Parser.RBRACK, 0);
	};

	PLUS() {
	    return this.getToken(WdlV1Parser.PLUS, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterArray_type(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_pair_type;
    }

	PAIR() {
	    return this.getToken(WdlV1Parser.PAIR, 0);
	};

	LBRACK() {
	    return this.getToken(WdlV1Parser.LBRACK, 0);
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
	    return this.getToken(WdlV1Parser.COMMA, 0);
	};

	RBRACK() {
	    return this.getToken(WdlV1Parser.RBRACK, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterPair_type(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_type_base;
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
	    return this.getToken(WdlV1Parser.STRING, 0);
	};

	FILE() {
	    return this.getToken(WdlV1Parser.FILE, 0);
	};

	BOOLEAN() {
	    return this.getToken(WdlV1Parser.BOOLEAN, 0);
	};

	OBJECT() {
	    return this.getToken(WdlV1Parser.OBJECT, 0);
	};

	INT() {
	    return this.getToken(WdlV1Parser.INT, 0);
	};

	FLOAT() {
	    return this.getToken(WdlV1Parser.FLOAT, 0);
	};

	Identifier() {
	    return this.getToken(WdlV1Parser.Identifier, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterType_base(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_wdl_type;
    }

	type_base() {
	    return this.getTypedRuleContext(Type_baseContext,0);
	};

	OPTIONAL() {
	    return this.getToken(WdlV1Parser.OPTIONAL, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterWdl_type(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_unbound_decls;
    }

	wdl_type() {
	    return this.getTypedRuleContext(Wdl_typeContext,0);
	};

	Identifier() {
	    return this.getToken(WdlV1Parser.Identifier, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterUnbound_decls(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_bound_decls;
    }

	wdl_type() {
	    return this.getTypedRuleContext(Wdl_typeContext,0);
	};

	Identifier() {
	    return this.getToken(WdlV1Parser.Identifier, 0);
	};

	EQUAL() {
	    return this.getToken(WdlV1Parser.EQUAL, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterBound_decls(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_any_decls;
    }

	unbound_decls() {
	    return this.getTypedRuleContext(Unbound_declsContext,0);
	};

	bound_decls() {
	    return this.getTypedRuleContext(Bound_declsContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterAny_decls(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitAny_decls(this);
		}
	}


}



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
        this.ruleIndex = WdlV1Parser.RULE_number;
    }

	IntLiteral() {
	    return this.getToken(WdlV1Parser.IntLiteral, 0);
	};

	FloatLiteral() {
	    return this.getToken(WdlV1Parser.FloatLiteral, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterNumber(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_expression_placeholder_option;
    }

	BoolLiteral() {
	    return this.getToken(WdlV1Parser.BoolLiteral, 0);
	};

	EQUAL() {
	    return this.getToken(WdlV1Parser.EQUAL, 0);
	};

	string() {
	    return this.getTypedRuleContext(StringContext,0);
	};

	number() {
	    return this.getTypedRuleContext(NumberContext,0);
	};

	DEFAULT() {
	    return this.getToken(WdlV1Parser.DEFAULT, 0);
	};

	SEP() {
	    return this.getToken(WdlV1Parser.SEP, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterExpression_placeholder_option(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_string_part;
    }

	StringPart = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlV1Parser.StringPart);
	    } else {
	        return this.getToken(WdlV1Parser.StringPart, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterString_part(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_string_expr_part;
    }

	StringCommandStart() {
	    return this.getToken(WdlV1Parser.StringCommandStart, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	RBRACE() {
	    return this.getToken(WdlV1Parser.RBRACE, 0);
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
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterString_expr_part(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_string_expr_with_string_part;
    }

	string_expr_part() {
	    return this.getTypedRuleContext(String_expr_partContext,0);
	};

	string_part() {
	    return this.getTypedRuleContext(String_partContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterString_expr_with_string_part(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_string;
    }

	DQUOTE = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlV1Parser.DQUOTE);
	    } else {
	        return this.getToken(WdlV1Parser.DQUOTE, i);
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
	        return this.getTokens(WdlV1Parser.SQUOTE);
	    } else {
	        return this.getToken(WdlV1Parser.SQUOTE, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterString(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_primitive_literal;
    }

	BoolLiteral() {
	    return this.getToken(WdlV1Parser.BoolLiteral, 0);
	};

	number() {
	    return this.getTypedRuleContext(NumberContext,0);
	};

	string() {
	    return this.getTypedRuleContext(StringContext,0);
	};

	Identifier() {
	    return this.getToken(WdlV1Parser.Identifier, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterPrimitive_literal(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_expr;
    }

	expr_infix() {
	    return this.getTypedRuleContext(Expr_infixContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_expr_infix;
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
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterInfix0(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitInfix0(this);
		}
	}


}

WdlV1Parser.Infix0Context = Infix0Context;

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
        this.ruleIndex = WdlV1Parser.RULE_expr_infix0;
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
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterInfix1(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitInfix1(this);
		}
	}


}

WdlV1Parser.Infix1Context = Infix1Context;

class LorContext extends Expr_infix0Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix0() {
	    return this.getTypedRuleContext(Expr_infix0Context,0);
	};

	OR() {
	    return this.getToken(WdlV1Parser.OR, 0);
	};

	expr_infix1() {
	    return this.getTypedRuleContext(Expr_infix1Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterLor(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitLor(this);
		}
	}


}

WdlV1Parser.LorContext = LorContext;

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
        this.ruleIndex = WdlV1Parser.RULE_expr_infix1;
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
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterInfix2(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitInfix2(this);
		}
	}


}

WdlV1Parser.Infix2Context = Infix2Context;

class LandContext extends Expr_infix1Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix1() {
	    return this.getTypedRuleContext(Expr_infix1Context,0);
	};

	AND() {
	    return this.getToken(WdlV1Parser.AND, 0);
	};

	expr_infix2() {
	    return this.getTypedRuleContext(Expr_infix2Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterLand(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitLand(this);
		}
	}


}

WdlV1Parser.LandContext = LandContext;

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
        this.ruleIndex = WdlV1Parser.RULE_expr_infix2;
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
	    return this.getToken(WdlV1Parser.EQUALITY, 0);
	};

	expr_infix3() {
	    return this.getTypedRuleContext(Expr_infix3Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterEqeq(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitEqeq(this);
		}
	}


}

WdlV1Parser.EqeqContext = EqeqContext;

class LtContext extends Expr_infix2Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix2() {
	    return this.getTypedRuleContext(Expr_infix2Context,0);
	};

	LT() {
	    return this.getToken(WdlV1Parser.LT, 0);
	};

	expr_infix3() {
	    return this.getTypedRuleContext(Expr_infix3Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterLt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitLt(this);
		}
	}


}

WdlV1Parser.LtContext = LtContext;

class Infix3Context extends Expr_infix2Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix3() {
	    return this.getTypedRuleContext(Expr_infix3Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterInfix3(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitInfix3(this);
		}
	}


}

WdlV1Parser.Infix3Context = Infix3Context;

class GteContext extends Expr_infix2Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix2() {
	    return this.getTypedRuleContext(Expr_infix2Context,0);
	};

	GTE() {
	    return this.getToken(WdlV1Parser.GTE, 0);
	};

	expr_infix3() {
	    return this.getTypedRuleContext(Expr_infix3Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterGte(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitGte(this);
		}
	}


}

WdlV1Parser.GteContext = GteContext;

class NeqContext extends Expr_infix2Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix2() {
	    return this.getTypedRuleContext(Expr_infix2Context,0);
	};

	NOTEQUAL() {
	    return this.getToken(WdlV1Parser.NOTEQUAL, 0);
	};

	expr_infix3() {
	    return this.getTypedRuleContext(Expr_infix3Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterNeq(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitNeq(this);
		}
	}


}

WdlV1Parser.NeqContext = NeqContext;

class LteContext extends Expr_infix2Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix2() {
	    return this.getTypedRuleContext(Expr_infix2Context,0);
	};

	LTE() {
	    return this.getToken(WdlV1Parser.LTE, 0);
	};

	expr_infix3() {
	    return this.getTypedRuleContext(Expr_infix3Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterLte(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitLte(this);
		}
	}


}

WdlV1Parser.LteContext = LteContext;

class GtContext extends Expr_infix2Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix2() {
	    return this.getTypedRuleContext(Expr_infix2Context,0);
	};

	GT() {
	    return this.getToken(WdlV1Parser.GT, 0);
	};

	expr_infix3() {
	    return this.getTypedRuleContext(Expr_infix3Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterGt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitGt(this);
		}
	}


}

WdlV1Parser.GtContext = GtContext;

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
        this.ruleIndex = WdlV1Parser.RULE_expr_infix3;
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
	    return this.getToken(WdlV1Parser.PLUS, 0);
	};

	expr_infix4() {
	    return this.getTypedRuleContext(Expr_infix4Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterAdd(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitAdd(this);
		}
	}


}

WdlV1Parser.AddContext = AddContext;

class SubContext extends Expr_infix3Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix3() {
	    return this.getTypedRuleContext(Expr_infix3Context,0);
	};

	MINUS() {
	    return this.getToken(WdlV1Parser.MINUS, 0);
	};

	expr_infix4() {
	    return this.getTypedRuleContext(Expr_infix4Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterSub(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitSub(this);
		}
	}


}

WdlV1Parser.SubContext = SubContext;

class Infix4Context extends Expr_infix3Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix4() {
	    return this.getTypedRuleContext(Expr_infix4Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterInfix4(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitInfix4(this);
		}
	}


}

WdlV1Parser.Infix4Context = Infix4Context;

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
        this.ruleIndex = WdlV1Parser.RULE_expr_infix4;
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
	    return this.getToken(WdlV1Parser.MOD, 0);
	};

	expr_infix5() {
	    return this.getTypedRuleContext(Expr_infix5Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterMod(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitMod(this);
		}
	}


}

WdlV1Parser.ModContext = ModContext;

class MulContext extends Expr_infix4Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix4() {
	    return this.getTypedRuleContext(Expr_infix4Context,0);
	};

	STAR() {
	    return this.getToken(WdlV1Parser.STAR, 0);
	};

	expr_infix5() {
	    return this.getTypedRuleContext(Expr_infix5Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterMul(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitMul(this);
		}
	}


}

WdlV1Parser.MulContext = MulContext;

class DivideContext extends Expr_infix4Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix4() {
	    return this.getTypedRuleContext(Expr_infix4Context,0);
	};

	DIVIDE() {
	    return this.getToken(WdlV1Parser.DIVIDE, 0);
	};

	expr_infix5() {
	    return this.getTypedRuleContext(Expr_infix5Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterDivide(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitDivide(this);
		}
	}


}

WdlV1Parser.DivideContext = DivideContext;

class Infix5Context extends Expr_infix4Context {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_infix5() {
	    return this.getTypedRuleContext(Expr_infix5Context,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterInfix5(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitInfix5(this);
		}
	}


}

WdlV1Parser.Infix5Context = Infix5Context;

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
        this.ruleIndex = WdlV1Parser.RULE_expr_infix5;
    }

	expr_core() {
	    return this.getTypedRuleContext(Expr_coreContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterExpr_infix5(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_expr_core;
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
	    return this.getToken(WdlV1Parser.LPAREN, 0);
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
	    return this.getToken(WdlV1Parser.COMMA, 0);
	};

	RPAREN() {
	    return this.getToken(WdlV1Parser.RPAREN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterPair_literal(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitPair_literal(this);
		}
	}


}

WdlV1Parser.Pair_literalContext = Pair_literalContext;

class UnarysignedContext extends Expr_coreContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	PLUS() {
	    return this.getToken(WdlV1Parser.PLUS, 0);
	};

	MINUS() {
	    return this.getToken(WdlV1Parser.MINUS, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterUnarysigned(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitUnarysigned(this);
		}
	}


}

WdlV1Parser.UnarysignedContext = UnarysignedContext;

class ApplyContext extends Expr_coreContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	Identifier() {
	    return this.getToken(WdlV1Parser.Identifier, 0);
	};

	LPAREN() {
	    return this.getToken(WdlV1Parser.LPAREN, 0);
	};

	RPAREN() {
	    return this.getToken(WdlV1Parser.RPAREN, 0);
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
	        return this.getTokens(WdlV1Parser.COMMA);
	    } else {
	        return this.getToken(WdlV1Parser.COMMA, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterApply(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitApply(this);
		}
	}


}

WdlV1Parser.ApplyContext = ApplyContext;

class Expression_groupContext extends Expr_coreContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	LPAREN() {
	    return this.getToken(WdlV1Parser.LPAREN, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	RPAREN() {
	    return this.getToken(WdlV1Parser.RPAREN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterExpression_group(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitExpression_group(this);
		}
	}


}

WdlV1Parser.Expression_groupContext = Expression_groupContext;

class PrimitivesContext extends Expr_coreContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	primitive_literal() {
	    return this.getTypedRuleContext(Primitive_literalContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterPrimitives(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitPrimitives(this);
		}
	}


}

WdlV1Parser.PrimitivesContext = PrimitivesContext;

class Left_nameContext extends Expr_coreContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	Identifier() {
	    return this.getToken(WdlV1Parser.Identifier, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterLeft_name(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitLeft_name(this);
		}
	}


}

WdlV1Parser.Left_nameContext = Left_nameContext;

class AtContext extends Expr_coreContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_core() {
	    return this.getTypedRuleContext(Expr_coreContext,0);
	};

	LBRACK() {
	    return this.getToken(WdlV1Parser.LBRACK, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	RBRACK() {
	    return this.getToken(WdlV1Parser.RBRACK, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterAt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitAt(this);
		}
	}


}

WdlV1Parser.AtContext = AtContext;

class NegateContext extends Expr_coreContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	NOT() {
	    return this.getToken(WdlV1Parser.NOT, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterNegate(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitNegate(this);
		}
	}


}

WdlV1Parser.NegateContext = NegateContext;

class Map_literalContext extends Expr_coreContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	LBRACE() {
	    return this.getToken(WdlV1Parser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(WdlV1Parser.RBRACE, 0);
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
	        return this.getTokens(WdlV1Parser.COLON);
	    } else {
	        return this.getToken(WdlV1Parser.COLON, i);
	    }
	};


	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlV1Parser.COMMA);
	    } else {
	        return this.getToken(WdlV1Parser.COMMA, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterMap_literal(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitMap_literal(this);
		}
	}


}

WdlV1Parser.Map_literalContext = Map_literalContext;

class IfthenelseContext extends Expr_coreContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	IF() {
	    return this.getToken(WdlV1Parser.IF, 0);
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
	    return this.getToken(WdlV1Parser.THEN, 0);
	};

	ELSE() {
	    return this.getToken(WdlV1Parser.ELSE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterIfthenelse(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitIfthenelse(this);
		}
	}


}

WdlV1Parser.IfthenelseContext = IfthenelseContext;

class Get_nameContext extends Expr_coreContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr_core() {
	    return this.getTypedRuleContext(Expr_coreContext,0);
	};

	DOT() {
	    return this.getToken(WdlV1Parser.DOT, 0);
	};

	Identifier() {
	    return this.getToken(WdlV1Parser.Identifier, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterGet_name(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitGet_name(this);
		}
	}


}

WdlV1Parser.Get_nameContext = Get_nameContext;

class Object_literalContext extends Expr_coreContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	OBJECT_LITERAL() {
	    return this.getToken(WdlV1Parser.OBJECT_LITERAL, 0);
	};

	LBRACE() {
	    return this.getToken(WdlV1Parser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(WdlV1Parser.RBRACE, 0);
	};

	Identifier = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlV1Parser.Identifier);
	    } else {
	        return this.getToken(WdlV1Parser.Identifier, i);
	    }
	};


	COLON = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlV1Parser.COLON);
	    } else {
	        return this.getToken(WdlV1Parser.COLON, i);
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
	        return this.getTokens(WdlV1Parser.COMMA);
	    } else {
	        return this.getToken(WdlV1Parser.COMMA, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterObject_literal(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitObject_literal(this);
		}
	}


}

WdlV1Parser.Object_literalContext = Object_literalContext;

class Array_literalContext extends Expr_coreContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	LBRACK() {
	    return this.getToken(WdlV1Parser.LBRACK, 0);
	};

	RBRACK() {
	    return this.getToken(WdlV1Parser.RBRACK, 0);
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
	        return this.getTokens(WdlV1Parser.COMMA);
	    } else {
	        return this.getToken(WdlV1Parser.COMMA, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterArray_literal(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitArray_literal(this);
		}
	}


}

WdlV1Parser.Array_literalContext = Array_literalContext;

class Import_aliasContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlV1Parser.RULE_import_alias;
    }

	ALIAS() {
	    return this.getToken(WdlV1Parser.ALIAS, 0);
	};

	Identifier = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlV1Parser.Identifier);
	    } else {
	        return this.getToken(WdlV1Parser.Identifier, i);
	    }
	};


	AS() {
	    return this.getToken(WdlV1Parser.AS, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterImport_alias(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitImport_alias(this);
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
        this.ruleIndex = WdlV1Parser.RULE_import_as;
    }

	AS() {
	    return this.getToken(WdlV1Parser.AS, 0);
	};

	Identifier() {
	    return this.getToken(WdlV1Parser.Identifier, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterImport_as(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_import_doc;
    }

	IMPORT() {
	    return this.getToken(WdlV1Parser.IMPORT, 0);
	};

	string() {
	    return this.getTypedRuleContext(StringContext,0);
	};

	import_as() {
	    return this.getTypedRuleContext(Import_asContext,0);
	};

	import_alias = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Import_aliasContext);
	    } else {
	        return this.getTypedRuleContext(Import_aliasContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterImport_doc(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitImport_doc(this);
		}
	}


}



class StructContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlV1Parser.RULE_struct;
    }

	STRUCT() {
	    return this.getToken(WdlV1Parser.STRUCT, 0);
	};

	Identifier() {
	    return this.getToken(WdlV1Parser.Identifier, 0);
	};

	LBRACE() {
	    return this.getToken(WdlV1Parser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(WdlV1Parser.RBRACE, 0);
	};

	unbound_decls = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Unbound_declsContext);
	    } else {
	        return this.getTypedRuleContext(Unbound_declsContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterStruct(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitStruct(this);
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
        this.ruleIndex = WdlV1Parser.RULE_meta_value;
    }

	MetaNull() {
	    return this.getToken(WdlV1Parser.MetaNull, 0);
	};

	MetaBool() {
	    return this.getToken(WdlV1Parser.MetaBool, 0);
	};

	MetaInt() {
	    return this.getToken(WdlV1Parser.MetaInt, 0);
	};

	MetaFloat() {
	    return this.getToken(WdlV1Parser.MetaFloat, 0);
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
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterMeta_value(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_meta_string_part;
    }

	MetaStringPart = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlV1Parser.MetaStringPart);
	    } else {
	        return this.getToken(WdlV1Parser.MetaStringPart, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterMeta_string_part(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_meta_string;
    }

	MetaDquote = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlV1Parser.MetaDquote);
	    } else {
	        return this.getToken(WdlV1Parser.MetaDquote, i);
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
	        return this.getTokens(WdlV1Parser.MetaSquote);
	    } else {
	        return this.getToken(WdlV1Parser.MetaSquote, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterMeta_string(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_meta_array;
    }

	MetaEmptyArray() {
	    return this.getToken(WdlV1Parser.MetaEmptyArray, 0);
	};

	MetaLbrack() {
	    return this.getToken(WdlV1Parser.MetaLbrack, 0);
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
	    return this.getToken(WdlV1Parser.MetaArrayCommaRbrack, 0);
	};

	MetaRbrack() {
	    return this.getToken(WdlV1Parser.MetaRbrack, 0);
	};

	MetaArrayComma = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlV1Parser.MetaArrayComma);
	    } else {
	        return this.getToken(WdlV1Parser.MetaArrayComma, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterMeta_array(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_meta_object;
    }

	MetaEmptyObject() {
	    return this.getToken(WdlV1Parser.MetaEmptyObject, 0);
	};

	MetaLbrace() {
	    return this.getToken(WdlV1Parser.MetaLbrace, 0);
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
	    return this.getToken(WdlV1Parser.MetaObjectCommaRbrace, 0);
	};

	MetaRbrace() {
	    return this.getToken(WdlV1Parser.MetaRbrace, 0);
	};

	MetaObjectComma = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlV1Parser.MetaObjectComma);
	    } else {
	        return this.getToken(WdlV1Parser.MetaObjectComma, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterMeta_object(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_meta_object_kv;
    }

	MetaObjectIdentifier() {
	    return this.getToken(WdlV1Parser.MetaObjectIdentifier, 0);
	};

	MetaObjectColon() {
	    return this.getToken(WdlV1Parser.MetaObjectColon, 0);
	};

	meta_value() {
	    return this.getTypedRuleContext(Meta_valueContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterMeta_object_kv(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_meta_kv;
    }

	MetaIdentifier() {
	    return this.getToken(WdlV1Parser.MetaIdentifier, 0);
	};

	MetaColon() {
	    return this.getToken(WdlV1Parser.MetaColon, 0);
	};

	meta_value() {
	    return this.getTypedRuleContext(Meta_valueContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterMeta_kv(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_parameter_meta;
    }

	PARAMETERMETA() {
	    return this.getToken(WdlV1Parser.PARAMETERMETA, 0);
	};

	BeginMeta() {
	    return this.getToken(WdlV1Parser.BeginMeta, 0);
	};

	EndMeta() {
	    return this.getToken(WdlV1Parser.EndMeta, 0);
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
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterParameter_meta(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_meta;
    }

	META() {
	    return this.getToken(WdlV1Parser.META, 0);
	};

	BeginMeta() {
	    return this.getToken(WdlV1Parser.BeginMeta, 0);
	};

	EndMeta() {
	    return this.getToken(WdlV1Parser.EndMeta, 0);
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
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterMeta(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitMeta(this);
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
        this.ruleIndex = WdlV1Parser.RULE_task_runtime_kv;
    }

	Identifier() {
	    return this.getToken(WdlV1Parser.Identifier, 0);
	};

	COLON() {
	    return this.getToken(WdlV1Parser.COLON, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterTask_runtime_kv(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_task_runtime;
    }

	RUNTIME() {
	    return this.getToken(WdlV1Parser.RUNTIME, 0);
	};

	LBRACE() {
	    return this.getToken(WdlV1Parser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(WdlV1Parser.RBRACE, 0);
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
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterTask_runtime(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitTask_runtime(this);
		}
	}


}



class Task_inputContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlV1Parser.RULE_task_input;
    }

	INPUT() {
	    return this.getToken(WdlV1Parser.INPUT, 0);
	};

	LBRACE() {
	    return this.getToken(WdlV1Parser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(WdlV1Parser.RBRACE, 0);
	};

	any_decls = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Any_declsContext);
	    } else {
	        return this.getTypedRuleContext(Any_declsContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterTask_input(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitTask_input(this);
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
        this.ruleIndex = WdlV1Parser.RULE_task_output;
    }

	OUTPUT() {
	    return this.getToken(WdlV1Parser.OUTPUT, 0);
	};

	LBRACE() {
	    return this.getToken(WdlV1Parser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(WdlV1Parser.RBRACE, 0);
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
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterTask_output(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_task_command_string_part;
    }

	CommandStringPart = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlV1Parser.CommandStringPart);
	    } else {
	        return this.getToken(WdlV1Parser.CommandStringPart, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterTask_command_string_part(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_task_command_expr_part;
    }

	StringCommandStart() {
	    return this.getToken(WdlV1Parser.StringCommandStart, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	RBRACE() {
	    return this.getToken(WdlV1Parser.RBRACE, 0);
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
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterTask_command_expr_part(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_task_command_expr_with_string;
    }

	task_command_expr_part() {
	    return this.getTypedRuleContext(Task_command_expr_partContext,0);
	};

	task_command_string_part() {
	    return this.getTypedRuleContext(Task_command_string_partContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterTask_command_expr_with_string(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_task_command;
    }

	COMMAND() {
	    return this.getToken(WdlV1Parser.COMMAND, 0);
	};

	BeginLBrace() {
	    return this.getToken(WdlV1Parser.BeginLBrace, 0);
	};

	task_command_string_part() {
	    return this.getTypedRuleContext(Task_command_string_partContext,0);
	};

	EndCommand() {
	    return this.getToken(WdlV1Parser.EndCommand, 0);
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
	    return this.getToken(WdlV1Parser.BeginHereDoc, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterTask_command(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitTask_command(this);
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
        this.ruleIndex = WdlV1Parser.RULE_task_element;
    }

	task_input() {
	    return this.getTypedRuleContext(Task_inputContext,0);
	};

	task_output() {
	    return this.getTypedRuleContext(Task_outputContext,0);
	};

	task_command() {
	    return this.getTypedRuleContext(Task_commandContext,0);
	};

	task_runtime() {
	    return this.getTypedRuleContext(Task_runtimeContext,0);
	};

	bound_decls() {
	    return this.getTypedRuleContext(Bound_declsContext,0);
	};

	parameter_meta() {
	    return this.getTypedRuleContext(Parameter_metaContext,0);
	};

	meta() {
	    return this.getTypedRuleContext(MetaContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterTask_element(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_task;
    }

	TASK() {
	    return this.getToken(WdlV1Parser.TASK, 0);
	};

	Identifier() {
	    return this.getToken(WdlV1Parser.Identifier, 0);
	};

	LBRACE() {
	    return this.getToken(WdlV1Parser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(WdlV1Parser.RBRACE, 0);
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
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterTask(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitTask(this);
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
        this.ruleIndex = WdlV1Parser.RULE_inner_workflow_element;
    }

	bound_decls() {
	    return this.getTypedRuleContext(Bound_declsContext,0);
	};

	call() {
	    return this.getTypedRuleContext(CallContext,0);
	};

	scatter() {
	    return this.getTypedRuleContext(ScatterContext,0);
	};

	conditional() {
	    return this.getTypedRuleContext(ConditionalContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterInner_workflow_element(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitInner_workflow_element(this);
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
        this.ruleIndex = WdlV1Parser.RULE_call_alias;
    }

	AS() {
	    return this.getToken(WdlV1Parser.AS, 0);
	};

	Identifier() {
	    return this.getToken(WdlV1Parser.Identifier, 0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterCall_alias(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_call_input;
    }

	Identifier() {
	    return this.getToken(WdlV1Parser.Identifier, 0);
	};

	EQUAL() {
	    return this.getToken(WdlV1Parser.EQUAL, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterCall_input(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_call_inputs;
    }

	INPUT() {
	    return this.getToken(WdlV1Parser.INPUT, 0);
	};

	COLON() {
	    return this.getToken(WdlV1Parser.COLON, 0);
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
	        return this.getTokens(WdlV1Parser.COMMA);
	    } else {
	        return this.getToken(WdlV1Parser.COMMA, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterCall_inputs(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_call_body;
    }

	LBRACE() {
	    return this.getToken(WdlV1Parser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(WdlV1Parser.RBRACE, 0);
	};

	call_inputs() {
	    return this.getTypedRuleContext(Call_inputsContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterCall_body(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_call_name;
    }

	Identifier = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlV1Parser.Identifier);
	    } else {
	        return this.getToken(WdlV1Parser.Identifier, i);
	    }
	};


	DOT = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(WdlV1Parser.DOT);
	    } else {
	        return this.getToken(WdlV1Parser.DOT, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterCall_name(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_call;
    }

	CALL() {
	    return this.getToken(WdlV1Parser.CALL, 0);
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
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterCall(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_scatter;
    }

	SCATTER() {
	    return this.getToken(WdlV1Parser.SCATTER, 0);
	};

	LPAREN() {
	    return this.getToken(WdlV1Parser.LPAREN, 0);
	};

	Identifier() {
	    return this.getToken(WdlV1Parser.Identifier, 0);
	};

	In() {
	    return this.getToken(WdlV1Parser.In, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	RPAREN() {
	    return this.getToken(WdlV1Parser.RPAREN, 0);
	};

	LBRACE() {
	    return this.getToken(WdlV1Parser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(WdlV1Parser.RBRACE, 0);
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
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterScatter(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_conditional;
    }

	IF() {
	    return this.getToken(WdlV1Parser.IF, 0);
	};

	LPAREN() {
	    return this.getToken(WdlV1Parser.LPAREN, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	RPAREN() {
	    return this.getToken(WdlV1Parser.RPAREN, 0);
	};

	LBRACE() {
	    return this.getToken(WdlV1Parser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(WdlV1Parser.RBRACE, 0);
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
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterConditional(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitConditional(this);
		}
	}


}



class Workflow_inputContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = WdlV1Parser.RULE_workflow_input;
    }

	INPUT() {
	    return this.getToken(WdlV1Parser.INPUT, 0);
	};

	LBRACE() {
	    return this.getToken(WdlV1Parser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(WdlV1Parser.RBRACE, 0);
	};

	any_decls = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Any_declsContext);
	    } else {
	        return this.getTypedRuleContext(Any_declsContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterWorkflow_input(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitWorkflow_input(this);
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
        this.ruleIndex = WdlV1Parser.RULE_workflow_output;
    }

	OUTPUT() {
	    return this.getToken(WdlV1Parser.OUTPUT, 0);
	};

	LBRACE() {
	    return this.getToken(WdlV1Parser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(WdlV1Parser.RBRACE, 0);
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
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterWorkflow_output(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_workflow_element;
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
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterOutput(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitOutput(this);
		}
	}


}

WdlV1Parser.OutputContext = OutputContext;

class InputContext extends Workflow_elementContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	workflow_input() {
	    return this.getTypedRuleContext(Workflow_inputContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterInput(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitInput(this);
		}
	}


}

WdlV1Parser.InputContext = InputContext;

class Parameter_meta_elementContext extends Workflow_elementContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	parameter_meta() {
	    return this.getTypedRuleContext(Parameter_metaContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterParameter_meta_element(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitParameter_meta_element(this);
		}
	}


}

WdlV1Parser.Parameter_meta_elementContext = Parameter_meta_elementContext;

class Meta_elementContext extends Workflow_elementContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	meta() {
	    return this.getTypedRuleContext(MetaContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterMeta_element(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitMeta_element(this);
		}
	}


}

WdlV1Parser.Meta_elementContext = Meta_elementContext;

class Inner_elementContext extends Workflow_elementContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	inner_workflow_element() {
	    return this.getTypedRuleContext(Inner_workflow_elementContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterInner_element(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitInner_element(this);
		}
	}


}

WdlV1Parser.Inner_elementContext = Inner_elementContext;

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
        this.ruleIndex = WdlV1Parser.RULE_workflow;
    }

	WORKFLOW() {
	    return this.getToken(WdlV1Parser.WORKFLOW, 0);
	};

	Identifier() {
	    return this.getToken(WdlV1Parser.Identifier, 0);
	};

	LBRACE() {
	    return this.getToken(WdlV1Parser.LBRACE, 0);
	};

	RBRACE() {
	    return this.getToken(WdlV1Parser.RBRACE, 0);
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
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterWorkflow(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_document_element;
    }

	import_doc() {
	    return this.getTypedRuleContext(Import_docContext,0);
	};

	struct() {
	    return this.getTypedRuleContext(StructContext,0);
	};

	task() {
	    return this.getTypedRuleContext(TaskContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterDocument_element(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
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
        this.ruleIndex = WdlV1Parser.RULE_document;
    }

	EOF() {
	    return this.getToken(WdlV1Parser.EOF, 0);
	};

	VERSION() {
	    return this.getToken(WdlV1Parser.VERSION, 0);
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

	workflow() {
	    return this.getTypedRuleContext(WorkflowContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.enterDocument(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof WdlV1ParserListener ) {
	        listener.exitDocument(this);
		}
	}


}




WdlV1Parser.Map_typeContext = Map_typeContext; 
WdlV1Parser.Array_typeContext = Array_typeContext; 
WdlV1Parser.Pair_typeContext = Pair_typeContext; 
WdlV1Parser.Type_baseContext = Type_baseContext; 
WdlV1Parser.Wdl_typeContext = Wdl_typeContext; 
WdlV1Parser.Unbound_declsContext = Unbound_declsContext; 
WdlV1Parser.Bound_declsContext = Bound_declsContext; 
WdlV1Parser.Any_declsContext = Any_declsContext; 
WdlV1Parser.NumberContext = NumberContext; 
WdlV1Parser.Expression_placeholder_optionContext = Expression_placeholder_optionContext; 
WdlV1Parser.String_partContext = String_partContext; 
WdlV1Parser.String_expr_partContext = String_expr_partContext; 
WdlV1Parser.String_expr_with_string_partContext = String_expr_with_string_partContext; 
WdlV1Parser.StringContext = StringContext; 
WdlV1Parser.Primitive_literalContext = Primitive_literalContext; 
WdlV1Parser.ExprContext = ExprContext; 
WdlV1Parser.Expr_infixContext = Expr_infixContext; 
WdlV1Parser.Expr_infix0Context = Expr_infix0Context; 
WdlV1Parser.Expr_infix1Context = Expr_infix1Context; 
WdlV1Parser.Expr_infix2Context = Expr_infix2Context; 
WdlV1Parser.Expr_infix3Context = Expr_infix3Context; 
WdlV1Parser.Expr_infix4Context = Expr_infix4Context; 
WdlV1Parser.Expr_infix5Context = Expr_infix5Context; 
WdlV1Parser.Expr_coreContext = Expr_coreContext; 
WdlV1Parser.Import_aliasContext = Import_aliasContext; 
WdlV1Parser.Import_asContext = Import_asContext; 
WdlV1Parser.Import_docContext = Import_docContext; 
WdlV1Parser.StructContext = StructContext; 
WdlV1Parser.Meta_valueContext = Meta_valueContext; 
WdlV1Parser.Meta_string_partContext = Meta_string_partContext; 
WdlV1Parser.Meta_stringContext = Meta_stringContext; 
WdlV1Parser.Meta_arrayContext = Meta_arrayContext; 
WdlV1Parser.Meta_objectContext = Meta_objectContext; 
WdlV1Parser.Meta_object_kvContext = Meta_object_kvContext; 
WdlV1Parser.Meta_kvContext = Meta_kvContext; 
WdlV1Parser.Parameter_metaContext = Parameter_metaContext; 
WdlV1Parser.MetaContext = MetaContext; 
WdlV1Parser.Task_runtime_kvContext = Task_runtime_kvContext; 
WdlV1Parser.Task_runtimeContext = Task_runtimeContext; 
WdlV1Parser.Task_inputContext = Task_inputContext; 
WdlV1Parser.Task_outputContext = Task_outputContext; 
WdlV1Parser.Task_command_string_partContext = Task_command_string_partContext; 
WdlV1Parser.Task_command_expr_partContext = Task_command_expr_partContext; 
WdlV1Parser.Task_command_expr_with_stringContext = Task_command_expr_with_stringContext; 
WdlV1Parser.Task_commandContext = Task_commandContext; 
WdlV1Parser.Task_elementContext = Task_elementContext; 
WdlV1Parser.TaskContext = TaskContext; 
WdlV1Parser.Inner_workflow_elementContext = Inner_workflow_elementContext; 
WdlV1Parser.Call_aliasContext = Call_aliasContext; 
WdlV1Parser.Call_inputContext = Call_inputContext; 
WdlV1Parser.Call_inputsContext = Call_inputsContext; 
WdlV1Parser.Call_bodyContext = Call_bodyContext; 
WdlV1Parser.Call_nameContext = Call_nameContext; 
WdlV1Parser.CallContext = CallContext; 
WdlV1Parser.ScatterContext = ScatterContext; 
WdlV1Parser.ConditionalContext = ConditionalContext; 
WdlV1Parser.Workflow_inputContext = Workflow_inputContext; 
WdlV1Parser.Workflow_outputContext = Workflow_outputContext; 
WdlV1Parser.Workflow_elementContext = Workflow_elementContext; 
WdlV1Parser.WorkflowContext = WorkflowContext; 
WdlV1Parser.Document_elementContext = Document_elementContext; 
WdlV1Parser.DocumentContext = DocumentContext; 
