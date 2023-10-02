import {
  ContextTypes,
} from '../context-types';
import {
  IExpression,
  IRuntime,
  IRuntimeConfiguration,
  IRuntimeObject,
  IRuntimeOptions,
  WdlEvent,
} from '../types';
import Expression from '../expression';
import { ensureString } from '../utilities/wdl-generation';

class Runtime extends Expression<ContextTypes.runtime> implements IRuntime {
  static deserialize(options: IRuntimeOptions): Runtime {
    return new Runtime(options);
  }

  static deserializeArray(runtimeOptions: IRuntimeOptions[] = []): Runtime[] {
    return runtimeOptions.map(Runtime.deserialize);
  }

  static deserializeObject(runtimeOptions: IRuntimeObject = {}): Runtime[] {
    return Runtime.deserializeArray(
      Object.entries(runtimeOptions || {}).map(([property, value]) => ({
        property,
        value,
      })),
    );
  }

  static deserializeRuntime(options: IRuntimeConfiguration): Runtime[] {
    if (Array.isArray(options)) {
      return Runtime.deserializeArray(options);
    }
    return Runtime.deserializeObject(options);
  }

  private _property: string;

  constructor(options: IRuntimeOptions) {
    const { property } = options || {};
    super(
      options,
      ContextTypes.runtime,
    );
    this._property = property;
  }

  protected get eventsRequireValidation(): Set<WdlEvent> {
    return new Set([
      ...super.eventsRequireValidation,
      WdlEvent.runtimePropertyChanged,
    ]);
  }

  get property() {
    return this._property;
  }

  set property(property) {
    if (this._property !== property) {
      this._property = property;
      this.bubble(WdlEvent.runtimePropertyChanged);
      this.bubble(WdlEvent.changed, { changed: 'property' });
    }
  }

  get name() {
    return this.property;
  }

  set name(name) {
    this.property = name;
  }

  protected reportValueChanged() {
    this.bubble(WdlEvent.runtimePropertyChanged, this.value);
    this.bubble(WdlEvent.changed, { changed: 'property' });
  }

  canBindTo(source: IExpression): boolean;
  canBindTo(source: IExpression, throwError: boolean): boolean | never;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  canBindTo(source: IExpression, throwError?: boolean): boolean | never {
    // todo: not sure if we can bing runtime to ANY parameter
    return true;
  }

  remove(): void {
    this.parent = undefined;
  }

  generateWdl(): string {
    if (this.validate(true)) {
      return `${this.property}: ${ensureString(this.value)}`;
    }
    return undefined;
  }
}

export default Runtime;
