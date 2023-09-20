parser grammar ExpressionParser;

options { tokenVocab=ExpressionLexer; }

number
  : IntLiteral
  | FloatLiteral
  ;

// Literals

expression_placeholder_option
  : BoolLiteral EQUAL string
  | DEFAULTEQUAL (string | number)
  | SEPEQUAL string
  ;

string_part
  : StringPart*
  ;

string_expr_part
  : StringCommandStart (expression_placeholder_option)* expr RBRACE
  ;

string_expr_with_string_part
  : string_expr_part string_part
  ;

string
  : DQUOTE string_part string_expr_with_string_part* DQUOTE
  | SQUOTE string_part string_expr_with_string_part* SQUOTE
  ;

primitive_literal
  : BoolLiteral
  | number
  | string
  | NONELITERAL
  | Identifier
  ;

expr
  : expr_infix
  ;

expr_infix
  : expr_infix0 #infix0
  ;

expr_infix0
  : expr_infix0 OR expr_infix1 #lor
  | expr_infix1 #infix1
  ;

expr_infix1
  : expr_infix1 AND expr_infix2 #land
  | expr_infix2 #infix2
  ;

expr_infix2
  : expr_infix2 EQUALITY expr_infix3 #eqeq
  | expr_infix2 NOTEQUAL expr_infix3 #neq
  | expr_infix2 LTE expr_infix3 #lte
  | expr_infix2 GTE expr_infix3 #gte
  | expr_infix2 LT expr_infix3 #lt
  | expr_infix2 GT expr_infix3 #gt
  | expr_infix3 #infix3
  ;

expr_infix3
  : expr_infix3 PLUS expr_infix4 #add
  | expr_infix3 MINUS expr_infix4 #sub
  | expr_infix4 #infix4
  ;

expr_infix4
  : expr_infix4 STAR expr_infix5 #mul
  | expr_infix4 DIVIDE expr_infix5 #divide
  | expr_infix4 MOD expr_infix5 #mod
  | expr_infix5 #infix5
  ;

expr_infix5
  : expression
  ;

member
  : Identifier
  ;

expression
  : Identifier LPAREN (expr (COMMA expr)* COMMA?)? RPAREN #apply
  | LBRACK (expr (COMMA expr)* COMMA?)* RBRACK #array_literal
  | LPAREN expr COMMA expr RPAREN #pair_literal
  | LBRACE (expr COLON expr (COMMA expr COLON expr)* COMMA?)* RBRACE #map_literal
  | OBJECTLITERAL LBRACE (member COLON expr (COMMA member COLON expr)* COMMA?)* RBRACE #object_literal
  | Identifier LBRACE (member COLON expr (COMMA member COLON expr)* COMMA?)* RBRACE #struct_literal
  | IF expr THEN expr ELSE expr #ifthenelse
  | LPAREN expr RPAREN #expression_group
  | expression LBRACK expr RBRACK #at
  | expression DOT Identifier #get_name
  | NOT expr #negate
  | (PLUS | MINUS) expr #unarysigned
  | primitive_literal #primitives
  | Identifier #left_name
  ;

document
  : expr* EOF
  ;
