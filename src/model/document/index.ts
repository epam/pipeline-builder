import WdlEntity from '../base/wdl-entity';
import {
  ContextTypes,
  IAction,
  IExecutable,
  IImport,
  ImportDepthSymbol,
  IProject,
  IStruct,
  IStructAlias,
  ITask, ITaskOptions,
  IUnnamedTaskOptions,
  IWdlDocument,
  IWdlDocumentOptions,
  IWorkflow,
  IWorkflowOptions,
  WdlEvent,
  WdlVersion,
} from '../types';
import { createEventDispatcherArray, WdlEventDispatcherArray } from '../events';
import Workflow from '../workflow';
import Task from '../task';
import Import from '../import';
import Struct from '../struct';
import generateName from '../utilities/generate-name';
import { getContent } from '../utilities/wdl-generation';

class WdlDocument
  extends WdlEntity<ContextTypes.document>
  implements IWdlDocument {
  static defaultProject?: IProject = undefined;

  private _imports: WdlEventDispatcherArray<Import>;

  private _structs: WdlEventDispatcherArray<Struct>;

  private _workflows: WdlEventDispatcherArray<Workflow>;

  private _tasks: WdlEventDispatcherArray<Task>;

  private readonly _uri: string | undefined;

  private readonly _project: IProject;

  private readonly _version: WdlVersion;

  [ImportDepthSymbol]: number;

  constructor(options: IWdlDocumentOptions) {
    const {
      project = WdlDocument.defaultProject,
    } = options || {};
    if (!project) {
      throw new Error('Default project is missing');
    }
    super(ContextTypes.document, options);
    const {
      uri,
      structs = [],
      imports = [],
      tasks = [],
      workflows = [],
      version = project.wdlVersion,
      [ImportDepthSymbol]: importDepth = 0,
    } = options || {};
    this[ImportDepthSymbol] = importDepth;
    this._project = project;
    this._version = version;
    this._uri = uri;
    this._imports = createEventDispatcherArray(
      this,
      WdlEvent.importsAdded,
      WdlEvent.importsRemoved,
      [
        WdlEvent.importsChanged,
        {
          event: WdlEvent.changed,
          bubble: true,
          args: [{ changed: 'imports' }],
        },
      ],
    );
    this._workflows = createEventDispatcherArray(
      this,
      [WdlEvent.workflowsAdded, WdlEvent.actionsAdded],
      [WdlEvent.workflowsRemoved, WdlEvent.actionsRemoved],
      [
        WdlEvent.workflowsChanged,
        WdlEvent.actionsChanged,
        {
          event: WdlEvent.changed,
          bubble: true,
          args: [{ changed: 'workflows' }],
        },
      ],
    );
    this._tasks = createEventDispatcherArray(
      this,
      WdlEvent.tasksAdded,
      WdlEvent.tasksRemoved,
      [
        WdlEvent.tasksChanged,
        {
          event: WdlEvent.changed,
          bubble: true,
          args: [{ changed: 'tasks' }],
        },
      ],
    );
    this._structs = createEventDispatcherArray(
      this,
      WdlEvent.structsAdded,
      WdlEvent.structsRemoved,
      [
        WdlEvent.structsChanged,
        {
          event: WdlEvent.changed,
          bubble: true,
          args: [{ changed: 'structs' }],
        },
      ],
    );
    this.registerChildrenContainer(this._imports);
    this.registerChildrenContainer(this._tasks);
    this.registerChildrenContainer(this._workflows);
    this.registerChildrenContainer(this._structs);
    this.muteAction(() => {
      this._imports.push(...imports.map(Import.deserialize));
      this._structs.push(...structs.map(Struct.deserialize));
      this._workflows.push(...workflows.map(Workflow.deserializeWorkflow));
      this._tasks.push(...tasks.map(Task.deserializeTask));
    });
    this.spread(WdlEvent.treeChanged);
  }

  async loadImports(): Promise<IWdlDocument[]> {
    const documents = await Promise.all(this._imports.map((i) => i.load()));
    this.spread(WdlEvent.treeChanged);
    return documents;
  }

  destroy() {
    this._structs.forEach((imp) => imp.destroy());
    this._structs.destroy();
    this._structs = undefined;
    this._imports.forEach((imp) => imp.destroy());
    this._imports.destroy();
    this._imports = undefined;
    this._workflows.forEach((imp) => imp.destroy());
    this._workflows.destroy();
    this._workflows = undefined;
    this._tasks.forEach((imp) => imp.destroy());
    this._tasks.destroy();
    this._tasks = undefined;
    super.destroy();
  }

  get project(): IProject {
    return this._project;
  }

  get version(): WdlVersion {
    return this._version;
  }

  /**
   * Document URI
   * @returns {string|undefined}
   */
  get uri(): string | undefined {
    return this._uri;
  }

  /**
   * @returns {IStruct[]}
   */
  get structs(): IStruct[] {
    return this._structs;
  }

  get globalStructs(): IStructAlias[] {
    // https://github.com/openwdl/wdl/blob/main/versions/1.1/SPEC.md#struct-namespacing
    // Although a struct is a top-level element, it is not considered a member of the WDL document's
    // namespace the way that other top-level elements (tasks and workflows) are.
    // Instead, when a WDL document is imported all of its structs are added to
    // a global struct namespace.
    // This enables structs to be used by their name alone,
    // without the need for any `namespace.` prefix.
    return []
      .concat(
        this.structs.map((struct) => ({
          alias: struct.name,
          struct,
        })),
      )
      .concat(
        this.imports.reduce<IStructAlias[]>((result, i) => ([
          ...result,
          ...i.structs,
        ]), []),
      );
  }

  /**
   * @returns {IImport[]}
   */
  get imports(): IImport[] {
    return this._imports;
  }

  /**
   * @returns {IWorkflow[]}
   */
  get workflows(): IWorkflow[] {
    return this._workflows;
  }

  /**
   * @returns {ITask[]}
   */
  get tasks(): ITask[] {
    return this._tasks;
  }

  get executables(): IExecutable[] {
    return []
      .concat(this.workflows)
      .concat(this.tasks)
      .concat(this.imports.reduce<IExecutable[]>((ex, i) => ([
        ...ex,
        ...(i.document ? i.document.executables : []),
      ]), []));
  }

  getAliases(...type: ContextTypes[]): string[] {
    const types = new Set(type.length === 0 ? Object.values(ContextTypes) : type);
    let aliases = []
      .concat(
        this.imports.reduce<string[]>(
          (importAliases, i) => importAliases
            .concat(i.getAliases(...type)),
          [],
        ),
      );
    if (types.has(ContextTypes.struct)) {
      aliases = aliases
        .concat(this.structs.map((wf) => wf.name));
    }
    if (types.has(ContextTypes.workflow)) {
      aliases = aliases
        .concat(this.workflows.map((wf) => wf.name));
    }
    if (types.has(ContextTypes.task)) {
      aliases = aliases
        .concat(this.tasks.map((wf) => wf.name));
    }
    if (types.has(ContextTypes.call)) {
      aliases = aliases
        .concat(
          this.workflows.reduce<string[]>(
            (wfAliases, i) => wfAliases
              .concat(i.getChildrenActionsAliases()),
            [],
          ),
        );
    }
    return aliases;
  }

  resolveStruct(struct: string): IStruct | undefined {
    const alias = this.globalStructs.find((o) => o.alias === struct);
    return alias ? alias.struct : undefined;
  }

  getWorkflow(): IWorkflow | undefined;
  getWorkflow(name: string): IWorkflow | undefined;
  getWorkflow(name?: string): IWorkflow | undefined {
    if (!name) {
      return this.workflows[0];
    }
    return this.workflows.find((workflow) => workflow.name === name || workflow.alias === name);
  }

  requireWorkflow(): IWorkflow {
    return this.getWorkflow() || this.addWorkflow();
  }

  addWorkflow(): IWorkflow;
  addWorkflow(name: string): IWorkflow;
  addWorkflow(options: IWorkflowOptions): IWorkflow;
  addWorkflow(workflow: IWorkflow): IWorkflow;
  /**
   * @param {string} [options]
   * @returns {IWorkflow}
   */
  addWorkflow(options: string | IWorkflowOptions | IWorkflow = undefined): IWorkflow {
    const occupiedNames = this.getAliases();
    const isIWorkflow = (o: string | IWorkflow | IWorkflowOptions | undefined): o is IWorkflow => (
      !!o && o instanceof Workflow
    );
    const workflow = ((): IWorkflow => {
      if (!options) {
        return new Workflow({
          name: generateName('Workflow', occupiedNames),
        });
      }
      if (typeof options === 'string') {
        return new Workflow({
          name: options || generateName('Workflow', occupiedNames),
        });
      }
      if (isIWorkflow(options)) {
        if (occupiedNames.includes(options.name)) {
          // eslint-disable-next-line no-param-reassign
          options.name = generateName(options.name, occupiedNames);
        }
        return options;
      }
      return new Workflow({
        ...options,
        name: generateName(options.name, occupiedNames),
      });
    })();
    this.workflows.push(workflow);
    return workflow;
  }

  removeWorkflow(workflow: IWorkflow) {
    const idx = this.workflows.indexOf(workflow);
    if (idx >= 0) {
      this.workflows.splice(idx, 1);
    }
  }

  addTask(): ITask;
  addTask(name: string): ITask;
  addTask(options: IUnnamedTaskOptions): ITask;
  addTask(options: ITaskOptions): ITask;
  addTask(task: ITask): ITask;
  addTask(options: string | ITaskOptions | IUnnamedTaskOptions | ITask = undefined): ITask {
    const isITask = (
      o: string | ITaskOptions | IUnnamedTaskOptions | ITask | undefined,
    ): o is ITask => (
      !!o && o instanceof Task
    );
    const occupiedNames = this.getAliases();
    const task = ((): ITask => {
      if (!options) {
        return new Task({
          name: generateName('Task', occupiedNames),
          command: '',
        });
      }
      if (typeof options === 'string') {
        return new Task({
          name: generateName(options, occupiedNames),
          command: '',
        });
      }
      if (isITask(options)) {
        const { name } = options;
        if (occupiedNames.includes(name)) {
          // eslint-disable-next-line no-param-reassign
          options.name = generateName(name, occupiedNames);
        }
        return options;
      }
      if ('name' in options) {
        return new Task({
          ...options,
          name: generateName(options.name || 'Task', occupiedNames),
        });
      }
      const namedOptions: ITaskOptions = {
        ...options,
        name: generateName('Task', occupiedNames),
      };
      return new Task(namedOptions);
    })();
    this.tasks.push(task);
    return task;
  }

  removeTask(task: ITask) {
    const idx = this.tasks.indexOf(task);
    if (idx >= 0) {
      this.tasks.splice(idx, 1);
    }
  }

  remove(workflow: IWorkflow): void;
  remove(task: ITask): void;
  remove(action: IAction): void;
  remove(action: IAction | IWorkflow | ITask): void {
    if (action instanceof Workflow) {
      this.removeWorkflow(action);
    } else if (action instanceof Task) {
      this.removeTask(action);
    }
  }

  generateWdl(): string {
    if (this.validate(true)) {
      const header = ((): string | undefined => {
        switch (this.version) {
          case WdlVersion.draft1:
          case WdlVersion.draft2:
          case undefined:
          case null:
            return undefined;
          default:
            return `version ${this.version}`;
        }
      })();
      return getContent([
        header,
        this.imports,
        this.structs,
        this.workflows,
        this.tasks,
      ]);
    }
    return undefined;
  }
}

export default WdlDocument;
