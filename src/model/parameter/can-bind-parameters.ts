import {
  CompoundTypes, ContextTypes, IParameter, isScatterDeclaration, isScatterIterator, IType,
} from '../types';

export default function canBindParameters(
  source: IParameter,
  target: IParameter,
  throwError: boolean,
): boolean | never {
  if (source === target) {
    if (throwError) {
      throw new Error('parameters are the same');
    }
    return false;
  }
  const sourceContextType = source.contextType;
  const targetContextType = target.contextType;
  if (
    targetContextType === ContextTypes.output
    && target.parent.contextType === ContextTypes.call
  ) {
    // We cannot bind parameters to call outputs
    if (throwError) {
      throw new Error('cannot bind parameter to call output');
    }
    return false;
  }
  if (
    targetContextType !== ContextTypes.output
    && !isScatterDeclaration(target)
    && target.parent
    && target.parent.isParentFor(source)
  ) {
    // Cannot bind input / declaration / output to parent's inputs / declarations,
    // except for 1 case:
    // - both `source` and `target` belongs to the same parent, AND
    // - `source` is input or declaration and `target` is declaration / output
    const check = source.parent === target.parent
      && !!source.parent
      && [ContextTypes.input, ContextTypes.declaration].includes(sourceContextType)
      && [ContextTypes.output, ContextTypes.declaration].includes(targetContextType);
    if (!check && throwError) {
      throw new Error('cannot bind parameter to parent input');
    }
    if (!check) {
      return false;
    }
  }
  if (
    sourceContextType !== ContextTypes.output
    && source.parent
    && !source.parent.isParentFor(target)
    && !isScatterDeclaration(source)
  ) {
    // Cannot bind input / declaration to non-children actions, except for scatter declarations
    if (throwError) {
      throw new Error('cannot bind input parameter to non-child action parameter');
    }
    return false;
  }
  if (
    sourceContextType === ContextTypes.output
    && source.parent
    && source.parent.isParentFor(target)
  ) {
    // Cannot bind output to self or children parameters
    // (i.e. nested calls / scatters / conditionals)
    if (throwError) {
      if (source.parent === target.parent) {
        throw new Error('cannot bind output of the action to it\'s parameter');
      }
      throw new Error('cannot bind output of the action to parent parameter');
    }
    return false;
  }
  const { stack: sourceExecutionStack = [] } = source;
  const { stack: targetExecutionStack = [] } = target;
  const firstInCommon = sourceExecutionStack.find((o) => targetExecutionStack.includes(o));
  const getStackInfo = (parameter: IParameter): {
    scatter: boolean;
    conditional: boolean;
  } => {
    const stackReversed = parameter.stack.slice().reverse();
    const idx = stackReversed.indexOf(firstInCommon) + 1;
    const sliced = stackReversed.slice(idx);
    const scatter = sliced.some((o) => o.contextType === ContextTypes.scatter);
    const conditional = sliced.some((o) => o.contextType === ContextTypes.conditional);
    return {
      scatter,
      conditional,
    };
  };
  const getParameterType = (parameter: IParameter): IType | null => {
    const {
      conditional,
      scatter,
    } = getStackInfo(parameter);
    if (isScatterIterator(parameter)) {
      // if parameter is source and scatter iterator,
      // then we should pick `iterator type`
      if (source === parameter) {
        return parameter.iteratorType;
      }
      // else - if parameter is target and scatter iterator,
      // then we should pick `array type`
      return parameter.arrayType;
    }
    if (isScatterDeclaration(parameter)) {
      if (parameter === target) {
        return parameter.parameterType.clone();
      }
      if (parameter.parent && parameter.parent.isParentFor(target)) {
        // using inner type - both source and target within scatter body
        return parameter.parameterType.clone();
      }
      // else - if target parameter is out of scatter body
      return parameter.parameterType.makeArray();
    }
    let type = parameter.parameterType.clone();
    // if parameter is output and execution stack (from common parent) contains
    // conditional, then output parameter type should be modified to optional type.
    if (
      parameter.contextType === ContextTypes.output
      && type
      && conditional
    ) {
      type = type.makeOptional();
    }
    // if parameter is output and execution stack (from common parent) contains
    // scatter, then output parameter type should be modified to Array type.
    if (
      parameter.contextType === ContextTypes.output
      && type
      && scatter
    ) {
      type = type.makeArray();
    }
    return type;
  };
  let sourceType = getParameterType(source);
  let targetType = getParameterType(target);
  if (!sourceType && !!targetType && isScatterIterator(source)) {
    sourceType = targetType;
  } else if (
    !targetType
    && !!sourceType
    && isScatterIterator(target)
    && sourceType.type === CompoundTypes.array
  ) {
    targetType = sourceType;
  }
  if (!sourceType && throwError) {
    throw new Error('source parameter type is unknown');
  }
  if (!targetType && throwError) {
    throw new Error('target parameter type is unknown');
  }
  if (
    sourceType
    && targetType
    && !sourceType.isSubTypeOf(targetType)
    && throwError
  ) {
    throw new Error(`types mismatch (source: ${sourceType.toString()}, target: ${targetType.toString()})`);
  }
  return sourceType
    && targetType
    && sourceType.isSubTypeOf(targetType);
}
