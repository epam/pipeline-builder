import { WdlEvent } from '../events';
import { IWdlEntity } from '../types';
import { IEventHandlerCallback } from '../events/types';

const eventsMapping: Record<WdlEvent, string | undefined> = {
  // common events
  [WdlEvent.changed]: undefined,
  [WdlEvent.validation]: undefined,
  [WdlEvent.childrenAdded]: 'children',
  [WdlEvent.childrenRemoved]: 'children',
  [WdlEvent.childrenChanged]: 'children',
  [WdlEvent.parentChanged]: 'parent',
  [WdlEvent.treeChanged]: 'tree',
  [WdlEvent.inputsAdded]: 'inputs',
  [WdlEvent.inputsRemoved]: 'inputs',
  [WdlEvent.inputsChanged]: 'inputs',
  [WdlEvent.outputsAdded]: 'outputs',
  [WdlEvent.outputsRemoved]: 'outputs',
  [WdlEvent.outputsChanged]: 'outputs',
  [WdlEvent.declarationsAdded]: 'declarations',
  [WdlEvent.declarationsRemoved]: 'declarations',
  [WdlEvent.declarationsChanged]: 'declarations',
  [WdlEvent.parametersAdded]: 'parameters',
  [WdlEvent.parametersRemoved]: 'parameters',
  [WdlEvent.parametersChanged]: 'parameters',
  [WdlEvent.nameChanged]: 'name',
  [WdlEvent.typeChanged]: 'type',
  [WdlEvent.valueChanged]: 'value',
  [WdlEvent.expressionChanged]: 'expression',
  [WdlEvent.connectionsChanged]: 'connections',
  [WdlEvent.inboundConnectionsAdded]: 'inbound',
  [WdlEvent.inboundConnectionsRemoved]: 'inbound',
  [WdlEvent.inboundConnectionsChanged]: 'inbound',
  [WdlEvent.outboundConnectionsAdded]: 'outbound',
  [WdlEvent.outboundConnectionsRemoved]: 'outbound',
  [WdlEvent.outboundConnectionsChanged]: 'outbound',
  [WdlEvent.parameterBind]: 'parameter',
  [WdlEvent.parameterUnbind]: 'parameter',

  // document events
  [WdlEvent.importsAdded]: 'imports',
  [WdlEvent.importsRemoved]: 'imports',
  [WdlEvent.importsChanged]: 'imports',
  [WdlEvent.workflowsAdded]: 'workflows',
  [WdlEvent.workflowsRemoved]: 'workflows',
  [WdlEvent.workflowsChanged]: 'workflows',
  [WdlEvent.tasksAdded]: 'tasks',
  [WdlEvent.tasksRemoved]: 'tasks',
  [WdlEvent.tasksChanged]: 'tasks',
  [WdlEvent.structsAdded]: 'structs',
  [WdlEvent.structsRemoved]: 'structs',
  [WdlEvent.structsChanged]: 'structs',
  [WdlEvent.structPropertiesAdded]: 'struct',
  [WdlEvent.structPropertiesRemoved]: 'struct',
  [WdlEvent.structPropertiesChanged]: 'struct',

  // action events
  [WdlEvent.actionsAdded]: 'actions',
  [WdlEvent.actionsRemoved]: 'actions',
  [WdlEvent.actionsChanged]: 'actions',

  // conditional events
  [WdlEvent.conditionChanged]: 'condition',

  // task events
  [WdlEvent.runtimeAdded]: 'runtime',
  [WdlEvent.runtimeRemoved]: 'runtime',
  [WdlEvent.runtimeChanged]: 'runtime',
  [WdlEvent.runtimePropertyChanged]: 'runtime',
  [WdlEvent.commandChanged]: 'command',
  [WdlEvent.commandTypeChanged]: 'command',

  // executable (workflow or task) events
  [WdlEvent.metaAdded]: 'meta',
  [WdlEvent.metaRemoved]: 'meta',
  [WdlEvent.metaChanged]: 'meta',
  [WdlEvent.metaElementChanged]: 'meta',

  // call events
  [WdlEvent.callAfterChanged]: 'call',
  [WdlEvent.executableChanged]: 'action',
  [WdlEvent.executableParameterChanged]: 'executable-parameter',
};

declare type ForwardCallback = IEventHandlerCallback<WdlEvent>;

export interface ForwardEventHandler {
  event: WdlEvent;
  callback: ForwardCallback;
}

export interface IForwardEventOptions {
  from: IWdlEntity;
  senderChecker?: (sender: IWdlEntity) => boolean;
  eventsMap?: Record<keyof WdlEvent, WdlEvent>;
}

class EventForwarder {
  private readonly _parent: IWdlEntity;

  private readonly _map: WeakMap<IWdlEntity, ForwardEventHandler[]>;

  private _stopped: boolean;

  constructor(parent: IWdlEntity) {
    this._parent = parent;
    this._stopped = false;
    this._map = new WeakMap<IWdlEntity, ForwardEventHandler[]>();
  }

  private forwardEventGenerator(
    options: IForwardEventOptions,
  ): ForwardCallback {
    const parent = this._parent;
    const isStopped = () => this._stopped;
    const {
      from,
      senderChecker = (sender: IWdlEntity) => from === sender,
      eventsMap,
    } = options;
    const getMappedEvent = (sourceEvent: WdlEvent): WdlEvent => {
      if (!eventsMap || !eventsMap[sourceEvent]) {
        return sourceEvent;
      }
      return eventsMap[sourceEvent];
    };
    return function forwardEvent(event: WdlEvent, sender: IWdlEntity, ...args: unknown[]) {
      if (senderChecker(sender) && !isStopped()) {
        const mapped = getMappedEvent(event);
        parent.bubble(mapped, ...args);
        const changed = eventsMapping[mapped];
        if (changed) {
          parent.bubble(
            WdlEvent.changed,
            {
              changed,
              forward: true,
              forwardedFrom: sender,
              forwardedTo: parent,
            },
          );
        }
      }
    };
  }

  private configureForwardEventsFrom(
    options: IForwardEventOptions,
    events: WdlEvent[],
  ): void {
    this._stopped = false;
    const forwardEvent = this.forwardEventGenerator(options);
    const handlers: ForwardEventHandler[] = this._map.has(options.from)
      ? this._map.get(options.from)
      : [];
    events.forEach((e) => {
      handlers.push({
        event: e,
        callback: forwardEvent,
      });
      options.from.on(e, forwardEvent, this);
    });
    this._map.set(options.from, handlers);
  }

  startForwardEvents(sender: IWdlEntity, ...event: WdlEvent[]): void {
    this.configureForwardEventsFrom({ from: sender }, event);
  }

  startForwardEventsWithOptions(options: IForwardEventOptions, ...event: WdlEvent[]): void {
    this.configureForwardEventsFrom(options, event);
  }

  stopForwardEventsFrom(sender: IWdlEntity): void {
    if (this._map.has(sender)) {
      const handlers = this._map.get(sender) || [];
      handlers.forEach((handler) => {
        sender.off(handler.event, handler.callback);
      });
      this._map.delete(sender);
    }
  }

  stopForwardEvents(): void {
    this._stopped = true;
  }
}

export default EventForwarder;
