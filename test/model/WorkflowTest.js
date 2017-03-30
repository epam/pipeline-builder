import { expect } from 'chai';
import Workflow from '../../src/model/Workflow';
import Action from '../../src/model/Action';
import Step from '../../src/model/Step';

describe('model/Workflow', () => {

  describe('constructor', () => {

    it('keeps track of it\'s own action', () => {
      const flow = new Workflow('flow');
      expect(flow.actions).to.have.all.keys(['flow']);
    });

    it('provides correct jsdoc example', () => {
      const test = new Workflow('test', {
        i: {
          greeting: {
            type: 'String',
          },
        },
      });
      const hello = test.add(new Step('hello'));
      expect(test.action.i.greeting.type).to.be.equal('String');
      expect(test.i).to.have.all.keys(['greeting']);
      expect(test.actions).to.contain.keys([hello.action.name]);
    });

  });

  describe('.addAction()', () => {

    it('stores any action', () => {
      const flow = new Workflow('flow');
      const action = new Action('action');
      flow.addAction(action);
      expect(flow.actions).to.have.all.keys(['flow', 'action']);
      expect(flow.actions).to.have.property('action', action);
    });

    it('returns added action', () => {
      const flow = new Workflow('flow');
      const action = new Action('action');
      expect(flow.addAction(action)).to.equal(action);
    });

    it('allows multiple actions', () => {
      const flow = new Workflow('flow');
      const a = flow.addAction(new Action('a'));
      const b = flow.addAction(new Action('b'));
      expect(flow.actions).to.have.all.keys(['flow', 'a', 'b']);
      expect(flow.actions).to.have.property('a', a);
      expect(flow.actions).to.have.property('b', b);
    });

    it('forbids equal action names', () => {
      const flow = new Workflow('flow');
      const action = flow.addAction(new Action('action'));
      expect(() => flow.addAction(new Action('action'))).to.throw(Error);
      expect(flow.actions).to.have.all.keys(['flow', 'action']);
      expect(flow.actions).to.have.property('action', action);
    });

    it('allows adding twice', () => {
      const flow = new Workflow('flow');
      const action = flow.addAction(new Action('action'));
      expect(() => flow.addAction(action)).to.not.throw(Error);
      expect(flow.actions).to.have.all.keys(['flow', 'action']);
      expect(flow.actions).to.have.property('action', action);
    });

  });

  function newHierarchy() {
    const flow = new Workflow('flow');
    const action = flow.addAction(new Action('action'));
    const root = flow.add(new Step('root'));
    const a = root.add(new Step('a'));
    a.add(new Step('a1', action));
    a.add(new Step('a2'));
    a.add(new Step('a3', action));
    const b = root.add(new Step('b', action));
    b.add(new Step('b1'));
    b.add(new Step('b2'));
    return flow;
  }

  describe('.removeAction()', () => {

    it('removes an unused action', () => {
      const flow = new Workflow('flow');
      flow.addAction(new Action('a'));
      flow.addAction(new Action('b'));
      flow.removeAction('b');
      expect(flow.actions).to.have.all.keys(['flow', 'a']);
    });

    it('allows missing names', () => {
      const flow = new Workflow('flow');
      expect(() => flow.removeAction('action')).to.not.throw(Error);
    });

    it('forbids to remove an action in use (shallow)', () => {
      const flow = new Workflow('flow');
      const action = new Action('action');
      flow.add(new Step('step', action));
      expect(() => flow.removeAction(action.name)).to.throw(Error);
      expect(flow.actions).to.have.property('action', action);
    });

    it('forbids to remove an action in use (deep)', () => {
      const flow = newHierarchy();
      expect(() => flow.removeAction('action')).to.throw(Error);
      expect(flow.actions).to.have.property('action');

      const names = [];
      flow.walk(step => names.push(step.name));
      expect(names.sort()).to.deep.equal(['a', 'a1', 'a2', 'a3', 'b', 'b1', 'b2', 'flow', 'root']);
    });

    it('removes an action and all dependent steps when forced', () => {
      const flow = newHierarchy();
      expect(() => flow.removeAction('action', true)).to.not.throw(Error);
      expect(flow.actions).to.not.have.property('action');

      const names = [];
      flow.walk(step => names.push(step.name));
      expect(names.sort()).to.deep.equal(['a', 'a2', 'flow', 'root']);
    });

  });

  describe('.removeUnusedActions()', () => {

    it('doesn\'t remove used actions', () => {
      const flow = newHierarchy();
      const before = Object.keys(flow.actions).sort();
      flow.removeUnusedActions();
      const after = Object.keys(flow.actions).sort();
      expect(after).to.deep.equal(before);
    });

    it('removes unused action (shallow)', () => {
      const flow = new Workflow('flow');
      flow.addAction(new Action('action'));
      expect(flow.actions).to.have.all.keys(['flow', 'action']);
      flow.removeUnusedActions();
      expect(flow.actions).to.have.all.keys(['flow']);
    });

    it('removes unused action (deep)', () => {
      const flow = newHierarchy();
      const root = flow.children.root;
      root.remove('b');
      root.children.a.remove('a2');
      flow.removeUnusedActions();
      const after = Object.keys(flow.actions).sort();
      expect(after).to.deep.equal(['a', 'action', 'flow', 'root']);
    });

  });

});
