import { dia, V } from 'jointjs';
import { VisualElement } from '../elements';
import VisualDeclarations from '../elements/visual-declarations';
import { setSVGText, SVGText } from '../utilities/svg-rich-text';

enum Flags {
  CLASSES = 'CLASSES',
  ELEMENT_NAME = 'ELEMENT_NAME',
}

class VisualElementView extends dia.ElementView {
  get visualElement(): VisualElement | undefined {
    const { model } = this;
    if (model instanceof VisualElement) {
      return model;
    }
    return undefined;
  }

  // eslint-disable-next-line class-methods-use-this
  presentationAttributes(): dia.CellView.PresentationAttributes {
    return dia.ElementView.addPresentationAttributes({
      selected: Flags.CLASSES,
      elementName: Flags.ELEMENT_NAME,
      valid: Flags.CLASSES,
      containsIssues: Flags.CLASSES,
      entity: [Flags.ELEMENT_NAME, Flags.CLASSES],
    });
  }

  protected manageClasses(): this {
    const { visualElement } = this;
    if (this.el && visualElement) {
      const vRoot = V(this.el);
      const { entity } = visualElement;
      const actionType = entity.contextType;
      const declarations = visualElement instanceof VisualDeclarations;
      vRoot
        .toggleClass('visual-element', true)
        .toggleClass('visual-declarations', declarations)
        .toggleClass('selected', visualElement.selected)
        .toggleClass('invalid', !visualElement.valid)
        .toggleClass('issues', visualElement.containsIssues)
        .toggleClass(`visual-${actionType}`, true);
    }
    return this;
  }

  protected renderElementName(): this {
    const { visualElement } = this;
    if (visualElement) {
      const label = this.findBySelector('label')[0];
      if (label && visualElement.elementName) {
        setSVGText(label, visualElement.elementName);
      }
    }
    return this;
  }

  render(): this {
    super.render();
    this.manageClasses();
    this.renderElementName();
    this.renderPorts();
    return this;
  }

  protected renderPort(
    portId: string | number,
    parameterName: SVGText | undefined,
    valid: boolean,
    containsIssues: boolean,
  ) {
    const node = this.findPortNode(portId);
    const portLabel = this.findPortNode(portId, 'label');
    if (portLabel) {
      if (parameterName) {
        setSVGText(portLabel, parameterName);
      } else {
        setSVGText(portLabel, '');
      }
      V(portLabel)
        .toggleClass('invalid', !valid)
        .toggleClass('issues', containsIssues);
    }
    if (node) {
      V(node)
        .toggleClass('visual-parameter', true)
        .toggleClass('invalid', !valid)
        .toggleClass('issues', containsIssues);
    }
  }

  protected renderPorts(): this {
    const { visualElement } = this;
    if (visualElement) {
      visualElement.getPorts().forEach((port) => {
        this.renderPort(
          port.id,
          visualElement.getParameterName(port),
          visualElement.getParameterValid(port),
          visualElement.getParameterContainsIssues(port),
        );
      });
    }
    return this;
  }

  confirmUpdate(flag, opt): number {
    const flagPorts = this.hasFlag(flag, dia.ElementView.Flags.PORTS);
    let resultedFlag = super.confirmUpdate(flag, opt);
    if (flagPorts) {
      this.renderPorts();
    }
    if (this.hasFlag(resultedFlag, Flags.CLASSES)) {
      this.manageClasses();
      resultedFlag = this.removeFlag(resultedFlag, Flags.CLASSES);
    }
    if (this.hasFlag(resultedFlag, Flags.ELEMENT_NAME)) {
      this.renderElementName();
      resultedFlag = this.removeFlag(resultedFlag, Flags.ELEMENT_NAME);
    }
    return resultedFlag;
  }
}

export default VisualElementView;
