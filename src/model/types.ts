/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEventDispatcher,
  WdlEvent,
} from './events/types';

enum ContextTypes {
  document = 'document',
  import = 'import',
  importAlias = 'importAlias',
  struct = 'struct',
  structProperty = 'struct-property',
  workflow = 'workflow',
  task = 'task',
  inputs = 'inputs',
  outputs = 'outputs',
  declaration = 'declaration',
  input = 'input',
  output = 'output',
  scatter = 'scatter',
  call = 'call',
  callAfter = 'call-after',
  conditional = 'conditional',
  conditionalExpression = 'conditional-expression',
  parameterMeta = 'parameter-meta',
  meta = 'meta',
  metaElement = 'meta-element',
  runtime = 'runtime',
  command = 'command',
  expression = 'expression',
  type = 'type',
}

enum PrimitiveTypes {
  boolean = 'Boolean',
  int = 'Int',
  float = 'Float',
  string = 'String',
  file = 'File',
}

enum CompoundTypes {
  array = 'Array',
  pair = 'Pair',
  map = 'Map',
  object = 'Object',
  struct = 'struct',
}

export type Types = CompoundTypes | PrimitiveTypes;

export interface IType<T extends Types = Types> {
  optional: boolean;
  notEmpty: boolean;
  readonly type: T | undefined;
  clone(): IType | undefined;
  toString(): string;
  isSubTypeOf<P extends Types>(type: IType<P>): boolean;
  makeOptional(): IType | undefined;
  makeOptional(optional: boolean): IType | undefined;
  makeNotEmpty(): IType | undefined;
  makeNotEmpty(notEmpty: boolean): IType | undefined;
  makeArray(): IType | undefined;
  makeArrayItem(): IType | undefined;
}

declare type TActionTypes =
  ContextTypes.call
  | ContextTypes.scatter
  | ContextTypes.conditional
  | ContextTypes.workflow
  | ContextTypes.task;

declare type TActionWithOutputsTypes =
  ContextTypes.call
  | ContextTypes.workflow
  | ContextTypes.task;

declare type TExecutableTypes =
  ContextTypes.workflow
  | ContextTypes.task;

declare type TParameterTypes =
  ContextTypes.declaration
  | ContextTypes.input
  | ContextTypes.output
  | ContextTypes.structProperty;

declare type TExpressionTypes =
  TParameterTypes
  | ContextTypes.runtime
  | ContextTypes.conditionalExpression;

export interface IWdlEntityOptions {
}

export interface IWdlEntityWithNameOptions extends IWdlEntityOptions {
  name: string;
  alias?: string;
}

export type IBindableValue<T extends TExpressionTypes = TExpressionTypes> =
  string | IExpression<T>;

export interface IExpressionDataOptions {
  readonly value?: IBindableValue;
  readonly expression?: IBindableValue;
  readonly default?: IBindableValue;
}

export type IExpressionOptions = IWdlEntityOptions & IExpressionDataOptions;

const ContextTypeSymbol = Symbol('type');

export interface IWdlGenerator {
  generateWdl(): string;
}

export enum WdlErrorType {
  // General errors
  error = 'error',
  unsupported = 'unsupported',
  nameRequired = 'name-required',
  uniqueNameRequired = 'unique-name-required',
  typeRequired = 'type-required',
  valueRequired = 'value-required',
  wrongIdentifier = 'wrong-identifier',
  wrongType = 'wrong-type',

  // Call errors
  unknownExecutable = 'unknown-executable',
  executableRequired = 'executable-required',
  missingInput = 'missing-input',
  missingOutput = 'missing-output',
  unknownInput = 'unknown-input',
  unknownOutput = 'unknown-output',

  // Task errors
  commandRequired = 'command-required',

  // Expression errors
  unknownIdentifier = 'unknown-identifier',
  wrongExpression = 'wrong-expression',

  // conditional errors
  expressionRequired = 'expression-required',
}

export enum WdlErrorLevel {
  warning = 'warning',
  error = 'error',
}

export interface IWdlError<
  L extends WdlErrorLevel = WdlErrorLevel,
  T extends WdlErrorType = WdlErrorType,
> extends Error {
  readonly entity: IWdlEntity;
  readonly type: T;
  readonly level: L;
  readonly description: string;
  print(): void;
}

export interface IWdlValidationResult {
  readonly issues: IWdlError[];
  readonly errors: IWdlError[];
  readonly warnings: IWdlError[];
  readonly valid: boolean
  readonly containsIssues: boolean;
}

export interface IWdlValidation extends IWdlValidationResult {

  validate(): boolean | never;
  validate(throwError: boolean): boolean | never;
}

export interface IWdlEntitySearchOptions {
  search: string;
  caseInsensitive?: boolean;
  fromStart?: boolean;
}

export type IWdlEntitySearch = string | RegExp | IWdlEntitySearchOptions;

export interface IWdlEntity<T extends ContextTypes = ContextTypes>
  extends IEventDispatcher<WdlEvent>, IWdlValidation {
  readonly uuid: string;
  readonly contextType: T;
  readonly version: WdlVersion;
  readonly entityIssues: IWdlError[];
  readonly entityErrors: IWdlError[];
  readonly entityWarnings: IWdlError[];
  /**
   * `true` if entity itself is valid (without checking child entities validation status)
   */
  readonly entityValid: boolean;
  /**
   * `true` if entity itself contains issues (without checking if child entities contains issues)
   */
  readonly entityContainsIssues: boolean;
  name: string | undefined;
  alias: string | undefined;
  readonly reference: string;
  parent: IWdlEntity;
  readonly children: IWdlEntity[];
  readonly stack: IAction[];
  readonly document: IWdlDocument | undefined;
  readonly currentExecutable: IExecutable | undefined;
  readonly currentWorkflow: IWorkflow | undefined;
  readonly currentAction: IAction | undefined;
  readonly root: IWdlEntity;
  supports(version: WdlVersion): boolean;
  isParentFor(entity: IWdlEntity): boolean;
  find(search: IWdlEntitySearchOptions, ...type: ContextTypes[]): IWdlEntity[];
  find(search: RegExp, ...type: ContextTypes[]): IWdlEntity[];
  find(search: string, ...type: ContextTypes[]): IWdlEntity[];
  getReferenceFor(entity: IWdlEntity): string;
  bubble<E extends WdlEvent>(event: E, ...args: any[]);
  spread<E extends WdlEvent>(event: E, ...args: any[]);
}

export interface IExpression<T extends TExpressionTypes = TExpressionTypes> extends IWdlEntity<T> {
  readonly isSingleDependency: boolean;
  readonly inboundConnections: IExpression[];
  readonly outboundConnections: IExpression[];
  value: string | undefined;
  canBindTo(source: IExpression): boolean;
  canBindTo(source: IExpression, throwError: boolean): boolean | never;
  bind(source: IExpression): void;
  unbind(): void;
}

export interface IParameterType extends IWdlEntity<ContextTypes.type>, IType {
  value: string;
  readonly struct: string | undefined;
  readonly isObject: boolean;
  optional: boolean;
  readonly isArray: boolean;
  isNotEmpty: boolean;
  readonly isMap: boolean;
  readonly isPair: boolean;
  readonly isPrimitive: boolean;
}

export interface IParameterInfoOptions
  extends IExpressionDataOptions, IWdlEntityOptions {
  name: string;
  type?: string;
  bind?: IParameter;
}

export type IParameterOptions = IExpressionOptions & IParameterInfoOptions;

export type IParameterOptionOrInstance<T extends TParameterTypes> =
  IParameterOptions | IParameter<T>;

export type IParametersObject<T extends TParameterTypes>
  = Record<string, Omit<IParameterInfoOptions, 'name'> | IParameter<T> | string>;

export type IParameters<T extends TParameterTypes = TParameterTypes>
  = IParametersObject<T> | IParameterOptionOrInstance<T>[];

export function isParametersArray<T extends TParameterTypes>(
  object: IParameters,
): object is IParameterOptionOrInstance<T>[] {
  return object && Array.isArray(object);
}

export interface IParameter<T extends TParameterTypes = TParameterTypes>
  extends IExpression<T>, IWdlGenerator {
  readonly parameterType: IParameterType;
  type: string | undefined;
  readonly struct: IStruct | undefined;
  readonly isObject: boolean;
  readonly optional: boolean;
  readonly isArray: boolean;
  readonly isNotEmpty: boolean;
  readonly isMap: boolean;
  readonly isPair: boolean;
  readonly isPrimitive: boolean;
  readonly isDeclaration: boolean;
  readonly isInput: boolean;
  readonly isOutput: boolean;
  remove(): void;
}

export type IActionOptionsWithType<T extends TActionTypes, O extends IActionOptions<T>> =
  O & { type: T };

export type ICallOptionsOrInstance =
  ICall | IActionOptionsWithType<ContextTypes.call, ICallOptions>;
export type IScatterOptionsOrInstance =
  IScatter | IActionOptionsWithType<ContextTypes.scatter, IScatterOptions>;
export type IConditionalOptionsOrInstance =
  IConditional | IActionOptionsWithType<ContextTypes.conditional, IConditionalOptions>;

export type IChildActionOptions =
  ICallOptionsOrInstance
  | IScatterOptionsOrInstance
  | IConditionalOptionsOrInstance;

export interface IActionOptions<T extends TActionTypes = TActionTypes> extends IWdlEntityOptions {
  readonly type?: T;
  readonly actions?: IChildActionOptions[];
  readonly inputs?: IParameterOptionOrInstance<ContextTypes.input>[];
  readonly i?: IParametersObject<ContextTypes.input>;
  readonly declarations?: IParameterOptionOrInstance<ContextTypes.declaration>[];
  readonly d?: IParametersObject<ContextTypes.declaration>;
}

export interface IAction<T extends TActionTypes = TActionTypes>
  extends IWdlEntity<T>, IWdlGenerator {
  readonly type: TActionTypes;
  readonly actions: IAction[];
  readonly inputs: IParameter<ContextTypes.input>[];
  readonly declarations: IParameter<ContextTypes.declaration>[];
  readonly rootAction: IAction;
  getAliases(): string[];
  getChildrenActionsAliases(): string[];
  /**
   * Actual input parameters of action; previous wdl versions (draft-2, draft-1)
   * didn't specify `inputs` sections for Workflows or Tasks, instead `declarations`
   * were treated as inputs for `executable`. That's why we need to
   *  - maintain "as-is" `inputs` and `declaration` arrays, as they were passed to
   *  constructor
   *  - use `getActionInputs` / `getActionDeclarations`
   *  for UI / binding purposes (to find "connectable" ports)
   */
  getActionInputs(): IParameter<ContextTypes.input | ContextTypes.declaration>[] | never;
  getActionDeclarations(): IParameter<ContextTypes.declaration>[] | never;
  addParameters<P extends TParameterTypes>(
    parameters: IParameter<P>[]
  ): IParameter<P>[] | never;
  addParameters<P extends TParameterTypes>(
    parameters: IParameterOptions[],
    type: P,
  ): IParameter<P>[] | never;
  addParameters<P extends TParameterTypes>(
    parameters: IParametersObject<P>,
    type: P,
  ): IParameter<P>[] | never;
  removeParameters<P extends TParameterTypes>(
    parameters: IParameter<P>[]
  ): void | never;
  addAction(
    call: ICallOptionsOrInstance,
  ): ICall;
  addAction(
    scatter: IScatterOptionsOrInstance,
  ): IScatter;
  addAction(
    conditional: IConditionalOptionsOrInstance,
  ): IConditional;
  removeAction<A extends TActionTypes>(action: IAction<A>): void;
  getParameterByUUID(uuid: string): IParameter | undefined;
  getParameters(includeChildActionParameters: boolean): IParameter[];
  getInput(input: string): IParameter | undefined;
  getInputByName(input: string): IParameter | undefined;
  getInputByReference(input: string): IParameter | undefined;
  getDeclaration(declaration: string): IParameter | undefined;
  getDeclarationByName(declaration: string): IParameter | undefined;
  getDeclarationByReference(declaration: string): IParameter | undefined;
  getNestedActions(): IAction[];
  getNestedActions(includingSelf: boolean): IAction[];
  generateParameterName(): string;
  generateParameterName(suggestedName: string): string;
  remove(): void;
}

export interface IActionWithOutputsOptions<T extends TActionWithOutputsTypes>
  extends IActionOptions<T> {
  readonly outputs?: IParameterOptionOrInstance<ContextTypes.output>[];
  readonly o?: IParametersObject<ContextTypes.output>;
}

export interface IActionWithOutputs<T extends TActionWithOutputsTypes> extends IAction<T> {
  readonly outputs: IParameter<ContextTypes.output>[];
  /**
   * If we have `getActionInputs` and `getActionOutputs` methods for `IAction`
   * interface, it's nice to have `getActionOutputs` as well
   */
  getActionOutputs(): IParameter<ContextTypes.output>[];
  getOutput(output: string): IParameter<ContextTypes.output> | undefined;
  getOutputByName(output: string): IParameter<ContextTypes.output> | undefined;
  getOutputByReference(output: string): IParameter<ContextTypes.output> | undefined;
}

export interface IMetaOptions extends IWdlEntityOptions {
  parameter: string;
  meta: string;
}

export type IMeta = IWdlEntity<ContextTypes.metaElement> & IMetaOptions & IWdlGenerator;

export interface IExecutableOptions<T extends TExecutableTypes>
  extends IActionWithOutputsOptions<T>, IWdlEntityWithNameOptions {
  readonly meta?: IMetaOptions[];
  readonly parametersMeta?: IMetaOptions[];
}

export interface IExecutable<T extends TExecutableTypes = TExecutableTypes>
  extends IActionWithOutputs<T> {
  meta: IMeta[];
  parametersMeta: IMeta[];
  readonly executions: ICall[];
  registerCall(call: ICall): void;
  unregisterCall(call: ICall): void;
}

export type IWorkflowOptions = IExecutableOptions<ContextTypes.workflow>;

export interface IWorkflow extends IExecutable<ContextTypes.workflow> {

}

enum CommandTypes {
  brackets = '{',
  hereDoc = '<<<',
}

export interface ICommandOptions extends IWdlEntityOptions {
  begin?: CommandTypes;
  end?: string;
  commandType?: CommandTypes;
  command: string;
}

export interface ICommand extends IWdlEntity<ContextTypes.command> {
  command: string;
  readonly begin: string;
  readonly end: string;
  commandType: CommandTypes;
}

export interface IRuntimeOptions extends IWdlEntityOptions {
  property: string;
  value?: IBindableValue;
}

export interface IRuntime
  extends IExpression<ContextTypes.runtime>, IWdlGenerator {
  property: string;
  remove(): void;
}

export type IRuntimeObject = Record<string, IBindableValue>;

export type IRuntimeConfiguration = IRuntimeObject | IRuntimeOptions[];

export interface ITaskGeneralOptions extends IExecutableOptions<ContextTypes.task> {
  runtime?: IRuntimeConfiguration;
}

export type ICommandData = string | ICommandOptions;

export interface ISingleCommandOptions {
  command: ICommandData;
}

export interface IMultiCommandOptions {
  commands: ICommandData[];
}

export type ITaskCommandOptions = ISingleCommandOptions | IMultiCommandOptions;

export type ITaskOptions<T extends ITaskCommandOptions = ITaskCommandOptions>
  = ITaskGeneralOptions & T;

export type IUnnamedTaskOptions<T extends ITaskCommandOptions = ITaskCommandOptions>
  = Omit<ITaskGeneralOptions, 'name'> & T;

export interface ITask extends IExecutable<ContextTypes.task> {
  command: string;
  runtime: IRuntime[];
  getRuntimeEntry(runtime: string): IRuntime | undefined;
  getRuntime(runtime: string): string | undefined;
  setRuntime(runtime: string): string | undefined;
  setRuntime(runtime: string, value: string | undefined): string | undefined;
  removeRuntime(runtime: string): void;
  readonly runtimeData: IRuntimeObject;
}

export interface ITaskCallOptions {
  task: string | ITask;
  alias?: string;
}

export function isTaskCallOptions(options: unknown): options is ITaskCallOptions {
  return options
    && typeof options === 'object'
    && 'task' in options;
}

export interface IWorkflowCallOptions {
  workflow: string | IWorkflow;
  alias?: string;
}

export function isWorkflowCallOptions(options: unknown): options is IWorkflowCallOptions {
  return options
    && typeof options === 'object'
    && 'workflow' in options;
}

export interface IExecutableCallOptions {
  executable: string | IExecutable;
  alias?: string;
}

export function isExecutableCallOptions(options: unknown): options is IExecutableCallOptions {
  return options
    && typeof options === 'object'
    && 'executable' in options;
}

export type IGeneralCallOptions =
  ITaskCallOptions
  | IWorkflowCallOptions
  | IExecutableCallOptions;

export interface ICallAfterOptions {
  readonly call: string | ICall;
}

export type ICallOptions<T extends IGeneralCallOptions = IGeneralCallOptions> =
  T
  & IActionWithOutputsOptions<ContextTypes.call>
  & IWdlEntityOptions
  & { after?: ICallAfterOptions[]; };

export interface ICallAfter
  extends IWdlEntity<ContextTypes.callAfter> {
  readonly call: ICall | undefined;
  readonly callName: string;
}

export interface ICall extends IActionWithOutputs<ContextTypes.call> {
  executable?: IExecutable<any>;
  executableName?: string | undefined;
  after: ICall[];
}

export interface IScatterOptions extends IActionOptions<ContextTypes.scatter> {
  binding?: IBindableValue;
  iterator?: string;
  iteratorType?: string;
}

const ScatterIteratorSymbol = Symbol('scatter iterator');

export interface IScatterIterator extends IParameter<ContextTypes.input> {
  readonly arrayType: IType | undefined;
  readonly iteratorType: IType | undefined;
}

export interface IScatter extends IAction<ContextTypes.scatter> {
  iterator: IScatterIterator;
}

export interface IConditionalOptions extends IActionOptions<ContextTypes.conditional> {
  expression: string;
}

export interface IConditional extends IAction<ContextTypes.conditional> {
  expression: string;
}

export interface IStructAliasOptions {
  struct: string;
  alias: string;
}

export interface IImportOptions extends IWdlEntityOptions {
  source: string;
  alias?: string;
  structs?: IStructAliasOptions[];
}

export interface IStructAlias {
  struct: IStruct;
  alias: string;
}

export interface IImport
  extends IWdlEntity<ContextTypes.import>, IWdlGenerator {
  source: string;
  readonly structs: IStructAlias[];
  readonly globalStructs: IStructAlias[];
  readonly importedDocument: IWdlDocument | undefined;
  getAliases(...type: ContextTypes[]): string[]
  load(): Promise<IWdlDocument | undefined>;
}

export type IStructPropertyOptions = IParameterOptions;

export type IStructProperty = IParameter<ContextTypes.structProperty>;

export interface IStructOptions extends IWdlEntityWithNameOptions {
  properties?: IParameters<ContextTypes.structProperty>;
}

export interface IStruct
  extends IWdlEntity<ContextTypes.struct>, IWdlGenerator {
  readonly properties: IStructProperty[];
  hasProperty(property: string): boolean;
  getProperty(property: string): IStructProperty | undefined;
}

enum WdlVersion {
  draft1 = 'draft-1',
  draft2 = 'draft-2',
  draft3 = 'draft-3',
  v1 = '1.0',
  v1_1 = '1.1',
}

const WdlVersionWeights: Record<WdlVersion, number> = {
  [WdlVersion.draft1]: 0,
  [WdlVersion.draft2]: 1,
  [WdlVersion.draft3]: 2,
  [WdlVersion.v1]: 3,
  [WdlVersion.v1_1]: 4,
};

export function compareVersions(a: WdlVersion, b: WdlVersion): number {
  const getWeight = (o: WdlVersion): number => WdlVersionWeights[o] || 0;
  return getWeight(a) - getWeight(b);
}

const ImportDepthSymbol = Symbol('import level');

export interface IWdlDocumentOptions extends IWdlEntityWithNameOptions {
  version?: WdlVersion;
  structs?: IStructOptions[];
  imports?: IImportOptions[];
  workflows?: IWorkflowOptions[];
  tasks?: (ITaskOptions | ITask)[];
  project?: IProject;
  uri?: string;
  [ImportDepthSymbol]?: number;
}

export interface IWdlDocument
  extends IWdlEntity<ContextTypes.document>, IWdlGenerator {
  readonly version: WdlVersion;
  readonly structs: IStruct[];
  readonly globalStructs: IStructAlias[];
  readonly imports: IImport[];
  readonly workflows: IWorkflow[];
  readonly tasks: ITask[];
  readonly executables: IExecutable[];
  readonly uri: string | undefined;
  readonly project: IProject;
  getAliases(...type: ContextTypes[]): string[];
  getWorkflow(): IWorkflow | undefined;
  getWorkflow(name: string): IWorkflow | undefined;
  requireWorkflow(): IWorkflow;
  loadImports(): Promise<IWdlDocument[]>;
  addWorkflow(): IWorkflow;
  addWorkflow(name: string): IWorkflow;
  addWorkflow(options: IWorkflowOptions): IWorkflow;
  addWorkflow(workflow: IWorkflow): IWorkflow;
  removeWorkflow(workflow: IWorkflow): void;
  addTask(): ITask;
  addTask(name: string): ITask;
  addTask(options: IUnnamedTaskOptions): ITask;
  addTask(options: ITaskOptions): ITask;
  addTask(task: ITask): ITask;
  removeTask(task: ITask): void;
  remove(workflow: IWorkflow): void;
  remove(task: ITask): void;
  remove(action: IAction): void;
  resolveStruct(struct: string): IStruct | undefined;
}

export type TURIContentsResolver = (uri: string) => Promise<string>;

export interface IProjectConfiguration {
  wdlVersion?: WdlVersion;
  baseURI?: string | undefined;
  importRecursionDepth?: number | undefined;
  contentsResolver?: TURIContentsResolver | undefined;
  debug?: boolean;
}

enum SupportedFormats {
  wdl = 'wdl',
}

export interface WdlLoadOptions {
  uri: string;
  baseURI?: string;
  [ImportDepthSymbol]?: number;
}

export interface WdlContentsOptions extends WdlLoadOptions {
  contents: string;
  name?: string;
  format?: SupportedFormats;
}

export interface IWdlGenerationResult {
  success: boolean;
  content?: string;
  error?: string;
}

export interface IProject extends IProjectConfiguration {
  readonly documents: IWdlDocument[];
  readonly defaultContentsResolver: TURIContentsResolver;
  validateWdl(content: string): {
    error?: string;
    success: boolean;
  };
  generateWdl(document: IWdlDocument): IWdlGenerationResult;
  generateWdl(workflow: IWorkflow): IWdlGenerationResult;
  generateWdl(task: ITask): IWdlGenerationResult;
  generateWdl(action: IAction): IWdlGenerationResult;
  loadDocumentByURI(uri: string): Promise<IWdlDocument>;
  loadDocumentByURI(options: WdlLoadOptions): Promise<IWdlDocument>;
  loadDocumentByURI(uri: string, depth: number): Promise<IWdlDocument>;
  loadDocumentByContents(contents: string): Promise<IWdlDocument>;
  loadDocumentByContents(contents: string, depth: number): Promise<IWdlDocument>;
  loadDocumentByContents(contents: WdlContentsOptions): Promise<IWdlDocument>;
  loadDocumentByContents(contents: WdlContentsOptions, depth: number): Promise<IWdlDocument>;
}

export function isWdlEntityWithNameOptions(
  options: IWdlEntityOptions,
): options is IWdlEntityWithNameOptions {
  return options
    && typeof options === 'object'
    && (
      typeof (options as { name?: string; }).name === 'string'
      || typeof (options as { alias?: string; }).alias === 'string'
    );
}

export function isAction<T extends ContextTypes, R extends T & TActionTypes>(
  entity: IWdlEntity<T>,
): entity is IAction<R> {
  return !!entity && [
    ContextTypes.task,
    ContextTypes.workflow,
    ContextTypes.call,
    ContextTypes.scatter,
    ContextTypes.conditional,
  ].includes(entity.contextType);
}

export function isCall(
  entity: IWdlEntity,
): entity is ICall {
  return isAction(entity) && entity.contextType === ContextTypes.call;
}

export function isConditional(
  entity: IWdlEntity,
): entity is ICall {
  return isAction(entity) && entity.contextType === ContextTypes.conditional;
}

export function isScatter(
  entity: IWdlEntity,
): entity is IScatter {
  return isAction(entity) && entity.contextType === ContextTypes.scatter;
}

export function isScatterIterator(iterator: IParameter): iterator is IScatterIterator {
  return iterator.contextType === ContextTypes.input
    && iterator[ScatterIteratorSymbol] === true;
}

export function isScatterDeclaration(entity: IWdlEntity): boolean {
  return entity.contextType === ContextTypes.declaration
    && entity.parent
    && isScatter(entity.parent);
}

export function isExecutable(
  entity: IWdlEntity,
): entity is IExecutable {
  return isAction(entity)
    && (
      entity.contextType === ContextTypes.task
      || entity.contextType === ContextTypes.workflow
    );
}

export function isWorkflow(
  entity: IWdlEntity,
): entity is IScatter {
  return isExecutable(entity) && entity.contextType === ContextTypes.workflow;
}

export function isTask(
  entity: IWdlEntity,
): entity is ITask {
  return isExecutable(entity) && entity.contextType === ContextTypes.task;
}

export {
  PrimitiveTypes,
  CompoundTypes,
  ContextTypes,
  ContextTypeSymbol,
  ScatterIteratorSymbol,
  CommandTypes,
  WdlEvent,
  TActionTypes,
  TActionWithOutputsTypes,
  TParameterTypes,
  TExpressionTypes,
  TExecutableTypes,
  SupportedFormats,
  WdlVersion,
  ImportDepthSymbol,
};
