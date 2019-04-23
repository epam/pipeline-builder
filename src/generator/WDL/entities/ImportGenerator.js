import Settings from '../WDLSettings';

export default class ImportGenerator {

  constructor(imp, settings) {
    this.name = imp.name;
    this.expression = imp.expression;
    this.uri = imp.uri;

    this.importString = '';

    this.settings = new Settings(settings);
  }

  renderImport() {
    const EOL = this.settings.getValue('style.eol');

    if (this.importString === '' && this.expression) {
      this.importString += `${this.expression}${EOL}`;
    }

    return this.importString;
  }

  renderEOL() {
    const EOL = this.settings.getValue('style.eol');

    return `${EOL}`;
  }

}
