import { expect } from 'chai';

import WDLWorkflow from '../../../../src/parser/WDL/entities/WDLWorkflow';
import WDLParserError from '../../../../src/parser/WDL/utils/utils';

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

    it('requires scatter', () => {
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

          }
        }
      };
      const workflow = new WDLWorkflow(ast, context);
      expect(workflow.workflowStep.children['scatter_0'].type).to.equal('scatter');
    });

    it('requires loop', () => {
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

          }
        }
      };
      const workflow = new WDLWorkflow(ast, context);
      expect(workflow.workflowStep.children['whileloop_0'].type).to.equal('whileloop');
    });

    it('requires if', () => {
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

          }
        }
      };
      const workflow = new WDLWorkflow(ast, context);
      expect(workflow.workflowStep.children['if_0'].type).to.equal('if');
    });
  });
});
