/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EventWildcard,
  IEventDispatcher,
  IEventHandler,
  IEventHandlerCallback,
  WdlEvent,
} from './types';

interface ITriggerQueueItem<Events extends string, E extends Events = Events> {
  readonly event: E;
  readonly sender: IEventDispatcher<Events>;
  args: any[];
}

function handlersPrioritySorter<
  Events extends string,
  T1 extends Events,
  T2 extends Events>(
  handler1: IEventHandler<Events, T1>,
  handler2: IEventHandler<Events, T2>,
): number {
  if (handler1.priority === handler2.priority) {
    return handler1.order - handler2.order;
  }
  return handler2.priority - handler1.priority;
}

/**
 * @typedef {Object} TriggerQueueEvent
 * @property {string} event
 * @property {any[]} args
 */

class WdlEventDispatcher<
  Events extends string = WdlEvent,
  Sender = unknown,
> implements IEventDispatcher<Events, Sender> {
  /**
   * @type {IEventHandler[]}
   * @private
   */
  private _handlers: IEventHandler<Events, Events, Sender>[];

  /**
   * @type {boolean}
   * @private
   */
  private _muted: boolean;

  private _mutedToken: any;

  /**
   * @type {Set<string>}
   * @private
   */
  private _currentTriggers: Set<string>;

  /**
   * @type {ITriggerQueueItem[]}
   * @private
   */
  private _triggerQueue: ITriggerQueueItem<Events>[];

  constructor() {
    this._handlers = [];
    this._muted = false;
    this._currentTriggers = new Set();
    this._triggerQueue = [];
  }

  destroy() {
    this.off();
  }

  protected get muted(): boolean {
    return !!this._mutedToken;
  }

  on<T extends Events>(
    event: T | typeof EventWildcard,
    callback: IEventHandlerCallback<Events, T, Sender>
  ): void;
  on<T extends Events>(
    event: T | typeof EventWildcard,
    callback: IEventHandlerCallback<Events, T, Sender>,
    context: any,
  ): void;
  on<T extends Events>(
    event: T | typeof EventWildcard,
    callback: IEventHandlerCallback<Events, T, Sender>,
    context: any,
    priority: number
  ): void;
  /**
   * Binds callback on specific event. Optional `context` parameter
   * could be used as 'this' for the `callback`.
   * @param {string}   event     Event name.
   * @param {function} callback  Callback function.
   * @param {Object}   [context] 'This' object for the callback.
   * @param {number}   [priority] handler priority
   */
  on<T extends Events>(
    event: T | typeof EventWildcard,
    callback: IEventHandlerCallback<Events, T, Sender>,
    context?: any,
    priority?: number,
  ): void {
    this.off(event, callback, context);
    this._handlers.push({
      event,
      callback,
      context,
      priority: priority || 0,
      order: this._handlers.length,
    });
    this._handlers.sort(handlersPrioritySorter);
  }

  off(): void;
  off<T extends Events>(event: T | typeof EventWildcard): void;
  off<T extends Events>(
    event: T | typeof EventWildcard,
    callback: IEventHandlerCallback<Events, T, Sender>,
  ): void;
  off<T extends Events>(
    event: T | typeof EventWildcard,
    callback: IEventHandlerCallback<Events, T, Sender>,
    context: any,
  ): void;
  /**
   * Removes a previously-bound callback function from an object.
   * If no `context` is specified, all versions of the `callback` with different
   * contexts will be removed.
   * If no `callback` is specified, all callbacks of the `event` will be removed.
   * If no `event` is specified, callbacks for all events will be removed.
   * @param {?string}   [event]    Event name.
   * @param {IEventHandlerCallback} [callback] Callback function.
   * @param {IEventDispatcher}   [context]  'This' object for the callback.
   */
  off<T extends Events>(
    event?: T,
    callback?: IEventHandlerCallback<Events, T, Sender>,
    context?: any,
  ): void {
    this._handlers = this._handlers.filter((eventHandler) => event && (
      event !== eventHandler.event
            || (!!callback && eventHandler.callback !== callback)
            || (!!context && eventHandler.context !== context)
    ));
  }

  private pushTriggerEventToQueue<T extends Events>(
    event: T,
    sender: IEventDispatcher<Events>,
    ...args: any[]
  ): void {
    const current = this._triggerQueue.find((q) => q.event === event
      && q.sender === sender);
    if (!current) {
      this._triggerQueue.push({
        event,
        sender,
        args,
      });
    } else {
      current.args = args;
    }
  }

  /**
     * @param {string} event
     * @returns {TriggerQueueEvent|undefined}
     * @private
     */
  private popTriggerEventFromQueue<T extends Events>(
    event: T,
  ): ITriggerQueueItem<Events, T> | undefined {
    const element = this._triggerQueue.find((q) => q.event === event);
    const idx = this._triggerQueue.indexOf(element);
    if (idx >= 0) {
      this._triggerQueue.splice(idx, 1);
    }
    return element as ITriggerQueueItem<Events, T>;
  }

  trigger<T extends Events>(event: T): void;
  trigger<T extends Events>(
    event: T,
    sender: IEventDispatcher<Events>,
    ...args: any[]
  ): void;
  trigger<T extends Events>(
    event: T,
    sender: IEventDispatcher<Events> = this,
    ...args: any[]
  ): void {
    if (this.muted) {
      return;
    }
    if (this._currentTriggers.has(event)) {
      this.pushTriggerEventToQueue(event, sender, ...args);
      return;
    }
    this._currentTriggers.add(event);
    this._handlers
      .filter((eventHandler) => eventHandler.event === event
        || eventHandler.event === EventWildcard)
      .forEach((eventHandler) => {
        const {
          callback,
          context,
        } = eventHandler;
        if (typeof callback === 'function') {
          callback.call(context || this, event, sender, ...args);
        }
      });
    this._currentTriggers.delete(event);
    const next = this.popTriggerEventFromQueue(event);
    if (next) {
      this.trigger(event, next.sender, next.args);
    }
  }

  muteAction<T extends any | void>(action: () => T): T {
    const previous = this._mutedToken;
    this._mutedToken = {};
    const result = action();
    this._mutedToken = previous;
    return result;
  }
}

export default WdlEventDispatcher;
