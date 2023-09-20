import defaultsDeep from '../utilities/defaults-deep';
import VisualElement from './visual-element';
import { DECLARATION_BLOCK_POSTFIX, getEntityIdentifier } from '../utilities/get-entity-identifier';
import Parameter from '../../model/parameter';
import { ContextTypes, IAction, IParameter } from '../../model/types';
import {
  IVisualDeclarations,
  IVisualElement,
  PortShapes,
  VisualDeclarationsOptions,
} from '../types';
import { SVGText } from '../utilities/svg-rich-text';
import { Action } from '../../model/action';

class VisualDeclarations extends VisualElement implements IVisualDeclarations {
  constructor(options: VisualDeclarationsOptions) {
    const {
      entity,
    } = options;
    super(defaultsDeep<VisualDeclarationsOptions>({
      id: getEntityIdentifier(entity, DECLARATION_BLOCK_POSTFIX),
      attrs: {
        body: {
          d: 'M 0 0 L 0 calc(h)',
        },
      },
    }, options));
  }

  get action(): IAction | undefined {
    const { entity } = this;
    return entity instanceof Action ? entity : undefined;
  }

  get level(): number {
    return super.level + 0.5;
  }

  get visible() {
    return !!this.action
      && this.action.getActionDeclarations().length > 0
      && super.getVisible();
  }

  /**
   * @param {Parameter} port
   * @param {string} group
   * @returns {{shape: PortShapes}}
   */
  // eslint-disable-next-line max-len
  // eslint-disable-next-line class-methods-use-this,no-unused-vars,@typescript-eslint/no-unused-vars
  getPortConfiguration(port: Parameter, group: string): {
    shape: PortShapes;
  } {
    return {
      shape: PortShapes.rectangle,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  getElementName(): SVGText {
    return undefined;
  }

  getInputPorts(): IParameter[] {
    return this.action ? this.action.getActionDeclarations() : [];
  }

  // eslint-disable-next-line class-methods-use-this
  getOutputPorts(): IParameter[] {
    return [];
  }

  getChildrenElements(): IVisualElement[];
  getChildrenElements(recursive: boolean): IVisualElement[];
  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  getChildrenElements(recursive: boolean = false): IVisualElement[] {
    return [];
  }

  protected shouldHandleParameter(parameter: IParameter): boolean {
    return super.shouldHandleParameter(parameter)
      && parameter.contextType === ContextTypes.declaration;
  }
}

export default VisualDeclarations;
