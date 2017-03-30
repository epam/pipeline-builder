import { expect } from 'chai';

import Context from '../../../../src/parser/WDL/entities/Context';

describe('parser/WDL/entities/Context', () => {

  describe('constructor', () => {

    it('requires an empty workflow', () => {

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
                    source_string: 'foo',
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
      expect(ctx.actionMap).to.be.empty;
    });

  });

});
