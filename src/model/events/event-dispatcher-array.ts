import WdlEventDispatcher from './event-dispatcher';
import {
  ArrayEvents,
  IEventDispatcherArray,
  IEventDispatcherArrayOptions,
} from './types';

class WdlEventDispatcherArray<T>
  extends Array<T>
  implements IEventDispatcherArray<T> {
  private readonly _dispatcher: WdlEventDispatcher<ArrayEvents, WdlEventDispatcherArray<T>>;

  constructor();
  constructor(options: IEventDispatcherArrayOptions<T>);
  /**
   * @param {IEventDispatcherArrayOptions<T>} [options]
   */
  constructor(options: IEventDispatcherArrayOptions<T> = {}) {
    super();
    const {
      onElementsAdded,
      onElementsRemoved,
    } = options || {};
    /**
     * @type {WdlEventDispatcher}
     * @private
     */
    this._dispatcher = new WdlEventDispatcher<ArrayEvents, WdlEventDispatcherArray<T>>();
    this._dispatcher.on(
      ArrayEvents.added,
      (event, sender, elements) => {
        if (elements.length > 0 && typeof onElementsAdded === 'function') {
          onElementsAdded(elements);
        }
      },
    );
    this._dispatcher.on(
      ArrayEvents.removed,
      (event, sender, elements) => {
        if (elements.length > 0 && typeof onElementsRemoved === 'function') {
          onElementsRemoved(elements);
        }
      },
    );
  }

  get dispatcher() {
    return this._dispatcher;
  }

  destroy() {
    this._dispatcher.destroy();
  }

  pop(): T | undefined {
    const result = super.pop();
    this.dispatcher.trigger(
      ArrayEvents.pop,
      this.dispatcher,
      result,
    );
    this.dispatcher.trigger(
      ArrayEvents.removed,
      this.dispatcher,
      [result],
    );
    this.dispatcher.trigger(
      ArrayEvents.changed,
      this.dispatcher,
    );
    return result;
  }

  push(...items: T[]): number {
    const result = super.push(...items);
    this.dispatcher.trigger(
      ArrayEvents.push,
      this.dispatcher,
      items,
    );
    this.dispatcher.trigger(
      ArrayEvents.added,
      this.dispatcher,
      items,
    );
    this.dispatcher.trigger(
      ArrayEvents.changed,
      this.dispatcher,
    );
    return result;
  }

  reverse() {
    const result = super.reverse();
    this.dispatcher.trigger(
      ArrayEvents.reordered,
      this.dispatcher,
    );
    this.dispatcher.trigger(
      ArrayEvents.changed,
      this.dispatcher,
    );
    return result;
  }

  sort(compareFn) {
    const result = super.sort(compareFn);
    this.dispatcher.trigger(
      ArrayEvents.reordered,
      this.dispatcher,
    );
    this.dispatcher.trigger(
      ArrayEvents.changed,
      this.dispatcher,
    );
    return result;
  }

  splice(start, deleteCount, ...items) {
    const result = super.splice(start, deleteCount, ...items);
    this.dispatcher.trigger(
      ArrayEvents.splice,
      this.dispatcher,
      result,
      items,
    );
    this.dispatcher.trigger(
      ArrayEvents.reordered,
      this.dispatcher,
    );
    this.dispatcher.trigger(
      ArrayEvents.removed,
      this.dispatcher,
      result,
    );
    this.dispatcher.trigger(
      ArrayEvents.changed,
      this.dispatcher,
    );
    return result;
  }

  shift() {
    const result = super.shift();
    this.dispatcher.trigger(
      ArrayEvents.shift,
      this.dispatcher,
      result,
    );
    this.dispatcher.trigger(
      ArrayEvents.reordered,
      this.dispatcher,
    );
    this.dispatcher.trigger(
      ArrayEvents.removed,
      this.dispatcher,
      [result],
    );
    this.dispatcher.trigger(
      ArrayEvents.changed,
      this.dispatcher,
    );
    return result;
  }

  unshift(...items) {
    const result = super.unshift(...items);
    this.dispatcher.trigger(
      ArrayEvents.unshift,
      this.dispatcher,
      items,
    );
    this.dispatcher.trigger(
      ArrayEvents.reordered,
      this.dispatcher,
      result,
    );
    this.dispatcher.trigger(
      ArrayEvents.added,
      this.dispatcher,
      items,
    );
    this.dispatcher.trigger(
      ArrayEvents.changed,
      this.dispatcher,
    );
    return result;
  }

  remove(...item: T[]): T[] {
    const removed: T[] = [];
    this.dispatcher.muteAction(() => {
      item.forEach((i) => {
        const idx = this.indexOf(i);
        if (idx >= 0) {
          removed.push(i);
          this.splice(idx, 1);
        }
      });
    });
    if (removed.length > 0) {
      this.dispatcher.trigger(
        ArrayEvents.removed,
        this.dispatcher,
        removed,
      );
      this.dispatcher.trigger(
        ArrayEvents.changed,
        this.dispatcher,
      );
    }
    return removed;
  }

  clear() {
    this.splice(0, this.length);
  }
}

export default WdlEventDispatcherArray;
