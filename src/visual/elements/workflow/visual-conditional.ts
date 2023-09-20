import VisualAction from './visual-action';
import { Conditional } from '../../../model';
import {
  getSVGText,
  SVGText,
} from '../../utilities/svg-rich-text';
import VisualElement from '../visual-element';

class VisualConditional extends VisualAction {
  getElementName(): SVGText | undefined {
    if (
      this.action
      && this.action instanceof Conditional
      && this.action.expression
    ) {
      return getSVGText(
        'if',
        {
          text: this.action.expression,
          style: VisualElement.textBoldStyle,
        },
      );
    }
    return 'Condition';
  }
}

export default VisualConditional;
