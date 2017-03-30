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
      expect(workflow.desc).to.contain.all.keys(['i', 'o', 'data']);
      expect(workflow.desc.i).to.be.empty;
      expect(workflow.desc.o).to.be.empty;
      expect(workflow.desc.data).to.be.empty;
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
      expect(workflow.desc.i).to.have.all.keys(['a', 'b']);
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

    it('throws error when workflow uses scatter', () => {
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

      expect(() => new WDLWorkflow(ast)).to.throws(WDLParserError);
    });
  });
});
