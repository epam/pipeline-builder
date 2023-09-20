class ParserError extends Error {
  constructor(errors = []) {
    super(
      errors.length === 1
        ? errors[0]
        : `${errors.length} errors occurred while parsing WDL. The first error: "${errors[0]}"`,
    );
    this.errors = errors.slice();
  }
}

export default ParserError;
