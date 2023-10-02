// eslint-disable-next-line max-classes-per-file
import { extractValue } from './utilities';
import { ContextTypeSymbol, ContextTypes } from '../../../../model/context-types';

class ContextElement {
  constructor(type) {
    this[ContextTypeSymbol] = type;
  }
}

class ContextProcessor {
  constructor() {
    this.context = new ContextElement(ContextTypes.document);
    this._stack = [this.context];
  }

  getCurrent(...type) {
    if (type.length === 0) {
      if (this._stack.length > 0) {
        return this._stack[this._stack.length - 1];
      }
      return undefined;
    }
    return this._stack.slice().reverse().find((o) => type.includes(o[ContextTypeSymbol]));
  }

  popItem(...type) {
    const current = this.getCurrent(...type);
    if (current) {
      const idx = this._stack.indexOf(current);
      if (idx >= 0) {
        this._stack.splice(idx, 1);
      }
    }
    return this;
  }

  pushItem(property, itemContextType, ...parentContextType) {
    const current = this.getCurrent(...parentContextType);
    const item = new ContextElement(itemContextType);
    this._stack.push(item);
    if (current) {
      if (!current[property] || !Array.isArray(current[property])) {
        current[property] = [];
      }
      current[property].push(item);
    }
    return this;
  }

  setSingleProperty(property, value, ...itemContextType) {
    const current = this.getCurrent(...itemContextType);
    if (current) {
      current[property] = value;
    }
    return this;
  }

  setSinglePropertyFromContext(property, context, getter, ...itemContextType) {
    this.setSingleProperty(property, extractValue(context, getter), ...itemContextType);
    return this;
  }

  setPropertiesFromContext(ctx, properties = {}, ...itemContextType) {
    Reflect.ownKeys(properties || {}).forEach((property) => {
      this.setSinglePropertyFromContext(property, ctx, properties[property], ...itemContextType);
    });
    return this;
  }

  setProperties(properties = {}, ...itemContextType) {
    Reflect.ownKeys(properties || {}).forEach((property) => {
      this.setSingleProperty(property, properties[property], ...itemContextType);
    });
    return this;
  }
}

export default ContextProcessor;
