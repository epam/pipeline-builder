import { expect } from 'chai';

import WDLWorkflow from '../../../../src/parser/WDL/entities/WDLWorkflow';
import WDLParserError from '../../../../src/parser/WDL/utils/utils';
import Port from '../../../../src/model/Port';

describe('parser/WDL/entities/WDLWorkflow', () => {

  describe('constructor', () => {

    it('requires an empty workflow', () => {
      const ast = {
        name: {
          id: 14,
          str: 'identifier',
          source_string: 'foo',
          line: 2,
          col: 10,
        },
        body: {
          list: [],
        },
      };

      const workflow = new WDLWorkflow(ast);

      expect(workflow.name).to.equal('foo');
      expect(workflow.workflowStep.action).to.contain.all.keys(['i', 'o', 'data']);
      expect(workflow.workflowStep.action.i).to.be.empty;
      expect(workflow.workflowStep.action.o).to.be.empty;
      expect(workflow.workflowStep.action.data).to.be.empty;
    });

    it('requires several inputs', () => {
      const ast = {
        name: {
          id: 14,
          str: 'identifier',
          source_string: 'foo',
          line: 2,
          col: 10,
        },
        body: {
          list: [
            {
              name: 'Declaration',
              attributes: {
                type: {
                  id: 43,
                  str: 'type',
                  source_string: 'File',
                  line: 3,
                  col: 1,
                },
                name: {
                  id: 14,
                  str: 'identifier',
                  source_string: 'a',
                  line: 3,
                  col: 6,
                },
                expression: null,
              },
            },
            {
              name: 'Declaration',
              attributes: {
                type: {
                  id: 43,
                  str: 'type',
                  source_string: 'File',
                  line: 4,
                  col: 1,
                },
                name: {
                  id: 14,
                  str: 'identifier',
                  source_string: 'b',
                  line: 4,
                  col: 6,
                },
                expression: null,
              },
            },
          ],
        },
      };

      const workflow = new WDLWorkflow(ast);
      expect(workflow.workflowStep.action.i).to.have.all.keys(['a', 'b']);
    });

    it('throws error when workflow declarations are obtained not only at start', () => {
      const ast = {
        name: {
          id: 14,
          str: 'identifier',
          source_string: 'foo',
          line: 2,
          col: 10,
        },
        body: {
          list: [
            {
              name: 'Declaration',
              attributes: {
                type: {
                  id: 43,
                  str: 'type',
                  source_string: 'File',
                  line: 3,
                  col: 1,
                },
                name: {
                  id: 14,
                  str: 'identifier',
                  source_string: 'a',
                  line: 3,
                  col: 6,
                },
                expression: null,
              },
            },
            {
              name: 'Call',
              attributes: {
                task: {
                  id: 11,
                  str: 'fqn',
                  source_string: 'bar',
                  line: 3,
                  col: 6,
                },
                alias: null,
                body: null,
              },
            },
            {
              name: 'Declaration',
              attributes: {
                type: {
                  id: 43,
                  str: 'type',
                  source_string: 'File',
                  line: 4,
                  col: 1,
                },
                name: {
                  id: 14,
                  str: 'identifier',
                  source_string: 'b',
                  line: 4,
                  col: 6,
                },
                expression: null,
              },
            },
          ],
        },
      };
      expect(() => new WDLWorkflow(ast, {
        actionMap: {},
      })).to.throws(WDLParserError);
    });

    it('throws error when workflow uses undeclared task', () => {
      const ast = {
        name: {
          id: 14,
          str: 'identifier',
          source_string: 'foo',
          line: 2,
          col: 10,
        },
        body: {
          list: [
            {
              name: 'Call',
              attributes: {
                task: {
                  id: 11,
                  str: 'fqn',
                  source_string: 'bar',
                  line: 3,
                  col: 6,
                },
                alias: null,
                body: null,
              },
            },
          ],
        },
      };

      expect(() => new WDLWorkflow(ast, {
        actionMap: {},
      })).to.throws(WDLParserError);
    });

    it('supports scatter', () => {
      const ast = {
        name: {
          id: 14,
          str: 'identifier',
          source_string: 'foo',
          line: 2,
          col: 10,
        },
        body: {
          list: [
            {
              name: 'Scatter',
              attributes: {
                item: {
                  id: 14,
                  str: 'identifier',
                  source_string: 'i',
                  line: 3,
                  col: 11,
                },
                collection: {
                  id: 14,
                  str: 'string',
                  source_string: '1234',
                  line: 3,
                  col: 16,
                },
                body: {
                  list: [
                    {
                      name: 'Call',
                      attributes: {
                        task: {
                          id: 11,
                          str: 'fqn',
                          source_string: 'bar',
                          line: 3,
                          col: 6,
                        },
                        alias: null,
                        body: {
                          name: 'CallBody',
                          attributes: {
                            declarations: {
                              list: [],
                            },
                            io: {
                              list: [
                                {
                                  name: 'Inputs',
                                  attributes: {
                                    map: {
                                      list: [
                                        {
                                          name: 'IOMapping',
                                          attributes: {
                                            key: {
                                              id: 14,
                                              str: 'identifier',
                                              source_string: 'currSample',
                                              line: 8,
                                              col: 9,
                                            },
                                            value: {
                                              id: 14,
                                              str: 'identifier',
                                              source_string: 'i',
                                              line: 8,
                                              col: 20,
                                            },
                                          },
                                        },
                                      ],
                                    },
                                  },
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
            },
          ],
        },
      };

      const context = {
        actionMap: {
          bar: {
            i: {
              currSample: new Port('currSample'),
            },
          },
        },
      };
      const workflow = new WDLWorkflow(ast, context);
      expect(workflow.workflowStep.children.scatter_0.type).to.equal('scatter');
    });

    it('supports loop', () => {
      const ast = {
        name: {
          id: 14,
          str: 'identifier',
          source_string: 'foo',
          line: 2,
          col: 10,
        },
        body: {
          list: [
            {
              name: 'WhileLoop',
              attributes: {
                expression: {
                  id: 14,
                  str: 'identifier',
                  source_string: 'integers',
                  line: 3,
                  col: 16,
                },
                body: {
                  list: [
                    {
                      name: 'Call',
                      attributes: {
                        task: {
                          id: 11,
                          str: 'fqn',
                          source_string: 'bar',
                          line: 3,
                          col: 6,
                        },
                        alias: null,
                        body: null,
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      };

      const context = {
        actionMap: {
          bar: {
          },
        },
      };
      const workflow = new WDLWorkflow(ast, context);
      expect(workflow.workflowStep.children.whileloop_0.type).to.equal('whileloop');
    });

    it('supports if', () => {
      const ast = {
        name: {
          id: 14,
          str: 'identifier',
          source_string: 'foo',
          line: 2,
          col: 10,
        },
        body: {
          list: [
            {
              name: 'if',
              attributes: {
                expression: {
                  id: 14,
                  str: 'identifier',
                  source_string: 'integers',
                  line: 3,
                  col: 16,
                },
                body: {
                  list: [
                    {
                      name: 'Call',
                      attributes: {
                        task: {
                          id: 11,
                          str: 'fqn',
                          source_string: 'bar',
                          line: 3,
                          col: 6,
                        },
                        alias: null,
                        body: null,
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      };

      const context = {
        actionMap: {
          bar: {
          },
        },
      };
      const workflow = new WDLWorkflow(ast, context);
      expect(workflow.workflowStep.children.if_0.type).to.equal('if');
    });

    it('throws error if prohibited keys in some block are appeared', () => {
      const ast = {
        name: {
          id: 14,
          str: 'identifier',
          source_string: 'foo',
          line: 2,
          col: 10,
        },
        body: {
          list: [
            {
              name: 'if',
              attributes: {
                expression: {
                  id: 14,
                  str: 'identifier',
                  source_string: 'integers',
                  line: 3,
                  col: 16,
                },
                body: {
                  list: [
                    {
                      name: 'WorkflowOutputs',
                      attributes: {
                        task: {
                          id: 11,
                          str: 'fqn',
                          source_string: 'bar',
                          line: 3,
                          col: 6,
                        },
                        alias: null,
                        body: null,
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      };

      const context = {
        actionMap: {
          bar: {
          },
        },
      };

      expect(() => new WDLWorkflow(ast, context)).to.throws(WDLParserError);
    });

    it('supports workflow outputs with wildcard1', () => {
      const ast = {
        name: {
          id: 14,
          str: 'identifier',
          source_string: 'foo',
          line: 2,
          col: 10,
        },
        body: {
          list: [
            {
              name: 'Declaration',
              attributes: {
                type: {
                  id: 43,
                  str: 'type',
                  source_string: 'Int',
                  line: 3,
                  col: 3,
                },
                name: {
                  id: 14,
                  str: 'identifier',
                  source_string: 'a',
                  line: 3,
                  col: 7,
                },
                expression: {
                  id: 2,
                  str: 'integer',
                  source_string: '5',
                  line: 3,
                  col: 11,
                },
              },
            },
            {
              name: 'Declaration',
              attributes: {
                type: {
                  id: 43,
                  str: 'type',
                  source_string: 'Int',
                  line: 4,
                  col: 3,
                },
                name: {
                  id: 14,
                  str: 'identifier',
                  source_string: 'b',
                  line: 4,
                  col: 7,
                },
                expression: {
                  name: 'Add',
                  attributes: {
                    lhs: {
                      id: 2,
                      str: 'integer',
                      source_string: '5',
                      line: 4,
                      col: 11,
                    },
                    rhs: {
                      id: 14,
                      str: 'identifier',
                      source_string: 'a',
                      line: 4,
                      col: 15,
                    },
                  },
                },
              },
            },
            {
              name: 'Call',
              attributes: {
                task: {
                  id: 11,
                  str: 'fqn',
                  source_string: 'bar',
                  line: 5,
                  col: 8,
                },
                alias: null,
                body: null,
              },
            },
            {
              name: 'WorkflowOutputs',
              attributes: {
                outputs: {
                  list: [
                    {
                      name: 'WorkflowOutputWildcard',
                      attributes: {
                        fqn: {
                          id: 11,
                          str: 'fqn',
                          source_string: 'bar.out',
                          line: 7,
                          col: 5,
                        },
                        wildcard: null,
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      };

      const workflow = new WDLWorkflow(ast, {
        actionMap: {
          bar: {
          },
        },
      });

      expect(workflow.workflowStep.action.o).to.have.all.keys(['bar.out']);
    });


    it('supports workflow outputs with wildcard2', () => {
      const ast = {
        name: {
          id: 14,
          str: 'identifier',
          source_string: 'foo',
          line: 2,
          col: 10,
        },
        body: {
          list: [
            {
              name: 'Declaration',
              attributes: {
                type: {
                  id: 43,
                  str: 'type',
                  source_string: 'Int',
                  line: 3,
                  col: 3,
                },
                name: {
                  id: 14,
                  str: 'identifier',
                  source_string: 'a',
                  line: 3,
                  col: 7,
                },
                expression: {
                  id: 2,
                  str: 'integer',
                  source_string: '5',
                  line: 3,
                  col: 11,
                },
              },
            },
            {
              name: 'Declaration',
              attributes: {
                type: {
                  id: 43,
                  str: 'type',
                  source_string: 'Int',
                  line: 4,
                  col: 3,
                },
                name: {
                  id: 14,
                  str: 'identifier',
                  source_string: 'b',
                  line: 4,
                  col: 7,
                },
                expression: {
                  name: 'Add',
                  attributes: {
                    lhs: {
                      id: 2,
                      str: 'integer',
                      source_string: '5',
                      line: 4,
                      col: 11,
                    },
                    rhs: {
                      id: 14,
                      str: 'identifier',
                      source_string: 'a',
                      line: 4,
                      col: 15,
                    },
                  },
                },
              },
            },
            {
              name: 'Call',
              attributes: {
                task: {
                  id: 11,
                  str: 'fqn',
                  source_string: 'bar',
                  line: 5,
                  col: 8,
                },
                alias: null,
                body: null,
              },
            },
            {
              name: 'WorkflowOutputs',
              attributes: {
                outputs: {
                  list: [
                    {
                      name: 'WorkflowOutputWildcard',
                      attributes: {
                        fqn: {
                          id: 11,
                          str: 'fqn',
                          source_string: 'bar',
                          line: 7,
                          col: 6,
                        },
                        wildcard: {
                          id: 15,
                          str: 'asterisk',
                          source_string: '*',
                          line: 7,
                          col: 10,
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      };

      const workflow = new WDLWorkflow(ast, {
        actionMap: {
          bar: {
          },
        },
      });

      expect(workflow.workflowStep.action.o).to.have.all.keys(['bar.*']);
    });

    it('supports workflow outputs with expressions', () => {
      const ast = {
        name: {
          id: 14,
          str: 'identifier',
          source_string: 'foo',
          line: 2,
          col: 10,
        },
        body: {
          list: [
            {
              name: 'Declaration',
              attributes: {
                type: {
                  id: 43,
                  str: 'type',
                  source_string: 'Int',
                  line: 3,
                  col: 3,
                },
                name: {
                  id: 14,
                  str: 'identifier',
                  source_string: 'a',
                  line: 3,
                  col: 7,
                },
                expression: {
                  id: 2,
                  str: 'integer',
                  source_string: '5',
                  line: 3,
                  col: 11,
                },
              },
            },
            {
              name: 'Declaration',
              attributes: {
                type: {
                  id: 43,
                  str: 'type',
                  source_string: 'Int',
                  line: 4,
                  col: 3,
                },
                name: {
                  id: 14,
                  str: 'identifier',
                  source_string: 'b',
                  line: 4,
                  col: 7,
                },
                expression: {
                  name: 'Add',
                  attributes: {
                    lhs: {
                      id: 2,
                      str: 'integer',
                      source_string: '5',
                      line: 4,
                      col: 11,
                    },
                    rhs: {
                      id: 14,
                      str: 'identifier',
                      source_string: 'a',
                      line: 4,
                      col: 15,
                    },
                  },
                },
              },
            },
            {
              name: 'Call',
              attributes: {
                task: {
                  id: 11,
                  str: 'fqn',
                  source_string: 'bar',
                  line: 5,
                  col: 8,
                },
                alias: null,
                body: null,
              },
            },
            {
              name: 'WorkflowOutputs',
              attributes: {
                outputs: {
                  list: [
                    {
                      name: 'WorkflowOutputDeclaration',
                      attributes: {
                        type: {
                          id: 43,
                          str: 'type',
                          source_string: 'Int',
                          line: 7,
                          col: 6,
                        },
                        name: {
                          id: 14,
                          str: 'identifier',
                          source_string: 'wfOut',
                          line: 7,
                          col: 10,
                        },
                        expression: {
                          name: 'MemberAccess',
                          attributes: {
                            lhs: {
                              id: 14,
                              str: 'identifier',
                              source_string: 'bar',
                              line: 7,
                              col: 18,
                            },
                            rhs: {
                              id: 14,
                              str: 'identifier',
                              source_string: 'out',
                              line: 7,
                              col: 22,
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      };

      const workflow = new WDLWorkflow(ast, {
        actionMap: {
          bar: {
          },
        },
      });

      expect(workflow.workflowStep.action.o).to.have.all.keys(['wfOut']);
    });

    it('supports workflow to have a meta block', () => {
      const ast = {
        name: {
          id: 14,
          str: 'identifier',
          source_string: 'foo',
          line: 2,
          col: 17,
        },
        body: {
          list: [
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
                          col: 9,
                        },
                        value: {
                          id: 18,
                          str: 'string',
                          source_string: 'daniil.savchuk',
                          line: 4,
                          col: 18,
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      };
      expect(new WDLWorkflow(ast).workflowStep.action.data.meta).to.have.all.keys(['author']);
    });
  });
});
