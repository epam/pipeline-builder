import { ContextTypes, IStructProperty, IStructPropertyOptions } from '../types';
import Parameter from '../parameter';

class StructProperty
  extends Parameter<ContextTypes.structProperty>
  implements IStructProperty {
  constructor(options: IStructPropertyOptions) {
    if (!options) {
      throw new Error('Struct property should be initialized with options');
    }
    super(options, ContextTypes.structProperty);
  }
}

export default StructProperty;
