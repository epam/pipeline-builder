import { createEventDispatcherArray } from '../events';
import WdlEntity from '../base/wdl-entity';
import {
  ContextTypes,
  ContextTypeSymbol,
} from '../context-types';
import {
  IAction,
  IBindableValue,
  ICall,
  IExpression,
  IExpressionOptions,
  IParameter,
  isCall,
  IScatter,
  isScatter,
  isScatterDeclaration,
  isTask,
  IStruct,
  isWorkflow,
  IWdlError,
  TExpressionTypes,
  WdlEvent,
} from '../types';
import { parseExpressionDependencies } from '../../parser/WDL/antlr4';
import { IEventDispatcherArray } from '../events/types';
import { UnknownIdentifierError, WrongExpressionError } from '../validation';

interface IExpressionDependency {
  dependency: string;
  resolved: IExpression | undefined;
}

type IDependency = IExpressionDependency | Expression;

/**
 * Base class for entities with `expression` (inputs, outputs, declarations, runtime properties).
 * `Expression` instance hosts `expression` property (string) and implements
 * dependencies parsing logic, i.e., if expression contains references to other `Expression`s
 * (inputs, outputs, declarations).
 *
 * `Expression.expression` property could be set to `Expression` instance
 * (if port input/output/declaration is connected directly to other port).
 */
abstract class Expression<T extends TExpressionTypes = TExpressionTypes>
  extends WdlEntity<T>
  implements IExpression<T> {
  static dependencyValue(dependency: IDependency): string {
    if (dependency instanceof Expression) {
      return dependency.value;
    }
    return dependency.dependency;
  }

  protected readonly _inboundConnections: IEventDispatcherArray<Expression>;

  protected readonly _outboundConnections: IEventDispatcherArray<Expression>;

  private _expression: IBindableValue<T> | undefined;

  private _expressionError: IWdlError | undefined;

  private _dependencies: IDependency[];

  private _expressionParsedFor: IBindableValue<T> | undefined;

  protected constructor(options: IExpressionOptions);
  protected constructor(options: IExpressionOptions, contextType: ContextTypes);
  protected constructor(options: IExpressionOptions, contextType = undefined) {
    const optionsContextType = options ? options[ContextTypeSymbol] : undefined;
    super(
      contextType || optionsContextType,
      options,
    );
    const {
      default: oDefault, // legacy, deprecated
      expression = oDefault, // legacy, deprecated
      value = expression,
    } = options || {};
    this._inboundConnections = createEventDispatcherArray(
      this,
      WdlEvent.inboundConnectionsAdded,
      WdlEvent.inboundConnectionsRemoved,
      [
        WdlEvent.inboundConnectionsChanged,
        WdlEvent.connectionsChanged,
        {
          event: WdlEvent.changed,
          bubble: true,
          args: [{ changed: 'inbound' }],
        },
      ],
    );
    this._outboundConnections = createEventDispatcherArray(
      this,
      WdlEvent.outboundConnectionsAdded,
      WdlEvent.outboundConnectionsRemoved,
      [
        WdlEvent.outboundConnectionsChanged,
        WdlEvent.connectionsChanged,
        {
          event: WdlEvent.changed,
          bubble: true,
          args: [{ changed: 'outbound' }],
        },
      ],
    );
    this.on(
      WdlEvent.inboundConnectionsAdded,
      (event, sender, inboundConnections = []) => {
        this.bindInboundConnections(inboundConnections);
      },
    );
    this.on(
      WdlEvent.inboundConnectionsRemoved,
      (event, sender, inboundConnections = []) => {
        this.unbindInboundConnections(inboundConnections);
      },
    );
    this.on(
      WdlEvent.outboundConnectionsAdded,
      (event, sender, outboundConnections = []) => {
        outboundConnections.forEach(this.bindOutboundConnection.bind(this));
      },
    );
    this.on(
      WdlEvent.outboundConnectionsRemoved,
      (event, sender, outboundConnections = []) => {
        outboundConnections.forEach(this.unbindOutboundConnection.bind(this));
      },
    );
    this._expression = value;
    this._expressionError = undefined;
    this._dependencies = [];
    this._expressionParsedFor = undefined;
    this.muteAction(() => {
      this.updateDependencies();
    });
  }

  protected get eventsRequireValidation(): Set<WdlEvent> {
    return new Set([
      ...super.eventsRequireValidation,
      WdlEvent.valueChanged,
      WdlEvent.connectionsChanged,
    ]);
  }

  private get notResolvedDependencies(): IExpressionDependency[] {
    return this.dependencies
      .filter((dep) => !(dep instanceof Expression)
        && !dep.resolved) as IExpressionDependency[];
  }

  private get invalidDependencies(): IDependency[] {
    return this.dependencies
      .filter((dependency) => this.dependencyIsInvalid(dependency));
  }

  /**
   * @returns {string|undefined}
   */
  get value(): string | undefined {
    const bindableValueIsExpression = (
      o: IBindableValue | string,
    ): o is IExpression => !!o && o instanceof Expression;
    if (bindableValueIsExpression(this._expression)) {
      return this._expression.getReferenceFor(this);
    }
    return this._expression;
  }

  /**
   * @param {string|Expression} expression
   */
  set value(expression) {
    if (expression !== this._expression) {
      this._expression = expression;
      this.updateDependencies();
      this.reportValueChanged();
    }
  }

  protected reportValueChanged() {
    this.bubble(WdlEvent.valueChanged, this._expression);
    this.bubble(WdlEvent.changed, { changed: 'value' });
  }

  protected get dependencies(): IDependency[] {
    return this._dependencies;
  }

  get isSingleDependency(): boolean {
    if (this._expression instanceof Expression) {
      return true;
    }
    return this._dependencies
      && this._dependencies.length === 1
      && Expression.dependencyValue(this._dependencies[0]) === this._expression;
  }

  get inboundConnections(): Expression[] {
    return this._inboundConnections.slice();
  }

  get outboundConnections(): Expression[] {
    return this._outboundConnections.slice();
  }

  private dependencyIsInvalid(dependency: IDependency): boolean {
    if (dependency instanceof Expression) {
      return this.connectionIsInvalid(dependency);
    }
    return this.connectionIsInvalid(dependency.resolved);
  }

  private connectionIsInvalid(connection: IExpression | undefined): boolean {
    return connection && connection.root !== this.root;
  }

  private getInboundConnectionsForWorkflowActions(): IExpression[] {
    const { notResolvedDependencies } = this;
    const { currentWorkflow, currentAction } = this;
    if (notResolvedDependencies.length > 0 && currentWorkflow && currentAction) {
      // We should only build connections for workflows or calls.
      const { document } = this;
      const otherWorkflows = document
        ? document.workflows.filter((workflow) => workflow !== currentWorkflow)
        : [];
      const extractCalls = (baseAction: IAction): ICall[] => {
        const {
          actions = [],
        } = baseAction || {};
        const filtered = actions.filter((action) => action !== currentAction);
        return filtered.reduce((result, action) => result
          .concat([action])
          .concat(extractCalls(action)), [])
          .filter((entity) => isCall(entity)) as ICall[];
      };
      const calls: ICall[] = extractCalls(currentWorkflow);
      const allActions = currentWorkflow
        .getNestedActions(false);
      const allCalls = allActions
        .filter((action) => isCall(action)) as ICall[];
      const allScatters = allActions
        .filter((action) => isScatter(action)) as IScatter[];
      const scattersDeclarations = allScatters.reduce<IParameter[]>((r, s) => ([
        ...r,
        ...s.declarations,
      ]), []);
      const currentStack = this.stack || [];
      /**
       * @type {IScatter[]}
       */
      const scattersStack: IScatter[] = currentStack.filter(isScatter);
      // Possible connections could be found among (from high to low priority):
      // - scatter iterators within current execution stack
      // - current execution stack inputs and declarations (if we're processing
      //      - declaration of a call or workflow,
      //      - or output of a call or workflow)
      // - parent execution stack inputs and declarations (if we're processing
      //      input of a call)
      // - scatter declarations (if we're processing
      //      - declaration / output of a call or workflow
      //      - input of a call)
      // - current workflow inputs and declarations
      // - other workflows outputs
      // - outputs of other actions (calls) within current workflow
      // - all workflow calls outputs (if we're processing scatter declaration)
      const list = []
        // scatter iterators within current execution stack
        .concat(
          scattersStack
            .map((scatter) => scatter.iterator)
            .filter(Boolean),
        )
        // - current execution stack inputs and declarations (if we're processing
        //      - declaration of a call or workflow,
        //      - or output of a call or workflow)
        // - parent execution stack inputs and declarations (if we're processing
        //      input of a call)
        .concat(
          currentStack.reduce((result, executable) => {
            if (executable !== currentAction || this.contextType !== ContextTypes.input) {
              return result.concat(executable.inputs || []).concat(executable.declarations || []);
            }
            return result;
          }, []),
        )
        // - scatter declarations (if we're processing
        //      - declaration / output of a call or workflow
        //      - input of a call)
        .concat(
          !isWorkflow(currentAction) || this.contextType !== ContextTypes.input
            ? scattersDeclarations
            : [],
        )
        // current workflow inputs
        .concat(currentWorkflow.inputs || [])
        // current workflow declarations
        .concat(currentWorkflow.declarations || [])
        // other workflows outputs
        .concat(
          otherWorkflows.reduce((result, workflow) => result
            .concat(workflow.outputs || []), []),
        )
        // outputs of other actions (calls) within current workflow
        // all workflow calls outputs (if we're processing scatter declaration)
        .concat(
          (isScatterDeclaration(this) ? allCalls : calls)
            .reduce<IParameter[]>((result, call) => result.concat(call.outputs || []), []),
        ) as IParameter[];
      const getInboundConnectionForDependency = (dependency: string) => list
        .find((o) => this.parameterMatchesDependency(o, dependency));
      notResolvedDependencies.forEach((dependency) => {
        // eslint-disable-next-line no-param-reassign
        dependency.resolved = getInboundConnectionForDependency(dependency.dependency);
      });
    }
    return this.dependencies
      .filter((dep) => !this.dependencyIsInvalid(dep))
      .map((dep) => (dep instanceof Expression ? dep : dep.resolved))
      .filter(Boolean);
  }

  private getInboundConnectionsForTask(): IExpression[] {
    const { notResolvedDependencies } = this;
    const { currentAction } = this;
    if (
      notResolvedDependencies.length > 0
      && isTask(currentAction)
    ) {
      // Possible connections could be found among
      // task inputs and declarations
      const inputs = currentAction.getActionInputs();
      const outputs = currentAction.getActionOutputs();
      const declarations = currentAction.getActionDeclarations();
      const list: IParameter[] = []
        .concat(declarations)
        .concat(inputs)
        .filter((d) => (d as IExpression) !== this);
      const getInboundConnectionForDependency = (dependency: string) => list
        .find((o) => this.parameterMatchesDependency(o, dependency));
      const getOutboundConnectionForDependency = (dependency: string) => {
        // Outputs can reference another outputs in the same block for a Task
        if (this.contextType === ContextTypes.output && dependency !== this.name) {
          return outputs
            .find((o) => this.parameterMatchesDependency(o, dependency));
        }
        return undefined;
      };
      notResolvedDependencies.forEach((dependency) => {
        // eslint-disable-next-line no-param-reassign
        dependency.resolved = getInboundConnectionForDependency(dependency.dependency)
         || getOutboundConnectionForDependency(dependency.dependency);
      });
    }
    return this.dependencies
      .filter((dep) => !this.dependencyIsInvalid(dep))
      .map((dep) => (dep instanceof Expression ? dep : dep.resolved))
      .filter(Boolean);
  }

  private getInboundConnections(): IExpression[] {
    const { currentAction } = this;
    if (isTask(currentAction)) {
      return this.getInboundConnectionsForTask();
    }
    return this.getInboundConnectionsForWorkflowActions();
  }

  private parameterMatchesDependency(parameter: IParameter, dependency: string): boolean {
    const ref = parameter.getReferenceFor(this);
    if (ref === dependency) {
      return true;
    }
    const checkStructs = (struct: IStruct, path: string) => {
      const [propName, ...rest] = path.split('.');
      const entity = struct && struct.properties
        .find((p) => p.name === propName);
      if (ref === propName) {
        return checkStructs(struct, rest.join('.'));
      }
      if (entity && entity.struct && rest.length > 0) {
        return checkStructs(entity.struct, rest.join('.'));
      }
      return entity && !rest.length
        ? propName === entity.name
        : false;
    };
    if (
      parameter.struct
      && parameter.struct.properties
      && checkStructs(parameter.struct, dependency)
    ) {
      return true;
    }
    return parameter.isObject
      && dependency.startsWith(`${ref}.`);
  }

  protected onTreeChanged() {
    super.onTreeChanged();
    this.updateDependencies(false);
  }

  abstract canBindTo(source: IExpression): boolean;
  abstract canBindTo(source: IExpression, throwError: boolean): boolean | never;

  /**
   * Binds `source` parameter to `this` parameter,
   * sets `expression` to source reference
   * @param {IExpression} source
   */
  bind(source: IExpression): void {
    try {
      if (this.canBindTo(source, true)) {
        this.value = source ? source.getReferenceFor(this) : undefined;
      }
    } catch (error) {
      console.warn(`Cannot bind ${source.toString()} to ${this.toString()}: ${error.message}`);
    }
  }

  /**
   * Unbinds current parameter from all source parameters,
   * unsets expression
   */
  unbind(): void {
    this.value = undefined;
  }

  private bindInboundConnections(inboundConnections: Expression[]): void {
    if (inboundConnections.length === 0) {
      return;
    }
    const notConnected = inboundConnections
      .filter((connection) => !this._inboundConnections.includes(connection));
    if (notConnected.length > 0) {
      this._inboundConnections.push(...notConnected);
      notConnected.forEach((connection) => {
        this.bubble(
          WdlEvent.parameterBind,
          { source: connection, target: this },
        );
      });
    }
    inboundConnections.forEach((connection) => {
      if (!connection._outboundConnections.includes(this)) {
        connection._outboundConnections.push(this);
        connection.bubble(
          WdlEvent.parameterBind,
          { source: connection, target: this },
        );
      }
    });
  }

  private unbindInboundConnections(inboundConnections: Expression[]): void {
    if (inboundConnections.length === 0) {
      return;
    }
    const removed = this._inboundConnections.remove(...inboundConnections);
    removed.forEach((connection) => {
      this.bubble(
        WdlEvent.parameterUnbind,
        { source: connection, target: this },
      );
    });
    inboundConnections.forEach((connection) => {
      const idx = connection._outboundConnections.indexOf(this);
      if (idx >= 0) {
        connection._outboundConnections.splice(idx, 1);
        connection.bubble(
          WdlEvent.parameterUnbind,
          { source: connection, target: this },
        );
      }
    });
  }

  private bindOutboundConnection(outboundConnections: Expression): void {
    if (!outboundConnections) {
      return;
    }
    outboundConnections.bindInboundConnections([this]);
  }

  /**
   * @param {Expression} outboundConnection
   */
  private unbindOutboundConnection(outboundConnection: Expression) {
    if (!outboundConnection) {
      return;
    }
    outboundConnection.unbindInboundConnections([this]);
  }

  protected updateDependencies(force = true): void {
    try {
      if (this._expressionParsedFor !== this._expression || force) {
        this._expressionParsedFor = this._expression;
        if (typeof this._expression === 'string') {
          if (this._expression.startsWith('~')) {
            console.log('parsing', this._expression);
            console.log(parseExpressionDependencies(this._expression));
          }
          const {
            dependencies = [],
          } = parseExpressionDependencies(this._expression) as { dependencies: string[] };
          const current = this._dependencies
            .slice()
            .map(Expression.dependencyValue);
          this._dependencies = this._dependencies
            .filter((o) => dependencies.some((d) => d === Expression.dependencyValue(o)))
            .concat(dependencies.filter((d) => !current.some((c) => c === d)).map((d) => ({
              dependency: d,
              resolved: undefined,
            })));
        } else if (this._expression instanceof Expression) {
          this._dependencies = [this._expression];
        } else {
          this._dependencies = [];
        }
      }
      const inboundConnections = this.getInboundConnections();
      const disconnected = this._inboundConnections
        .filter((o) => !inboundConnections.includes(o));
      this.unbindInboundConnections(disconnected);
      const connected = inboundConnections
        .filter((o) => !(this._inboundConnections as IExpression[]).includes(o)) as Expression[];
      this.bindInboundConnections(connected);
      if (connected.length > 0 || disconnected.length > 0) {
        this.bubble(WdlEvent.connectionsChanged);
      }
      this._expressionError = undefined;
    } catch (error) {
      this._expressionError = new WrongExpressionError(
        this,
        error.message,
      );
      this._dependencies = [];
      if (this.inboundConnections.length > 0) {
        this.unbindInboundConnections(this.inboundConnections.slice());
        this.bubble(WdlEvent.connectionsChanged);
      }
      console.warn(`Error parsing expression dependencies: ${error.message}. Expression:\n${this._expression}`);
    }
  }

  protected getSelfValidationErrors(): IWdlError[] {
    const issues: IWdlError[] = super.getSelfValidationErrors();
    if (this._expressionError) {
      issues.push(this._expressionError);
    }
    this.notResolvedDependencies.forEach((notResolved) => {
      issues.push(new UnknownIdentifierError(
        this,
        `unknown dependency ${notResolved.dependency}. Did you mean "${notResolved.dependency}" (string value)?`,
      ));
    });
    return issues;
  }
}

export default Expression;
