import { expect } from 'chai';

import Context from '../../../../src/parser/WDL/entities/Context';

describe('parser/WDL/entities/Context', () => {
  const name = 'foo';
  const ast = {
    name: 'Namespace',
    attributes: {
      imports: {
        list: [],
      },
      body: {
        list: [
          {
            name: 'Workflow',
            attributes: {
              name: {
                id: 14,
                str: 'identifier',
                source_string: name,
                line: 2,
                col: 10,
              },
              body: {
                list: [],
              },
            },
          },
        ],
      },
    },
  };

  describe('constructor', () => {
    it('requires an empty workflow', () => {
      const ctx = new Context(ast);

      expect(ctx.workflowList.length).to.equal(1);
      expect(Object.entries(ctx.actionMap).length).to.equal(1);
      expect(ctx.actionMap[name]).to.be.not.empty;
    });
  });

  describe('getInputsWorkflow', () => {
    const inputName = 'input_name';
    const inputType = 'File';
    const partAst = {
      list: [
        {
          name: 'Declaration',
          attributes: {
            type: {
              id: 41,
              str: 'type',
              source_string: inputType,
              line: 3,
              col: 3,
            },
            name: {
              id: 39,
              str: 'identifier',
              source_string: inputName,
              line: 3,
              col: 8,
            },
            expression: {
              attributes: {
                lhs: {
                  attributes: {
                    name: {
                      col: 22,
                      id: 39,
                      line: 28,
                      resource: undefined,
                      source_string: 'select_first',
                      str: 'identifier',
                    },
                    params: {
                      list: [],
                    },
                  },
                  name: 'FunctionCall',
                },
                rhs: {
                  col: 60,
                  id: 27,
                  line: 28,
                  resource: undefined,
                  source_string: '',
                  str: 'string',
                },
              },
              name: 'Equals',
            },
          },
        },
      ],
    };

    it('returns inputs workflow', () => {
      const inputsWorkflow = Context.getInputsWorkflow(partAst);

      expect(inputsWorkflow[inputName]).to.be.not.empty;
      expect(inputsWorkflow[inputName].type).to.be.equal(inputType);
    });
  });

  describe('getOutputsWorkflow', () => {
    it('returns outputs workflow', () => {
      const outputName = 'rawVCD';
      const outputType = 'File';
      const outputValueLhs = 'task1';
      const outputValueRhs = 'rawVCF';
      const partAst = {
        list: [
          {
            name: 'WorkflowOutputs',
            attributes: {
              outputs: {
                list: [
                  {
                    name: 'WorkflowOutputDeclaration',
                    attributes: {
                      type: {
                        id: 41,
                        str: 'type',
                        source_string: outputType,
                        line: 12,
                        col: 5,
                      },
                      name: {
                        id: 39,
                        str: 'identifier',
                        source_string: outputName,
                        line: 12,
                        col: 10,
                      },
                      expression: {
                        name: 'MemberAccess',
                        attributes: {
                          lhs: {
                            id: 39,
                            str: 'identifier',
                            source_string: outputValueLhs,
                            line: 12,
                            col: 19,
                          },
                          rhs: {
                            id: 39,
                            str: 'identifier',
                            source_string: outputValueRhs,
                            line: 12,
                            col: 25,
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
      };

      const outputsWorkflow = Context.getOutputsWorkflow(partAst);

      expect(outputsWorkflow[outputName]).to.be.not.empty;
      expect(outputsWorkflow[outputName].type).to.be.equal(outputType);
      expect(outputsWorkflow[outputName].default).to.be.equal(`${outputValueLhs}.${outputValueRhs}`);
    });

    it('returns outputs for workflow with wildcards', () => {
      const outputWildcardName = 'foo';
      const outputNullWildcardName = 'bar.out';
      const partAst = {
        list: [
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
                        source_string: outputWildcardName,
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
                  {
                    name: 'WorkflowOutputWildcard',
                    attributes: {
                      fqn: {
                        id: 11,
                        str: 'fqn',
                        source_string: outputNullWildcardName,
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
      };

      const outputsWorkflow = Context.getOutputsWorkflow(partAst);

      expect(outputsWorkflow[`${outputWildcardName}.*`]).to.be.not.empty;
      expect(outputsWorkflow[outputNullWildcardName]).to.be.not.empty;
      expect(outputsWorkflow[`${outputWildcardName}.*`].type).to.be.empty;
      expect(outputsWorkflow[outputNullWildcardName].type).to.be.empty;
      expect(outputsWorkflow[`${outputWildcardName}.*`].default).to.be.equal(`${outputWildcardName}.*`);
      expect(outputsWorkflow[outputNullWildcardName].default).to.be.equal(outputNullWildcardName);
    });
  });
});
