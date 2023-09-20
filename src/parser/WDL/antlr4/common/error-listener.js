import { ErrorListener as AntlrErrorListener } from 'antlr4';

class ErrorListener extends AntlrErrorListener {
  constructor() {
    super();
    this.errors = [];
  }

  syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
    this.errors.push(`Line ${line}, column ${column}: ${msg}`);
    super.syntaxError(recognizer, offendingSymbol, line, column, msg, e);
  }
}

export default ErrorListener;
