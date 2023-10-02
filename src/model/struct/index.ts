import {
  ContextTypes,
} from '../context-types';
import {
  IStruct, IStructOptions, IStructProperty, WdlEvent,
} from '../types';
import Parameter from '../parameter';
import WdlEntity from '../base/wdl-entity';
import StructProperty from './struct-property';
import { createEventDispatcherArray, WdlEventDispatcherArray } from '../events';
import { getScopedContent } from '../utilities/wdl-generation';

Parameter.registerInitializer(ContextTypes.structProperty, StructProperty);

class Struct extends WdlEntity<ContextTypes.struct> implements IStruct {
  static deserialize(options: IStructOptions): Struct {
    return new Struct(options);
  }

  private readonly _properties: WdlEventDispatcherArray<StructProperty>;

  constructor(options: IStructOptions) {
    super(ContextTypes.struct, options);
    const {
      properties = {},
    } = options;
    this._properties = createEventDispatcherArray(
      this,
      [
        WdlEvent.structPropertiesAdded,
      ],
      [
        WdlEvent.structPropertiesRemoved,
      ],
      [
        WdlEvent.structPropertiesChanged,
        {
          event: WdlEvent.changed,
          bubble: true,
          args: [{ changed: 'struct' }],
        },
      ],
    );
    this.registerChildrenContainer(this._properties);
    this.muteAction(() => {
      this._properties.push(
        ...Parameter.deserializeCollection(properties, ContextTypes.structProperty),
      );
    });
    this.informTreeChanged();
  }

  get properties(): IStructProperty[] {
    return this._properties;
  }

  hasProperty(property: string): boolean {
    return !!this.getProperty(property);
  }

  getProperty(property: string): IStructProperty | undefined {
    return this.properties.find((p) => p.name === property);
  }

  generateWdl(): string {
    if (this.validate(true)) {
      return getScopedContent(
        `struct ${this.name}`,
        this._properties,
      );
    }
    return undefined;
  }
}

export default Struct;
