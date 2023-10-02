import WdlEntity from '../base/wdl-entity';
import {
  ContextTypes,
} from '../context-types';
import {
  IMeta,
  IMetaOptions,
  WdlEvent,
} from '../types';

class Meta
  extends WdlEntity<ContextTypes.metaElement>
  implements IMeta {
  private _meta: string;

  static deserialize(options: IMetaOptions): Meta {
    return new Meta(options);
  }

  static deserializeArray(metaOptions: IMetaOptions[] = []): Meta[] {
    return metaOptions.map(Meta.deserialize);
  }

  /**
   * @param {IMetaOptions} options
   */
  constructor(options: IMetaOptions) {
    const {
      parameter,
      meta,
    } = options || {};
    super(
      ContextTypes.metaElement,
      {
        name: parameter,
        ...(options || {}),
      },
    );
    /**
     * @type {string}
     * @private
     */
    this._meta = meta;
  }

  get parameter() {
    return this.name;
  }

  set parameter(parameter) {
    if (this.name !== parameter) {
      this.name = parameter;
      this.bubble(WdlEvent.metaElementChanged);
      this.bubble(WdlEvent.metaChanged);
    }
  }

  get meta() {
    return this._meta;
  }

  set meta(meta) {
    if (meta !== this._meta) {
      this._meta = meta;
      this.bubble(WdlEvent.metaElementChanged);
      this.bubble(WdlEvent.metaChanged);
      this.bubble(WdlEvent.changed, { changed: 'meta' });
    }
  }

  generateWdl(): string {
    return `${this.parameter}: ${this.meta}`;
  }
}

export default Meta;
