import { expect } from 'chai';

import Group from '../../src/model/Group';
import Action from '../../src/model/Action';
import Workflow from '../../src/model/Workflow';
import Declaration from '../../src/model/Declaration';

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

  describe('.addDeclaration()', () => {

    const declarationAst = {
      type: { id: 41, str: 'type', source_string: 'Int', line: 2, col: 3 },
      name: { id: 39, str: 'identifier', source_string: 'bar', line: 2, col: 9 },
      expression: { id: 17, str: 'float', source_string: '9', line: 2, col: 15 },
    };

    it('links a declaration', () => {
      const group = new Group('group');
      const declaration = new Declaration('declaration', declarationAst, null);
      group.addDeclaration(declaration);

      expect(declaration.step).to.equal(group);
      expect(group.ownDeclarations).to.have.all.keys(['declaration']);
      expect(group.ownDeclarations).to.have.property('declaration', declaration);
    });

    it('returns added declaration', () => {
      const group = new Group('group');
      const declaration = new Declaration('declaration', declarationAst, null);

      expect(group.addDeclaration(declaration)).to.equal(declaration);
    });

    it('allows multiple declarations', () => {
      const group = new Group('group');
      const declaration = new Declaration('declaration', declarationAst, null);
      const declarationAst2 = {
        type: { id: 41, str: 'type', source_string: 'Int', line: 2, col: 3 },
        name: { id: 39, str: 'identifier', source_string: 'baz', line: 2, col: 9 },
        expression: { id: 17, str: 'float', source_string: '10', line: 2, col: 15 },
      };
      const declaration2 = new Declaration('declaration2', declarationAst2, null);
      group.addDeclaration(declaration);
      group.addDeclaration(declaration2);

      expect(declaration.step).to.equal(group);
      expect(declaration2.step).to.equal(group);
      expect(group.ownDeclarations).to.have.all.keys(['declaration', 'declaration2']);
      expect(group.ownDeclarations).to.have.property('declaration', declaration);
      expect(group.ownDeclarations).to.have.property('declaration2', declaration2);
    });

    it('allows a single parent only', () => {
      const momGroup = new Group('mom');
      const dadGroup = new Group('dad');
      const declaration = new Declaration('declaration', declarationAst, null);
      momGroup.addDeclaration(declaration);
      dadGroup.addDeclaration(declaration);

      expect(declaration.step).to.equal(dadGroup);
      expect(momGroup.ownDeclarations).to.be.empty;
      expect(dadGroup.ownDeclarations).to.have.all.keys(['declaration']);
    });

    it('forbids equal declaration names', () => {
      const group = new Group('group');
      const declaration = group.addDeclaration(new Declaration('declaration', declarationAst, null));

      expect(() => group.addDeclaration(new Declaration('declaration', declarationAst, null))).to.throw(Error);
      expect(declaration.step).to.equal(group);
      expect(group.ownDeclarations).to.have.all.keys(['declaration']);
      expect(group.ownDeclarations).to.have.property('declaration', declaration);
    });

    it('allows adding twice', () => {
      const group = new Group('group');
      const declaration = group.addDeclaration(new Declaration('declaration', declarationAst, null));

      expect(() => group.addDeclaration(declaration)).to.not.throw(Error);
      expect(declaration.step).to.equal(group);
      expect(group.ownDeclarations).to.have.all.keys(['declaration']);
      expect(group.ownDeclarations).to.have.property('declaration', declaration);
    });

    it('adds a declaration to a parent workflow', () => {
      const root = new Workflow('root');
      const group = new Group('group');
      root.add(group);
      const declaration = group.addDeclaration(new Declaration('declaration', declarationAst, null));

      expect(root.declarations).to.have.all.keys(['declaration']);
      expect(root.declarations).to.have.property('declaration', declaration);
      expect(group.ownDeclarations).to.have.all.keys(['declaration']);
      expect(group.ownDeclarations).to.have.property('declaration', declaration);
    });

    it('adds declarations to a grandparent workflow (top-to-bottom)', () => {
      const root = new Workflow('root');
      const parentGroup = new Group('parentGroup');
      root.add(parentGroup);
      const sonGroup = new Group('sonGroup');
      parentGroup.add(sonGroup);
      const declaration = sonGroup.addDeclaration(new Declaration('declaration', declarationAst, null));

      expect(root.declarations).to.have.all.keys(['declaration']);
      expect(root.declarations).to.have.property('declaration', declaration);
      expect(parentGroup.ownDeclarations).to.be.empty;
      expect(parentGroup.ownDeclarations).not.to.have.property('declaration');
      expect(sonGroup.ownDeclarations).to.have.all.keys(['declaration']);
      expect(sonGroup.ownDeclarations).to.have.property('declaration', declaration);
    });

    it('adds declarations to a grandparent workflow (bottom-to-top)', () => {
      const root = new Workflow('root');
      const parentGroup = new Group('parentGroup');
      const sonGroup = new Group('sonGroup');
      parentGroup.add(sonGroup);
      root.add(parentGroup);
      const declaration = sonGroup.addDeclaration(new Declaration('declaration', declarationAst, null));

      expect(root.declarations).to.have.all.keys(['declaration']);
      expect(root.declarations).to.have.property('declaration', declaration);
      expect(parentGroup.ownDeclarations).to.be.empty;
      expect(parentGroup.ownDeclarations).not.to.have.property('declaration');
      expect(sonGroup.ownDeclarations).to.have.all.keys(['declaration']);
      expect(sonGroup.ownDeclarations).to.have.property('declaration', declaration);
    });
  });

  describe('.removeDeclaration()', () => {

    const declarationAst = {
      type: { id: 41, str: 'type', source_string: 'Int', line: 2, col: 3 },
      name: { id: 39, str: 'identifier', source_string: 'bar', line: 2, col: 9 },
      expression: { id: 17, str: 'float', source_string: '9', line: 2, col: 15 },
    };

    it('unlinks a declaration', () => {
      const group = new Group('group');
      const declaration = new Declaration('declaration', declarationAst, null);
      group.addDeclaration(declaration);
      group.removeDeclaration('declaration');

      expect(declaration.step).to.be.null;
      expect(group.ownDeclarations).to.be.empty;
    });

    it('allows missing names', () => {
      const group = new Group('group');

      expect(() => group.removeDeclaration('declaration')).to.not.throw(Error);
    });

    it('removes a declaration from a workflow', () => {
      const root = new Workflow('root');
      const group = new Group('group');
      const declaration = new Declaration('declaration', declarationAst, null);
      root.add(group);
      group.addDeclaration(declaration);
      group.removeDeclaration('declaration');

      expect(root.declarations).to.be.empty;
      expect(group.ownDeclarations).to.be.empty;
      expect(declaration.step).to.be.null;
    });
  });
});
