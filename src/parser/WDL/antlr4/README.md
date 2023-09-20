## WDL Parsers generation

### WDL Specifications

WDL specifications can be found at [OpenWdl repo](https://github.com/openwdl/wdl/blob/main/README.md).
To generate javascript parsers the following files are required:

- v1.1
  - [WdlV1_1Lexer.g4](https://raw.githubusercontent.com/openwdl/wdl/main/versions/1.1/parsers/antlr4/WdlV1_1Lexer.g4)
  - [WdlV1_1Parser.g4](https://raw.githubusercontent.com/openwdl/wdl/main/versions/1.1/parsers/antlr4/WdlV1_1Parser.g4)
- v1.0
  - [WdlV1Lexer.g4](https://raw.githubusercontent.com/openwdl/wdl/main/versions/1.0/parsers/antlr4/WdlV1Lexer.g4)
  - [WdlV1Parser.g4](https://raw.githubusercontent.com/openwdl/wdl/main/versions/1.0/parsers/antlr4/WdlV1Parser.g4)
- draft-3: for now we have the same specification as for *v1.0* version. Starting with *draft-3* version, the header `version <version>` is required at the top of the WDL document (at the first line)
- draft-2: *lexer* and *parser* grammar rules were built based on the [specification](https://github.com/openwdl/wdl/blob/main/versions/draft-2/SPEC.md). If WDL document does not contain `version <version>` header, it is considered that *draft-2* version is used
- draft-1: *lexer* and *parser* grammar rules were built based on the [specification](https://github.com/openwdl/wdl/blob/main/versions/draft-1/SPEC.md).

**Important!**

Lexer and parser grammar rule fules **were modified** to ignore `version x.x` header on the first line,
because those rules caused parser to crush if we use identifiers / parameters with name `version`
in our WDL documents, e.g. `MyCustomTask.version`.

### JavaScript parser generation

**Requirements**: **[antlr4](https://www.antlr.org)** tool installed locally.

Download lexer & parser files for desired WDL version (do not rename them - `WdlV1Lexer.g4`, `WdlV1_1Lexer.g4`, `WdlV1Parser.g4`, `WdlV1_1Parser.g4`).

Execute script (example for version v1.1):

```shell
antlr4 -Dlanguage=JavaScript ./WdlV1_1Lexer.g4
antlr4 -Dlanguage=JavaScript ./WdlV1_1Parser.g4
```

The following files will be generated:

- Lexer.js (WdlV1_1Lexer.js)
- Parser.js (WdlV1_1Parser.js)
- ParserListener.js (WdlV1_1ParserListener.js)
