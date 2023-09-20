/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */
import {
  ArrayEvents,
  createEventDispatcherArray,
  WdlEvent,
  WdlEventDispatcher,
} from '../events';
import {
  compareVersions,
  ContextTypes,
  ContextTypeSymbol,
  IAction,
  IExecutable,
  isAction,
  isWdlEntityWithNameOptions,
  IWdlDocument,
  IWdlEntity,
  IWdlEntityOptions,
  IWdlEntitySearch,
  IWdlEntitySearchOptions,
  IWdlEntityWithNameOptions,
  IWdlError,
  IWorkflow,
  TActionTypes,
  WdlVersion,
} from '../types';
import { EventWildcard, IEventDispatcherArray } from '../events/types';
import getFullyQualifiedName from '../utilities/fully-qualified-name';
import {
  filterErrors, filterWarnings, NameRequiredError, WdlValidationError, WrongIdentifierError,
} from '../validation';
import escapeRegExp from '../utilities/escape-reg-exp';
import EventForwarder, { IForwardEventOptions } from './event-forwarder';

function requiresName(contextType: ContextTypes): boolean {
  return [
    ContextTypes.workflow,
    ContextTypes.task,
    ContextTypes.declaration,
    ContextTypes.input,
    ContextTypes.output,
    ContextTypes.struct,
  ].includes(contextType);
}

function requiresReference(contextType: ContextTypes): boolean {
  return requiresName(contextType) || [
    ContextTypes.call,
  ].includes(contextType);
}

function requiresOptions(contextType: ContextTypes): boolean {
  return requiresName(contextType);
}

function getUUIDGenerator(defaultPrefix = ''): ((prefix?: string) => string) {
  let last = 0;
  return (prefix = defaultPrefix) => {
    last += 1;
    if (prefix && prefix.length && !prefix.endsWith('-')) {
      return `${prefix}-${last}`;
    }
    return `${prefix || ''}${last}`;
  };
}

function getUniqueObjects<T>(objects: T[]): T[] {
  return [...new Set([...objects])];
}

abstract class WdlEntity<T extends ContextTypes>
  extends WdlEventDispatcher<WdlEvent, IWdlEntity>
  implements IWdlEntity<T> {
  /**
   * @type {function(string?): string}
   */
  static generateUUID = getUUIDGenerator('wdl-entity');

  private readonly _uuid: string;

  private _name: string | undefined;

  private _alias: string;

  private _parent: WdlEntity<any>;

  private readonly _children: IEventDispatcherArray<WdlEntity<any>>;

  private _issues: IWdlError[];

  private _entityIssues: IWdlError[];

  private readonly _eventForwarder: EventForwarder;

  protected constructor(contextType: T);
  protected constructor(contextType: T, options: IWdlEntityOptions | IWdlEntityWithNameOptions);
  /**
   * @param {ContextTypes} contextType
   * @param {IWdlEntityOptions} options
   */
  protected constructor(
    contextType: T,
    options: IWdlEntityOptions | IWdlEntityWithNameOptions = undefined,
  ) {
    if (!contextType) {
      throw new Error('Context type of the Wdl entity is not provided');
    }
    if (!options && requiresOptions(contextType)) {
      throw new Error(`${contextType} options are not provided`);
    }
    if ((!options || !isWdlEntityWithNameOptions(options)) && requiresName(contextType)) {
      throw new Error(`${contextType} name is not provided`);
    }
    super();
    this[ContextTypeSymbol] = contextType;
    this._uuid = WdlEntity.generateUUID(contextType.toString());
    this._issues = [];
    this._entityIssues = [];
    this._eventForwarder = new EventForwarder(this);
    let name: string | undefined;
    let alias: string | undefined;
    if (isWdlEntityWithNameOptions(options)) {
      name = options.name;
      alias = options.alias;
    }
    /**
     * @type {string}
     * @private
     */
    this._name = name;
    /**
     * @type {string}
     * @private
     */
    this._alias = alias;
    this._parent = undefined;
    this._children = createEventDispatcherArray(
      this,
      { event: WdlEvent.childrenAdded, bubble: false },
      { event: WdlEvent.childrenRemoved, bubble: false },
      { event: WdlEvent.childrenChanged, bubble: false },
    );
    const setParent = (child: WdlEntity<any>) => {
      child.parent = this;
    };
    const unsetParent = (child: WdlEntity<any>) => {
      if (child.parent === this) {
        child.parent = undefined;
      }
    };
    this.on(
      WdlEvent.childrenAdded,
      (event, sender, added) => added.forEach(setParent),
    );
    this.on(
      WdlEvent.childrenRemoved,
      (event, sender, removed) => removed.forEach(unsetParent),
    );
    this.on(WdlEvent.treeChanged, this.onTreeChanged, this);
    this.on(EventWildcard, this.checkRequiresValidation, this);
    this.on(WdlEvent.validation, this.onValidated, this);
  }

  destroy() {
    super.destroy();
    this._eventForwarder.stopForwardEvents();
  }

  /**
   * Internal unique identifier
   * @returns {string}
   */
  get uuid() {
    return this._uuid;
  }

  get contextType(): T {
    return this[ContextTypeSymbol];
  }

  get version(): WdlVersion {
    if (this.document) {
      return this.document.version;
    }
    return WdlVersion.v1_1;
  }

  get name() {
    return this.getName();
  }

  set name(name) {
    this.setName(name);
  }

  get alias() {
    return this._alias;
  }

  set alias(alias) {
    if (alias !== this._alias) {
      const newAlias = alias === this._name ? undefined : alias;
      if (newAlias !== this._alias) {
        this._alias = newAlias;
        this.bubble(WdlEvent.nameChanged);
        this.bubble(WdlEvent.changed, { changed: 'name' });
      }
    }
  }

  get reference() {
    return this.alias || this.name;
  }

  /**
   * Execution stack, i.e. a list of parent actions (`ICall`, `IConditional`,
   * `Scatter`, `Task` and `Workflow`) from current entity's action to the
   * root action.
   * @example
   * For input of the call within the scatter:
   * [call, scatter, workflow]
   * @returns {IWdlEntity[]}
   */
  get stack(): IAction[] {
    const self = isAction(this) ? [this] : [];
    if (this.parent) {
      return [
        ...self,
        ...this.parent.stack,
      ];
    }
    return self;
  }

  /**
   * @returns {WdlEntity|undefined}
   */
  get parent(): WdlEntity<any> {
    return this._parent;
  }

  /**
   * @param {WdlEntity|undefined} parent
   */
  set parent(parent: WdlEntity<any>) {
    this.addToParent(parent as WdlEntity<any>);
  }

  /**
   * @returns {IWdlEntity[]}
   */
  get children(): WdlEntity<any>[] {
    return this._children as WdlEntity<any>[];
  }

  /**
   * @returns {IWdlDocument|undefined}
   */
  get document(): IWdlDocument {
    return this.getClosestWdlEntityOfType(ContextTypes.document);
  }

  /**
   * @returns {IExecutable|undefined}
   */
  get currentExecutable(): IExecutable | undefined {
    return this.getClosestWdlEntityOfType(ContextTypes.workflow, ContextTypes.task);
  }

  /**
   * @returns {IWorkflow|undefined}
   */
  get currentWorkflow(): IWorkflow | undefined {
    return this.getClosestWdlEntityOfType(ContextTypes.workflow);
  }

  get currentAction(): IAction | undefined {
    return this.getClosestWdlEntityOfType(
      ContextTypes.workflow,
      ContextTypes.task,
      ContextTypes.call,
      ContextTypes.scatter,
      ContextTypes.conditional,
    );
  }

  get root(): IWdlEntity {
    if (this.parent === undefined) {
      return this;
    }
    return this.parent.root;
  }

  /**
   * Entity & children entities errors & warnings
   */
  get issues(): IWdlError[] {
    return this._issues;
  }

  /**
   * Entity & children entities errors
   */
  get errors(): IWdlError[] {
    return this.issues.filter(filterErrors);
  }

  /**
   * Entity & children entities warnings
   */
  get warnings(): IWdlError[] {
    return this.issues.filter(filterWarnings);
  }

  /**
   * `true` if entity and its children are valid
   */
  get valid(): boolean {
    return this.errors.length === 0;
  }

  /**
   * `true` if entity or its children contain issues
   */
  get containsIssues(): boolean {
    return this.issues.length > 0;
  }

  get entityIssues(): IWdlError[] {
    return this._entityIssues;
  }

  get entityErrors(): IWdlError[] {
    return this.entityIssues.filter(filterErrors);
  }

  get entityWarnings(): IWdlError[] {
    return this.entityIssues.filter(filterWarnings);
  }

  get entityValid(): boolean {
    return this.entityErrors.length === 0;
  }

  get entityContainsIssues(): boolean {
    return this.entityIssues.length > 0;
  }

  protected get eventsRequireValidation(): Set<WdlEvent> {
    return new Set([
      requiresReference(this.contextType)
        ? WdlEvent.nameChanged
        : false,
      WdlEvent.parentChanged,
      WdlEvent.childrenChanged,
    ].filter(Boolean) as WdlEvent[]);
  }

  supports(version: WdlVersion): boolean {
    return compareVersions(this.version, version) >= 0;
  }

  protected getName(): string {
    return this._name;
  }

  protected setName(name: string): void {
    if (name !== this._name) {
      this._name = name;
      this.bubble(WdlEvent.nameChanged);
      this.bubble(WdlEvent.changed, { changed: 'name' });
    }
  }

  private getClosestWdlEntityOfType(...contextType: ContextTypes[]) {
    if (contextType.includes(this.contextType)) {
      return this;
    }
    if (this._parent) {
      return this._parent.getClosestWdlEntityOfType(...contextType);
    }
    return undefined;
  }

  /**
   * @param {WdlEntity|undefined} parent
   * @private
   */
  private addToParent(parent: WdlEntity<any> | undefined) {
    if (parent !== this._parent) {
      const current = this._parent;
      // Removing from previous parent
      if (this._parent) {
        this._parent = undefined;
        if (current.children.includes(this)) {
          const idx = current.children.indexOf(this);
          if (idx >= 0) {
            current.children.splice(idx, 1);
          }
        }
      }
      this._parent = parent;
      if (parent && !parent.children.includes(this)) {
        parent.children.push(this);
      }
      this.reportParentChanged();
    }
  }

  /**
   * @param {IEventDispatcherArray<IWdlEntity>} array
   */
  protected registerChildrenContainer<
    ChildContextType extends ContextTypes,
    ChildEntityType extends IWdlEntity<ChildContextType>>(
    array: IEventDispatcherArray<ChildEntityType>,
  ): void {
    array.dispatcher.on(
      ArrayEvents.added,
      (event, sender, added: ChildEntityType[]) => added.forEach((sub) => {
        sub.parent = this;
      }),
      this,
      Infinity,
    );
    array.dispatcher.on(
      ArrayEvents.removed,
      (event, sender, removed: ChildEntityType[]) => removed.forEach((sub) => {
        if (sub.parent === this) {
          sub.parent = undefined;
        }
      }),
      this,
      Infinity,
    );
    array.dispatcher.on(
      ArrayEvents.changed,
      this.informTreeChanged,
      this,
    );
    this.on(
      WdlEvent.childrenRemoved,
      (event, sender, removed) => {
        if (sender === this) {
          array.remove(...removed);
        }
      },
      this,
    );
  }

  private reportParentChanged() {
    this.bubble(WdlEvent.parentChanged);
    this.bubble(WdlEvent.changed, { changed: 'parent' });
    this.informTreeChanged();
  }

  protected informTreeChanged(): void {
    const { root } = this;
    if (root) {
      root.spread(WdlEvent.treeChanged, this);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  protected onTreeChanged() {
    // empty
  }

  private getReferenceRelativeToAction<C extends TActionTypes>(
    entity: IAction<C> | undefined,
  ): string {
    let stack: IWdlEntity[] = this.stack.slice();
    if (!isAction(this)) {
      stack = [this, ...stack];
    }
    stack = stack.reverse();
    const idx = stack.indexOf(entity) + 1;
    return getFullyQualifiedName(stack.slice(idx));
  }

  isParentFor(entity: IWdlEntity): boolean {
    return entity && (entity.parent === this || this.isParentFor(entity.parent));
  }

  /**
   * @param {IWdlEntity} entity
   * @returns {string|undefined}
   */
  getReferenceFor(entity: IWdlEntity): string {
    const { stack: currentExecutionStack = [] } = this;
    const { stack: referenceExecutionStack = [] } = entity || {};
    const firstInCommon = currentExecutionStack.find((o) => referenceExecutionStack.includes(o));
    if (!firstInCommon) {
      return this.getReferenceRelativeToAction(undefined);
    }
    return this.getReferenceRelativeToAction(firstInCommon);
  }

  protected propertiesMatchesRegExp(regExp: RegExp): boolean {
    return regExp.test(this.name)
      || regExp.test(this.alias)
      || regExp.test(this.contextType);
  }

  find(search: IWdlEntitySearchOptions, ...type: ContextTypes[]): IWdlEntity[];
  find(search: RegExp, ...type: ContextTypes[]): IWdlEntity[];
  find(search: string, ...type: ContextTypes[]): IWdlEntity[];
  find(search: IWdlEntitySearch, ...type: ContextTypes[]): IWdlEntity[] {
    if (!search) {
      return [];
    }
    const types: ContextTypes[] = type.length === 0
      ? Object.values(ContextTypes)
      : type;
    const criteria: RegExp = ((): RegExp => {
      if (typeof search === 'string') {
        return new RegExp(escapeRegExp(search));
      }
      if (search instanceof RegExp) {
        return search;
      }
      const {
        search: str,
        fromStart = false,
        caseInsensitive = false,
      } = search;
      return new RegExp(
        `${fromStart ? '^' : ''}${escapeRegExp(str)}`,
        caseInsensitive ? 'i' : undefined,
      );
    })();
    const childrenSearchResult: IWdlEntity[] = this.children
      .reduce<IWdlEntity[]>((result, child) => ([
      ...result,
      ...child.find(criteria, ...types),
    ]), []);
    if (types.includes(this.contextType) && this.propertiesMatchesRegExp(criteria)) {
      return [
        this,
        ...childrenSearchResult,
      ];
    }
    return childrenSearchResult;
  }

  private bubbleEvent<E extends WdlEvent>(
    event: E,
    sender: IWdlEntity,
    ...args: any[]
  ) {
    if (this.muted) {
      return;
    }
    this.trigger(event, sender, ...args);
    if (this.parent) {
      this.parent.bubbleEvent(event, sender, ...args);
    }
  }

  bubble<E extends WdlEvent>(event: E, ...args: any[]) {
    this.bubbleEvent(event, this, ...args);
  }

  private spreadEvent(
    event: WdlEvent,
    sender: IWdlEntity,
    ...args: any[]
  ) {
    if (this.muted) {
      return;
    }
    this.trigger(event, sender, ...args);
    this.children.forEach((child) => {
      child.spreadEvent(event, sender, ...args);
    });
  }

  spread<E extends WdlEvent>(event: E, ...args: any[]) {
    this.spreadEvent(event, this, ...args);
  }

  protected startForwardEventsFrom(sender: IWdlEntity, ...event: WdlEvent[]): void;
  protected startForwardEventsFrom(
    options: IForwardEventOptions,
    ...event: WdlEvent[]
  ): void;
  protected startForwardEventsFrom(
    options: IWdlEntity | IForwardEventOptions,
    ...event: WdlEvent[]
  ): void {
    if (options instanceof WdlEntity) {
      this._eventForwarder.startForwardEvents(options, ...event);
    } else {
      this._eventForwarder.startForwardEventsWithOptions(
        options as IForwardEventOptions,
        ...event,
      );
    }
  }

  protected stopForwardEventsFrom(sender: IWdlEntity): void {
    this._eventForwarder.stopForwardEventsFrom(sender);
  }

  toString(): string {
    if (this.reference) {
      return `${this.contextType} "${this.reference}"`;
    }
    return this.contextType;
  }

  protected getValidationErrors(): IWdlError[] {
    const errors: IWdlError[] = [];
    if (requiresName(this.contextType)) {
      if (!this.name) {
        errors.push(new NameRequiredError(this));
      } else if (this.name && !WrongIdentifierError.check(this.name)) {
        errors.push(new WrongIdentifierError(this, this.name));
      }
    }
    if (requiresReference(this.contextType)) {
      if (!this.reference) {
        errors.push(new NameRequiredError(this));
      } else if (this.reference && !WrongIdentifierError.check(this.reference)) {
        errors.push(new WrongIdentifierError(this, this.reference));
      }
    }
    return errors;
  }

  private checkRequiresValidation(event: WdlEvent, sender: IWdlEntity): void {
    if (
      sender === this
      && this.eventsRequireValidation.has(event)
    ) {
      this.validateEntity(true);
    }
  }

  protected validateChildrenEntities(): void {
    this.children.forEach((child) => {
      child.validateEntity(false);
    });
    this.validateEntity(true);
  }

  protected validateEntity(fireEvent: boolean): boolean {
    this._entityIssues = getUniqueObjects(this.getValidationErrors());
    if (fireEvent) {
      this.bubble(WdlEvent.validation);
    } else {
      this.onValidated();
    }
    return this.valid;
  }

  private onValidated() {
    this._issues = getUniqueObjects([]
      .concat(this._entityIssues)
      .concat(
        this.children.reduce<IWdlError[]>((childrenErrors, child) => (
          childrenErrors.concat(child.issues)
        ), []),
      ));
  }

  validate(): boolean | never;
  validate(throwError: boolean): boolean | never;
  validate(throwError = false): boolean {
    if (throwError && this.errors.length > 0) {
      throw new WdlValidationError(this.issues);
    }
    return this.valid;
  }
}

export default WdlEntity;
