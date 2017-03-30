import _ from 'lodash';

const DEFAULTS = {
  style: {
    eol: '\r\n',
    scope_indent: '  ',
  },
};

export default class WDLSettings {
  constructor(settings) {
    this.reset();
    _.assign(this.settings, settings);
  }

  static getDefaults() {
    return DEFAULTS;
  }

  reset() {
    this.settings = _.assign({}, WDLSettings.getDefaults());
  }

  setValue(path, val) {
    _.set(this.settings, path, val);
  }

  getValue(path) {
    return _.get(this.settings, path, '');
  }
}
