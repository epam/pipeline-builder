export function tryCatch(fn) {
  if (typeof fn === 'function') {
    try {
      return fn();
    } catch (_) {
      // empty
    }
  }
  return undefined;
}

/**
 * @param {string|function} getter
 * @returns {(function(*): *)}
 */
function generateGetter(getter) {
  if (typeof getter === 'function') {
    return getter;
  }
  if (typeof getter === 'string') {
    const processExtractPath = (ctx, path) => {
      const [, name, , idx] = /^(.+?)(\[(\d+)])?$/.exec(path);
      const fn = ctx[name];
      let res = fn;
      if (typeof fn === 'function') {
        res = fn.call(ctx);
      }
      if (idx !== undefined && res) {
        res = res[Number(idx)];
      }
      return res;
    };
    const extract = (ctx, path) => {
      if (path.length === 0) {
        return undefined;
      }
      const [firstGetter, ...rest] = path;
      const res = processExtractPath(ctx, firstGetter);
      if (res !== undefined && rest.length > 0) {
        return extract(res, rest);
      }
      return res;
    };
    return (ctx) => extract(ctx, getter.split('.'));
  }
  return () => undefined;
}

export function extractValue(ctx, getter) {
  return tryCatch(() => {
    const typedContext = generateGetter(getter)(ctx);
    if (typedContext && typedContext.start && typedContext.stop) {
      return typedContext.start.getInputStream().getText(
        typedContext.start.start,
        typedContext.stop.stop,
      );
    }
    if (typedContext) {
      return typedContext.getText();
    }
    return undefined;
  });
}
