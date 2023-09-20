import WdlEventDispatcherArray from './event-dispatcher-array';
import { IWdlEntity, WdlEvent } from '../types';

export interface IChangedEvent<T extends WdlEvent> {
  event: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args?: any[];
  spread?: boolean;
  bubble?: boolean;
}

export type TChangedEvent
  <T extends WdlEvent = WdlEvent> = undefined | string | IChangedEvent<T>;

function getChangedEventConfig<T extends WdlEvent>(
  event: TChangedEvent<T>,
): IChangedEvent<T> | undefined {
  if (typeof event === 'undefined') {
    return undefined;
  }
  if (typeof event === 'string') {
    return {
      event: event as T,
      spread: false,
      bubble: true,
    };
  }
  return event;
}

function fireEvent<T, E extends WdlEvent>(
  event: TChangedEvent<E>,
  elements: T[],
  receiver: IWdlEntity,
): void {
  const config = getChangedEventConfig(event);
  if (!config) {
    return;
  }
  const {
    event: eventName,
    spread = false,
    bubble = false,
    args,
  } = config;
  const eventArgs = args === undefined ? [elements] : args;
  if (spread || bubble) {
    if (spread) {
      receiver.spread(eventName, ...eventArgs);
    }
    if (bubble) {
      receiver.bubble(eventName, ...eventArgs);
    }
  } else {
    receiver.trigger(eventName, receiver, ...eventArgs);
  }
}

function asEventsArray(
  event: TChangedEvent | TChangedEvent[],
): TChangedEvent[] {
  if (event && Array.isArray(event)) {
    return event;
  }
  return [event as TChangedEvent];
}

/**
 * @param {IWdlEntity} receiver
 * @param {string} addedEvent
 * @param {string} removedEvent
 * @param {string} changedEvent
 * @returns {IEventDispatcherArray}
 */
function createEventDispatcherArray<T>(
  receiver: IWdlEntity,
  addedEvent: TChangedEvent | TChangedEvent[],
  removedEvent: TChangedEvent | TChangedEvent[],
  changedEvent: TChangedEvent | TChangedEvent[],
): WdlEventDispatcherArray<T> {
  return new WdlEventDispatcherArray({
    onElementsAdded: (elements) => {
      asEventsArray(addedEvent).forEach((event) => fireEvent(event, elements, receiver));
      asEventsArray(changedEvent).forEach((event) => fireEvent(event, elements, receiver));
    },
    onElementsRemoved: (elements) => {
      asEventsArray(removedEvent).forEach((event) => fireEvent(event, elements, receiver));
      asEventsArray(changedEvent).forEach((event) => fireEvent(event, elements, receiver));
    },
  });
}

export default createEventDispatcherArray;
