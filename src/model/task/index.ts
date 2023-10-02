import Executable from '../executable';
import {
  ContextTypes,
} from '../context-types';
import {
  ICommandData,
  ICommandOptions,
  IRuntime,
  IRuntimeObject,
  ISingleCommandOptions,
  ITask,
  ITaskOptions,
  IWdlError,
  WdlEvent,
} from '../types';
import Command from './command';
import { createEventDispatcherArray, WdlEventDispatcherArray } from '../events';
import Runtime from './runtime';
import { getScopedContent, IWdlContentItem } from '../utilities/wdl-generation';
import { ActionWdlContentBlock } from '../action/action';

function getCommandOptions(command: ICommandData): ICommandOptions {
  if (typeof command === 'string') {
    return {
      command,
    };
  }
  return command;
}

function mergeCommands(commands: ICommandData[]): ICommandOptions {
  if (commands.length === 0) {
    return {
      command: '',
    };
  }
  const command: string = commands
    .reduce<string>(
    (result, commandOptions) => result
      .concat('\n')
      .concat(getCommandOptions(commandOptions).command || ''),
    '',
  );
  const [first] = commands;
  return {
    ...getCommandOptions(first),
    command,
  };
}

function isSingleCommandOptions(
  o: ITaskOptions,
): o is ITaskOptions<ISingleCommandOptions> {
  return !!o
    && 'command' in o
    && (
      typeof o.command === 'string'
      || (
        typeof o.command === 'object'
        && 'command' in o.command
      )
    );
}

class Task extends Executable<ContextTypes.task> implements ITask {
  private readonly _command: Command;

  private readonly _runtime: WdlEventDispatcherArray<Runtime>;

  static deserializeTask(options: ITaskOptions | ITask): Task {
    function isTask(o: ITask | ITaskOptions): o is ITask {
      return o && o instanceof Task;
    }
    if (isTask(options)) {
      return options as Task;
    }
    return new Task(options);
  }

  /**
   * @param {ITaskOptions} options
   */
  constructor(options: ITaskOptions) {
    if (!options) {
      throw new Error('Task should be initialized with options');
    }
    super(ContextTypes.task, options);
    const opts = ((): ITaskOptions<ISingleCommandOptions> => {
      if (isSingleCommandOptions(options)) {
        return options;
      }
      const {
        commands = [],
        ...rest
      } = options;
      return {
        ...rest,
        command: mergeCommands(commands),
      };
    })();
    const {
      runtime = [],
      command,
    } = opts;
    this._command = new Command(getCommandOptions(command), this);
    this.startForwardEventsFrom(
      this._command,
      WdlEvent.commandChanged,
      WdlEvent.commandTypeChanged,
    );
    this._runtime = createEventDispatcherArray(
      this,
      WdlEvent.runtimeAdded,
      WdlEvent.runtimeRemoved,
      [
        WdlEvent.runtimeChanged,
        {
          event: WdlEvent.changed,
          bubble: true,
          args: [{ changed: 'runtime' }],
        },
      ],
    );
    this.registerChildrenContainer(this._runtime);
    this._runtime.push(...Runtime.deserializeRuntime(runtime));
  }

  get runtime(): IRuntime[] {
    return this._runtime;
  }

  get command(): string {
    return this._command.command;
  }

  set command(command: string) {
    this._command.command = command;
  }

  get runtimeData(): IRuntimeObject {
    return this.runtime.reduce((data, runtime) => ({
      ...data,
      [runtime.property]: runtime.value,
    }), {});
  }

  protected get eventsRequireValidation(): Set<WdlEvent> {
    return new Set([
      ...super.eventsRequireValidation,
      WdlEvent.commandChanged,
      WdlEvent.runtimePropertyChanged,
      WdlEvent.runtimeChanged,
    ]);
  }

  getRuntimeEntry(runtime: string): IRuntime | undefined {
    return this.runtime.find((o) => o.property === runtime);
  }

  getRuntime(runtime: string): string | undefined {
    const r = this.getRuntimeEntry(runtime);
    return r ? r.value : undefined;
  }

  setRuntime(runtime: string): string | undefined;
  setRuntime(runtime: string, value: string | undefined): string | undefined;
  setRuntime(runtime: string, value: string | undefined = undefined): string | undefined {
    let runtimeEntry: IRuntime | undefined = this.getRuntimeEntry(runtime);
    if (!runtimeEntry) {
      runtimeEntry = new Runtime({
        property: runtime,
        value,
      });
      this.runtime.push(runtimeEntry);
    } else {
      runtimeEntry.value = value;
    }
    return runtimeEntry.value;
  }

  removeRuntime(runtime: string): void {
    const entry = this.getRuntimeEntry(runtime);
    if (entry) {
      const idx = this.runtime.indexOf(entry);
      if (idx >= 0) {
        this.runtime.splice(idx, 1);
      }
    }
  }

  remove() {
    const { executions = [] } = this;
    executions.forEach((execution) => {
      execution.remove();
    });
    super.remove();
  }

  protected getValidationErrors(): IWdlError[] {
    return super.getValidationErrors()
      .concat(this._command ? this._command.issues : []);
  }

  protected getWdlContentHeader(): string {
    return `task ${this.name}`;
  }

  toString(): string {
    return `task "${this.name}"`;
  }

  protected getWdlContentItems(): [IWdlContentItem, ActionWdlContentBlock][] {
    return [
      ...super.getWdlContentItems(),
      [
        this._command,
        ActionWdlContentBlock.postBody,
      ],
      [
        getScopedContent('runtime', this.runtime),
        ActionWdlContentBlock.preFinalization,
      ],
    ];
  }
}

export default Task;
