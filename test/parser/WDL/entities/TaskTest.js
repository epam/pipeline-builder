import { expect } from 'chai';

import Task from '../../../../src/parser/WDL/entities/Task';

describe('parser/WDL/entities/Task', () => {

  describe('constructor', () => {

    it('requires an empty task', () => {
      const ast = {
        name: {
          id: 14,
          str: 'identifier',
          source_string: 'foo',
          line: 2,
          col: 6,
        },
        declarations: {
          list: [],
        },
        sections: {
          list: [],
        },
      };

      const task = new Task(ast);

      expect(task.name).to.equal('foo');
      expect(task.desc).to.contain.all.keys(['i', 'o', 'data']);
      expect(task.desc.i).to.be.empty;
      expect(task.desc.o).to.be.empty;
      expect(task.desc.data).to.be.empty;
    });

    it('requires several inputs and outputs', () => {
      const ast = {
        name: {
          id: 14,
          str: 'identifier',
          source_string: 'foo',
          line: 2,
          col: 6,
        },
        declarations: {
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
                  source_string: 'i1',
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
                  source_string: 'Int',
                  line: 4,
                  col: 1,
                },
                name: {
                  id: 14,
                  str: 'identifier',
                  source_string: 'i2',
                  line: 4,
                  col: 5,
                },
                expression: null,
              },
            },
          ],
        },
        sections: {
          list: [
            {
              name: 'Outputs',
              attributes: {
                attributes: {
                  list: [
                    {
                      name: 'Output',
                      attributes: {
                        type: {
                          id: 43,
                          str: 'type',
                          source_string: 'File',
                          line: 7,
                          col: 3,
                        },
                        name: {
                          id: 14,
                          str: 'identifier',
                          source_string: 'o1',
                          line: 7,
                          col: 8,
                        },
                        expression: {
                          id: 18,
                          str: 'string',
                          source_string: 'fizz',
                          line: 7,
                          col: 13,
                        },
                      },
                    },
                    {
                      name: 'Output',
                      attributes: {
                        type: {
                          id: 43,
                          str: 'type',
                          source_string: 'File',
                          line: 8,
                          col: 3,
                        },
                        name: {
                          id: 14,
                          str: 'identifier',
                          source_string: 'o2',
                          line: 8,
                          col: 8,
                        },
                        expression: {
                          id: 18,
                          str: 'string',
                          source_string: 'buzz',
                          line: 8,
                          col: 13,
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

      const task = new Task(ast);
      expect(task.desc.i).to.have.all.keys(['i1', 'i2']);
      expect(task.desc.o).to.have.all.keys(['o1', 'o2']);
      expect(task.desc.o.o1.default).to.equal('"fizz"');
      expect(task.desc.o.o2.default).to.equal('"buzz"');
    });

    it('requires a command', () => {
      const ast = {
        name: {
          id: 14,
          str: 'identifier',
          source_string: 'foo',
          line: 2,
          col: 6,
        },
        declarations: {
          list: [],
        },
        sections: {
          list: [],
        },
      };

      const task = new Task(ast);
      task.constructAction({
        command: 'fizzbuzz100',
      });

      expect(task.desc.data).to.contain.all.keys(['command']);
      expect(task.desc.data.command).to.equal('fizzbuzz100');
    });

    it('requires an empty command', () => {
      const ast = {
        name: {
          id: 14,
          str: 'identifier',
          source_string: 'foo',
          line: 2,
          col: 6,
        },
        declarations: {
          list: [],
        },
        sections: {
          list: [],
        },
      };

      const task = new Task(ast);
      task.constructAction();

      expect(task.desc.data).to.not.contain.all.keys(['command']);
    });

    it('requires a meta block', () => {
      const ast = {
        name: {
          id: 14,
          str: 'identifier',
          source_string: 'foo',
          line: 2,
          col: 6,
        },
        declarations: {
          list: [],
        },
        sections: {
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
                          col: 5,
                        },
                        value: {
                          id: 18,
                          str: 'string',
                          source_string: 'Joe Somebody',
                          line: 4,
                          col: 13,
                        },
                      },
                    },
                    {
                      name: 'RuntimeAttribute',
                      attributes: {
                        key: {
                          id: 14,
                          str: 'identifier',
                          source_string: 'foo',
                          line: 4,
                          col: 5,
                        },
                        value: {
                          id: 18,
                          str: 'string',
                          source_string: 'bar',
                          line: 4,
                          col: 13,
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

      const task = new Task(ast);

      expect(task.desc.data.meta).to.contain.all.keys(['author', 'foo']);
      expect(task.desc.data.meta.author).to.equal('"Joe Somebody"');
      expect(task.desc.data.meta.foo).to.equal('"bar"');
    });

    it('requires a default values at declarations', () => {
      const ast = {
        name: {
          id: 14,
          str: 'identifier',
          source_string: 'foo',
          line: 2,
          col: 6,
        },
        declarations: {
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
                  source_string: 'bar',
                  line: 3,
                  col: 7,
                },
                expression: {
                  name: 'Add',
                  attributes: {
                    lhs: {
                      id: 2,
                      str: 'integer',
                      source_string: 2,
                      line: 3,
                      col: 15,
                    },
                    rhs: {
                      id: 2,
                      str: 'integer',
                      source_string: 2,
                      line: 3,
                      col: 19,
                    },
                  },
                },
              },
            },
          ],
        },
        sections: {
          list: [],
        },
      };

      const task = new Task(ast);

      expect(task.desc.i).to.contain.all.keys(['bar']);
      expect(task.desc.i.bar.default).to.equal('2 + 2');
    });
  });

});
