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

      const workflow = new WDLWorkflow(ast, {
        actionMap: {},
      });

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

      const workflow = new WDLWorkflow(ast, {
        actionMap: {},
      });
      expect(workflow.workflowStep.action.i).to.have.all.keys(['a', 'b']);
    });

    it('allows MemberAccess to access not only the call statements', () => {
      const ast = {
        name: { id: 39, str: 'identifier', source_string: 'ContEstMuTect', line: 10, col: 10 },
        body: {
          list: [{
            name: 'Declaration',
            attributes: {
              type: {
                name: 'Type',
                attributes: {
                  name: { id: 41, str: 'type', source_string: 'Array', line: 11, col: 3 },
                  subtype: { list: [{ id: 41, str: 'type', source_string: 'String', line: 11, col: 9 }] },
                },
              },
              name: { id: 39, str: 'identifier', source_string: 'bams', line: 11, col: 17 },
              expression: null,
            },
          }, {
            name: 'Declaration',
            attributes: {
              type: {
                name: 'Type',
                attributes: {
                  name: { id: 41, str: 'type', source_string: 'Array', line: 12, col: 3 },
                  subtype: { list: [{ id: 41, str: 'type', source_string: 'String', line: 12, col: 9 }] },
                },
              },
              name: { id: 39, str: 'identifier', source_string: 'bais', line: 12, col: 17 },
              expression: null,
            },
          }, {
            name: 'Declaration',
            attributes: {
              type: { id: 41, str: 'type', source_string: 'File', line: 14, col: 3 },
              name: { id: 39, str: 'identifier', source_string: 'inputMAFLite', line: 14, col: 8 },
              expression: { id: 27, str: 'string', source_string: 'test', line: 14, col: 23 },
            },
          }, {
            name: 'Declaration',
            attributes: {
              type: {
                name: 'Type',
                attributes: {
                  name: { id: 41, str: 'type', source_string: 'Pair', line: 15, col: 3 },
                  subtype: {
                    list: [{
                      id: 41,
                      str: 'type',
                      source_string: 'Int',
                      line: 15,
                      col: 8,
                    }, { id: 41, str: 'type', source_string: 'String', line: 15, col: 13 }],
                  },
                },
              },
              name: { id: 39, str: 'identifier', source_string: 'test', line: 15, col: 21 },
              expression: {
                name: 'TupleLiteral',
                attributes: {
                  values: {
                    list: [{
                      id: 34,
                      str: 'integer',
                      source_string: '1',
                      line: 15,
                      col: 29,
                    }, { id: 27, str: 'string', source_string: 'one', line: 15, col: 32 }],
                  },
                },
              },
            },
          }, {
            name: 'Declaration',
            attributes: {
              type: {
                name: 'Type',
                attributes: {
                  name: { id: 41, str: 'type', source_string: 'Pair', line: 16, col: 3 },
                  subtype: {
                    list: [{
                      id: 41,
                      str: 'type',
                      source_string: 'Int',
                      line: 16,
                      col: 8,
                    }, { id: 41, str: 'type', source_string: 'String', line: 16, col: 13 }],
                  },
                },
              },
              name: { id: 39, str: 'identifier', source_string: 'testTwo', line: 16, col: 21 },
              expression: {
                name: 'TupleLiteral',
                attributes: {
                  values: {
                    list: [{
                      id: 34,
                      str: 'integer',
                      source_string: '2',
                      line: 16,
                      col: 32,
                    }, { id: 27, str: 'string', source_string: 'two', line: 16, col: 35 }],
                  },
                },
              },
            },
          }, {
            name: 'Declaration',
            attributes: {
              type: {
                name: 'Type',
                attributes: {
                  name: { id: 41, str: 'type', source_string: 'Array', line: 17, col: 3 },
                  subtype: {
                    list: [{
                      name: 'Type',
                      attributes: {
                        name: { id: 41, str: 'type', source_string: 'Pair', line: 17, col: 9 },
                        subtype: {
                          list: [{
                            id: 41,
                            str: 'type',
                            source_string: 'String',
                            line: 17,
                            col: 14,
                          }, { id: 41, str: 'type', source_string: 'String', line: 17, col: 22 }],
                        },
                      },
                    }],
                  },
                },
              },
              name: { id: 39, str: 'identifier', source_string: 'bams_and_bais', line: 17, col: 31 },
              expression: {
                name: 'FunctionCall',
                attributes: {
                  name: { id: 39, str: 'identifier', source_string: 'zip', line: 17, col: 47 },
                  params: {
                    list: [{
                      id: 39,
                      str: 'identifier',
                      source_string: 'bams',
                      line: 17,
                      col: 51,
                    }, { id: 39, str: 'identifier', source_string: 'bais', line: 17, col: 57 }],
                  },
                },
              },
            },
          }, {
            name: 'Scatter',
            attributes: {
              item: {
                id: 39,
                str: 'identifier',
                source_string: 'bam_and_bai',
                line: 18,
                col: 12,
              },
              collection: { id: 39, str: 'identifier', source_string: 'bams_and_bais', line: 18, col: 27 },
              body: {
                list: [{
                  name: 'Call',
                  attributes: {
                    task: { id: 40, str: 'fqn', source_string: 'testTask', line: 19, col: 10 },
                    alias: null,
                    body: {
                      name: 'CallBody',
                      attributes: {
                        declarations: { list: [] },
                        io: {
                          list: [{
                            name: 'Inputs',
                            attributes: {
                              map: {
                                list: [{
                                  name: 'IOMapping',
                                  attributes: {
                                    key: {
                                      id: 39,
                                      str: 'identifier',
                                      source_string: 'bam',
                                      line: 21,
                                      col: 9,
                                    },
                                    value: {
                                      name: 'MemberAccess',
                                      attributes: {
                                        lhs: {
                                          id: 39,
                                          str: 'identifier',
                                          source_string: 'bam_and_bai',
                                          line: 21,
                                          col: 15,
                                        },
                                        rhs: {
                                          id: 39,
                                          str: 'identifier',
                                          source_string: 'left',
                                          line: 21,
                                          col: 27,
                                        },
                                      },
                                    },
                                  },
                                }, {
                                  name: 'IOMapping',
                                  attributes: {
                                    key: {
                                      id: 39,
                                      str: 'identifier',
                                      source_string: 'bai',
                                      line: 22,
                                      col: 9,
                                    },
                                    value: {
                                      name: 'MemberAccess',
                                      attributes: {
                                        lhs: {
                                          id: 39,
                                          str: 'identifier',
                                          source_string: 'bam_and_bai',
                                          line: 22,
                                          col: 15,
                                        },
                                        rhs: {
                                          id: 39,
                                          str: 'identifier',
                                          source_string: 'right',
                                          line: 22,
                                          col: 27,
                                        },
                                      },
                                    },
                                  },
                                }],
                              },
                            },
                          }],
                        },
                      },
                    },
                  },
                }],
              },
            },
          }, {
            name: 'WorkflowOutputs',
            attributes: {
              outputs: {
                list: [{
                  name: 'WorkflowOutputWildcard',
                  attributes: {
                    fqn: { id: 40, str: 'fqn', source_string: 'inputMAFLite', line: 28, col: 5 },
                    wildcard: null,
                  },
                }, {
                  name: 'WorkflowOutputWildcard',
                  attributes: {
                    fqn: { id: 40, str: 'fqn', source_string: 'test', line: 29, col: 5 },
                    wildcard: { id: 10, str: 'asterisk', source_string: '*', line: 29, col: 10 },
                  },
                }, {
                  name: 'WorkflowOutputWildcard',
                  attributes: {
                    fqn: {
                      id: 40,
                      str: 'fqn',
                      source_string: 'testTwo.right',
                      line: 30,
                      col: 5,
                    },
                    wildcard: null,
                  },
                }],
              },
            },
          }],
        },
      };
      const context = {
        genericTaskCommandMap: [],
        actionMap: {
          testTask: {
            _handlers: {},
            name: 'testTask',
            canHavePorts: true,
            i: { bam: { type: 'File', multi: false }, bai: { type: 'File', multi: false } },
            o: { out: { type: 'String', default: 'output', multi: false } },
            data: {},
          },
          ContEstMuTect: {
            name: 'ContEstMuTect',
            action: {
              _handlers: { changed: [[null, null]], 'port-rename': [[null, null]] },
              name: 'ContEstMuTect',
              canHavePorts: true,
              i: {},
              o: {},
              data: {},
            },
            parent: null,
            children: {},
            i: {
              bams: { type: 'Array[String]' },
              bais: { type: 'Array[String]' },
              inputMAFLite: { type: 'File', default: 'test' },
              test: { type: 'Pair[Int, String]', default: '(1, "one")' },
              testTwo: { type: 'Pair[Int, String]', default: '(2, "two")' },
              bams_and_bais: { type: 'Array[Pair[String, String]]', default: 'zip(bams, bais)' },
            },
            o: {
              inputMAFLite: { type: '', multi: false, default: 'inputMAFLite' },
              'test.*': { type: '', multi: true, default: 'test.*' },
              'testTwo.right': { type: '', multi: false, default: 'testTwo.right' },
            },
            type: 'workflow',
            ownDeclarations: {},
            actions: {
              ContEstMuTect: {
                _handlers: { changed: [[null, null]], 'port-rename': [[null, null]] },
                name: 'ContEstMuTect',
                canHavePorts: true,
                i: {},
                o: {},
                data: {},
              },
            },
            declarations: {},
            isSubWorkflow: false,
          },
        },
      };

      const workflow = new WDLWorkflow(ast, context);

      expect(workflow.workflowStep.o).to.have.all.keys(['inputMAFLite', 'test.*', 'testTwo.right']);
    });


    it('allows to override subWorkflow\'s declarations in call\'s inputs', () => {
      const ast = {
        name: { id: 39, str: 'identifier', source_string: 'wf1', line: 1, col: 10 },
        body: {
          list: [{
            name: 'Declaration',
            attributes: {
              type: { id: 41, str: 'type', source_string: 'String', line: 2, col: 3 },
              name: { id: 39, str: 'identifier', source_string: 'test', line: 2, col: 10 },
              expression: { id: 27, str: 'string', source_string: 'test', line: 2, col: 17 },
            },
          }, {
            name: 'Call',
            attributes: {
              task: { id: 40, str: 'fqn', source_string: 'wf2', line: 4, col: 8 },
              alias: null,
              body: {
                name: 'CallBody',
                attributes: {
                  declarations: { list: [] },
                  io: {
                    list: [{
                      name: 'Inputs',
                      attributes: {
                        map: {
                          list: [{
                            name: 'IOMapping',
                            attributes: {
                              key: {
                                id: 39,
                                str: 'identifier',
                                source_string: 'test',
                                line: 6,
                                col: 7,
                              },
                              value: { id: 39, str: 'identifier', source_string: 'test', line: 6, col: 14 },
                            },
                          }],
                        },
                      },
                    }],
                  },
                },
              },
            },
          }],
        },
      };
      const context = {
        genericTaskCommandMap: [],
        actionMap: {
          wf1: {
            name: 'wf1',
            action: {
              _handlers: { changed: [[null, null]], 'port-rename': [[null, null]] },
              name: 'wf1',
              canHavePorts: true,
              i: {},
              o: {},
              data: {},
            },
            parent: null,
            children: {},
            i: { test: { type: 'String', default: 'test' } },
            o: {},
            type: 'workflow',
            ownDeclarations: {},
            actions: {
              wf1: {
                _handlers: { changed: [[null, null]], 'port-rename': [[null, null]] },
                name: 'wf1',
                canHavePorts: true,
                i: {},
                o: {},
                data: {},
              },
            },
            declarations: {},
            isSubWorkflow: false,
          },
          wf2: {
            name: 'wf2',
            action: {
              _handlers: { changed: [[null, null]], 'port-rename': [[null, null]] },
              name: 'wf2',
              canHavePorts: true,
              i: {},
              o: {},
              data: {},
            },
            parent: null,
            children: {},
            i: { test: { type: 'String', default: 'test2' } },
            o: {},
            type: 'workflow',
            ownDeclarations: {},
            actions: {
              wf2: {
                _handlers: { changed: [[null, null]], 'port-rename': [[null, null]] },
                name: 'wf2',
                canHavePorts: true,
                i: {},
                o: {},
                data: {},
              },
            },
            declarations: {},
            ast: {
              name: 'Workflow',
              attributes: {
                name: { id: 39, str: 'identifier', source_string: 'wf2', line: 10, col: 10 },
                body: {
                  list: [{
                    name: 'Declaration',
                    attributes: {
                      type: { id: 41, str: 'type', source_string: 'String', line: 11, col: 3 },
                      name: { id: 39, str: 'identifier', source_string: 'test', line: 11, col: 10 },
                      expression: { id: 27, str: 'string', source_string: 'test2', line: 11, col: 17 },
                    },
                  }],
                },
              },
            },
            isSubWorkflow: false,
          },
        },
      };

      const workflow = new WDLWorkflow(ast, context);

      expect(workflow.workflowStep.children.wf2.i).to.have.all.keys(['test']);
      expect(workflow.workflowStep.children.wf2.ownDeclarations).to.be.empty;
    });

    it('resolves connections for call inputs with declaration with multiple inputs', () => {
      const ast = {
        name: {
          id: 39,
          str: 'identifier',
          source_string: 'foo',
          line: 1,
          col: 10,
        },
        body: {
          list: [{
            name: 'Declaration',
            attributes: {
              type: { id: 41, str: 'type', source_string: 'String', line: 2, col: 3 },
              name: { id: 39, str: 'identifier', source_string: 'bar', line: 2, col: 10 },
              expression: { id: 27, str: 'string', source_string: 'bar', line: 2, col: 16 },
            },
          }, {
            name: 'Declaration',
            attributes: {
              type: { id: 41, str: 'type', source_string: 'String', line: 3, col: 3 },
              name: { id: 39, str: 'identifier', source_string: 'baz', line: 3, col: 10 },
              expression: { id: 27, str: 'string', source_string: 'baz', line: 3, col: 16 },
            },
          }, {
            name: 'Call',
            attributes: {
              task: { id: 40, str: 'fqn', source_string: 'task1', line: 5, col: 8 },
              alias: null,
              body: {
                name: 'CallBody',
                attributes: {
                  declarations: { list: [] },
                  io: {
                    list: [{
                      name: 'Inputs',
                      attributes: {
                        map: {
                          list: [{
                            name: 'IOMapping',
                            attributes: {
                              key: {
                                id: 39,
                                str: 'identifier',
                                source_string: 'in',
                                line: 7,
                                col: 7,
                              },
                              value: {
                                name: 'FunctionCall',
                                attributes: {
                                  name: {
                                    id: 39,
                                    str: 'identifier',
                                    source_string: 'select_first',
                                    line: 7,
                                    col: 12,
                                  },
                                  params: {
                                    list: [{
                                      name: 'ArrayLiteral',
                                      attributes: {
                                        values: {
                                          list: [{
                                            id: 39,
                                            str: 'identifier',
                                            source_string: 'bar',
                                            line: 7,
                                            col: 26,
                                          }, {
                                            id: 39,
                                            str: 'identifier',
                                            source_string: 'baz',
                                            line: 7,
                                            col: 31,
                                          }],
                                        },
                                      },
                                    }],
                                  },
                                },
                              },
                            },
                          }],
                        },
                      },
                    }],
                  },
                },
              },
            },
          }],
        },
      };
      const context = {
        genericTaskCommandMap: [],
        actionMap: {
          task1: {
            _handlers: {},
            name: 'task1',
            canHavePorts: true,
            i: { in: { type: 'String', multi: false } },
            o: {},
            data: {},
          },
          foo: {
            name: 'foo',
            action: {
              _handlers: { changed: [[null, null]], 'port-rename': [[null, null]] },
              name: 'foo',
              canHavePorts: true,
              i: {},
              o: {},
              data: {},
            },
            parent: null,
            children: {},
            i: { bar: { type: 'String', default: 'bar' }, baz: { type: 'String', default: 'baz' } },
            o: {},
            type: 'workflow',
            ownDeclarations: {},
            actions: {
              foo: {
                _handlers: { changed: [[null, null]], 'port-rename': [[null, null]] },
                name: 'foo',
                canHavePorts: true,
                i: {},
                o: {},
                data: {},
              },
            },
            declarations: {},
            ast: {
              name: 'Workflow',
              attributes: {
                name: { id: 39, str: 'identifier', source_string: 'foo', line: 1, col: 10 },
                body: {
                  list: [{
                    name: 'Declaration',
                    attributes: {
                      type: { id: 41, str: 'type', source_string: 'String', line: 2, col: 3 },
                      name: { id: 39, str: 'identifier', source_string: 'bar', line: 2, col: 10 },
                      expression: { id: 27, str: 'string', source_string: 'bar', line: 2, col: 16 },
                    },
                  }, {
                    name: 'Declaration',
                    attributes: {
                      type: { id: 41, str: 'type', source_string: 'String', line: 3, col: 3 },
                      name: { id: 39, str: 'identifier', source_string: 'baz', line: 3, col: 10 },
                      expression: { id: 27, str: 'string', source_string: 'baz', line: 3, col: 16 },
                    },
                  }, {
                    name: 'Call',
                    attributes: {
                      task: { id: 40, str: 'fqn', source_string: 'task1', line: 5, col: 8 },
                      alias: null,
                      body: {
                        name: 'CallBody',
                        attributes: {
                          declarations: { list: [] },
                          io: {
                            list: [{
                              name: 'Inputs',
                              attributes: {
                                map: {
                                  list: [{
                                    name: 'IOMapping',
                                    attributes: {
                                      key: {
                                        id: 39,
                                        str: 'identifier',
                                        source_string: 'in',
                                        line: 7,
                                        col: 7,
                                      },
                                      value: {
                                        name: 'FunctionCall',
                                        attributes: {
                                          name: {
                                            id: 39,
                                            str: 'identifier',
                                            source_string: 'select_first',
                                            line: 7,
                                            col: 12,
                                          },
                                          params: {
                                            list: [{
                                              name: 'ArrayLiteral',
                                              attributes: {
                                                values: {
                                                  list: [{
                                                    id: 39,
                                                    str: 'identifier',
                                                    source_string: 'bar',
                                                    line: 7,
                                                    col: 26,
                                                  }, {
                                                    id: 39,
                                                    str: 'identifier',
                                                    source_string: 'baz',
                                                    line: 7,
                                                    col: 31,
                                                  }],
                                                },
                                              },
                                            }],
                                          },
                                        },
                                      },
                                    },
                                  }],
                                },
                              },
                            }],
                          },
                        },
                      },
                    },
                  }],
                },
              },
            },
            isSubWorkflow: false,
          },
        },
      };
      const workflow = new WDLWorkflow(ast, context);

      expect(workflow.workflowStep.children.task1.i.in.inputs[0].from.name).to.equal('bar');
      expect(workflow.workflowStep.children.task1.i.in.inputs[1].from.name).to.equal('baz');
    });

    it('expect root workflow to have all declarations', () => {
      /* eslint-disable no-template-curly-in-string */
      const ast = {
        name: { id: 39, str: 'identifier', source_string: 'foo', line: 1, col: 10 },
        body: {
          list: [{
            name: 'Declaration',
            attributes: {
              type: { id: 41, str: 'type', source_string: 'String', line: 2, col: 3 },
              name: { id: 39, str: 'identifier', source_string: 'bar', line: 2, col: 10 },
              expression: { id: 27, str: 'string', source_string: 'bar', line: 2, col: 16 },
            },
          }, {
            name: 'Declaration',
            attributes: {
              type: { id: 41, str: 'type', source_string: 'String', line: 3, col: 3 },
              name: { id: 39, str: 'identifier', source_string: 'baz', line: 3, col: 10 },
              expression: { id: 27, str: 'string', source_string: 'baz', line: 3, col: 16 },
            },
          }, {
            name: 'Declaration',
            attributes: {
              type: { id: 41, str: 'type', source_string: 'String', line: 4, col: 3 },
              name: { id: 39, str: 'identifier', source_string: 'newBar', line: 4, col: 10 },
              expression: {
                name: 'Add',
                attributes: {
                  lhs: {
                    name: 'Add',
                    attributes: {
                      lhs: { id: 39, str: 'identifier', source_string: 'bar', line: 4, col: 19 },
                      rhs: { id: 39, str: 'identifier', source_string: 'bar', line: 4, col: 25 },
                    },
                  },
                  rhs: { id: 39, str: 'identifier', source_string: 'baz', line: 4, col: 31 },
                },
              },
            },
          }, {
            name: 'Declaration',
            attributes: {
              type: { id: 41, str: 'type', source_string: 'String', line: 5, col: 3 },
              name: { id: 39, str: 'identifier', source_string: 'newBaz', line: 5, col: 10 },
              expression: { id: 39, str: 'identifier', source_string: 'baz', line: 5, col: 19 },
            },
          }, {
            name: 'Declaration',
            attributes: {
              type: {
                name: 'Type',
                attributes: {
                  name: { id: 41, str: 'type', source_string: 'Array', line: 6, col: 3 },
                  subtype: { list: [{ id: 41, str: 'type', source_string: 'String', line: 6, col: 9 }] },
                },
              },
              name: { id: 39, str: 'identifier', source_string: 'coll', line: 6, col: 17 },
              expression: {
                name: 'ArrayLiteral',
                attributes: {
                  values: {
                    list: [{
                      id: 39,
                      str: 'identifier',
                      source_string: 'bar',
                      line: 6,
                      col: 25,
                    }, {
                      id: 39,
                      str: 'identifier',
                      source_string: 'baz',
                      line: 6,
                      col: 30,
                    }, {
                      id: 39,
                      str: 'identifier',
                      source_string: 'newBaz',
                      line: 6,
                      col: 35,
                    }, {
                      id: 39,
                      str: 'identifier',
                      source_string: 'newBar',
                      line: 6,
                      col: 43,
                    }],
                  },
                },
              },
            },
          }, {
            name: 'Scatter',
            attributes: {
              item: { id: 39, str: 'identifier', source_string: 'item', line: 8, col: 12 },
              collection: { id: 39, str: 'identifier', source_string: 'coll', line: 8, col: 20 },
              body: {
                list: [{
                  name: 'Call',
                  attributes: {
                    task: { id: 40, str: 'fqn', source_string: 'task1', line: 9, col: 10 },
                    alias: null,
                    body: {
                      name: 'CallBody',
                      attributes: {
                        declarations: { list: [] },
                        io: {
                          list: [{
                            name: 'Inputs',
                            attributes: {
                              map: {
                                list: [{
                                  name: 'IOMapping',
                                  attributes: {
                                    key: {
                                      id: 39,
                                      str: 'identifier',
                                      source_string: 'in',
                                      line: 11,
                                      col: 9,
                                    },
                                    value: {
                                      name: 'TernaryIf',
                                      attributes: {
                                        cond: {
                                          name: 'FunctionCall',
                                          attributes: {
                                            name: {
                                              id: 39,
                                              str: 'identifier',
                                              source_string: 'defined',
                                              line: 11,
                                              col: 17,
                                            },
                                            params: {
                                              list: [{
                                                id: 39,
                                                str: 'identifier',
                                                source_string: 'item',
                                                line: 11,
                                                col: 25,
                                              }],
                                            },
                                          },
                                        },
                                        iftrue: {
                                          id: 27,
                                          str: 'string',
                                          source_string: '${item} 1',
                                          line: 11,
                                          col: 36,
                                        },
                                        iffalse: {
                                          id: 27,
                                          str: 'string',
                                          source_string: 'string',
                                          line: 11,
                                          col: 53,
                                        },
                                      },
                                    },
                                  },
                                }],
                              },
                            },
                          }],
                        },
                      },
                    },
                  },
                }, {
                  name: 'Declaration',
                  attributes: {
                    type: { id: 41, str: 'type', source_string: 'String', line: 13, col: 5 },
                    name: { id: 39, str: 'identifier', source_string: 'res', line: 13, col: 12 },
                    expression: {
                      name: 'FunctionCall',
                      attributes: {
                        name: {
                          id: 39,
                          str: 'identifier',
                          source_string: 'select_first',
                          line: 13,
                          col: 18,
                        },
                        params: {
                          list: [{
                            name: 'ArrayLiteral',
                            attributes: {
                              values: {
                                list: [{
                                  name: 'MemberAccess',
                                  attributes: {
                                    lhs: {
                                      id: 39,
                                      str: 'identifier',
                                      source_string: 'task1',
                                      line: 13,
                                      col: 32,
                                    },
                                    rhs: {
                                      id: 39,
                                      str: 'identifier',
                                      source_string: 'out',
                                      line: 13,
                                      col: 38,
                                    },
                                  },
                                }, { id: 27, str: 'string', source_string: 'test', line: 13, col: 43 }],
                              },
                            },
                          }],
                        },
                      },
                    },
                  },
                }],
              },
            },
          }, {
            name: 'Call',
            attributes: {
              task: { id: 40, str: 'fqn', source_string: 'task2', line: 16, col: 8 },
              alias: null,
              body: {
                name: 'CallBody',
                attributes: {
                  declarations: { list: [] },
                  io: {
                    list: [{
                      name: 'Inputs',
                      attributes: {
                        map: {
                          list: [{
                            name: 'IOMapping',
                            attributes: {
                              key: {
                                id: 39,
                                str: 'identifier',
                                source_string: 'in',
                                line: 18,
                                col: 7,
                              },
                              value: { id: 39, str: 'identifier', source_string: 'res', line: 18, col: 12 },
                            },
                          }],
                        },
                      },
                    }],
                  },
                },
              },
            },
          }],
        },
      };
      const context = {
        genericTaskCommandMap: [],
        actionMap: {
          task1: {
            _handlers: {},
            name: 'task1',
            canHavePorts: true,
            i: { in: { type: 'String', multi: false } },
            o: { out: { type: 'String', default: 'output', multi: false } },
            data: {},
          },
          task2: {
            _handlers: {},
            name: 'task2',
            canHavePorts: true,
            i: { in: { type: 'Array[String]', multi: false } },
            o: {},
            data: {},
          },
          foo: {
            name: 'foo',
            action: {
              _handlers: { changed: [[null, null]], 'port-rename': [[null, null]] },
              name: 'foo',
              canHavePorts: true,
              i: {},
              o: {},
              data: {},
            },
            parent: null,
            children: {},
            i: {
              bar: { type: 'String', default: 'bar' },
              baz: { type: 'String', default: 'baz' },
              newBar: { type: 'String', default: 'bar + bar + baz' },
              newBaz: { type: 'String', default: 'baz' },
              coll: { type: 'Array[String]', default: '[bar, baz, newBaz, newBar]' },
            },
            o: {},
            type: 'workflow',
            ownDeclarations: {},
            actions: {
              foo: {
                _handlers: { changed: [[null, null]], 'port-rename': [[null, null]] },
                name: 'foo',
                canHavePorts: true,
                i: {},
                o: {},
                data: {},
              },
            },
            declarations: {},
            ast: {
              name: 'Workflow',
              attributes: {
                name: { id: 39, str: 'identifier', source_string: 'foo', line: 1, col: 10 },
                body: {
                  list: [{
                    name: 'Declaration',
                    attributes: {
                      type: { id: 41, str: 'type', source_string: 'String', line: 2, col: 3 },
                      name: { id: 39, str: 'identifier', source_string: 'bar', line: 2, col: 10 },
                      expression: { id: 27, str: 'string', source_string: 'bar', line: 2, col: 16 },
                    },
                  }, {
                    name: 'Declaration',
                    attributes: {
                      type: { id: 41, str: 'type', source_string: 'String', line: 3, col: 3 },
                      name: { id: 39, str: 'identifier', source_string: 'baz', line: 3, col: 10 },
                      expression: { id: 27, str: 'string', source_string: 'baz', line: 3, col: 16 },
                    },
                  }, {
                    name: 'Declaration',
                    attributes: {
                      type: { id: 41, str: 'type', source_string: 'String', line: 4, col: 3 },
                      name: { id: 39, str: 'identifier', source_string: 'newBar', line: 4, col: 10 },
                      expression: {
                        name: 'Add',
                        attributes: {
                          lhs: {
                            name: 'Add',
                            attributes: {
                              lhs: {
                                id: 39,
                                str: 'identifier',
                                source_string: 'bar',
                                line: 4,
                                col: 19,
                              },
                              rhs: { id: 39, str: 'identifier', source_string: 'bar', line: 4, col: 25 },
                            },
                          },
                          rhs: { id: 39, str: 'identifier', source_string: 'baz', line: 4, col: 31 },
                        },
                      },
                    },
                  }, {
                    name: 'Declaration',
                    attributes: {
                      type: { id: 41, str: 'type', source_string: 'String', line: 5, col: 3 },
                      name: { id: 39, str: 'identifier', source_string: 'newBaz', line: 5, col: 10 },
                      expression: { id: 39, str: 'identifier', source_string: 'baz', line: 5, col: 19 },
                    },
                  }, {
                    name: 'Declaration',
                    attributes: {
                      type: {
                        name: 'Type',
                        attributes: {
                          name: { id: 41, str: 'type', source_string: 'Array', line: 6, col: 3 },
                          subtype: {
                            list: [{
                              id: 41,
                              str: 'type',
                              source_string: 'String',
                              line: 6,
                              col: 9,
                            }],
                          },
                        },
                      },
                      name: { id: 39, str: 'identifier', source_string: 'coll', line: 6, col: 17 },
                      expression: {
                        name: 'ArrayLiteral',
                        attributes: {
                          values: {
                            list: [
                              { id: 39, str: 'identifier', source_string: 'bar', line: 6, col: 25 },
                              { id: 39, str: 'identifier', source_string: 'baz', line: 6, col: 30 },
                              { id: 39, str: 'identifier', source_string: 'newBaz', line: 6, col: 35 },
                              { id: 39, str: 'identifier', source_string: 'newBar', line: 6, col: 43 },
                            ],
                          },
                        },
                      },
                    },
                  }, {
                    name: 'Scatter',
                    attributes: {
                      item: {
                        id: 39,
                        str: 'identifier',
                        source_string: 'item',
                        line: 8,
                        col: 12,
                      },
                      collection: { id: 39, str: 'identifier', source_string: 'coll', line: 8, col: 20 },
                      body: {
                        list: [{
                          name: 'Call',
                          attributes: {
                            task: {
                              id: 40,
                              str: 'fqn',
                              source_string: 'task1',
                              line: 9,
                              col: 10,
                            },
                            alias: null,
                            body: {
                              name: 'CallBody',
                              attributes: {
                                declarations: { list: [] },
                                io: {
                                  list: [{
                                    name: 'Inputs',
                                    attributes: {
                                      map: {
                                        list: [{
                                          name: 'IOMapping',
                                          attributes: {
                                            key: {
                                              id: 39,
                                              str: 'identifier',
                                              source_string: 'in',
                                              line: 11,
                                              col: 9,
                                            },
                                            value: {
                                              name: 'TernaryIf',
                                              attributes: {
                                                cond: {
                                                  name: 'FunctionCall',
                                                  attributes: {
                                                    name: {
                                                      id: 39,
                                                      str: 'identifier',
                                                      source_string: 'defined',
                                                      line: 11,
                                                      col: 17,
                                                    },
                                                    params: {
                                                      list: [{
                                                        id: 39,
                                                        str: 'identifier',
                                                        source_string: 'item',
                                                        line: 11,
                                                        col: 25,
                                                      }],
                                                    },
                                                  },
                                                },
                                                iftrue: {
                                                  id: 27,
                                                  str: 'string',
                                                  source_string: '${item} 1',
                                                  line: 11,
                                                  col: 36,
                                                },
                                                iffalse: {
                                                  id: 27,
                                                  str: 'string',
                                                  source_string: 'string',
                                                  line: 11,
                                                  col: 53,
                                                },
                                              },
                                            },
                                          },
                                        }],
                                      },
                                    },
                                  }],
                                },
                              },
                            },
                          },
                        }, {
                          name: 'Declaration',
                          attributes: {
                            type: {
                              id: 41,
                              str: 'type',
                              source_string: 'String',
                              line: 13,
                              col: 5,
                            },
                            name: { id: 39, str: 'identifier', source_string: 'res', line: 13, col: 12 },
                            expression: {
                              name: 'FunctionCall',
                              attributes: {
                                name: {
                                  id: 39,
                                  str: 'identifier',
                                  source_string: 'select_first',
                                  line: 13,
                                  col: 18,
                                },
                                params: {
                                  list: [{
                                    name: 'ArrayLiteral',
                                    attributes: {
                                      values: {
                                        list: [{
                                          name: 'MemberAccess',
                                          attributes: {
                                            lhs: {
                                              id: 39,
                                              str: 'identifier',
                                              source_string: 'task1',
                                              line: 13,
                                              col: 32,
                                            },
                                            rhs: {
                                              id: 39,
                                              str: 'identifier',
                                              source_string: 'out',
                                              line: 13,
                                              col: 38,
                                            },
                                          },
                                        }, { id: 27, str: 'string', source_string: 'test', line: 13, col: 43 }],
                                      },
                                    },
                                  }],
                                },
                              },
                            },
                          },
                        }],
                      },
                    },
                  }, {
                    name: 'Call',
                    attributes: {
                      task: { id: 40, str: 'fqn', source_string: 'task2', line: 16, col: 8 },
                      alias: null,
                      body: {
                        name: 'CallBody',
                        attributes: {
                          declarations: { list: [] },
                          io: {
                            list: [{
                              name: 'Inputs',
                              attributes: {
                                map: {
                                  list: [{
                                    name: 'IOMapping',
                                    attributes: {
                                      key: {
                                        id: 39,
                                        str: 'identifier',
                                        source_string: 'in',
                                        line: 18,
                                        col: 7,
                                      },
                                      value: {
                                        id: 39,
                                        str: 'identifier',
                                        source_string: 'res',
                                        line: 18,
                                        col: 12,
                                      },
                                    },
                                  }],
                                },
                              },
                            }],
                          },
                        },
                      },
                    },
                  }],
                },
              },
            },
            isSubWorkflow: false,
          },
        },
      };
      /* eslint-enable no-template-curly-in-string */
      const workflow = new WDLWorkflow(ast, context);

      expect(workflow.workflowStep.declarations).to.have.all.keys(['bar', 'baz', 'newBar', 'newBaz', 'coll', 'res']);
    });

    it('throws an error when some declaration refers to undeclared variable identifier in a function call', () => {
      const ast = {
        name: { id: 39, str: 'identifier', source_string: 'foo', line: 1, col: 10 },
        body: {
          list: [{
            name: 'Declaration',
            attributes: {
              type: { id: 41, str: 'type', source_string: 'Float', line: 2, col: 3 },
              name: { id: 39, str: 'identifier', source_string: 'bar', line: 2, col: 9 },
              expression: { id: 17, str: 'float', source_string: '9.54', line: 2, col: 15 },
            },
          }, {
            name: 'Declaration',
            attributes: {
              type: { id: 41, str: 'type', source_string: 'Int', line: 3, col: 3 },
              name: { id: 39, str: 'identifier', source_string: 'baz', line: 3, col: 7 },
              expression: {
                name: 'FunctionCall',
                attributes: {
                  name: { id: 39, str: 'identifier', source_string: 'ceil', line: 3, col: 13 },
                  params: {
                    list: [{
                      id: 39,
                      str: 'identifier',
                      source_string: 'undeclaredBar',
                      line: 3,
                      col: 18,
                    }],
                  },
                },
              },
            },
          }],
        },
      };
      const context = {
        genericTaskCommandMap: [],
        actionMap: {
          foo: {
            name: 'foo',
            action: {
              _handlers: { changed: [[null, null]], 'port-rename': [[null, null]] },
              name: 'foo',
              canHavePorts: true,
              i: {},
              o: {},
              data: {},
            },
            parent: null,
            children: {},
            i: {
              bar: { type: 'Float', default: '9.54' },
              baz: { type: 'Int', default: 'ceil(undeclaredBar)' },
            },
            o: {},
            type: 'workflow',
            ownDeclarations: {},
            actions: {
              foo: {
                _handlers: { changed: [[null, null]], 'port-rename': [[null, null]] },
                name: 'foo',
                canHavePorts: true,
                i: {},
                o: {},
                data: {},
              },
            },
            declarations: {},
            ast: {
              name: 'Workflow',
              attributes: {
                name: { id: 39, str: 'identifier', source_string: 'foo', line: 1, col: 10 },
                body: {
                  list: [{
                    name: 'Declaration',
                    attributes: {
                      type: { id: 41, str: 'type', source_string: 'Float', line: 2, col: 3 },
                      name: { id: 39, str: 'identifier', source_string: 'bar', line: 2, col: 9 },
                      expression: { id: 17, str: 'float', source_string: '9.54', line: 2, col: 15 },
                    },
                  }, {
                    name: 'Declaration',
                    attributes: {
                      type: { id: 41, str: 'type', source_string: 'Int', line: 3, col: 3 },
                      name: { id: 39, str: 'identifier', source_string: 'baz', line: 3, col: 7 },
                      expression: {
                        name: 'FunctionCall',
                        attributes: {
                          name: {
                            id: 39,
                            str: 'identifier',
                            source_string: 'ceil',
                            line: 3,
                            col: 13,
                          },
                          params: {
                            list: [{
                              id: 39,
                              str: 'identifier',
                              source_string: 'undeclaredBar',
                              line: 3,
                              col: 18,
                            }],
                          },
                        },
                      },
                    },
                  }],
                },
              },
            },
            isSubWorkflow: false,
          },
        },
      };

      expect(() => new WDLWorkflow(ast, context)).to.throws(WDLParserError);
    });

    it('throws an error when some declaration refers to undeclared call in a function call', () => {
      const ast = {
        name: { id: 39, str: 'identifier', source_string: 'foo', line: 1, col: 10 },
        body: {
          list: [{
            name: 'Declaration',
            attributes: {
              type: { id: 41, str: 'type', source_string: 'Float', line: 2, col: 3 },
              name: { id: 39, str: 'identifier', source_string: 'bar', line: 2, col: 9 },
              expression: { id: 17, str: 'float', source_string: '9.54', line: 2, col: 15 },
            },
          }, {
            name: 'Declaration',
            attributes: {
              type: { id: 41, str: 'type', source_string: 'Int', line: 3, col: 3 },
              name: { id: 39, str: 'identifier', source_string: 'baz', line: 3, col: 7 },
              expression: {
                name: 'FunctionCall',
                attributes: {
                  name: { id: 39, str: 'identifier', source_string: 'ceil', line: 3, col: 13 },
                  params: {
                    list: [{
                      name: 'MemberAccess',
                      attributes: {
                        lhs: {
                          id: 39,
                          str: 'identifier',
                          source_string: 'undeclaredCall',
                          line: 3,
                          col: 18,
                        },
                        rhs: { id: 39, str: 'identifier', source_string: 'undeclaredBar', line: 3, col: 33 },
                      },
                    }],
                  },
                },
              },
            },
          }],
        },
      };
      const context = {
        genericTaskCommandMap: [],
        actionMap: {
          foo: {
            name: 'foo',
            action: {
              _handlers: { changed: [[null, null]], 'port-rename': [[null, null]] },
              name: 'foo',
              canHavePorts: true,
              i: {},
              o: {},
              data: {},
            },
            parent: null,
            children: {},
            i: {
              bar: { type: 'Float', default: '9.54' },
              baz: { type: 'Int', default: 'ceil(undeclaredCall.undeclaredBar)' },
            },
            o: {},
            type: 'workflow',
            ownDeclarations: {},
            actions: {
              foo: {
                _handlers: { changed: [[null, null]], 'port-rename': [[null, null]] },
                name: 'foo',
                canHavePorts: true,
                i: {},
                o: {},
                data: {},
              },
            },
            declarations: {},
            ast: {
              name: 'Workflow',
              attributes: {
                name: { id: 39, str: 'identifier', source_string: 'foo', line: 1, col: 10 },
                body: {
                  list: [{
                    name: 'Declaration',
                    attributes: {
                      type: { id: 41, str: 'type', source_string: 'Float', line: 2, col: 3 },
                      name: { id: 39, str: 'identifier', source_string: 'bar', line: 2, col: 9 },
                      expression: { id: 17, str: 'float', source_string: '9.54', line: 2, col: 15 },
                    },
                  }, {
                    name: 'Declaration',
                    attributes: {
                      type: { id: 41, str: 'type', source_string: 'Int', line: 3, col: 3 },
                      name: { id: 39, str: 'identifier', source_string: 'baz', line: 3, col: 7 },
                      expression: {
                        name: 'FunctionCall',
                        attributes: {
                          name: {
                            id: 39,
                            str: 'identifier',
                            source_string: 'ceil',
                            line: 3,
                            col: 13,
                          },
                          params: {
                            list: [{
                              name: 'MemberAccess',
                              attributes: {
                                lhs: {
                                  id: 39,
                                  str: 'identifier',
                                  source_string: 'undeclaredCall',
                                  line: 3,
                                  col: 18,
                                },
                                rhs: {
                                  id: 39,
                                  str: 'identifier',
                                  source_string: 'undeclaredBar',
                                  line: 3,
                                  col: 33,
                                },
                              },
                            }],
                          },
                        },
                      },
                    },
                  }],
                },
              },
            },
            isSubWorkflow: false,
          },
        },
      };

      expect(() => new WDLWorkflow(ast, context)).to.throws(WDLParserError);
    });

    it('throws an error when some declaration refers to undeclared member access variable in a function call', () => {
      const ast = {
        name: { id: 39, str: 'identifier', source_string: 'foo', line: 1, col: 10 },
        body: {
          list: [{
            name: 'Declaration',
            attributes: {
              type: { id: 41, str: 'type', source_string: 'Float', line: 2, col: 3 },
              name: { id: 39, str: 'identifier', source_string: 'bar', line: 2, col: 9 },
              expression: { id: 17, str: 'float', source_string: '9.54', line: 2, col: 15 },
            },
          }, {
            name: 'Call',
            attributes: {
              task: { id: 40, str: 'fqn', source_string: 'task1', line: 3, col: 8 },
              alias: null,
              body: {
                name: 'CallBody',
                attributes: {
                  declarations: { list: [] },
                  io: {
                    list: [{
                      name: 'Inputs',
                      attributes: {
                        map: {
                          list: [{
                            name: 'IOMapping',
                            attributes: {
                              key: {
                                id: 39,
                                str: 'identifier',
                                source_string: 'in',
                                line: 5,
                                col: 7,
                              },
                              value: { id: 39, str: 'identifier', source_string: 'bar', line: 5, col: 12 },
                            },
                          }],
                        },
                      },
                    }],
                  },
                },
              },
            },
          }, {
            name: 'Declaration',
            attributes: {
              type: { id: 41, str: 'type', source_string: 'Int', line: 7, col: 3 },
              name: { id: 39, str: 'identifier', source_string: 'baz', line: 7, col: 7 },
              expression: {
                name: 'FunctionCall',
                attributes: {
                  name: { id: 39, str: 'identifier', source_string: 'ceil', line: 7, col: 13 },
                  params: {
                    list: [{
                      name: 'MemberAccess',
                      attributes: {
                        lhs: {
                          id: 39,
                          str: 'identifier',
                          source_string: 'task1',
                          line: 7,
                          col: 18,
                        },
                        rhs: {
                          id: 39,
                          str: 'identifier',
                          source_string: 'undeclaredOutput',
                          line: 7,
                          col: 24,
                        },
                      },
                    }],
                  },
                },
              },
            },
          }],
        },
      };
      const context = {
        genericTaskCommandMap: [],
        actionMap: {
          task1: {
            _handlers: {},
            name: 'task1',
            canHavePorts: true,
            i: { in: { type: 'Float', multi: false } },
            o: {},
            data: {},
          },
          foo: {
            name: 'foo',
            action: {
              _handlers: { changed: [[null, null]], 'port-rename': [[null, null]] },
              name: 'foo',
              canHavePorts: true,
              i: {},
              o: {},
              data: {},
            },
            parent: null,
            children: {},
            i: {
              bar: { type: 'Float', default: '9.54' },
              baz: { type: 'Int', default: 'ceil(task1.undeclaredOutput)' },
            },
            o: {},
            type: 'workflow',
            ownDeclarations: {},
            actions: {
              foo: {
                _handlers: { changed: [[null, null]], 'port-rename': [[null, null]] },
                name: 'foo',
                canHavePorts: true,
                i: {},
                o: {},
                data: {},
              },
            },
            declarations: {},
            ast: {
              name: 'Workflow',
              attributes: {
                name: { id: 39, str: 'identifier', source_string: 'foo', line: 1, col: 10 },
                body: {
                  list: [{
                    name: 'Declaration',
                    attributes: {
                      type: { id: 41, str: 'type', source_string: 'Float', line: 2, col: 3 },
                      name: { id: 39, str: 'identifier', source_string: 'bar', line: 2, col: 9 },
                      expression: { id: 17, str: 'float', source_string: '9.54', line: 2, col: 15 },
                    },
                  }, {
                    name: 'Call',
                    attributes: {
                      task: { id: 40, str: 'fqn', source_string: 'task1', line: 3, col: 8 },
                      alias: null,
                      body: {
                        name: 'CallBody',
                        attributes: {
                          declarations: { list: [] },
                          io: {
                            list: [{
                              name: 'Inputs',
                              attributes: {
                                map: {
                                  list: [{
                                    name: 'IOMapping',
                                    attributes: {
                                      key: {
                                        id: 39,
                                        str: 'identifier',
                                        source_string: 'in',
                                        line: 5,
                                        col: 7,
                                      },
                                      value: {
                                        id: 39,
                                        str: 'identifier',
                                        source_string: 'bar',
                                        line: 5,
                                        col: 12,
                                      },
                                    },
                                  }],
                                },
                              },
                            }],
                          },
                        },
                      },
                    },
                  }, {
                    name: 'Declaration',
                    attributes: {
                      type: { id: 41, str: 'type', source_string: 'Int', line: 7, col: 3 },
                      name: { id: 39, str: 'identifier', source_string: 'baz', line: 7, col: 7 },
                      expression: {
                        name: 'FunctionCall',
                        attributes: {
                          name: {
                            id: 39,
                            str: 'identifier',
                            source_string: 'ceil',
                            line: 7,
                            col: 13,
                          },
                          params: {
                            list: [{
                              name: 'MemberAccess',
                              attributes: {
                                lhs: {
                                  id: 39,
                                  str: 'identifier',
                                  source_string: 'task1',
                                  line: 7,
                                  col: 18,
                                },
                                rhs: {
                                  id: 39,
                                  str: 'identifier',
                                  source_string: 'undeclaredOutput',
                                  line: 7,
                                  col: 24,
                                },
                              },
                            }],
                          },
                        },
                      },
                    },
                  }],
                },
              },
            },
            isSubWorkflow: false,
          },
        },
      };

      expect(() => new WDLWorkflow(ast, context)).to.throws(WDLParserError);
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

    it('throws error when trying to assign undeclared call variable', () => {
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
                                      source_string: 'a',
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
      };
      expect(() => new WDLWorkflow(ast, {
        actionMap: {
          bar: {
            i: {},
            o: {},
          },
        },
      })).to.throws(WDLParserError);
    });

    it('throws error when trying attempt to undeclared workflow level variable', () => {
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
                                      source_string: 'a',
                                      line: 8,
                                      col: 9,
                                    },
                                    value: {
                                      id: 14,
                                      str: 'identifier',
                                      source_string: 'input',
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
      };
      expect(() => new WDLWorkflow(ast, {
        actionMap: {
          bar: {
            i: {
              a: new Port('a'),
            },
            o: {},
          },
        },
      })).to.throws(WDLParserError);
    });

    it('throws error when trying attempt to undeclared other call output', () => {
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
            {
              name: 'Call',
              attributes: {
                task: {
                  id: 11,
                  str: 'fqn',
                  source_string: 'baz',
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
                                      source_string: 'a',
                                      line: 8,
                                      col: 9,
                                    },
                                    value: {
                                      id: 14,
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
                  },
                },
              },
            },
          ],
        },
      };
      expect(() => new WDLWorkflow(ast, {
        actionMap: {
          bar: {
            i: {},
            o: {},
          },
          baz: {
            i: {
              a: new Port('a'),
            },
            o: {},
          },
        },
      })).to.throws(WDLParserError);
    });

    it('throws error when trying attempt to undeclared call', () => {
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
            {
              name: 'Call',
              attributes: {
                task: {
                  id: 11,
                  str: 'fqn',
                  source_string: 'baz',
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
                                      source_string: 'a',
                                      line: 8,
                                      col: 9,
                                    },
                                    value: {
                                      id: 14,
                                      name: 'MemberAccess',
                                      attributes: {
                                        lhs: {
                                          id: 14,
                                          str: 'identifier',
                                          source_string: 'HELLO_ERROR_HERE',
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
                  },
                },
              },
            },
          ],
        },
      };

      expect(() => new WDLWorkflow(ast, {
        actionMap: {
          bar: {
            i: {},
            o: {},
          },
          baz: {
            i: {
              a: new Port('a'),
            },
            o: {},
          },
        },
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
      expect(workflow.workflowStep.children.foo_scatter_0.type).to.equal('scatter');
    });

    it('supports group level name resolving', () => {
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
                  source_string: 'wf_input',
                  line: 3,
                  col: 6,
                },
                expression: null,
              },
            },
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
                                              source_string: 'wf_input',
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
      expect(workflow.workflowStep.children.foo_scatter_0.type).to.equal('scatter');
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
      expect(workflow.workflowStep.children.foo_whileloop_0.type).to.equal('whileloop');
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
      expect(workflow.workflowStep.children.foo_if_0.type).to.equal('if');
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

    it('throws error when undeclared variable is referenced in workflow outputs with wildcard1', () => {
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

      expect(() => new WDLWorkflow(ast, {
        actionMap: {
          bar: {
          },
        },
      })).to.throws(WDLParserError);
    });

    it('throws error when undeclared call is referenced in workflow outputs with wildcard1', () => {
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

      expect(() => new WDLWorkflow(ast, {
        actionMap: {
        },
      })).to.throws(WDLParserError);
    });

    it('throws error when undeclared variable is referenced in workflow outputs with wildcard2', () => {
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

      expect(() => new WDLWorkflow(ast, {
        actionMap: {
          bar: {
          },
        },
      })).to.throws(WDLParserError);
    });

    it('throws error when undeclared call is referenced in workflow outputs with wildcard2', () => {
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

      expect(() => new WDLWorkflow(ast, {
        actionMap: {
        },
      })).to.throws(WDLParserError);
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
            i: {},
            o: {
              out: new Port('out'),
            },
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
            i: {},
            o: {
              out: new Port('out'),
            },
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
            i: {},
            o: {
              out: new Port('out'),
            },
          },
        },
      });

      expect(workflow.workflowStep.action.o).to.have.all.keys(['wfOut']);
    });

    it('throws error if workflow output referenced to unknown call', () => {
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
                              source_string: 'fizzbuzz',
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

      expect(() => new WDLWorkflow(ast, {
        actionMap: {
          bar: {
          },
        },
      })).to.throws(WDLParserError);
    });

    it('throws error if workflow output referenced to unknown call variable', () => {
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

      expect(() => new WDLWorkflow(ast, {
        actionMap: {
          bar: {
          },
        },
      })).to.throws(WDLParserError);
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
      expect(new WDLWorkflow(ast, {
        actionMap: {},
      }).workflowStep.action.data.meta).to.have.all.keys(['author']);
    });
  });
});
