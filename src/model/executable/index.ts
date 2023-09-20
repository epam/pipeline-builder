import { createEventDispatcherArray, WdlEvent, WdlEventDispatcherArray } from '../events';
import { ActionWithOutputs } from '../action';
import Meta from './meta';
import {
  ICall, IExecutable, IExecutableOptions, IMeta, TExecutableTypes,
} from '../types';
import { ActionWdlContentBlock } from '../action/action';
import { getScopedContent, IWdlContentItem } from '../utilities/wdl-generation';

abstract class Executable<T extends TExecutableTypes = TExecutableTypes>
  extends ActionWithOutputs<T> implements IExecutable<T> {
  private readonly _meta: WdlEventDispatcherArray<Meta>;

  private readonly _parametersMeta: WdlEventDispatcherArray<Meta>;

  private readonly _executions: ICall[];

  protected constructor(contextType: T, options: IExecutableOptions<T>) {
    if (!options) {
      throw new Error('Executable options are not provided');
    }
    super(contextType, options);
    this._executions = [];
    const {
      meta = [],
      parametersMeta = [],
    } = options;
    this._meta = createEventDispatcherArray(
      this,
      WdlEvent.metaAdded,
      WdlEvent.metaRemoved,
      [
        WdlEvent.metaChanged,
        {
          event: WdlEvent.changed,
          bubble: true,
          args: [{ changed: 'meta' }],
        },
      ],
    );
    this._parametersMeta = createEventDispatcherArray(
      this,
      WdlEvent.metaAdded,
      WdlEvent.metaRemoved,
      [
        WdlEvent.metaChanged,
        {
          event: WdlEvent.changed,
          bubble: true,
          args: [{ changed: 'parameters meta' }],
        },
      ],
    );
    this.muteAction(() => {
      this.registerChildrenContainer(this._meta);
      this.registerChildrenContainer(this._parametersMeta);
      this._meta.push(...Meta.deserializeArray(meta));
      this._parametersMeta.push(...Meta.deserializeArray(parametersMeta));
    });
    this.informTreeChanged();
  }

  get executions(): ICall[] {
    return this._executions;
  }

  get meta(): IMeta[] {
    return this._meta;
  }

  get parametersMeta(): IMeta[] {
    return this._parametersMeta;
  }

  registerCall(call: ICall) {
    if (!this._executions.includes(call)) {
      this._executions.push(call);
    }
  }

  unregisterCall(call: ICall) {
    const idx = this._executions.indexOf(call);
    if (idx > 0) {
      this._executions.splice(idx, 1);
    }
  }

  protected getWdlContentItems(): [IWdlContentItem, ActionWdlContentBlock][] {
    return [
      ...super.getWdlContentItems(),
      [
        getScopedContent('meta', this.meta),
        ActionWdlContentBlock.preFinalization,
      ],
      [
        getScopedContent('parameter_meta', this.parametersMeta),
        ActionWdlContentBlock.preFinalization,
      ],
    ];
  }
}

export default Executable;
