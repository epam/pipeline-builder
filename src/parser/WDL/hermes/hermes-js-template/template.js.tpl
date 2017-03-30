/* eslint-disable */

{% if len(header)%}
/*
{{'\n'.join([' * ' + s for s in header.split('\n')])}}
 */
{% endif %}
{% import re %}
{% from hermes.grammar import * %}

if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ? args[number]: match;
        });
    };
}

String.prototype.lstrip = function() {
    return this.replace(/^\s*/g, "");
}

function parse_tree_string(parsetree, indent, b64_source) {
    return _parse_tree_string(parsetree, indent, b64_source, 0);
}

function _parse_tree_string(parsetree, indent, b64_source, indent_level) {
    if (typeof(indent) != 'number' || indent <= 0) {
        indent = undefined
    }
    var indent_str = typeof(indent) !== 'undefined' ? Array(indent * indent_level + 1).join(' ') : ''
    if (parsetree instanceof ParseTree) {
        var children = []
        for (var i in parsetree.children) {
            children.push(_parse_tree_string(parsetree.children[i], indent, b64_source, indent_level + 1))
        }
        if (typeof(indent) == 'undefined' || children.length == 0) {
            return '{0}({1}: {2})'.format(indent_str, parsetree.nonterminal.to_string(), children.join(', '))
        } else {
            return '{0}({1}:\n{2}\n{3})'.format(
                indent_str,
                parsetree.nonterminal.to_string(),
                children.join(',\n'),
                indent_str
            )
        }
    } else if (parsetree instanceof Terminal) {
        return indent_str + parsetree.to_string(b64_source)
    }
}

function ast_string(ast, indent, b64_source) {
    return _ast_string(ast, indent, b64_source, 0);
}

function _ast_string(ast, indent, b64_source, indent_level) {
    if (typeof(indent) != 'number' || indent <= 0) {
        indent = undefined
    }
    var indent_str = typeof(indent) !== 'undefined' ? Array(indent * indent_level + 1).join(' ') : ''
    var next_indent_str = typeof(indent) !== 'undefined' ? Array(indent * (indent_level+1) + 1).join(' ') : ''
    if (ast instanceof Ast) {
        var children = {}
        for (var key in ast.attributes) {
            children[key] = _ast_string(ast.attributes[key], indent, b64_source, indent_level + 1)
        }
        if (typeof(indent) == 'undefined') {
            var strs = []
            for (var key in children) {
                strs.push('{0}={1}'.format(key, children[key]))
            }
            return '({0}: {1})'.format(
                ast.name,
                strs.join(', ')
            )
        } else {
            var strs = []
            for (var key in children) {
                strs.push('{0}{1}={2}'.format(next_indent_str, key, children[key]))
            }
            return '({0}:\n{1}\n{2})'.format(
                ast.name,
                strs.join(',\n'),
                indent_str
            )
        }
    } else if (ast instanceof AstList) {
        var children = []
        for (var key in ast.list) {
            children.push(_ast_string(ast.list[key], indent, b64_source, indent_level + 1))
        }
        if (typeof(indent) == 'undefined' || children.length == 0) {
            return '[{0}]'.format(children.join(', '))
        } else {
            var strs = []
            for (var index in children) {
                strs.push('{0}{1}'.format(next_indent_str, children[index]))
            }
            return '[\n{0}\n{1}]'.format(
                strs.join(',\n'),
                indent_str
            )
        }
    } else if (ast instanceof Terminal) {
        return ast.to_string(b64_source)
    } else {
        return (ast == null) ? 'None' : ast.to_string()
    }
}

function Terminal(id, str, source_string, resource, line, col) {
    this.id = id;
    this.str = str;
    this.source_string = source_string;
    this.resource = resource;
    this.line = line;
    this.col = col;
    this.to_ast = function() {
        return this;
    };
    this.to_string = function(b64_source) {
        return '<{0}:{1}:{2} {3} "{4}">'.format(
            this.resource,
            this.line,
            this.col,
            this.str,
            b64_source ? Base64.encode(this.source_string) : this.source_string
        )
    };
}

function NonTerminal(id, str) {
    this.id = id;
    this.str = str;
    this.to_string = function() {
        return this.str;
    };
}

function AstTransformSubstitution(idx) {
    this.idx = idx;
    this.to_string = function() {
        return '$' + this.idx;
    };
}

function AstTransformNodeCreator(name, parameters) {
    this.name = name;
    this.parameters = parameters;
    this.to_string = function() {
        var arr = [];
        for ( key in this.parameters ) {
            arr.push('{0}=${1}'.format(key, this.parameters[key]));
        }
        return '{0} ( {1} )'.format(this.name, arr.join(', '));
    };
}

function AstList(list) {
    this.list = list
    this.push = function(element) {
        this.list.push(element);
    };
    this.to_ast = function() {
        var arr = [];
        for (item in this.list) {
            arr.push(item.to_ast());
        }
        return arr;
    };
}

function ParseTree(nonterminal) {
    this.children = [];
    this.nonterminal = nonterminal;
    this.astTransform = null;
    this.isExpr = false;
    this.isNud = false;
    this.isPrefix = false;
    this.isInfix = false;
    this.nudMorphemeCount = 0;
    this.isExprNud = false;
    this.listSeparator = null;
    this.list = false;
    this.add = function(tree) {
        this.children.push(tree);
    }
    this.to_ast = function() {
        var name;
        var parameters;
        if (this.list == true) {
            if (this.children.length == 0) {
                return new AstList([]);
            }
            var end = this.children.length - 1;
            var list = [];
            for (var i = 0; i < this.children.length; i++) {
                if (this.children[i] instanceof Terminal && this.children[i].id == this.listSeparator)
                    continue;
                list.push(this.children[i].to_ast());
            }
            return new AstList(list);
        }
        else if (this.isExpr == true) {
            if (this.astTransform instanceof AstTransformSubstitution) {
                return this.children[this.astTransform.idx].to_ast();
            }
            else if (this.astTransform instanceof AstTransformNodeCreator) {
                parameters = {}
                for (name in this.astTransform.parameters) {
                    var idx = this.astTransform.parameters[name];
                    var child = null;
                    if (idx == '$') {
                        child = this.children[0];
                    } else if (this.children[0] instanceof ParseTree && this.children[0].isNud && !this.children[0].isPrefix && !this.isExprNud && !this.isInfix) {
                        if (idx < this.children[0].nudMorphemeCount) {
                            child = this.children[0].children[idx]
                        } else {
                            var index = idx - this.children[0].nudMorphemeCount + 1
                            child = this.children[index]
                        }
                    } else if (this.children.length == 1 && !(this.children[0] instanceof ParseTree) && !(this.children[0] instanceof Array)) {
                        return this.children[0];
                    } else {
                        child = this.children[idx];
                    }
                    parameters[name] = child.to_ast()
                }
                return new Ast(this.astTransform.name, parameters);
            }
        }
        else {
            if (this.astTransform instanceof AstTransformSubstitution) {
                return this.children[this.astTransform.idx].to_ast()
            } else if (this.astTransform instanceof AstTransformNodeCreator) {
                parameters = {};
                for (name in this.astTransform.parameters) {
                    parameters[name] = this.children[this.astTransform.parameters[name]].to_ast();
                }
                return new Ast(this.astTransform.name, parameters);
                return x;
            } else if (this.children.length) {
                return this.children[0].to_ast();
            } else {
                return null;
            }
        }
    }
    this.to_string = function() {
        var children = []
        for (i in this.children) {
            var child = this.children[i];
            if (child instanceof Array) {
                var stringify = child.map(function(x) {return x.to_string()});
                children.push('[' + stringify.join(', ') + ']');
            } else {
                children.push(child.to_string());
            }
        }
        return '(' + this.nonterminal.to_string() + ': ' + children.join(', ') + ')'
    }
}

function Ast(name, attributes) {
    this.name = name;
    this.attributes = attributes;
    this.to_string = function() {
        var arr = [];
        for (var key in this.attributes) {
            var value = this.attributes[key];
            if (value instanceof Array) {
                var stringify = value.map(function(x) {return x.to_string()});
                value = '[{0}]'.format(stringify.join(', '));
            } else {
                value = value.to_string();
            }
            arr.push('{0}={1}'.format(key.to_string(), value))
        }
        return '({0}: {1})'.format(this.name, arr.join(', '));
    }
}

function SyntaxError(message) {
    this.name = 'SyntaxError';
    this.message = message;
    this.to_string = function() {
        return this.message;
    }
}

function TokenStream(list) {
    this.list = list;
    this.index = 0;
    this.advance = function() {
        this.index += 1;
        return this.current();
    }
    this.last = function() {
        return this.list[this.list.length - 1];
    }
    this.current = function() {
        if (this.index < this.list.length) {
            return this.list[this.index];
        } else {
            return null;
        }
    }
}

function DefaultSyntaxErrorFormatter() {
    this.unexpected_eof = function(nonterminal, expected_terminals, nonterminal_rules) {
        return "Error: unexpected end of file";
    }
    this.excess_tokens = function(nonterminal, terminal) {
        return "Finished parsing without consuming all tokens.";
    }
    this.unexpected_symbol = function(nonterminal, actual_terminal, expected_terminals, rule) {
        return "Unexpected symbol (line {0}, col {1}) when parsing parse_{2}.  Expected {3}, got {4}.".format(
          actual_terminal.line,
          actual_terminal.col,
          nonterminal,
          expected_terminals.join(', '),
          actual_terminal.to_string(true)
        );
    }
    this.no_more_tokens = function(nonterminal, expected_terminal, last_terminal) {
        return "No more tokens.  Expecting " + expected_terminal;
    }
    this.invalid_terminal = function(nonterminal, invalid_terminal) {
        return "Invalid symbol ID: {0} ({1})".format(invalid_terminal.id, invalid_terminal.string);
    }
    this.missing_list_items = function(method, required, found, last) {
        return "List for "+method+" requires "+required+" items but only "+found+" were found.";
    }
    this.missing_terminator = function(method, terminator, last) {
        return "List for "+method+" is missing a terminator";
    }
}

function ParserContext(tokens, error_formatter) {
    this.tokens = tokens;
    this.error_formatter = error_formatter;
    this.nonterminal_string = null;
    this.rule_string = null;
}

function MultiRegExp(par) {
    var regex;
    if (par.source !== undefined){
        regex = par;
    } else {
        var exp = par;
        var opts = "";
        if (par.substring(0, 1) == "/") {
            var l = par.lastIndexOf("/");
            opts = par.substring(l + 1, par.length);
            exp = par.substring(1, l);
        }
        regex = new RegExp(exp, opts);
    }
    var expandSource = function (braces, indexer) {
        ret = '';
        for (var i = 0; i < braces.length; i++) {
            if (braces[i].type == 'raw') {
                ret += '(' + braces[i].text + ')';
                indexer.next();
            } else if (braces[i].type == 'brace' && braces[i].containsCapture) {
                ret += braces[i].pre + expandSource(braces[i].children, indexer) + braces[i].post;
            } else if (braces[i].type == 'brace' && !braces[i].isCapture) {
                ret += '(' + braces[i].text.substring(braces[i].pre.length, braces[i].text.length - braces[i].post.length) + ')';
                indexer.next();
            } else if (braces[i].type == 'brace') {
                ret += braces[i].text;
                indexer.next(true);
            } else {
                ret += braces[i].text;
            }
        }
        return ret;
    }

    var captureScan = function(braces, parent) {
        var containsCapture = false;
        for (var i = 0; i < braces.length; i++) {
            captureScan(braces[i].children, braces[i]);
            braces[i].isCapture = braces[i].text.indexOf('(?:') != 0;
            if (braces[i].isCapture) {
                containsCapture = true;
            }
            if (braces[i].isCapture && braces[i].containsCapture) {
                throw "nested captures not permitted, use (?:...) where capture is not intended";
            }
        }
        if (parent) {
            parent.containsCapture = containsCapture;
        }
    }

    var fillGaps = function(braces, text) {
        var pre = /^\((\?.)?/.exec(text);
        pre = pre == null ? '' : pre[0];
        var post = /\)$/.exec(text);
        post = post == null ? '' : post[0];
        var i = 0;
        if (braces.length > 0) {
            fillGaps(braces[0].children, braces[0].text);
        }
        if (braces.length > 0 && braces[0].pos > pre.length) {
            braces.splice(0, 0, {type: 'raw', pos: pre.length, length: braces[0].pos, text: text.substring(pre.length, braces[0].pos)});
            i++;
        }
        for(i++ ;i < braces.length; i++) {
            fillGaps(braces[i].children, braces[i].text);
            if (braces[i].pos > braces[i-1].pos + braces[i-1].length) {
                braces.splice(i, 0, {type:'raw', pos: braces[i-1].pos + braces[i-1].length,
                                     length: braces[i].pos - (braces[i-1].pos + braces[i-1].length),
                                     text: text.substring(braces[i-1].pos + braces[i-1].length,
                                                          braces[i].pos)});
                i++;
            }
        }
        if (braces.length == 0)
        {
            braces.push({type:'raw', pos: pre.length, length: text.length - post.length - pre.length, text: text.substring(pre.length, text.length - post.length)});
        } else if (braces[braces.length - 1].pos + braces[braces.length - 1].length < text.length - post.length) {
            var pos = braces[braces.length - 1].pos + braces[braces.length - 1].length;
            var txt = text.substring(pos, text.length - post.length);
            braces.push({type:'raw', pos: pos, length: txt.length, text: txt});
        }
    }

    var GetBraces = function(text) {
        var ret = [];
        var shift = 0;
        do {
            var brace = GetBrace(text);
            if (brace == null) {
                break;
            } else {
                text = text.substring(brace.pos + brace.length);
                var del = brace.pos + brace.length;
                brace.pos += shift;
                shift += del;
                ret.push(brace);
            }
        } while (brace != null);
        return ret;
    }

    var GetBrace = function(text) {
        var ret = {pos: -1, length: 0, text: '', children: [], type: 'brace'};
        var openExp = /^(?:\\.|[^\)\\\(])*\(\?./;
        var pre = 3;
        var post = 1;
        var m = openExp.exec(text);
        if (m == null) {
            m = /^(?:\\.|[^\)\\\(])*\(/.exec(text);
            pre = 1;
        }
        if (m != null) {
            ret.pos = m[0].length - pre;
            ret.children = GetBraces(text.substring(m[0].length));
            for (var i = 0; i < ret.children.length; i++) {
                ret.children[i].pos += pre;
            }
            var closeExp = /^(?:\\.|[^\\\(\)])*\)/;
            var closeExpAlt = /^(?:\\.|[^\\\(\)])*\)\?/;
            var from = ret.children.length <= 0 ? ret.pos + pre :
                ret.children[ret.children.length-1].pos +
                    ret.children[ret.children.length-1].length +
                    m[0].length - pre;
            var m2 = closeExp.exec(text.substring(from));
            var m3 = closeExpAlt.exec(text.substring(from));
            if (m3 !== null && m3.length - 1 <= m2.length) {
                m2 = m3;
                post = 2;
            }
            if (m2 == null) {
                return null;
            } else {
                ret.length = m2[0].length + from - ret.pos;
                ret.text = text.substring(ret.pos, ret.pos + ret.length);
            }
        }
        if (ret.text == '()' || /^\(\?.\)$/.test(ret.text)) {
            throw 'empty braces not permitted';
        }
        if (ret.pos != -1) {
            ret.pre = ret.text.substring(0, pre);
            ret.post = ret.text.substring(ret.text.length - post, ret.text.length);
        }
        return ret.pos == -1 ? null : ret;
    }

    var fixOrs = function (braces_W_raw) {
        var orFind = /^(\\.|[^\\|])*\|/;
        for (var i = 0; i < braces_W_raw.length; i++) {
            if (braces_W_raw[i].type == 'raw') {
                var fullText = braces_W_raw[i].text;
                var m = orFind.exec(fullText);
                if (m != null) {
                    var or = { type: 'or', pos: m[0].length - 1 + braces_W_raw[i].pos, length: 1, text: '|' };
                    var raw = { type: 'raw', pos: m[0].length + braces_W_raw[i].pos,
                        length: fullText.length - m[0].length,
                        text: fullText.substring(m[0].length, fullText.length)
                    };
                    braces_W_raw[i].text = fullText.substring(0, m[0].length - 1);
                    braces_W_raw[i].length = braces_W_raw[i].text.length;
                    braces_W_raw.splice(i + 1, 0, or, raw);
                    i += 1;
                }
            } else if (braces_W_raw[i].type == 'brace') {
                fixOrs(braces_W_raw[i].children, braces_W_raw[i].text);
            }
        }
    }

    var source = regex.source;
    var braces = GetBraces(source);
    captureScan(braces);
    fillGaps(braces, source);
    fixOrs(braces);
    var indexer = {i: 1, next:
                       function (realPoint) {
                           if (realPoint) {
                               this.points.push(this.i);
                           }
                           return this.i++;
                       }, points: []};
    source = expandSource(braces, indexer);
    this.dataPoints = indexer.points;
    var options = (regex.ignoreCase ? "i" : "") + (regex.global ? "g" : "") + (regex.multiline ? "m" : "");
    this.regex = new RegExp(source, options);
    this.exec = function (text) {
        var m = this.regex.exec(text);
        if (m == null) {
            return {};
        }
        var ret = {};
        var ch = 0;
        for (var i = 1; i < m.length; i++) {
            if (m[i] !== null && m[i] !== undefined) {
                var pos = this.dataPoints.indexOf(i);
                if (pos != -1) {
                    ret[pos] = {index: ch, text: m[i]};
                }
                ch += m[i].length;
            }
        }
        for (var i = 0; i < this.dataPoints.length; i++) {
            if (ret[i] === undefined) {
                ret[i] = null;
            }
        }
        return ret;
    }
}

var Base64 = {
    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
            Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
            Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = Base64._keyStr.indexOf(input.charAt(i++));
            enc2 = Base64._keyStr.indexOf(input.charAt(i++));
            enc3 = Base64._keyStr.indexOf(input.charAt(i++));
            enc4 = Base64._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }
        return string;
    }
}

// Section: Parser

var terminals = {
{% for terminal in grammar.standard_terminals %}
    {{terminal.id}}: '{{terminal.string}}',
{% endfor %}

{% for terminal in grammar.standard_terminals %}
    '{{terminal.string.lower()}}': {{terminal.id}},
{% endfor %}
}

// table[nonterminal][terminal] = rule
var table = [
{% py parse_table = grammar.parse_table %}
{% for i in range(len(grammar.nonterminals)) %}
    [{{', '.join([str(rule.id) if rule else str(-1) for rule in parse_table[i]])}}],
{% endfor %}
]

var nonterminal_first = {
{% for nonterminal in grammar.nonterminals %}
    {{nonterminal.id}}: [{{', '.join([str(t.id) for t in grammar.first(nonterminal)])}}],
{% endfor %}
}

var nonterminal_follow = {
{% for nonterminal in grammar.nonterminals %}
    {{nonterminal.id}}: [{{', '.join([str(t.id) for t in grammar.follow(nonterminal)])}}],
{% endfor %}
}

var rule_first = {
{% for rule in grammar.get_expanded_rules() %}
    {{rule.id}}: [{{', '.join([str(t.id) for t in grammar.first(rule.production)])}}],
{% endfor %}
}

var nonterminal_rules = {
{% for nonterminal in grammar.nonterminals %}
    {{nonterminal.id}}: [
  {% for rule in grammar.get_expanded_rules() %}
    {% if rule.nonterminal.id == nonterminal.id %}
        "{{rule}}",
    {% endif %}
  {% endfor %}
    ],
{% endfor %}
}

var rules = {
{% for rule in grammar.get_expanded_rules() %}
    {{rule.id}}: "{{rule}}",
{% endfor %}
}

function is_terminal(id){
    return 0 <= id && id <= {{len(grammar.standard_terminals) - 1}};
}

function parse(tokens, error_formatter, start) {
    if (error_formatter === undefined) {
        error_formatter = new DefaultSyntaxErrorFormatter();
    }
    var ctx = new ParserContext(tokens, error_formatter);
    var tree = parse_{{grammar.start.string.lower()}}(ctx);
    if (tokens.current() != null) {
        throw new SyntaxError('Finished parsing without consuming all tokens.');
    }
    return tree;
}

function expect(ctx, terminal_id) {
    var current = ctx.tokens.current();
    if (current == null) {
        throw new SyntaxError(ctx.error_formatter.no_more_tokens(ctx.nonterminal, terminals[terminal_id], ctx.tokens.last()));
    }
    if (current.id != terminal_id) {
        throw new SyntaxError(ctx.error_formatter.unexpected_symbol(ctx.nonterminal, current, [terminals[terminal_id]], ctx.rule));
    }
    var next = ctx.tokens.advance();
    if (next && !is_terminal(next.id)) {
        throw new SyntaxError(ctx.error_formatter.invalid_terminal(ctx.nonterminal, next));
    }
    return current;
}

{% for expression_nonterminal in sorted(grammar.expression_nonterminals, key=str) %}
    {% py name = expression_nonterminal.string %}

// START definitions for expression parser `{{name}}`
var infix_binding_power_{{name}} = {
    {% for rule in grammar.get_rules(expression_nonterminal) %}
        {% if rule.operator and rule.operator.associativity in ['left', 'right'] %}
    {{rule.operator.operator.id}}: {{rule.operator.binding_power}}, // {{rule}}
        {% endif %}
    {% endfor %}
}

var prefix_binding_power_{{name}} = {
    {% for rule in grammar.get_rules(expression_nonterminal) %}
        {% if rule.operator and rule.operator.associativity in ['unary'] %}
    {{rule.operator.operator.id}}: {{rule.operator.binding_power}}, // {{rule}}
        {% endif %}
    {% endfor %}
}

function get_infix_binding_power_{{name}}(terminal_id) {
    if (terminal_id in infix_binding_power_{{name}}) {
        return infix_binding_power_{{name}}[terminal_id];
    } else {
        return 0;
    }
}

function get_prefix_binding_power_{{name}}(terminal_id) {
    if (terminal_id in prefix_binding_power_{{name}}) {
        return prefix_binding_power_{{name}}[terminal_id];
    } else {
        return 0;
    }
}

function parse_{{name}}(ctx) {
    return parse_{{name}}_internal(ctx, 0);
}

function parse_{{name}}_internal(ctx, rbp) {
    var left = nud_{{name}}(ctx);
    if (left instanceof ParseTree) {
        left.isExpr = true;
        left.isNud = true;
    }
    while (ctx.tokens.current() && rbp < get_infix_binding_power_{{name}}(ctx.tokens.current().id)) {
        left = led_{{name}}(left, ctx);
    }
    if (left) {
        left.isExpr = true;
    }
    return left;
}

function nud_{{name}}(ctx) {
    var tree = new ParseTree(new NonTerminal({{expression_nonterminal.id}}, '{{name}}'));
    var current = ctx.tokens.current();
    var ast_parameters;
    ctx.nonterminal = "{{name}}";

    if (!current) {
        return tree;
    }

    {% for i, rule in enumerate(grammar.get_expanded_rules(expression_nonterminal)) %}
      {% py first_set = grammar.first(rule.production) %}
      {% if len(first_set) and not first_set.issuperset(grammar.first(expression_nonterminal)) %}
    {{'if' if i == 0 else 'else if'}} (rule_first[{{rule.id}}].indexOf(current.id) != -1) {
        // {{rule}}
        ctx.rule = rules[{{rule.id}}];

        {% py ast = rule.nudAst if not isinstance(rule.operator, PrefixOperator) else rule.ast %}
        {% if isinstance(ast, AstSpecification) %}
        ast_parameters = {
          {% for k,v in ast.parameters.items() %}
            '{{k}}': {% if v == '$' %}'{{v}}'{% else %}{{v}}{% endif %},
          {% endfor %}
        }
        tree.astTransform = new AstTransformNodeCreator('{{ast.name}}', ast_parameters);
        {% elif isinstance(ast, AstTranslation) %}
        tree.astTransform = new AstTransformSubstitution({{ast.idx}});
        {% endif %}

        tree.nudMorphemeCount = {{len(rule.nud_production)}};

        {% for morpheme in rule.nud_production.morphemes %}
          {% if isinstance(morpheme, Terminal) %}
        tree.add(expect(ctx, {{morpheme.id}}));
          {% elif isinstance(morpheme, NonTerminal) and morpheme.string.upper() == rule.nonterminal.string.upper() %}
            {% if isinstance(rule.operator, PrefixOperator) %}
        tree.add(parse_{{name}}_internal(ctx, get_prefix_binding_power_{{name}}({{rule.operator.operator.id}})));
        tree.isPrefix = true;
            {% else %}
        tree.add(parse_{{rule.nonterminal.string.lower()}}(ctx));
            {% endif %}
          {% elif isinstance(morpheme, NonTerminal) %}
        tree.add(parse_{{morpheme.string.lower()}}(ctx));
          {% endif %}
        {% endfor %}
    }
      {% endif %}
    {% endfor %}

    return tree;
}

function led_{{name}}(left, ctx) {
    var tree = new ParseTree(new NonTerminal({{expression_nonterminal.id}}, '{{name}}'))
    var current = ctx.tokens.current()
    var ast_parameters;
    ctx.nonterminal = "{{name}}";

    {% for rule in grammar.get_expanded_rules(expression_nonterminal) %}
      {% py led = rule.led_production.morphemes %}
      {% if len(led) %}
    if (current.id == {{led[0].id}}) { // {{led[0]}}
        // {{rule}}
        ctx.rule = rules[{{rule.id}}];
        {% if isinstance(rule.ast, AstSpecification) %}
        ast_parameters = {
          {% for k,v in rule.ast.parameters.items() %}
            '{{k}}': {% if v == '$' %}'{{v}}'{% else %}{{v}}{% endif %},
          {% endfor %}
        }
        tree.astTransform = new AstTransformNodeCreator('{{rule.ast.name}}', ast_parameters);
        {% elif isinstance(rule.ast, AstTranslation) %}
        tree.astTransform = new AstTransformSubstitution({{rule.ast.idx}});
        {% endif %}

        {% if len(rule.nud_production) == 1 and isinstance(rule.nud_production.morphemes[0], NonTerminal) %}
          {% py nt = rule.nud_production.morphemes[0] %}
          {% if nt == rule.nonterminal or (isinstance(nt.macro, OptionalMacro) and nt.macro.nonterminal == rule.nonterminal) %}
        tree.isExprNud = true;
          {% endif %}
        {% endif %}

        tree.add(left);

        {% py associativity = {rule.operator.operator.id: rule.operator.associativity for rule in grammar.get_rules(expression_nonterminal) if rule.operator} %}
        {% for morpheme in led %}
          {% if isinstance(morpheme, Terminal) %}
        tree.add(expect(ctx, {{morpheme.id}})); // {{morpheme}}
          {% elif isinstance(morpheme, NonTerminal) and morpheme.string.upper() == rule.nonterminal.string.upper() %}
        var modifier = {{1 if rule.operator.operator.id in associativity and associativity[rule.operator.operator.id] == 'right' else 0}};
            {% if isinstance(rule.operator, InfixOperator) %}
        tree.isInfix = true;
            {% endif %}
        tree.add(parse_{{name}}_internal(ctx, get_infix_binding_power_{{name}}({{rule.operator.operator.id}}) - modifier));
          {% elif isinstance(morpheme, NonTerminal) %}
        tree.add(parse_{{morpheme.string.lower()}}(ctx));
          {% endif %}
        {% endfor %}
    }
      {% endif %}
    {% endfor %}

    return tree;
}

// END definitions for expression parser `{{name}}`
{% endfor %}

{% for list_nonterminal in sorted(grammar.list_nonterminals, key=str) %}
  {% py list_parser = grammar.list_parser(list_nonterminal) %}

function parse_{{list_nonterminal.string}}(ctx) {
    var current = ctx.tokens.current();
    var rule = current != null ? table[{{list_nonterminal.id - len(grammar.standard_terminals)}}][current.id] : -1;
    var tree = new ParseTree(new NonTerminal({{list_nonterminal.id}}, '{{list_nonterminal.string}}'));
    ctx.nonterminal = "{{list_nonterminal.string}}";
    tree.list = true;
  {% if list_parser.separator is not None %}
    tree.listSeparator = {{list_parser.separator.id}};
  {% else %}
    tree.listSeparator = -1;
  {% endif %}
    tree.astTransform = new AstTransformSubstitution(0);

  {% if not grammar.must_consume_tokens(list_nonterminal) %}
    if ( ctx.tokens.current() != null &&
         nonterminal_follow[{{list_nonterminal.id}}].indexOf(ctx.tokens.current().id) != -1 &&
         nonterminal_first[{{list_nonterminal.id}}].indexOf(ctx.tokens.current().id) == -1 ) {
        return tree;
    }
  {% endif %}

    if ( ctx.tokens.current() == null) {
  {% if grammar.must_consume_tokens(list_nonterminal) %}
        throw new SyntaxError('Error: unexpected end of file');
  {% else %}
        return tree;
  {% endif %}
    }

    var minimum = {{list_parser.minimum}};
    while ( minimum > 0 ||
            (ctx.tokens.current() != null &&
             nonterminal_first[{{list_nonterminal.id}}].indexOf(ctx.tokens.current().id) != -1)) {
  {% if isinstance(list_parser.morpheme, NonTerminal) %}
        tree.add(parse_{{list_parser.morpheme.string.lower()}}(ctx));
        ctx.nonterminal = "{{list_nonterminal.string}}";
  {% else %}
        tree.add(expect(ctx, {{list_parser.morpheme.id}}));
  {% endif %}

  {% if list_parser.separator is not None %}
        if ( ctx.tokens.current() != null && ctx.tokens.current().id == {{list_parser.separator.id}}) {
          tree.add(expect(ctx, {{list_parser.separator.id}}));
    {% if list_parser.sep_terminates %}
        } else {
          throw new SyntaxError(ctx.error_formatter.missing_terminator(
              "parse_{{list_nonterminal.string.lower()}}",
              "{{list_parser.separator.string}}",
              null
          ));
        }
    {% else %}
        } else {
          if (minimum > 1) {
              throw new SyntaxError(ctx.error_formatter.missing_list_items(
                  "{{list_nonterminal.string.lower()}}",
                  {{list_parser.minimum}},
                  {{list_parser.minimum}} - minimum + 1,
                  null
              ));
          }
          break;
        }
    {% endif %}
  {% endif %}

        minimum = Math.max(minimum - 1, 0);
    }
    return tree;
}

{% endfor %}

{% for nonterminal in sorted(grammar.ll1_nonterminals, key=str) %}
  {% py name = nonterminal.string %}
function parse_{{name}}(ctx) {
    var current = ctx.tokens.current();
    var rule = current != null ? table[{{nonterminal.id - len(grammar.standard_terminals)}}][current.id] : -1;
    var tree = new ParseTree(new NonTerminal({{nonterminal.id}}, '{{name}}'));
    var ast_parameters;
    var subtree;
    var t;
    ctx.nonterminal = "{{name}}";

    {% if not grammar.must_consume_tokens(nonterminal) %}
    if (current != null && nonterminal_follow[{{nonterminal.id}}].indexOf(current.id) != -1 && nonterminal_first[{{nonterminal.id}}].indexOf(current.id) == -1) {
        return tree;
    }
    {% endif %}

    if (current == null) {
    {% if grammar.must_consume_tokens(nonterminal) %}
        throw new SyntaxError('Error: unexpected end of file');
    {% else %}
        return tree;
    {% endif %}
    }

    {% for index, rule in enumerate([rule for rule in grammar.get_expanded_rules(nonterminal) if not rule.is_empty]) %}

      {% if index == 0 %}
    if (rule == {{rule.id}}) { // {{rule}}
      {% else %}
    else if (rule == {{rule.id}}) { // {{rule}}
      {% endif %}

        ctx.rule = rules[{{rule.id}}];

      {% if isinstance(rule.ast, AstTranslation) %}
        tree.astTransform = new AstTransformSubstitution({{rule.ast.idx}});
      {% elif isinstance(rule.ast, AstSpecification) %}
        ast_parameters = {
        {% for k,v in rule.ast.parameters.items() %}
            '{{k}}': {% if v == '$' %}'{{v}}'{% else %}{{v}}{% endif %},
        {% endfor %}
        }
        tree.astTransform = new AstTransformNodeCreator('{{rule.ast.name}}', ast_parameters);
      {% else %}
        tree.astTransform = new AstTransformSubstitution(0);
      {% endif %}

      {% for index, morpheme in enumerate(rule.production.morphemes) %}

        {% if isinstance(morpheme, Terminal) %}
        t = expect(ctx, {{morpheme.id}}); // {{morpheme}}
        tree.add(t);
        {% endif %}

        {% if isinstance(morpheme, NonTerminal) %}
        subtree = parse_{{morpheme.string.lower()}}(ctx);
        tree.add(subtree);
        {% endif %}

      {% endfor %}
        return tree;
    }
    {% endfor %}

    {% if grammar.must_consume_tokens(nonterminal) %}
    throw new SyntaxError(ctx.error_formatter.unexpected_symbol(
        ctx.nonterminal,
        ctx.tokens.current(),
        nonterminal_first[{{nonterminal.id}}],
        rules[{{rule.id}}]
    ));
    {% else %}
    return tree;
    {% endif %}
}
{% endfor %}

// Section: Lexer

{% if lexer %}

// START USER CODE
{{lexer.code}}
// END USER CODE

function emit(ctx, terminal, source_string, line, col) {
    ctx.tokens.push(new Terminal(terminals[terminal], terminal, source_string, ctx.resource, line, col))
}

{% if re.search(r'function\s+default_action', lexer.code) is None %}
function default_action(ctx, terminal, source_string, line, col) {
    emit(ctx, terminal, source_string, line, col)
}

{% endif %}

{% if re.search(r'function\s+post_filter', lexer.code) is None %}
function post_filter(tokens) {
    return tokens
}
{% endif %}

{% if re.search(r'function\s+init', lexer.code) is None %}
function init() {
    return {}
}
{% endif %}

{% if re.search(r'function\s+destroy', lexer.code) is None %}
function destroy(context) {
    return 0;
}
{% endif %}

var regex = {
  {% for mode, regex_list in lexer.items() %}
    '{{mode}}': [
      {% for regex in regex_list %}
      {
          regex: new RegExp({{regex.regex}}{{', "' + ''.join(regex.options) + '"' if regex.options else ''}}),
          outputs: [
          {% for output in regex.outputs %}
              {
              {% if isinstance(output, RegexOutput) %}
                  terminal: {{"'" + output.terminal.string.lower() + "'" if output.terminal else 'null'}},
                  group: {{output.group if output.group is not None else 'null'}},
                  function: {{output.function if output.function else 'null'}},
              {% elif isinstance(output, LexerStackPush) %}
                  stack_push: '{{output.mode}}',
              {% elif isinstance(output, LexerAction) %}
                  action: '{{output.action}}',
              {% endif %}
              },
          {% endfor %}
          ]
      },
      {% endfor %}
    ],
  {% endfor %}
}

function advance_line_col(string, length, line, col) {
    for (var i = 0; i < length; i++) {
        if (string[i] == '\n') {
            line += 1;
            col = 1;
        } else {
            col += 1;
        }
    }
    return {line: line, col: col}
}

function advance_string(ctx, string) {
    var lc = advance_line_col(string, string.length, ctx.line, ctx.col)
    ctx.line = lc.line
    ctx.col = lc.col
    ctx.string = ctx.string.substring(string.length)
}

function _unrecognized_token(string, line, col) {
    var lines = string.split('\n')
    var bad_line = lines[line-1]
    var message = 'Unrecognized token on line {0}, column {1}:\n\n{2}\n{3}'.format(
        line, col, bad_line, Array(col).join(' ') + '^'
    )
    throw new SyntaxError(message)
}

function _next(ctx) {
    var tokens = []
    var mode = ctx.mode_stack[ctx.mode_stack.length - 1]
    for (var i = 0; i < regex[mode].length; i++) {
        var match = regex[mode][i].regex.exec(ctx.string);

        if (match != null && match.index == 0) {
            for (var j = 0; j < regex[mode][i].outputs.length; j++) {
                var terminal = regex[mode][i].outputs[j].terminal;
                var group = regex[mode][i].outputs[j].group;
                var func = regex[mode][i].outputs[j].function;
                var stack_push = regex[mode][i].outputs[j].stack_push;
                var action = regex[mode][i].outputs[j].action;

                if (stack_push !== undefined) {
                    ctx.mode_stack.push(stack_push)
                } else if (action !== undefined) {
                    if (action == 'pop') {
                        ctx.mode_stack.pop()
                    }
                } else {
                    func = (func == null) ? default_action : func;
                    var source_string = group != null ? match[group] : ""

                    // Ugh!  JavaScript why you no have regex group indexes?!
                    var group_line = ctx.line
                    var group_col = ctx.col
                    try {
                        var mult_regex = new MultiRegExp(regex[mode][i].regex.source);
                        var mult_groups = mult_regex.exec(ctx.string)
                        if (group != null && group > 0) {
                            var lc = advance_line_col(match[0], mult_groups[group-1].index, ctx.line, ctx.col)
                            group_line = lc.line
                            group_col = lc.col
                        }
                    } catch(err) {}
                    // ^ Literally the worst thing ever

                    func(ctx, terminal, source_string, group_line, group_col)
                }
            }

            advance_string(ctx, match[0])
            return true
        }
    }
    return false
}

function lex(string, resource) {
    var ctx = {
        string: string,
        resource: resource,
        user_context: init(),
        mode_stack: ['default'],
        tokens: [],
        line: 1,
        col: 1
    }

    var string_copy = string
    var parsed_tokens = []
    while (ctx.string.length) {
        var matched = _next(ctx)

        if (matched == false) {
            _unrecognized_token(string_copy, ctx.line, ctx.col)
        }
    }
    destroy(ctx.user_context)
    var filtered = post_filter(ctx.tokens)
    return new TokenStream(filtered)
}

{% endif %}

// Section: Main

{% if add_main %}

var main = function() {
    var fs = require('fs');

    function usage() {
        process.stderr.write('usage: ' + process.argv[0] + ' ' + process.argv[1] + ' [parsetree|ast|tokens] file\n');
        process.exit(-1);
    }

    if (process.argv.length < 4) {
        usage();
    }

    var output = process.argv[2];
    var file = process.argv[3];

    if (output != 'parsetree' && output != 'ast' && output != 'tokens') {
        usage();
    }

    fs.readFile(file, 'utf-8', function (err, data) {
        if (err) throw err;

        try {
            var tokens = lex(data, 'source');
        } catch(err) {
            console.log(err.to_string());
            process.exit(0);
        }

        if (output == 'tokens') {
          for(i = 0; i < tokens.list.length; i++) {
              console.log(tokens.list[i].to_string(true))
          }
          process.exit(0);
        }
        try {
            tree = parse(tokens);
            if (output == 'parsetree') {
                console.log(parse_tree_string(tree, 2, true));
            } else if (output == 'ast') {
                console.log(ast_string(tree.to_ast(), 2, true));
            }
        } catch (err) {
            console.log(err.message);
        }
    });
}

if (require.main === module) {
    main();
}

{% endif %}

// Section: Exports

{% if nodejs %}
module.exports = {
  {% if lexer %}
  lex: lex,
  {% endif %}
  parse: parse,
  terminals: terminals,
  parse_tree_string: parse_tree_string,
  ast_string: ast_string
}
{% endif %}
