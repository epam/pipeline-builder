import { IAction, IParameter, isCall } from '../types';
import Parameter from '../parameter';

export type IParameterOrAction = IParameter | IAction;

function getParameters(o: IParameterOrAction): IParameter[] {
  if (Parameter.isIParameter(o)) {
    return [o];
  }
  return o.getParameters(true);
}

function elementDependsOn(
  element: IParameterOrAction,
  dependency: IParameterOrAction,
): boolean {
  const elementParameters = getParameters(element);
  const dependencyParameters = getParameters(dependency);
  return elementParameters
    .some((p) => p.inboundConnections
      .some((i) => Parameter.isIParameter(i) && dependencyParameters.includes(i)));
}

export function getBodyElementsExecutionOrder(
  bodyElements: IParameterOrAction[],
): IParameterOrAction[] {
  const dependencyDepth: Map<IParameterOrAction, number> = new Map();
  const stack: Set<IParameterOrAction> = new Set<IParameterOrAction>();
  function getDependencyDepthFor(p: IParameterOrAction): number {
    if (dependencyDepth.has(p)) {
      return dependencyDepth.get(p);
    }
    return Infinity;
  }
  function setDependencyDepthFor(p: IParameterOrAction): number {
    if (dependencyDepth.has(p)) {
      return dependencyDepth.get(p);
    }
    let depth = 0;
    if (stack.has(p)) {
      // cycle!
      depth = 0;
    } else {
      stack.add(p);
      const dependencies = bodyElements.filter((e) => e !== p
        && elementDependsOn(p, e));
      if (isCall(p)) {
        dependencies.push(...p.after);
      }
      if (dependencies.length > 0) {
        depth = Math.max(
          ...dependencies.map(setDependencyDepthFor),
        ) + 1;
      }
      stack.delete(p);
    }
    dependencyDepth.set(p, depth);
    return depth;
  }
  bodyElements.forEach(setDependencyDepthFor);
  return bodyElements
    .slice()
    .sort((a, b) => getDependencyDepthFor(a) - getDependencyDepthFor(b));
}
