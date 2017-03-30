import _ from 'lodash';


function isUndefOrEqual(param, value) {
  return !param || param === value;
}

/**
 * This class introduces the simplest event system.
 */
export default class EventDispatcher {
  /**
   * Creates empty dispatcher.
   */
  constructor() {
    this._handlers = {};
  }

  /**
   * Binds callback on specific event. Optional `context` parameter
   * could be used as 'this' for the `callback`.
   * @param {string}   event     Event name.
   * @param {function} callback  Callback function.
   * @param {Object}   [context] 'This' object for the callback.
   */
  on(event, callback, context) {
    let handlers = this._handlers[event];

    if (!handlers) {
      this._handlers[event] = [];
      handlers = this._handlers[event];
    }

    const params = [callback, context];
    if (_.find(handlers, par => par[0] === params[0] && par[1] === params[1]) === undefined) {
      handlers.push(params);
    }
  }

  /**
   * Removes a previously-bound callback function from an object.
   * If no `context` is specified, all versions of the `callback` with different
   * contexts will be removed.
   * If no `callback` is specified, all callbacks of the `event` will be removed.
   * If no `event` is specified, callbacks for all events will be removed.
   * @param {?string}   [event]    Event name.
   * @param {function} [callback] Callback function.
   * @param {Object}   [context]  'This' object for the callback.
   */
  off(event, callback, context) {
    _.forEach(this._handlers, (handler, ev) => {
      _.remove(handler, values =>
        isUndefOrEqual(event, ev) &&
        isUndefOrEqual(callback, values[0]) &&
        isUndefOrEqual(context, values[1] || this));
    });

    const omitBy = _.omitBy || _.omit; // be prepared for legacy lodash 3.10.1
    this._handlers = omitBy(this._handlers, handler => handler.length === 0);
  }

  /**
   * Makes all the callbacks for the specific `event` to trigger.
   * @param {string} event Event name.
   * @param {...*}   args  Arguments to be passed to the callback.
   */
  trigger(event, ...args) {
    _.forEach(this._handlers[event], (callback) => {
      const context = callback[1] || this;
      callback[0].apply(context, args);
    });
  }
}
