import { dia, V } from 'jointjs';
import VisualConnection from '../elements/visual-connection';
import { IPaper, IVisualizer } from '../types';
import { VisualAction } from '../elements';
import { IParameter } from '../../model/types';
import getParameter from '../utilities/get-parameter';
import VisualDeclarations from '../elements/visual-declarations';

enum Flags {
  CLASSES = 'CLASSES',
}

function isIPaper(paper: dia.Paper): paper is IPaper {
  return 'workflowConnectionMarker' in paper && 'defaultConnectionMarker' in paper;
}

class ConnectionView extends dia.LinkView {
  static getLinkParameter(cellView: dia.CellView, magnet: SVGElement): IParameter | undefined {
    const {
      model,
    } = cellView;
    if (
      (
        model instanceof VisualAction
        || model instanceof VisualDeclarations
      )
      && model.action
      && magnet
    ) {
      const portId = magnet.getAttribute('port');
      return getParameter(model.action, portId);
    }
    return undefined;
  }

  static defaultLink(cellView: dia.CellView, magnet: SVGElement): VisualConnection {
    const parameter = ConnectionView.getLinkParameter(cellView, magnet);
    return new VisualConnection({
      source: parameter,
      temp: true,
    });
  }

  static validateConnectionFactory(visualizer: IVisualizer): (
    cellViewS: dia.CellView,
    magnetS: SVGElement,
    cellViewT: dia.CellView,
    magnetT: SVGElement,
  ) => boolean {
    return function validateConnection(
      cellViewS: dia.CellView,
      magnetS: SVGElement,
      cellViewT: dia.CellView,
      magnetT: SVGElement,
    ): boolean {
      if (!visualizer || visualizer.readOnly) {
        return false;
      }
      if (magnetS === magnetT) {
        return false;
      }
      const sourceParameter = ConnectionView.getLinkParameter(cellViewS, magnetS);
      const targetParameter = ConnectionView.getLinkParameter(cellViewT, magnetT);
      if (sourceParameter && targetParameter) {
        return targetParameter.canBindTo(sourceParameter);
      }
      return false;
    };
  }

  // eslint-disable-next-line class-methods-use-this
  presentationAttributes(): dia.CellView.PresentationAttributes {
    return dia.LinkView.addPresentationAttributes({
      isWorkflowConnection: Flags.CLASSES,
      targetParameter: Flags.CLASSES,
    });
  }

  protected manageClasses() {
    const { model } = this;
    if (this.el && model instanceof VisualConnection) {
      const vRoot = V(this.el);
      vRoot
        .toggleClass('visual-connection', true)
        .toggleClass('visual-connection-workflow', model.isWorkflowConnection)
        .toggleClass(
          'visual-connection-complex',
          !!model.targetParameter && !model.targetParameter.isSingleDependency,
        )
        .toggleClass('selected', model.selected);
      const line = this.findBySelector('line')[0];
      if (isIPaper(this.paper) && line) {
        const id = model.isWorkflowConnection
          ? this.paper.workflowConnectionMarker
          : this.paper.defaultConnectionMarker;
        V(line).attr('marker-end', `url(#${id})`);
      }
    }
  }

  render(): this {
    super.render();
    this.manageClasses();
    return this;
  }

  confirmUpdate(flag, opt): number {
    const hasTargetFlag = this.hasFlag(flag, dia.LinkView.Flags.TARGET);
    let resultedFlag = super.confirmUpdate(flag, opt);
    if (hasTargetFlag || this.hasFlag(resultedFlag, Flags.CLASSES)) {
      this.manageClasses();
      resultedFlag = this.removeFlag(resultedFlag, Flags.CLASSES);
    }
    return resultedFlag;
  }
}

export default ConnectionView;
