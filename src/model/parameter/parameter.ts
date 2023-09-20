import {
  ContextTypes,
  ContextTypeSymbol,
  IExpression,
  IParameter,
  IParameterOptionOrInstance,
  IParameterOptions,
  IParameters,
  IParametersObject,
  IParameterType,
  isAction, isExecutable,
  isParametersArray,
  IStruct,
  IWdlError,
  TParameterTypes,
  WdlEvent,
  WdlVersion,
} from '../types';
import Expression from '../expression';
import ParameterType from '../type';
import canBindParameters from './can-bind-parameters';
import { TypeRequiredError, UniqueNameRequiredError } from '../validation';

export type TParameterInitializer<
  T extends TParameterTypes = TParameterTypes,
  I extends IParameter<T> = IParameter<T>,
> = {
  new(options: IParameterOptions): I;
};

type TInitializers = Map<TParameterTypes, TParameterInitializer<TParameterTypes, Parameter>>;

abstract class Parameter<T extends TParameterTypes = TParameterTypes>
  extends Expression<T>
  implements IParameter<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isIParameter<P extends TParameterTypes>(o: any): o is IParameter<P> {
    return !!o && o instanceof Parameter;
  }

  static initializers: TInitializers = new Map();

  static registerInitializer<T extends TParameterTypes>(
    contextType: T,
    initializer: TParameterInitializer<T, Parameter<T>>,
  ): void {
    Parameter.initializers.set(contextType, initializer);
  }

  static getInitializer<T extends TParameterTypes>(
    contextType: T,
  ): TParameterInitializer<T, Parameter<T>> {
    if (!Parameter.initializers.has(contextType)) {
      throw new Error(`Initializer for type "${contextType}" was not found`);
    }
    return Parameter.initializers.get(contextType) as TParameterInitializer<T, Parameter<T>>;
  }

  static deserialize<T extends TParameterTypes>(
    options: IParameterOptionOrInstance<T>,
  ): Parameter<T>;
  static deserialize<T extends TParameterTypes>(
    options: IParameterOptionOrInstance<T>,
    contextType: T,
  ): Parameter<T>;
  static deserialize<T extends TParameterTypes>(
    options: IParameterOptionOrInstance<T>,
    contextType: T,
    initializer: TParameterInitializer<T, Parameter<T>>,
  ): Parameter<T>;
  static deserialize<T extends TParameterTypes>(
    options: IParameterOptionOrInstance<T>,
    contextType?: T,
    initializer?: TParameterInitializer<T, Parameter<T>>,
  ): Parameter<T> {
    if (Parameter.isIParameter(options)) {
      return options as Parameter<T>;
    }
    const type = contextType || options[ContextTypeSymbol] || ContextTypes.declaration;
    const Initializer = initializer || Parameter.getInitializer(type);
    return new Initializer(options);
  }

  static deserializeArray<T extends TParameterTypes>(
    parameters: IParameterOptionOrInstance<T>[],
  ): Parameter[];
  static deserializeArray<T extends TParameterTypes>(
    parameters: IParameterOptionOrInstance<T>[],
    contextType: T,
  ): Parameter<T>[];
  static deserializeArray<T extends TParameterTypes>(
    parameters: IParameterOptionOrInstance<T>[],
    contextType: T,
    initializer: TParameterInitializer<T, Parameter<T>>
  ): Parameter<T>[];
  static deserializeArray<T extends TParameterTypes>(
    parameters: IParameterOptions[] = [],
    contextType?: T,
    initializer?: TParameterInitializer<T, Parameter<T>>,
  ): Parameter<T>[] {
    return parameters.map((options) => Parameter.deserialize(
      options,
      contextType,
      initializer,
    ));
  }

  static deserializeObject(): Parameter[];
  static deserializeObject<T extends TParameterTypes>(
    parameters: IParametersObject<T>,
  ): Parameter[];
  static deserializeObject<T extends TParameterTypes>(
    parameters: IParametersObject<T>,
    contextType: T,
  ): Parameter<T>[];
  static deserializeObject<T extends TParameterTypes>(
    parameters: IParametersObject<T>,
    contextType: T,
    initializer: TParameterInitializer<T, Parameter<T>>,
  ): Parameter<T>[];
  static deserializeObject<T extends TParameterTypes>(
    parameters: IParametersObject<T> = {},
    contextType?: T,
    initializer?: TParameterInitializer<T, Parameter<T>>,
  ): Parameter<T>[] {
    function mapParameter(
      name: string,
      parameter: Omit<IParameterOptions, 'name'> | IParameter<T> | string,
    ): IParameterOptionOrInstance<T> {
      if (parameter instanceof Parameter) {
        return parameter;
      }
      if (typeof parameter === 'string') {
        return {
          name,
          type: parameter,
        };
      }
      return {
        ...parameter,
        name,
      };
    }
    return Parameter.deserializeArray(
      Object.entries(parameters || {}).map(([name, json]) => mapParameter(name, json)),
      contextType,
      initializer,
    );
  }

  static deserializeCollection<T extends TParameterTypes>(
    declarations: IParameters<T>,
  ): Parameter<T>[];
  static deserializeCollection<T extends TParameterTypes>(
    declarations: IParameters<T>,
    contextType: T,
  ): Parameter<T>[];
  static deserializeCollection<T extends TParameterTypes>(
    declarations: IParameters<T>,
    contextType: T,
    initializer?: TParameterInitializer<T, Parameter<T>>,
  ): Parameter<T>[];
  static deserializeCollection<T extends TParameterTypes>(
    declarations: IParameters<T> = {},
    contextType?: T,
    initializer?: TParameterInitializer<T, Parameter<T>>,
  ): Parameter<T>[] {
    if (!declarations) {
      return [];
    }
    return isParametersArray(declarations)
      ? Parameter.deserializeArray(declarations, contextType, initializer)
      : Parameter.deserializeObject(declarations, contextType, initializer);
  }

  private readonly _type: ParameterType;

  protected constructor(options: IParameterOptions);
  protected constructor(options: IParameterOptions, contextType: T);
  /**
   * @param {IParameterOptions} options
   * @param {ContextTypes} [contextType]
   */
  protected constructor(options: IParameterOptions, contextType: T = undefined) {
    if (!options) {
      throw new Error('Parameter options are not provided');
    }
    const {
      bind,
      default: oDefault,
      expression,
      value,
      ...rest
    } = options;
    super(
      {
        value: value || expression || oDefault || bind,
        ...rest,
      },
      contextType || options[ContextTypeSymbol] || ContextTypes.declaration,
    );
    const {
      type,
    } = options;
    /**
     * @type {string}
     * @private
     */
    this._type = new ParameterType(type);
    this.startForwardEventsFrom(this._type, WdlEvent.typeChanged, WdlEvent.validation);
  }

  protected get eventsRequireValidation(): Set<WdlEvent> {
    return new Set([
      ...super.eventsRequireValidation,
      WdlEvent.typeChanged,
    ]);
  }

  get parameterType(): IParameterType {
    return this._type || (new ParameterType(''));
  }

  get type(): string | undefined {
    return this._type ? this._type.value : undefined;
  }

  set type(type: string) {
    if (this._type) {
      this._type.value = type;
    }
  }

  get struct(): IStruct | undefined {
    if (
      this._type
      && this._type.struct
      && this.document
    ) {
      return this.document
        .resolveStruct(this._type.struct);
    }
    return undefined;
  }

  get isObject(): boolean {
    return !!this._type && this._type.isObject;
  }

  get optional(): boolean {
    return !!this._type && this._type.optional;
  }

  get isArray(): boolean {
    return !!this._type && this._type.isArray;
  }

  get isNotEmpty(): boolean {
    return !!this._type && this._type.isNotEmpty;
  }

  get isMap(): boolean {
    return !!this._type && this._type.isMap;
  }

  get isPair(): boolean {
    return !!this._type && this._type.isPair;
  }

  get isPrimitive(): boolean {
    return !!this._type && this._type.isPrimitive;
  }

  get isInput(): boolean {
    return this.contextType === ContextTypes.input
      || (
        this.contextType === ContextTypes.declaration
        && !this.supports(WdlVersion.draft3)
        && !!this.parent
        && isAction(this.parent)
      );
  }

  get isDeclaration(): boolean {
    return this.contextType === ContextTypes.declaration && !this.isInput;
  }

  get isOutput(): boolean {
    return this.contextType === ContextTypes.output;
  }

  canBindTo(source: IExpression): boolean;
  canBindTo(source: IExpression, throwError: boolean): boolean | never;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  canBindTo(source: IExpression, throwError: boolean = false): boolean | never {
    if (!(source instanceof Parameter)) {
      return false;
    }
    return canBindParameters(source, this, throwError);
  }

  remove() {
    this.unbind();
    if (this.parent) {
      this.parent = undefined;
    }
  }

  protected getValidationErrors(): IWdlError[] {
    let issues: IWdlError[] = super.getValidationErrors();
    if (
      this.parent
      && isExecutable(this.parent)
    ) {
      const parametersOfTheSameScope = ((): IParameter[] => {
        switch (true) {
          case this.isInput:
          case this.isDeclaration:
            return []
              .concat(this.parent.getActionInputs())
              .concat(this.parent.getActionDeclarations());
          case this.isOutput:
            return this.parent.getActionOutputs();
          default:
            return [];
        }
      })();
      if (
        parametersOfTheSameScope
          .some((p) => p !== this && !!p.name && p.name === this.name)
      ) {
        issues.push(
          new UniqueNameRequiredError(this),
        );
      }
    }
    if (this._type) {
      issues = issues.concat(this._type.issues);
    } else {
      issues.push(new TypeRequiredError(this));
    }
    return issues;
  }

  generateWdl(): string {
    if (this.validate(true)) {
      if (this.value && this.value.length) {
        return `${this.type} ${this.name} = ${this.value}`;
      }
      return `${this.type} ${this.name}`;
    }
    return undefined;
  }

  toString(): string {
    if (this.parent) {
      return `${this.contextType} "${this.name}" of ${this.parent.toString()}`;
    }
    return super.toString();
  }
}

export default Parameter;
