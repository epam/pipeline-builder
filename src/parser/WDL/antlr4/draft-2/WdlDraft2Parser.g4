parser grammar WdlDraft2Parser;

options { tokenVocab=WdlDraft2Lexer; }

map_type
  : MAP LBRACK wdl_type COMMA wdl_type RBRACK
  ;

array_type
  : ARRAY LBRACK wdl_type RBRACK PLUS?
  ;

pair_type
  : PAIR LBRACK wdl_type COMMA wdl_type RBRACK
  ;

type_base
  : array_type
  | map_type
  | pair_type
  | (STRING | FILE | BOOLEAN | OBJECT | INT | FLOAT | Identifier)
  ;

wdl_type
  : (type_base OPTIONAL | type_base)
  ;

unbound_decls
  : wdl_type Identifier
  ;

bound_decls
  : wdl_type Identifier EQUAL expr
  ;

any_decls
  : unbound_decls
  | bound_decls
  ;

primitive_literal
  : BoolLiteral
  | number
  | string
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
  : expr_core
  ;

expr_core
  : Identifier LPAREN (expr (COMMA expr)* COMMA?)? RPAREN #apply
  | LBRACK (expr (COMMA expr)* COMMA?)* RBRACK #array_literal
  | LPAREN expr COMMA expr RPAREN #pair_literal
  | LBRACE (expr COLON expr (COMMA expr COLON expr)* COMMA?)* RBRACE #map_literal
  | OBJECT_LITERAL LBRACE (Identifier COLON expr (COMMA Identifier COLON expr)* COMMA?)* RBRACE #object_literal
  | IF expr THEN expr ELSE expr #ifthenelse
  | LPAREN expr RPAREN #expression_group
  | expr_core LBRACK expr RBRACK #at
  | expr_core DOT Identifier #get_name
  | NOT expr #negate
  | (PLUS | MINUS) expr #unarysigned
  | primitive_literal #primitives
  | Identifier #left_name
  ;

number
  : IntLiteral
  | FloatLiteral
  ;

expression_placeholder_option
  : BoolLiteral EQUAL (string | number)
  | DEFAULT EQUAL (string | number)
  | SEP EQUAL (string | number)
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

import_as
  : AS Identifier
  ;

import_doc
  : IMPORT string import_as?
  ;

task_output
  : OUTPUT LBRACE (bound_decls)* RBRACE
  ;

task_command_string_part
  : CommandStringPart*
  ;

task_command_expr_part
  : StringCommandStart (expression_placeholder_option)* expr RBRACE
  ;

task_command_expr_with_string
  : task_command_expr_part task_command_string_part
  ;

task_command
  : COMMAND BeginLBrace task_command_string_part task_command_expr_with_string* EndCommand
  | COMMAND BeginHereDoc task_command_string_part task_command_expr_with_string* EndCommand
  ;

task_runtime_kv
  : Identifier COLON expr
  ;

task_runtime
  : RUNTIME LBRACE (task_runtime_kv)* RBRACE
  ;

meta_value
  : MetaNull
  | MetaBool
  | MetaInt
  | MetaFloat
  | meta_string
  | meta_object
  | meta_array
  ;

meta_string_part
  : MetaStringPart*
  ;

meta_string
  : MetaDquote meta_string_part MetaDquote
  | MetaSquote meta_string_part MetaSquote
  ;

meta_array
  : MetaEmptyArray
  | MetaLbrack meta_value (MetaArrayComma meta_value)* (MetaArrayCommaRbrack | MetaRbrack)
  ;

meta_object
  : MetaEmptyObject
  | MetaLbrace meta_object_kv (MetaObjectComma meta_object_kv)* (MetaObjectCommaRbrace | MetaRbrace)
  ;

meta_object_kv
  : MetaObjectIdentifier MetaObjectColon meta_value
  ;

meta_kv
  : MetaIdentifier MetaColon meta_value
  ;

parameter_meta
  : PARAMETERMETA BeginMeta meta_kv* EndMeta
  ;

meta
  :  META BeginMeta meta_kv* EndMeta
  ;

task_element
  : task_output
  | task_command
  | task_runtime
  | any_decls
  | parameter_meta
  | meta
  ;

task
  : TASK Identifier LBRACE task_element+ RBRACE
  ;

call_alias
  : AS Identifier
  ;

call_input
  : Identifier EQUAL expr
  ;

call_inputs
  : INPUT COLON (call_input (COMMA call_input)* COMMA?)*
  ;

call_body
  : LBRACE call_inputs? RBRACE
  ;

call_name
  : Identifier (DOT Identifier)*
  ;

call
  : CALL call_name call_alias?  call_body?
  ;

scatter
  : SCATTER LPAREN Identifier In expr RPAREN LBRACE inner_workflow_element* RBRACE
  ;

conditional
  : IF LPAREN expr RPAREN LBRACE inner_workflow_element* RBRACE
  ;

loop
  : WHILE LPAREN expr RPAREN LBRACE inner_workflow_element* RBRACE
  ;

inner_workflow_element
  : any_decls
  | call
  | loop
  | scatter
  | conditional
  ;

workflow_output
  : OUTPUT LBRACE (bound_decls)* RBRACE
  ;

workflow_element
  : workflow_output #output
  | inner_workflow_element #inner_element
  | parameter_meta #parameter_meta_element
  | meta #meta_element
  ;

workflow
  : WORKFLOW Identifier LBRACE workflow_element* RBRACE
  ;

document_element
  : import_doc
  | task
  | workflow
  ;

document
  : VERSION? document_element+ EOF
  ;
