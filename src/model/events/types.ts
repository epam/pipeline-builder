/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IDestroyable {
  destroy(): void;
}

enum WdlEvent {
  // common events
  changed = 'changed',
  validation = 'validation',
  childrenAdded = 'children-added',
  childrenRemoved = 'children-removed',
  childrenChanged = 'children-changed',
  parentChanged = 'parent-changed',
  treeChanged = 'tree-changed',
  inputsAdded = 'inputs-added',
  inputsRemoved = 'inputs-removed',
  inputsChanged = 'inputs-changed',
  outputsAdded = 'outputs-added',
  outputsRemoved = 'outputs-removed',
  outputsChanged = 'outputs-changed',
  declarationsAdded = 'declarations-added',
  declarationsRemoved = 'declarations-removed',
  declarationsChanged = 'declarations-changed',
  parametersAdded = 'parameters-added',
  parametersRemoved = 'parameters-removed',
  parametersChanged = 'parameters-changed',
  nameChanged = 'name-changed',
  typeChanged = 'type-changed',
  valueChanged = 'value-changed',
  expressionChanged = 'expression-changed',
  connectionsChanged = 'connections-changed',
  inboundConnectionsAdded = 'inbound-connections-added',
  inboundConnectionsRemoved = 'inbound-connections-removed',
  inboundConnectionsChanged = 'inbound-connections-changed',
  outboundConnectionsAdded = 'outbound-connections-added',
  outboundConnectionsRemoved = 'outbound-connections-removed',
  outboundConnectionsChanged = 'outbound-connections-changed',
  parameterBind = 'parameter-bind',
  parameterUnbind = 'parameter-unbind',

  // document events
  importsAdded = 'imports-added',
  importsRemoved = 'imports-removed',
  importsChanged = 'imports-changed',
  workflowsAdded = 'workflows-added',
  workflowsRemoved = 'workflows-removed',
  workflowsChanged = 'workflows-changed',
  tasksAdded = 'tasks-added',
  tasksRemoved = 'tasks-removed',
  tasksChanged = 'tasks-changed',
  structsAdded = 'structs-added',
  structsRemoved = 'structs-removed',
  structsChanged = 'structs-changed',
  structPropertiesAdded = 'struct-properties-added',
  structPropertiesRemoved = 'struct-properties-removed',
  structPropertiesChanged = 'struct-properties-changed',

  // action events
  actionsAdded = 'actions-added',
  actionsRemoved = 'actions-removed',
  actionsChanged = 'actions-changed',

  // conditional events
  conditionChanged = 'condition-changed',

  // task events
  runtimeAdded = 'runtime-added',
  runtimeRemoved = 'runtime-removed',
  runtimeChanged = 'runtime-changed',
  runtimePropertyChanged = 'runtime-property-changed',
  commandChanged = 'command-changed',
  commandTypeChanged = 'command-type-changed',

  // executable (workflow or task) events
  metaAdded = 'meta-added',
  metaRemoved = 'meta-removed',
  metaChanged = 'meta-changed',
  metaElementChanged = 'meta-element-changed',

  // call events
  callAfterChanged = 'call-after-changed',
  executableChanged = 'call-executable-changed',
  executableParameterChanged = 'call-executable-parameter-changed',
}

declare type IEventHandlerCallback<
  Events extends string,
  T extends Events = Events,
  S = unknown,
> =
  (event: T, sender: S, ...args: any) => void;

const EventWildcard = '*';

export interface IEventHandler<
  Events extends string,
  T extends Events = Events,
  S = unknown,
> {
  readonly event: T | typeof EventWildcard;
  readonly callback: IEventHandlerCallback<Events, T, S>;
  readonly context?: IEventDispatcher<Events, S>;
  readonly priority: number;
  readonly order: number;
}

export interface IEventDispatcher<Events extends string, S = unknown> extends IDestroyable {
  on<T extends Events>(
    event: T | typeof EventWildcard,
    callback: IEventHandlerCallback<Events, T, S>
  ): void;
  on<T extends Events>(
    event: T | typeof EventWildcard,
    callback: IEventHandlerCallback<Events, T, S>,
    context: any,
  ): void;
  on<T extends Events>(
    event: T | typeof EventWildcard,
    callback: IEventHandlerCallback<Events, T, S>,
    context: any,
    priority: number
  ): void;
  off(): void;
  off<T extends Events>(event: T | typeof EventWildcard): void;
  off<T extends Events>(
    event: T | typeof EventWildcard,
    callback: IEventHandlerCallback<Events, T, S>,
  ): void;
  off<T extends Events>(
    event: T | typeof EventWildcard,
    callback: IEventHandlerCallback<Events, T, S>,
    context: any,
  ): void;
  trigger<T extends Events>(event: T): void;
  trigger<T extends Events>(event: T, sender: S, ...args: any[]): void;
}

export interface IEventDispatcherArrayOptions<T> {
  onElementsAdded?: (elements: T[]) => void;
  onElementsRemoved?: (elements: T[]) => void;
}

enum ArrayEvents {
  push = 'push',
  pop = 'pop',
  shift = 'shift',
  splice = 'splice',
  unshift = 'unshift',
  reordered = 'reordered',
  changed = 'changed',
  added = 'added',
  removed = 'removed',
}

export interface IEventDispatcherArray<T> extends Array<T>, IDestroyable {
  readonly dispatcher: IEventDispatcher<ArrayEvents, IEventDispatcherArray<T>>;
  clear(): void;
  remove(...item: T[]): T[];
}

export {
  WdlEvent,
  EventWildcard,
  ArrayEvents,
  IEventHandlerCallback,
};
