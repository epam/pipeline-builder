import { expect } from 'chai';
import sinon from 'sinon';
import EventDispatcher from '../../src/model/EventDispatcher';

describe('model/EventDispatcher', () => {
  const name = 'test';

  describe('.trigger()', () => {
    it('calls callback on event', () => {
      const dispatcher = new EventDispatcher();
      const callback = sinon.spy();

      dispatcher.on(name, callback);
      dispatcher.trigger(name);

      expect(callback.calledOnce).to.be.true;
    });

    it('registers callback with same context only once', () => {
      // TODO does this test has correct description?
      const dispatcher = new EventDispatcher();
      const callback = sinon.spy();

      dispatcher.on(name, callback);
      dispatcher.on(name, callback);
      dispatcher.trigger(name);

      expect(callback.calledOnce).to.be.true;
    });

    it('calls multiple callbacks on event', () => {
      const dispatcher = new EventDispatcher();
      const callback = sinon.spy();
      const callback1 = sinon.spy();

      dispatcher.on(name, callback);
      dispatcher.on(name, callback1);
      dispatcher.trigger(name);

      expect(callback.calledOnce).to.be.true;
      expect(callback1.calledOnce).to.be.true;
    });

    it('uses the dispatcher as default context', () => {
      const dispatcher = new EventDispatcher();
      const callback = sinon.spy();

      dispatcher.on(name, callback);
      dispatcher.trigger(name);

      expect(callback.calledOn(dispatcher)).to.be.true;
    });

    it('uses custom context properly', () => {
      const dispatcher = new EventDispatcher();
      const callback = sinon.spy();
      const stubObj = {};

      dispatcher.on(name, callback, stubObj);
      dispatcher.trigger(name);

      expect(callback.calledOn(stubObj)).to.be.true;
    });

    it('triggers multiple times', () => {
      const dispatcher = new EventDispatcher();
      const callback = sinon.spy();

      dispatcher.on(name, callback);
      dispatcher.trigger(name);
      dispatcher.trigger(name);

      expect(callback.calledTwice).to.be.true;
    });

    it('calls same function with different contexts', () => {
      const dispatcher = new EventDispatcher();
      const callback = sinon.spy();
      const stubObj = {};

      dispatcher.on(name, callback);
      dispatcher.on(name, callback, stubObj);
      dispatcher.trigger(name);

      expect(callback.calledTwice).to.be.true;
      if (callback.getCall(0).calledOn(dispatcher)) {
        expect(callback.getCall(1).calledOn(stubObj)).to.be.true;
      } else {
        expect(callback.getCall(0).calledOn(stubObj)).to.be.true;
        expect(callback.getCall(1).calledOn(dispatcher)).to.be.true;
      }
    });

    it('preserves passed arguments', () => {
      const dispatcher = new EventDispatcher();
      const callback = sinon.spy();
      const a1 = 1;
      const a2 = 'str';
      const a3 = { o: { a: 1 } };

      dispatcher.on(name, callback);
      dispatcher.trigger(name, a1, a2, a3);

      expect(callback.calledOnce).to.be.true;
      expect(callback.alwaysCalledWithExactly(a1, a2, a3)).to.be.true;
    });
  });

  describe('.off()', () => {
    const name1 = 'test1';
    const obj = {};

    function init() {
      const dispatcher = new EventDispatcher();
      const callback = sinon.spy();
      const callback1 = sinon.spy();
      const callback2 = sinon.spy();

      dispatcher.on(name, callback);
      dispatcher.on(name, callback, obj);
      dispatcher.on(name, callback1);
      dispatcher.on(name, callback1, obj);
      dispatcher.on(name1, callback2);
      dispatcher.on(name1, callback2, obj);

      return {
        dispatcher,
        callback,
        callback1,
        callback2,
      };
    }

    it('removes all callbacks if all params are unspecified', () => {
      const { dispatcher, callback, callback1, callback2 } = init();
      dispatcher.off();
      dispatcher.trigger(name);
      dispatcher.trigger(name1);

      expect(callback.notCalled).to.be.true;
      expect(callback1.notCalled).to.be.true;
      expect(callback2.notCalled).to.be.true;
    });

    it('removes all callbacks for specified event', () => {
      const { dispatcher, callback, callback1, callback2 } = init();
      dispatcher.off(name);
      dispatcher.trigger(name);
      dispatcher.trigger(name1);

      expect(callback.notCalled).to.be.true;
      expect(callback1.notCalled).to.be.true;
      expect(callback2.calledTwice).to.be.true;
      expect(callback2.calledOn(dispatcher)).to.be.true;
      expect(callback2.calledOn(obj)).to.be.true;
    });

    it('removes specified callbacks', () => {
      const { dispatcher, callback, callback1, callback2 } = init();
      dispatcher.off(null, callback);
      dispatcher.trigger(name);
      dispatcher.trigger(name1);

      expect(callback.notCalled).to.be.true;
      expect(callback1.calledTwice).to.be.true;
      expect(callback1.calledOn(dispatcher)).to.be.true;
      expect(callback1.calledOn(obj)).to.be.true;
      expect(callback2.calledTwice).to.be.true;
      expect(callback2.calledOn(dispatcher)).to.be.true;
      expect(callback2.calledOn(obj)).to.be.true;
    });

    it('removes all callbacks with specified context', () => {
      const { dispatcher, callback, callback1, callback2 } = init();
      dispatcher.off(null, null, dispatcher);
      dispatcher.trigger(name);
      dispatcher.trigger(name1);

      expect(callback.calledOnce).to.be.true;
      expect(callback.calledOn(obj)).to.be.true;
      expect(callback1.calledOnce).to.be.true;
      expect(callback1.calledOn(obj)).to.be.true;
      expect(callback2.calledOnce).to.be.true;
      expect(callback2.calledOn(obj)).to.be.true;
    });

    it('removes specified callbacks for specified event', () => {
      const { dispatcher, callback, callback1, callback2 } = init();
      dispatcher.off(name, callback);
      dispatcher.trigger(name);
      dispatcher.trigger(name1);

      expect(callback.notCalled).to.be.true;
      expect(callback1.calledTwice).to.be.true;
      expect(callback1.calledOn(dispatcher)).to.be.true;
      expect(callback1.calledOn(obj)).to.be.true;
      expect(callback2.calledTwice).to.be.true;
      expect(callback2.calledOn(dispatcher)).to.be.true;
      expect(callback2.calledOn(obj)).to.be.true;
    });

    it('removes callbacks for specified event and context', () => {
      const { dispatcher, callback, callback1, callback2 } = init();
      dispatcher.off(name, null, obj);
      dispatcher.trigger(name);
      dispatcher.trigger(name1);

      expect(callback.calledOnce).to.be.true;
      expect(callback.calledOn(dispatcher)).to.be.true;
      expect(callback1.calledOnce).to.be.true;
      expect(callback1.calledOn(dispatcher)).to.be.true;
      expect(callback2.calledTwice).to.be.true;
      expect(callback2.calledOn(dispatcher)).to.be.true;
      expect(callback2.calledOn(obj)).to.be.true;
    });

    it('removes specified callbacks with specified context', () => {
      const { dispatcher, callback, callback1, callback2 } = init();
      dispatcher.off(null, callback, obj);
      dispatcher.trigger(name);
      dispatcher.trigger(name1);

      expect(callback.calledOnce).to.be.true;
      expect(callback.calledOn(dispatcher)).to.be.true;
      expect(callback1.calledTwice).to.be.true;
      expect(callback1.calledOn(dispatcher)).to.be.true;
      expect(callback1.calledOn(obj)).to.be.true;
      expect(callback2.calledTwice).to.be.true;
      expect(callback2.calledOn(dispatcher)).to.be.true;
      expect(callback2.calledOn(obj)).to.be.true;
    });

    it('removes exact callback when event, callback and context are specified', () => {
      const { dispatcher, callback, callback1, callback2 } = init();
      dispatcher.off(name, callback, dispatcher);
      dispatcher.trigger(name);
      dispatcher.trigger(name1);

      expect(callback.calledOnce).to.be.true;
      expect(callback.alwaysCalledOn(obj)).to.be.true;
      expect(callback1.calledTwice).to.be.true;
      expect(callback2.calledTwice).to.be.true;
    });
  });
});
