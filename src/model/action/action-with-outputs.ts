import Action, { ActionWdlContentBlock } from './action';
import {
  ContextTypes,
} from '../context-types';
import {
  IActionWithOutputs,
  IActionWithOutputsOptions,
  IParameter,
  TActionWithOutputsTypes,
  TParameterTypes,
  WdlEvent,
} from '../types';
import { createEventDispatcherArray, WdlEventDispatcherArray } from '../events';
import Parameter from '../parameter';
import { IEventDispatcherArray } from '../events/types';
import { TParameterInitializer } from '../parameter/parameter';
import { getScopedContent, IWdlContentItem } from '../utilities/wdl-generation';
import { getBodyElementsExecutionOrder } from '../utilities/dependencies';

/**
 * Base class for actions with outputs (Call and executables - Task & Workflow)
 */
abstract class ActionWithOutputs<T extends TActionWithOutputsTypes>
  extends Action<T>
  implements IActionWithOutputs<T> {
  private readonly _outputs: WdlEventDispatcherArray<Parameter<ContextTypes.output>>;

  protected constructor(
    contextType: T,
    options: IActionWithOutputsOptions<T>,
  );
  protected constructor(
    contextType: T,
    options: IActionWithOutputsOptions<T>,
    initializers: Map<TParameterTypes, TParameterInitializer>,
  );
  protected constructor(
    contextType: T,
    options: IActionWithOutputsOptions<T>,
    initializers?: Map<TParameterTypes, TParameterInitializer>,
  ) {
    super(contextType, options, initializers);
    const {
      o = {}, // for compatability with previous pipeline-builder versions
      outputs = o,
    } = options || {};
    this._outputs = createEventDispatcherArray(
      this,
      [
        WdlEvent.outputsAdded,
        WdlEvent.parametersAdded,
      ],
      [
        WdlEvent.outputsRemoved,
        WdlEvent.parametersRemoved,
      ],
      [
        WdlEvent.outputsChanged,
        WdlEvent.parametersChanged,
        {
          event: WdlEvent.changed,
          bubble: true,
          args: [{ changed: 'outputs' }],
        },
      ],
    );
    this.muteAction(() => {
      this.registerChildrenContainer(this._outputs);
      this._outputs.push(...Parameter.deserializeCollection(
        outputs,
        ContextTypes.output,
        Action.getInitializerForType(ContextTypes.output, initializers),
      ));
    });
    this.informTreeChanged();
  }

  override get parameters(): IParameter[] {
    return [].concat(this.inputs).concat(this.declarations).concat(this.outputs);
  }

  /**
   * @returns {IParameter[]}
   */
  get outputs(): IParameter<ContextTypes.output>[] {
    return this._outputs;
  }

  /**
   * @param {string} output
   * @returns {IParameter|undefined}
   */
  getOutput(output: string): IParameter<ContextTypes.output> | undefined {
    return this.getOutputByReference(output);
  }

  /**
   * @param {string} output
   * @returns {IParameter|undefined}
   */
  getOutputByName(output: string): IParameter<ContextTypes.output> | undefined {
    return this.getParameterByName(this.outputs, output);
  }

  /**
   * @param {string} output
   * @returns {IParameter|undefined}
   */
  getOutputByReference(output: string): IParameter<ContextTypes.output> | undefined {
    return this.getParameterByReference(this.outputs, output);
  }

  /**
   * If we have `getActionInputs` and `getActionOutputs` methods for `IAction`
   * interface, it's nice to have `getActionOutputs` as well
   */
  getActionOutputs(): IParameter<ContextTypes.output>[] {
    return this.outputs;
  }

  protected override getArrayForParameter<P extends TParameterTypes>(
    parameter: IParameter<P>,
  ): IEventDispatcherArray<IParameter> {
    switch (parameter.contextType) {
      case ContextTypes.output:
        return this._outputs as IEventDispatcherArray<IParameter>;
      default:
        return super.getArrayForParameter(parameter);
    }
  }

  protected getWdlContentItems(): [IWdlContentItem, ActionWdlContentBlock][] {
    return [
      ...super.getWdlContentItems(),
      [
        getScopedContent('output', getBodyElementsExecutionOrder(this.outputs)),
        ActionWdlContentBlock.postFinalization,
      ],
    ];
  }
}

export default ActionWithOutputs;
