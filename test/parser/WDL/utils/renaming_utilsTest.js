import { expect } from 'chai';

import { renameExpression, replaceSplitter } from '../../../../src/parser/WDL/utils/renaming_utils';

describe('parser/WDL/renaming_utils', () => {
  describe('.replaceSplitter()', () => {
    it('expect to replace splitter in source string', () => {
      expect(replaceSplitter('ns.name')).to.equal('ns_name');
      expect(replaceSplitter('ns.name.var')).to.equal('ns_name.var');
    });
  });

  describe('.renameExpression()', () => {
    it('requires an empty ast', () => {
      const astUndefined = undefined;
      renameExpression(astUndefined);
      expect(astUndefined).to.equal(undefined);
      const astNull = null;
      renameExpression(astNull);
      expect(astNull).to.equal(null);
      const astEmpty = '';
      renameExpression(astEmpty);
      expect(astEmpty).to.equal('');
    });

    it('renames an identifier within expression with map literal and function call', () => {
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
      const prefix = 'pre_';
      const initialCalls = ['ns.bar', 'ns2.baz'];

      renameExpression(ast, prefix, initialCalls);

      expect(ast.attributes.map.list[1].attributes.value.attributes.params.list[0].attributes.lhs.source_string).to.equal('pre_ns_bar');
    });

    it('renames multiple identifiers within expression with array and object literals', () => {
      const ast = {
        name: 'ArrayLiteral',
        attributes: {
          values: {
            list: [
              {
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
                        },
                      },
                    ],
                  },
                },
              },
              {
                name: 'MemberAccess',
                attributes: {
                  lhs: {
                    id: 14,
                    str: 'identifier',
                    source_string: 'baz',
                    line: 17,
                    col: 30,
                  },
                  rhs: {
                    id: 14,
                    str: 'identifier',
                    source_string: 'out',
                    line: 17,
                    col: 34,
                  },
                },
              },
            ],
          },
        },
      };
      const prefix = 'pre_';
      const initialCalls = ['ns.bar', 'ns2.baz'];

      renameExpression(ast, prefix, initialCalls);

      expect(ast.attributes.values.list[0].attributes.map.list[0].attributes.value.attributes.lhs.source_string).to.equal('pre_ns_bar');
      expect(ast.attributes.values.list[0].attributes.map.list[1].attributes.value.attributes.lhs.source_string).to.equal('pre_ns_bar');
      expect(ast.attributes.values.list[1].attributes.lhs.source_string).to.equal('pre_ns2_baz');
    });

    it('renames an identifier within expression with binary and unary operations', () => {
      const ast = {
        name: 'Add',
        attributes: {
          lhs: {
            name: 'LogicalNot',
            attributes: {
              expression: {
                name: 'MemberAccess',
                attributes: {
                  lhs: {
                    id: 14,
                    str: 'identifier',
                    source_string: 'baz',
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
              },
            },
          },
          rhs: {
            name: 'Multiply',
            attributes: {
              lhs: {
                id: 2,
                str: 'integer',
                source_string: '5',
                line: 14,
                col: 17,
              },
              rhs: {
                id: 2,
                str: 'integer',
                source_string: '4',
                line: 14,
                col: 22,
              },
            },
          },
        },
      };
      const prefix = 'pre_';
      const initialCalls = ['ns.baz'];

      renameExpression(ast, prefix, initialCalls);

      expect(ast.attributes.lhs.attributes.expression.attributes.lhs.source_string).to.equal('pre_ns_baz');
    });

    it('renames an identifier within expression with tuple literal and ternary', () => {
      const ast = {
        name: 'TernaryIf',
        attributes: {
          cond: {
            name: 'TupleLiteral',
            attributes: {
              values: {
                list: [
                  {
                    name: 'LogicalAnd',
                    attributes: {
                      lhs: {
                        name: 'LogicalNot',
                        attributes: {
                          expression: {
                            name: 'MemberAccess',
                            attributes: {
                              lhs: {
                                id: 14,
                                str: 'identifier',
                                source_string: 'baz',
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
                          },
                        },
                      },
                      rhs: {
                        name: 'MemberAccess',
                        attributes: {
                          lhs: {
                            id: 14,
                            str: 'identifier',
                            source_string: 'foo',
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
                      },
                    },
                  },
                ],
              },
            },
          },
          iftrue: {
            name: 'LogicalNot',
            attributes: {
              expression: {
                id: 2,
                str: 'integer',
                source_string: '2',
                line: 14,
                col: 12,
              },
            },
          },
          iffalse: {
            name: 'LogicalNot',
            attributes: {
              expression: {
                id: 2,
                str: 'integer',
                source_string: '3',
                line: 14,
                col: 12,
              },
            },
          },
        },
      };
      const prefix = 'pre_';
      const initialCalls = ['ns.foo', 'ns.bar', 'ns.baz'];

      renameExpression(ast, prefix, initialCalls);

      expect(ast.attributes.cond.attributes.values.list[0].attributes.lhs.attributes.expression.attributes.lhs.source_string).to.equal('pre_ns_baz');
      expect(ast.attributes.cond.attributes.values.list[0].attributes.rhs.attributes.lhs.source_string).to.equal('pre_ns_foo');
    });
  });
});
