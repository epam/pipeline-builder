import WdlEntity from '../base/wdl-entity';
import {
  ContextTypes,
} from '../context-types';
import {
  ICall, ICallAfter, ICallAfterOptions, isCall, WdlEvent,
} from '../types';
import resolveIdentifier from '../utilities/resolve-identifier';

class CallAfter
  extends WdlEntity<ContextTypes.callAfter>
  implements ICallAfter {
  static deserializeCallAfter(after: ICallAfterOptions[] | undefined): CallAfter[] {
    return (after || []).map((options) => new CallAfter(options));
  }

  private _call: ICall | undefined;

  private _callName: string;

  constructor(options: ICallAfterOptions) {
    if (!options) {
      throw new Error('Call after options are not provided');
    }
    if (!options.call) {
      throw new Error('Call after identifier is not provided');
    }
    const callName = ((): string => {
      if (typeof options.call === 'string') {
        return options.call;
      }
      return options.call.reference;
    })();
    const call = ((): ICall | undefined => {
      if (typeof options.call === 'string') {
        return undefined;
      }
      return options.call;
    })();
    super(ContextTypes.callAfter, { name: callName });
    this._callName = callName;
    this.setCall(call);
  }

  get call(): ICall | undefined {
    return this._call;
  }

  get callName(): string {
    return this._callName;
  }

  private setCall(call: ICall | undefined): void {
    if (this._call !== call && call) {
      this._call = call;
      this._callName = call.reference;
      this.trigger(WdlEvent.callAfterChanged, this);
    }
  }

  protected onTreeChanged() {
    super.onTreeChanged();
    if (!this._call) {
      const callInstance = resolveIdentifier(
        this.root,
        this._callName,
        ContextTypes.call,
      );
      if (callInstance && isCall(callInstance)) {
        this.setCall(callInstance);
      }
    }
  }
}

export default CallAfter;
