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
            expression: null,
          },
        },
      ],
    };

    it('returns inputs workflow', () => {
      const ctx = new Context(ast);
      const inputsWorkflow = ctx.getInputsWorkflow(partAst);

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
        name: {
          id: 39,
          str: 'identifier',
          source_string: 'workflow123',
          line: 1,
          col: 10,
        },
        body: {
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
        },
      };

      const ctx = new Context(ast);
      const outputsWorkflow = ctx.getOutputsWorkflow(partAst);

      expect(outputsWorkflow[outputName]).to.be.not.empty;
      expect(outputsWorkflow[outputName].type).to.be.equal(outputType);
      expect(outputsWorkflow[outputName].default).to.be.equal(`${outputValueLhs}.${outputValueRhs}`);
    });
  });
});
