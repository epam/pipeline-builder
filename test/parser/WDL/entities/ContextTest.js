import { expect } from 'chai';

import Context from '../../../../src/parser/WDL/entities/Context';

describe('parser/WDL/entities/Context', () => {

  describe('constructor', () => {

    it('requires an empty workflow', () => {

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

      const ctx = new Context(ast);

      expect(ctx.workflowList.length).to.equal(1);
      expect(Object.entries(ctx.actionMap).length).to.equal(1);
      expect(ctx.actionMap[name]).to.be.not.empty;
    });

  });

});
