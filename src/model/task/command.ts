import {
  CommandTypes,
  ContextTypes,
  ICommand,
  ICommandOptions, ITask,
  IWdlError,
  WdlEvent,
} from '../types';
import WdlEntity from '../base/wdl-entity';
import {
  getCommandPrettierOptions,
  ICommandPrettierOptions,
  makePretty,
} from '../utilities/command-prettier';
import { getScopedContent } from '../utilities/wdl-generation';
import { CommandRequiredError } from '../validation';

const CommandBeginSyntax = {
  [CommandTypes.brackets]: '{',
  [CommandTypes.hereDoc]: '<<<',
};

const CommandEndSyntax = {
  [CommandTypes.brackets]: '}',
  [CommandTypes.hereDoc]: '>>>',
};

class Command
  extends WdlEntity<ContextTypes.command>
  implements ICommand {
  private _command: string;

  private _task: ITask;

  private readonly _prettierOptions: ICommandPrettierOptions;

  private _commandType: CommandTypes;

  constructor(options: ICommandOptions, task: ITask) {
    super(ContextTypes.command, options);
    const {
      begin,
      commandType = begin || CommandTypes.hereDoc,
      command = '',
    } = options || {};
    this._task = task;
    this._prettierOptions = getCommandPrettierOptions(command);
    this._command = makePretty(command, this._prettierOptions);
    this._commandType = commandType;
    this.validateEntity(false);
  }

  protected get eventsRequireValidation(): Set<WdlEvent> {
    return new Set([
      ...super.eventsRequireValidation,
      WdlEvent.commandChanged,
    ]);
  }

  get commandType(): CommandTypes {
    return this._commandType;
  }

  set commandType(commandType: CommandTypes) {
    if (commandType !== this._commandType) {
      this._commandType = commandType;
      this.bubble(WdlEvent.commandTypeChanged);
      this.bubble(WdlEvent.changed, { changed: 'command type' });
    }
  }

  get begin() {
    return CommandBeginSyntax[this.commandType];
  }

  get end() {
    return CommandEndSyntax[this.commandType];
  }

  get command(): string {
    return this._command;
  }

  set command(command) {
    if (command !== this._command) {
      this._command = command;
      this.bubble(WdlEvent.commandChanged);
      this.bubble(WdlEvent.changed, { changed: 'command' });
    }
  }

  protected getValidationErrors(): IWdlError[] {
    const issues = super.getValidationErrors();
    if (!this.command || this.command.trim().length === 0) {
      issues.push(new CommandRequiredError(this));
    }
    return issues;
  }

  generateWdl(): string {
    return getScopedContent(
      {
        scope: 'command',
        open: this.begin,
        close: this.end,
      },
      this._command,
    );
  }

  toString(): string {
    if (this._task) {
      return `command of ${this._task.toString()}`;
    }
    return 'command';
  }
}

export default Command;
