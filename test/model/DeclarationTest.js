import { expect } from 'chai';

import Declaration from '../../src/model/Declaration';


describe('model/Declaration', () => {

  describe('constructor', () => {

    const declarationAst = {
      type: { id: 41, str: 'type', source_string: 'Int', line: 2, col: 3 },
      name: { id: 39, str: 'identifier', source_string: 'foo', line: 2, col: 9 },
      expression: { id: 17, str: 'float', source_string: '9', line: 2, col: 15 },
    };
    const name = 'foo';

    it('requires a name', () => {
      expect(() => new Declaration('', declarationAst, null)).to.throw(Error);
      expect(() => new Declaration(name, declarationAst, null)).to.not.throw(Error);
      expect(new Declaration(name, declarationAst, null).name).to.equal(name);
    });

    it('requires a declaration ast object with expression and type', () => {
      expect(() => new Declaration(name)).to.throws(Error);
      expect(() => new Declaration(name, {})).to.throws(Error);
      expect(() => new Declaration(name, { type: declarationAst.type })).to.throws(Error);
      expect(() => new Declaration(name, { expression: declarationAst.expression })).to.throws(Error);
    });
  });
});
