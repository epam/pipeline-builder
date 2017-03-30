import { expect } from 'chai';

import {
  extractExpression,
  extractType,
  extractMetaBlock,
  WDLParserError,
} from '../../../../src/parser/WDL/utils/utils';

describe('parser/WDL/utils', () => {

  describe('.extractExpression()', () => {

    it('requires an empty ast', () => {
      expect(extractExpression().string).to.equal('');
      expect(extractExpression(null).string).to.equal('');
    });

    it('requires an operations over integers', () => {
      const ast = {
        name: 'Add',
        attributes: {
          lhs: {
            id: 2,
            str: 'integer',
            source_string: '1',
            line: 12,
            col: 11,
          },
          rhs: {
            id: 2,
            str: 'integer',
            source_string: '1',
            line: 12,
            col: 15,
          },
        },
      };
      expect(extractExpression(ast).string).to.equal('1 + 1');
    });

    it('requires an operations over floats', () => {
      const ast = {
        name: 'Multiply',
        attributes: {
          lhs: {
            name: 'TupleLiteral',
            attributes: {
              values: {
                list: [
                  {
                    name: 'Add',
                    attributes: {
                      lhs: {
                        id: 12,
                        str: 'float',
                        source_string: '1.1',
                        line: 13,
                        col: 14,
                      },
                      rhs: {
                        id: 2,
                        str: 'integer',
                        source_string: '1',
                        line: 13,
                        col: 20,
                      },
                    },
                  },
                ],
              },
            },
          },
          rhs: {
            id: 2,
            str: 'integer',
            source_string: '1',
            line: 13,
            col: 25,
          },
        },
      };

      expect(extractExpression(ast).string).to.equal('(1.1 + 1) * 1');
    });

    it('requires an unary operators', () => {
      const ast = {
        name: 'Add',
        attributes: {
          lhs: {
            name: 'LogicalNot',
            attributes: {
              expression: {
                id: 2,
                str: 'integer',
                source_string: '1',
                line: 14,
                col: 12,
              },
            },
          },
          rhs: {
            name: 'Multiply',
            attributes: {
              lhs: {
                name: 'UnaryPlus',
                attributes: {
                  expression: {
                    id: 2,
                    str: 'integer',
                    source_string: '1',
                    line: 14,
                    col: 17,
                  },
                },
              },
              rhs: {
                name: 'UnaryNegation',
                attributes: {
                  expression: {
                    id: 2,
                    str: 'integer',
                    source_string: '1',
                    line: 14,
                    col: 22,
                  },
                },
              },
            },
          },
        },
      };

      expect(extractExpression(ast).string).to.equal('!1 + +1 * -1');
    });

    it('requires an array expressions', () => {
      const ast = {
        name: 'ArrayLiteral',
        attributes: {
          values: {
            list: [
              {
                id: 2,
                str: 'integer',
                source_string: '1',
                line: 15,
                col: 22,
              },
              {
                id: 2,
                str: 'integer',
                source_string: '2',
                line: 15,
                col: 25,
              },
            ],
          },
        },
      };
      expect(extractExpression(ast).string).to.equal('[1, 2]');
    });

    it('requires a member access', () => {
      const ast = {
        name: 'MemberAccess',
        attributes: {
          lhs: {
            id: 14,
            str: 'identifier',
            source_string: 'bar',
            line: 16,
            col: 16,
          },
          rhs: {
            id: 14,
            str: 'identifier',
            source_string: 'out1',
            line: 16,
            col: 20,
          },
        },
      };
      expect(extractExpression(ast).string).to.equal('bar.out1');
    });

    it('requires an object expressions', () => {
      const ast = {
        name: 'ObjectLiteral',
        attributes: {
          map: {
            list: [
              {
                name: 'ObjectKV',
                attributes: {
                  key: {
                    id: 14,
                    str: 'identifier',
                    source_string: 'o1',
                    line: 17,
                    col: 25,
                  },
                  value: {
                    name: 'MemberAccess',
                    attributes: {
                      lhs: {
                        id: 14,
                        str: 'identifier',
                        source_string: 'bar',
                        line: 17,
                        col: 30,
                      },
                      rhs: {
                        id: 14,
                        str: 'identifier',
                        source_string: 'out1',
                        line: 17,
                        col: 34,
                      },
                    },
                  },
                },
              },
              {
                name: 'ObjectKV',
                attributes: {
                  key: {
                    id: 14,
                    str: 'identifier',
                    source_string: 'o2',
                    line: 17,
                    col: 40,
                  },
                  value: {
                    name: 'Multiply',
                    attributes: {
                      lhs: {
                        name: 'MemberAccess',
                        attributes: {
                          lhs: {
                            id: 14,
                            str: 'identifier',
                            source_string: 'bar',
                            line: 17,
                            col: 45,
                          },
                          rhs: {
                            id: 14,
                            str: 'identifier',
                            source_string: 'out2',
                            line: 17,
                            col: 49,
                          },
                        },
                      },
                      rhs: {
                        id: 2,
                        str: 'integer',
                        source_string: '3',
                        line: 17,
                        col: 56,
                      },
                    },
                  },
                },
              },
            ],
          },
        },
      };
      expect(extractExpression(ast).string).to.equal('object {o1 : bar.out1, o2 : bar.out2 * 3}');
    });

    it('requires a Map and strings and function calls', () => {
      const ast = {
        name: 'MapLiteral',
        attributes: {
          map: {
            list: [
              {
                name: 'MapLiteralKv',
                attributes: {
                  key: {
                    id: 2,
                    str: 'integer',
                    source_string: '1',
                    line: 18,
                    col: 28,
                  },
                  value: {
                    id: 18,
                    str: 'string',
                    source_string: 'a',
                    line: 18,
                    col: 32,
                  },
                },
              },
              {
                name: 'MapLiteralKv',
                attributes: {
                  key: {
                    id: 2,
                    str: 'integer',
                    source_string: '3',
                    line: 18,
                    col: 37,
                  },
                  value: {
                    name: 'FunctionCall',
                    attributes: {
                      name: {
                        id: 14,
                        str: 'identifier',
                        source_string: 'read_string',
                        line: 18,
                        col: 41,
                      },
                      params: {
                        list: [
                          {
                            id: 2,
                            str: 'integer',
                            source_string: '1',
                            line: 18,
                            col: 53,
                          },
                          {
                            id: 2,
                            str: 'integer',
                            source_string: '2',
                            line: 18,
                            col: 56,
                          },
                        ],
                      },
                    },
                  },
                },
              },
            ],
          },
        },
      };
      expect(extractExpression(ast).string).to.equal('{1 : "a", 3 : read_string(1, 2)}');
    });
  });

  describe('.extractType()', () => {

    it('not allows empty input', () => {
      expect(() => extractType()).to.throw(Error);
      expect(() => extractType(null)).to.throw(Error);
    });

    it('requires a simple type', () => {
      const ast = {
        id: 43,
        str: 'type',
        source_string: 'Boolean',
        line: 11,
        col: 3,
      };

      expect(extractType(ast)).to.equal('Boolean');
    });

    it('requires an optional type', () => {
      const ast = {
        name: 'OptionalType',
        attributes: {
          innerType: {
            id: 43,
            str: 'type',
            source_string: 'Int',
            line: 11,
            col: 3,
          },
        },
      };
      expect(extractType(ast)).to.equal('Int?');
    });

    it('requires not empty type', () => {
      const ast = {
        name: 'NonEmptyType',
        attributes: {
          innerType: {
            name: 'Type',
            attributes: {
              name: {
                id: 43,
                str: 'type',
                source_string: 'Array',
                line: 15,
                col: 3,
              },
              subtype: {
                list: [
                  {
                    id: 43,
                    str: 'type',
                    source_string: 'Int',
                    line: 15,
                    col: 9,
                  },
                ],
              },
            },
          },
        },
      };
      expect(extractType(ast)).to.equal('Array[Int]+');
    });

    it('requires an Array', () => {
      const ast = {
        name: 'Type',
        attributes: {
          name: {
            id: 43,
            str: 'type',
            source_string: 'Array',
            line: 15,
            col: 3,
          },
          subtype: {
            list: [
              {
                id: 43,
                str: 'type',
                source_string: 'Int',
                line: 15,
                col: 9,
              },
            ],
          },
        },
      };
      expect(extractType(ast)).to.equal('Array[Int]');
    });

    it('requires a Difficult type', () => {
      const ast = {
        name: 'Type',
        attributes: {
          name: {
            id: 43,
            str: 'type',
            source_string: 'Map',
            line: 18,
            col: 3,
          },
          subtype: {
            list: [
              {
                id: 43,
                str: 'type',
                source_string: 'Int',
                line: 18,
                col: 7,
              },
              {
                name: 'Type',
                attributes: {
                  name: {
                    id: 43,
                    str: 'type',
                    source_string: 'Array',
                    line: 18,
                    col: 12,
                  },
                  subtype: {
                    list: [
                      {
                        id: 43,
                        str: 'type',
                        source_string: 'String',
                        line: 18,
                        col: 18,
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
      };
      expect(extractType(ast)).to.equal('Map[Int, Array[String]]');
    });
  });

  describe('.extractMetaBlock()', () => {
    it('works correctly', () => {
      const ast = [
        {
          name: 'Meta',
          attributes: {
            map: {
              list: [
                {
                  name: 'RuntimeAttribute',
                  attributes: {
                    key: {
                      id: 14,
                      str: 'identifier',
                      source_string: 'author',
                      line: 4,
                      col: 5,
                    },
                    value: {
                      id: 18,
                      str: 'string',
                      source_string: 'daniil.savchuk',
                      line: 4,
                      col: 14,
                    },
                  },
                },
                {
                  name: 'RuntimeAttribute',
                  attributes: {
                    key: {
                      id: 14,
                      str: 'identifier',
                      source_string: 'docker',
                      line: 5,
                      col: 5,
                    },
                    value: {
                      id: 18,
                      str: 'string',
                      source_string: 'docker2.0',
                      line: 5,
                      col: 14,
                    },
                  },
                },
              ],
            },
          },
        },
      ];

      const desc = {
        data: {},
      };

      extractMetaBlock(ast[0].attributes.map.list, 'meta', desc);

      expect(desc.data.meta).to.contain.all.keys(['author', 'docker']);
      expect(desc.data.meta.author).to.equal('"daniil.savchuk"');
      expect(desc.data.meta.docker).to.equal('"docker2.0"');
    });
  });

  describe('WDLParserError', () => {
    it('creates correctly', () => {
      const error1 = new WDLParserError();
      const error2 = new WDLParserError('error2');

      expect(error1.name).to.equal('WDLParserError');
      expect(error1.message).to.equal('');

      expect(error2.name).to.equal('WDLParserError');
      expect(error2.message).to.equal('error2');
    });
  });
});
