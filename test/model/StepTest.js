import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import Step from '../../src/model/Step';
import Action from '../../src/model/Action';
import Workflow from '../../src/model/Workflow';

describe('model/Step', () => {

  const name = 'foo';
  const config = {
    i: { p1: { type: 'int' }, p2: { type: 'string' } },
    o: { q1: { type: 'file' }, q2: { type: 'string' } },
  };

  describe('constructor', () => {

    it('requires a name', () => {
      expect(() => new Step()).to.throw(Error);
      expect(() => new Step(name)).to.not.throw(Error);
      expect(new Step(name).name).to.equal(name);
    });

    it('allows empty configuration', () => {
      const step = new Step(name);
      expect(step).to.contain.all.keys(['name', 'i', 'o', 'action', 'children', 'parent']);
      expect(step.i).to.be.empty;
      expect(step.o).to.be.empty;
      expect(step.action).to.be.an.instanceOf(Action, 'step.action');
      expect(step.children).to.be.empty;
      expect(step.parent).to.be.null;
    });

    it('creates a step from an action', () => {
      const action = new Action(name, config);
      const step = new Step(name, action);
      expect(step.action).to.equal(action);
      expect(step.i).to.have.all.keys(Object.keys(config.i));
      expect(step.o).to.have.all.keys(Object.keys(config.o));
    });

    it('creates an action automatically from a config', () => {
      const step = new Step(name, config);
      expect(step.action).to.be.an.instanceOf(Action, 'step.action');
      expect(step.i).to.have.all.keys(Object.keys(config.i));
      expect(step.o).to.have.all.keys(Object.keys(config.o));
    });

    function checkConnection(prev, next) {
      expect(prev.o.out.outputs).to.have.lengthOf(1);
      expect(next.i.inp.inputs).to.have.lengthOf(1);

      const connection = next.i.inp.inputs[0];
      expect(connection).to.equal(prev.o.out.outputs[0]);
      expect(connection).to.have.property('from', prev.o.out);
      expect(connection).to.have.property('to', next.i.inp);
      expect(connection.isValid()).to.be.true;
    }

    it('accepts bindings as a 3rd argument', () => {
      const prev = new Step('origin', { o: { out: {} } });
      const action = new Action(name, { i: { inp: {} } });
      const next = new Step(name, action, {
        i: { inp: prev.o.out },
      });
      checkConnection(prev, next);
    });

    it('accepts bindings mixed with an action config', () => {
      const prev = new Step('origin', { o: { out: {} } });
      const next = new Step(name, {
        i: {
          inp: {
            type: 'some',
            bind: prev.o.out,
          },
        },
      });
      checkConnection(prev, next);
    });

    it('ignores bindings of missing ports', () => {
      const prev = new Step('origin', { o: { out: {} } });
      const action = new Action(name, { i: { inp: {} } });
      const next = new Step(name, action, {
        i: { miss: prev.o.out },
      });
      expect(next.i).to.have.all.keys(['inp']);
      expect(prev.o.out.outputs).to.be.empty;
    });

    it('provides correct jsdoc example 1', () => {
      const helloAction = new Action('hello', {
        i: {
          name: {
            type: 'String',
          },
        },
        o: {
          response: {
            type: 'File',
            default: 'stdout()',
          },
        },
        data: {
          command: 'echo \'Hello ${name}!\'', // eslint-disable-line no-template-curly-in-string
        },
      });
      const helloStep = new Step(helloAction.name, helloAction, {
        i: {
          name: {
            bind: 'World',
          },
        },
      });
      expect(helloStep.i).to.have.all.keys(['name']);
      expect(helloStep.i.name.inputs).to.have.lengthOf(1);
      expect(helloStep.i.name.inputs[0].from).to.be.equal('World');
      expect(helloStep.o).to.have.all.keys(['response']);
    });

    it('provides correct jsdoc example 2', () => {
      const helloStep = new Step('hello', {
        i: {
          name: {
            type: 'String',
            bind: 'World',
          },
        },
        o: {
          response: {
            type: 'File',
            default: 'stdout()',
          },
        },
        data: {
          command: 'echo \'Hello ${name}!\'', // eslint-disable-line no-template-curly-in-string
        },
      });
      expect(helloStep.i).to.have.all.keys(['name']);
      expect(helloStep.i.name.inputs).to.have.lengthOf(1);
      expect(helloStep.i.name.inputs[0].from).to.be.equal('World');
      expect(helloStep.o).to.have.all.keys(['response']);
    });
  });

  describe('.add()', () => {

    it('links a child', () => {
      const mom = new Step('mom');
      const son = new Step('son');
      mom.add(son);
      expect(son.parent).to.equal(mom);
      expect(mom.children).to.have.all.keys(['son']);
      expect(mom.children).to.have.property('son', son);
    });

    it('returns added step', () => {
      const mom = new Step('mom');
      const son = new Step('son');
      expect(mom.add(son)).to.equal(son);
    });

    it('allows multiple children', () => {
      const mom = new Step('mom');
      const son = new Step('son');
      const daughter = new Step('daughter');
      mom.add(son);
      mom.add(daughter);
      expect(son.parent).to.equal(mom);
      expect(daughter.parent).to.equal(mom);
      expect(mom.children).to.have.all.keys(['son', 'daughter']);
      expect(mom.children).to.have.property('son', son);
      expect(mom.children).to.have.property('daughter', daughter);
    });

    it('allows a single parent only', () => {
      const mom = new Step('mom');
      const dad = new Step('dad');
      const son = new Step('son');
      mom.add(son);
      dad.add(son);
      expect(son.parent).to.equal(dad);
      expect(mom.children).to.be.empty;
      expect(dad.children).to.have.all.keys(['son']);
    });

    it('forbids equal child names', () => {
      const mom = new Step('mom');
      const son = mom.add(new Step('son'));
      expect(() => mom.add(new Step('son'))).to.throw(Error);
      expect(son.parent).to.equal(mom);
      expect(mom.children).to.have.all.keys(['son']);
      expect(mom.children).to.have.property('son', son);
    });

    it('allows adding twice', () => {
      const mom = new Step('mom');
      const son = mom.add(new Step('son'));
      expect(() => mom.add(son)).to.not.throw(Error);
      expect(son.parent).to.equal(mom);
      expect(mom.children).to.have.all.keys(['son']);
      expect(mom.children).to.have.property('son', son);
    });

    it('adds an action to a parent workflow', () => {
      const mom = new Workflow('mom');
      const son = new Step('son');
      mom.add(son);
      expect(mom.actions).to.have.all.keys(['mom', 'son']);
      expect(mom.actions.son).to.equal(son.action);
    });

    it('adds actions to a grandparent workflow (top-to-bottom)', () => {
      const granny = new Workflow('granny');
      const mom = new Step('mom');
      granny.add(mom);
      const son = new Step('son');
      mom.add(son);
      expect(granny.actions).to.have.all.keys(['granny', 'mom', 'son']);
      expect(granny.actions.mom).to.equal(mom.action);
      expect(granny.actions.son).to.equal(son.action);
      expect(mom).not.to.have.property('actions');
    });

    it('adds actions to a grandparent workflow (bottom-to-top)', () => {
      const granny = new Workflow('granny');
      const mom = new Step('mom');
      const son = new Step('son');
      mom.add(son);
      granny.add(mom);
      expect(granny.actions).to.have.all.keys(['granny', 'mom', 'son']);
      expect(granny.actions.mom).to.equal(mom.action);
      expect(granny.actions.son).to.equal(son.action);
      expect(mom).not.to.have.property('actions');
    });

  });

  describe('.remove()', () => {

    it('unlinks a child', () => {
      const mom = new Step('mom');
      const son = new Step('son');
      mom.add(son);
      mom.remove('son');
      expect(son.parent).to.be.null;
      expect(mom.children).to.be.empty;
    });

    it('allows missing names', () => {
      const mom = new Step('mom');
      expect(() => mom.remove('son')).to.not.throw(Error);
    });

    it('doesn\'t remove an action from a workflow', () => {
      const mom = new Workflow('mom');
      const son = new Step('son');
      mom.add(son);
      mom.remove('son');
      expect(mom.actions).to.have.all.keys(['mom', 'son']);
      expect(mom.actions.son).to.equal(son.action);
    });

  });

  describe('.walk()', () => {

    function newHierarchy() {
      const root = new Step('root');
      const a = root.add(new Step('a'));
      a.add(new Step('a1'));
      a.add(new Step('a2'));
      const b = root.add(new Step('b'));
      b.add(new Step('b1'));
      b.add(new Step('b2'));
      return root;
    }

    it('visits every child', () => {
      const names = [];
      newHierarchy().walk(step => names.push(step.name));
      expect(names.sort()).to.deep.equal(['a', 'a1', 'a2', 'b', 'b1', 'b2', 'root']);
    });

    it('visits children in correct order', () => {
      let tree = {};
      const trees = [];
      newHierarchy().walk({
        before() {
          trees.push(tree);
          tree = {};
        },
        after(step) {
          const children = tree;
          tree = trees.pop();
          tree[step.name] = children;
        },
      });
      expect(trees).to.be.empty;
      expect(tree).to.deep.equal({
        root: {
          a: { a1: {}, a2: {} },
          b: { b1: {}, b2: {} },
        },
      });
    });

    it('skips children when gets false', () => {
      const root = newHierarchy();

      let names = [];
      root.walk((step) => {
        names.push(step.name);
        return step.name !== 'a';
      });
      expect(names.sort()).to.deep.equal(['a', 'b', 'b1', 'b2', 'root']);

      names = [];
      root.walk((step) => {
        names.push(step.name);
        return step.name !== 'b';
      });
      expect(names.sort()).to.deep.equal(['a', 'a1', 'a2', 'b', 'root']);
    });

  });

  function createConnectedSteps() {
    const left = new Step('left', {
      o: {
        oLot: {},
        oOne: {},
      },
    });
    const middle = new Step('middle', {
      i: {
        iOne: { multi: true, bind: left.o.oLot },
        iLot: { multi: true, bind: left.o.oOne },
        iDead: {},
      },
      o: {
        out: {},
        oDead: {},
      },
    });
    middle.i.iLot.bind(left.o.oLot);
    const right = new Step('right', {
      i: {
        inp: {
          type: 'string',
          bind: middle.o.out,
        },
      },
    });
    return { left, middle, right };
  }

  function conn(list) {
    return _.map(list, connection => [connection.from.name, connection.to.name]);
  }

  describe('._onActionChanged()', () => {

    it('is called when action changes', () => {
      const step = new Step(name);
      const onActionChanged = sinon.spy(step, '_onActionChanged');
      step.action.addPorts({ i: { p: {} } });
      expect(onActionChanged.called).to.be.true;
    });

    it('creates added ports', () => {
      const step = new Step(name);
      step.action.addPorts({ i: { p: {} }, o: { a: {} } });
      expect(step.i).to.have.all.keys(['p']);
      expect(step.o).to.have.all.keys(['a']);
    });

    it('deletes removed ports', () => {
      const step = new Step(name, { i: { p: {}, q: {} }, o: { a: {} } });
      step.action.removePorts({ i: ['p'], o: ['a'] });
      expect(step.i).to.have.all.keys(['q']);
      expect(step.o).to.be.empty;
    });

    function checkConnections(steps) {
      const { left, middle, right } = steps;
      expect(conn(left.o.oLot.outputs)).to.deep.equal(
        conn([middle.i.iOne.inputs[0], middle.i.iLot.inputs[1]]));
      expect(conn(left.o.oOne.outputs)).to.deep.equal(
        conn([middle.i.iLot.inputs[0]]));
      expect(conn(middle.i.iOne.inputs)).to.deep.equal(
        conn([left.o.oLot.outputs[0]]));
      expect(conn(middle.i.iLot.inputs)).to.deep.equal(
        conn([left.o.oOne.outputs[0], left.o.oLot.outputs[1]]));
      expect(conn(middle.o.out.outputs)).to.deep.equal(
        conn(right.i.inp.inputs));
    }

    it('keeps all connections when a port is added', () => {
      const steps = createConnectedSteps();
      steps.middle.action.addPorts({ i: { iNew: {} }, o: { oNew: {} } });
      checkConnections(steps);
    });

    it('keeps all connections when an unrelated port is removed', () => {
      const steps = createConnectedSteps();
      steps.middle.action.removePorts({ i: ['iDead'], o: ['oDead'] });
      checkConnections(steps);
    });

    it('keeps connection of a modified single port', () => {
      const steps = createConnectedSteps();
      steps.middle.action.addPorts({ i: { iOne: { default: 42 } } });
      checkConnections(steps);
    });

    it('keeps the only connection of a port made single', () => {
      const steps = createConnectedSteps();
      steps.middle.action.addPorts({ i: { iOne: { multi: false } } });
      checkConnections(steps);
    });

    it('breaks multiple connections of a port made single', () => {
      const steps = createConnectedSteps();
      steps.middle.action.addPorts({ i: { iLot: { multi: false } } });

      const { left, middle, right } = steps;
      expect(conn(left.o.oLot.outputs)).to.deep.equal(conn(middle.i.iOne.inputs));
      expect(conn(left.o.oOne.outputs)).to.be.empty;
      expect(conn(middle.i.iLot.inputs)).to.be.empty;
      expect(conn(middle.o.out.outputs)).to.deep.equal(conn(right.i.inp.inputs));
    });

    it('disconnects removed ports', () => {
      const steps = createConnectedSteps();
      steps.middle.action.removePorts({ i: ['iLot'], o: ['out'] });

      const { left, middle, right } = steps;
      expect(conn(left.o.oLot.outputs)).to.deep.equal(conn(middle.i.iOne.inputs));
      expect(conn(left.o.oOne.outputs)).to.be.empty;
      expect(conn(right.i.inp.inputs)).to.be.empty;
    });
  });

  describe('.rename()', () => {
    it('it actually renames the step', () => {
      const son = new Step('son');
      const newName = 'the son';
      son.rename(newName);

      expect(son.name).to.be.equal(newName);
    });

    it('it updates parent', () => {
      const mom = new Workflow('mom');
      const son = new Step('son');
      mom.add(son);
      const newName = 'the son';
      son.rename(newName);

      expect(son.name).to.be.equal(newName);
      expect(mom.children[newName]).to.be.equal(son);
      expect(mom.children.son).to.not.exist;
    });

    it('it throws error when new name is already taken', () => {
      const mom = new Workflow('mom');
      const son = new Step('son');
      const son1 = new Step('son1');
      mom.add(son);
      mom.add(son1);

      expect(() => son.rename('son1')).to.throw(Error);
    });

    it('it silently renames itself', () => {
      const mom = new Workflow('mom');
      const son = new Step('son');
      mom.add(son);

      expect(() => son.rename('son')).to.not.throw(Error);
    });
  });

  describe('._onPortRenamed()', () => {

    it('is called when input port is renamed', () => {
      const step = new Step('step', new Action(name, { i: { p: {} } }));
      const onPortRenamed = sinon.spy(step, '_onPortRename');
      step.action.renameIPort('p', 'p1');
      expect(onPortRenamed.calledOnce).to.be.true;
      expect(onPortRenamed.calledWith('p', 'p1', true)).to.be.true;
    });

    it('is called when output port is renamed', () => {
      const step = new Step('step', new Action(name, { o: { p: {} } }));
      const onPortRenamed = sinon.spy(step, '_onPortRename');
      step.action.renameOPort('p', 'p1');
      expect(onPortRenamed.calledOnce).to.be.true;
      expect(onPortRenamed.calledWith('p', 'p1', false)).to.be.true;
    });

    it('preserves connections when input port is renamed', () => {
      const { left, middle, right } = createConnectedSteps();
      middle.action.renameIPort('iLot', 'iLot1');

      expect(conn(left.o.oLot.outputs)).to.deep.equal(
        conn([middle.i.iOne.inputs[0], middle.i.iLot1.inputs[1]]));
      expect(conn(left.o.oOne.outputs)).to.deep.equal(
        conn([middle.i.iLot1.inputs[0]]));
      expect(conn(middle.i.iOne.inputs)).to.deep.equal(
        conn([left.o.oLot.outputs[0]]));
      expect(conn(middle.i.iLot1.inputs)).to.deep.equal(
        conn([left.o.oOne.outputs[0], left.o.oLot.outputs[1]]));
      expect(conn(middle.o.out.outputs)).to.deep.equal(
        conn(right.i.inp.inputs));
    });

    it('preserves connections when output port is renamed', () => {
      const { left, middle, right } = createConnectedSteps();
      middle.action.renameOPort('out', 'out1');

      expect(conn(left.o.oLot.outputs)).to.deep.equal(
        conn([middle.i.iOne.inputs[0], middle.i.iLot.inputs[1]]));
      expect(conn(left.o.oOne.outputs)).to.deep.equal(
        conn([middle.i.iLot.inputs[0]]));
      expect(conn(middle.i.iOne.inputs)).to.deep.equal(
        conn([left.o.oLot.outputs[0]]));
      expect(conn(middle.i.iLot.inputs)).to.deep.equal(
        conn([left.o.oOne.outputs[0], left.o.oLot.outputs[1]]));
      expect(middle.o.out1.outputs.length).to.be.equal(1);
      expect(conn(middle.o.out1.outputs)).to.deep.equal(
        conn(right.i.inp.inputs));
    });
  });
});
