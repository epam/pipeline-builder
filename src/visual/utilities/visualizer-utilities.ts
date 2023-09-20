import { dia, linkTools } from 'jointjs';
import {
  IVisualizer,
  VisualizerOptions,
  VisualizerOptionsWithElement,
  IVisualElement,
} from '../types';
import { VisualConnection } from '../elements';
import ConnectionView from '../views/link';

export function getOptions(
  element: string | HTMLElement | VisualizerOptionsWithElement,
  options?: VisualizerOptions,
): VisualizerOptionsWithElement {
  let el: HTMLElement | undefined;
  let opts: VisualizerOptions = options || {};
  if (typeof element === 'string') {
    el = document.getElementById(element);
  } else if (element instanceof HTMLElement) {
    el = element;
  } else if (typeof element.element === 'string') {
    el = document.getElementById(element.element);
    opts = element;
  } else {
    el = element.element;
    opts = element;
  }
  return {
    ...opts,
    element: el,
  };
}

const linkToolsView = new dia.ToolsView({
  tools: [new linkTools.Remove({
    className: 'link-tool-remove',
    distance: -10,
    action: (evt, view) => {
      const { model } = view;
      if (
        view instanceof ConnectionView
        && model instanceof VisualConnection
        && model.targetParameter
      ) {
        if (model.targetElement) {
          model.targetElement.requestFit();
        }
        if (model.sourceElement) {
          model.sourceElement.requestFit();
        }
        evt.stopPropagation();
        evt.preventDefault();
        model.targetParameter.unbind();
      }
    },
  })],
});

export function linkMouseEnterFactory(
  visualizer: IVisualizer,
): ((linkView: dia.LinkView) => void) {
  return (linkView: dia.LinkView): void => {
    if (visualizer.readOnly) {
      return;
    }
    const { model } = linkView;
    if (model instanceof VisualConnection) {
      linkView.addTools(linkToolsView);
    }
  };
}

export function linkMouseLeave(linkView: dia.LinkView) {
  linkView.paper.removeTools();
}

export function findLeafElements(parents: IVisualElement[]): IVisualElement[] {
  const findLeaf = (parent: IVisualElement): IVisualElement[] => {
    const children = parent.getChildrenElements();
    if (children.length === 0) {
      return [parent];
    }
    return children.reduce((leafs, child) => ([
      ...leafs,
      ...findLeaf(child),
    ]), []);
  };
  const array = parents.reduce((leafs, parent) => ([
    ...leafs,
    ...findLeaf(parent),
  ]), []);
  return [...new Set(array)];
}
