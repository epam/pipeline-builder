import { expect } from 'chai';

import Group from '../../src/model/Group';
import Action from '../../src/model/Action';

describe('model/Group', () => {

  const name = 'foo';
  const type = 'bar';
  const config = {
    i: { p1: { type: 'int' }, p2: { type: 'string' } },
    o: { q1: { type: 'file' }, q2: { type: 'string' } },
  };

  describe('constructor', () => {

    it('requires a name', () => {
      expect(() => new Group()).to.throw(Error);
      expect(() => new Group(name)).to.not.throw(Error);
      expect(new Group(name).name).to.equal(name);
    });

    it('allows empty configuration', () => {
      const group = new Group(name);
      expect(group).to.contain.all.keys(['name', 'i', 'o', 'action', 'children', 'parent']);
      expect(group.i).to.be.empty;
      expect(group.o).to.be.empty;
      expect(group.action).to.be.an.instanceOf(Action, 'group.action');
      expect(group.children).to.be.empty;
      expect(group.parent).to.be.null;
    });

    it('requires a type', () => {
      expect(() => new Group()).to.throw(Error);
      expect(() => new Group(name, type)).to.not.throw(Error);
      expect(new Group(name, type).type).to.equal(type);
    });

    it('allows to create with ports', () => {
      expect(() => new Group(name, type, config)).to.not.throw(Error);
    });

    it('throws error when try to create with action', () => {
      expect(() => new Group(name, type, new Action(name, config))).to.throw(Error);
    });
  });
});
