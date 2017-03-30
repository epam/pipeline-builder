import { expect } from 'chai';
import sinon from 'sinon';
import Action from '../../src/model/Action';

describe('model/Action', () => {

  const name = 'foo';

  describe('constructor', () => {

    it('requires a name', () => {
      expect(() => new Action()).to.throw(Error);
      expect(() => new Action(name)).to.not.throw(Error);
      expect(new Action(name).name).to.equal(name);
    });

    it('allows empty configuration', () => {
      const action = new Action(name);
      expect(action).to.contain.all.keys(['name', 'i', 'o', 'data']);
      expect(action.i).to.be.empty;
      expect(action.o).to.be.empty;
      expect(action.data).to.be.empty;
    });

    it('allows to configure multiple ports', () => {
      const config = {
        i: {
          p1: { type: 'type1' },
          p2: { type: 'type2' },
        },
        o: {
          p3: { type: 'type3' },
          p4: { type: 'type4' },
        },
      };
      const action = new Action(name, config);
      expect(action.i).to.have.all.keys(['p1', 'p2']);
      expect(action.o).to.have.all.keys(['p3', 'p4']);
    });

    it('allows only a predefined set of keys in a port description', () => {
      const desc = { foo: 5, type: 'boo', bar: 42, default: [1, 2, 3], multi: false };
      const config = { i: { p: desc }, o: { q: desc } };
      const action = new Action(name, config);
      expect(action.i.p).to.have.all.keys(['type', 'default', 'multi']);
      expect(action.o.q).to.have.all.keys(['type', 'default', 'multi']);
    });

    it('marks a port as a single-input one by default', () => {
      const action = new Action(name, { i: { p: {} } });
      expect(action.i.p.multi).to.equal(false);
    });

    it('provides correct jsdoc example', () => {
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
      expect(helloAction.i.name.type).to.be.equal('String');
      expect(helloAction.o.response.type).to.be.equal('File');
      expect(helloAction.o.response.default).to.be.equal('stdout()');
      expect(helloAction.data.command).to.contain('{name}');
    });

  });

  describe('.addPorts()', () => {

    it('creates multiple ports', () => {
      const action = new Action(name, { i: { p: {} }, o: { a: {} } });
      action.addPorts({
        i: {
          q: { type: 'bar', multi: true },
          r: { default: 42 },
        },
        o: {
          b: {},
          c: { type: 'baz' },
        },
      });
      expect(action.i).to.have.all.keys(['p', 'q', 'r']);
      expect(action.i.q).to.have.property('type', 'bar');
      expect(action.i.q).to.have.property('multi', true);
      expect(action.i.r).to.have.property('default', 42);
      expect(action.o).to.have.all.keys(['a', 'b', 'c']);
      expect(action.o.b).to.have.all.keys(['multi']);
      expect(action.o.c).to.have.property('type', 'baz');
    });

    it('works with an empty action', () => {
      const action = new Action(name);
      action.addPorts({ i: { p: {} }, o: { a: {} } });
      expect(action.i).to.have.all.keys(['p']);
      expect(action.o).to.have.all.keys(['a']);
    });

    it('overrides existing ports', () => {
      const action = new Action(name, { i: { p: {} }, o: { a: {} } });
      action.addPorts({ i: { p: { type: 'bar' } }, o: { a: { type: 'baz' } } });
      expect(action.i).to.have.all.keys(['p']);
      expect(action.i.p).to.have.property('type', 'bar');
      expect(action.o).to.have.all.keys(['a']);
      expect(action.o.a).to.have.property('type', 'baz');
    });

    it('allows only a predefined set of keys in a port description', () => {
      const desc = { foo: 5, type: 'boo', bar: 42, default: [1, 2, 3], multi: false };
      const config = { i: { p: desc }, o: { q: desc } };
      const action = new Action(name);
      action.addPorts(config);
      expect(action.i.p).to.have.all.keys(['type', 'default', 'multi']);
      expect(action.o.q).to.have.all.keys(['type', 'default', 'multi']);
    });

    it('notifies about additions', () => {
      const action = new Action(name);
      const callback = sinon.spy();
      action.on('changed', callback);
      action.addPorts({ i: { p: { } } });
      expect(callback.calledOnce).to.be.true;
    });

    it('notifies about changes', () => {
      const action = new Action(name, { i: { p: {} }, o: { a: {} } });
      const callback = sinon.spy();
      action.on('changed', callback);
      action.addPorts({ o: { a: { type: 'baz' } } });
      expect(callback.calledOnce).to.be.true;
    });

    it('doesn\'t notify if nothing changed', () => {
      const action = new Action(name, { i: { p: {} }, o: { a: {} } });
      const callback = sinon.spy();
      action.on('changed', callback);
      action.addPorts({ o: { a: {} } });
      expect(callback.called).to.be.false;
    });

  });

  describe('.removePorts()', () => {

    it('destroys multiple ports', () => {
      const action = new Action(name, {
        i: {
          p: {}, q: {}, r: { type: 'bar' },
        },
        o: {
          a: { default: 42 }, b: {},
        },
      });
      action.removePorts({ i: ['p', 'r'], o: ['a'] });
      expect(action.i).to.have.all.keys(['q']);
      expect(action.o).to.have.all.keys(['b']);
    });

    it('allows missing names', () => {
      const action = new Action(name);
      expect(() => action.removePorts({ i: ['x', 'y', 'z'] })).to.not.throw(Error);
    });

    it('notifies about changes', () => {
      const action = new Action(name, { i: { p: {} }, o: { a: {} } });
      const callback = sinon.spy();
      action.on('changed', callback);
      action.removePorts({ o: ['a'] });
      expect(callback.calledOnce).to.be.true;
    });

    it('doesn\'t notify if nothing changed', () => {
      const action = new Action(name, { i: { p: {} }, o: { a: {} } });
      const callback = sinon.spy();
      action.on('changed', callback);
      action.removePorts({ o: ['b'] });
      expect(callback.called).to.be.false;
    });
  });

  describe('.renameIPort()', () => {

    it('throws when port does not exist', () => {
      const action = new Action(name);
      expect(() => action.renameIPort('p', 'b')).to.throw(Error);
    });

    it('throws when target name is already taken', () => {
      const action = new Action(name, { i: { p: {}, p1: {} } });
      expect(() => action.renameIPort('p', 'p1')).to.throw(Error);
    });

    it('renames port', () => {
      const action = new Action(name, { i: { p: {} } });
      action.renameIPort('p', 'p1');
      expect(action.i.p).to.not.exist;
      expect(action.i.p1).to.exist;
    });

    it('notifies about changes', () => {
      const action = new Action(name, { i: { p: {} } });
      const callback = sinon.spy();
      action.on('port-rename', callback);
      action.renameIPort('p', 'p1');
      expect(callback.calledOnce).to.be.true;
      expect(callback.calledWith('p', 'p1', true));
    });

    it('doesn\'t notify if nothing changed', () => {
      const action = new Action(name, { i: { p: {} } });
      const callback = sinon.spy();
      action.on('port-rename', callback);
      action.renameIPort('p', 'p');
      expect(callback.called).to.be.false;
    });
  });

  describe('.renameOPort()', () => {

    it('throws when port does not exist', () => {
      const action = new Action(name);
      expect(() => action.renameOPort('p', 'b')).to.throw(Error);
    });

    it('throws when target name is already taken', () => {
      const action = new Action(name, { o: { p: {}, p1: {} } });
      expect(() => action.renameOPort('p', 'p1')).to.throw(Error);
    });

    it('renames port', () => {
      const action = new Action(name, { o: { p: {} } });
      action.renameOPort('p', 'p1');
      expect(action.o.p).to.not.exist;
      expect(action.o.p1).to.exist;
    });

    it('notifies about changes', () => {
      const action = new Action(name, { o: { p: {} } });
      const callback = sinon.spy();
      action.on('port-rename', callback);
      action.renameOPort('p', 'p1');
      expect(callback.calledOnce).to.be.true;
      expect(callback.calledWith('p', 'p1', true));
    });

    it('doesn\'t notify if nothing changed', () => {
      const action = new Action(name, { o: { p: {} } });
      const callback = sinon.spy();
      action.on('port-rename', callback);
      action.renameOPort('p', 'p');
      expect(callback.called).to.be.false;
    });
  });

});
