// eslint-disable-next-line max-classes-per-file
import WdlError from './error';
import {
  IWdlEntity,
  IWdlError,
  WdlErrorLevel,
  WdlErrorType,
} from '../types';
import ReservedKeywordError from './reserved-keyword-error';
import WrongIdentifierError from './wrong-identifier-error';
import WrongTypeError from './wrong-type-error';

export type TWdlGenericError<
  T extends WdlErrorType,
  L extends WdlErrorLevel = WdlErrorLevel.error,
> = {
  new (entity: IWdlEntity): WdlError<L, T>;
  new (entity: IWdlEntity, level: L): WdlError<L, T>;
};

export type TWdlDetailedError<T extends WdlErrorType, L extends WdlErrorLevel> = {
  new (entity: IWdlEntity, message: string): WdlError<L, T>;
  new (entity: IWdlEntity, message: string, level: L): WdlError<L, T>;
};

const generateError = <T extends WdlErrorType, L extends WdlErrorLevel >(
  error: T,
): TWdlGenericError<T, L> => class extends WdlError<L, T> {
    constructor(entity: IWdlEntity);
    constructor(entity: IWdlEntity, level: L);
    constructor(entity: IWdlEntity, level: WdlErrorLevel = WdlErrorLevel.error) {
      super(entity, error, level as L);
    }
  };

const generateDetailedError = <
  T extends WdlErrorType,
  L extends WdlErrorLevel,
>(
    error: T,
  ): TWdlDetailedError<T, L> => class extends WdlError<L, T> {
    constructor(entity: IWdlEntity, message: string);
    constructor(entity: IWdlEntity, message: string, level: L);
    constructor(entity: IWdlEntity, message: string, level: WdlErrorLevel = WdlErrorLevel.error) {
      super(entity, error, level as L, message);
    }
  };

const NameRequiredError = generateError(WdlErrorType.nameRequired);
const UniqueNameRequiredError = generateError(WdlErrorType.uniqueNameRequired);
const TypeRequiredError = generateError(WdlErrorType.typeRequired);
const ValueRequiredError = generateError(WdlErrorType.valueRequired);
const UnsupportedError = generateDetailedError(WdlErrorType.unsupported);
const UnknownExecutableError = generateDetailedError(WdlErrorType.unknownExecutable);
const ExecutableRequiredError = generateError(WdlErrorType.executableRequired);
const MissingInputError = generateDetailedError(WdlErrorType.missingInput);
const MissingOutputError = generateDetailedError(WdlErrorType.missingOutput);
const UnknownInputError = generateDetailedError(WdlErrorType.unknownInput);
const UnknownIdentifierError = generateDetailedError(WdlErrorType.unknownIdentifier);
const UnknownOutputError = generateDetailedError(WdlErrorType.unknownOutput);
const WrongExpressionError = generateDetailedError(WdlErrorType.wrongExpression);
const CommandRequiredError = generateError(WdlErrorType.commandRequired);
const ConditionalExpressionRequiredError = generateError(WdlErrorType.expressionRequired);

function filterErrors(error: IWdlError): error is IWdlError<WdlErrorLevel.error> {
  return error.level === WdlErrorLevel.error;
}

function filterWarnings(error: IWdlError): error is IWdlError<WdlErrorLevel.warning> {
  return error.level === WdlErrorLevel.warning;
}

function getIssuesDescription(issues: IWdlError[]): string {
  return issues
    .map((error) => error.description)
    .join('\n');
}

class WdlValidationError extends Error {
  private readonly _errors: IWdlError<WdlErrorLevel.error>[];

  private readonly _warnings: IWdlError<WdlErrorLevel.warning>[];

  constructor(issues: IWdlError[]) {
    const errors = issues.filter(filterErrors);
    const warnings = issues.filter(filterWarnings);
    const message = (() => {
      if (errors.length === 1) {
        return errors[0].description;
      }
      if (errors.length > 0) {
        return `${errors.length} errors found. First: ${errors[0].description}`;
      }
      return `${warnings.length} warning${warnings.length === 1 ? '' : 's'} found`;
    })();
    super(message);
    this._errors = errors;
    this._warnings = warnings;
  }

  get errors(): IWdlError<WdlErrorLevel.error>[] {
    return this._errors;
  }

  get warnings(): IWdlError[] {
    return this._warnings;
  }

  get description(): string {
    return getIssuesDescription([]
      .concat(this.errors)
      .concat(this.warnings));
  }
}

export {
  filterErrors,
  filterWarnings,
  getIssuesDescription,
  WdlError,
  NameRequiredError,
  UniqueNameRequiredError,
  TypeRequiredError,
  ValueRequiredError,
  UnsupportedError,
  UnknownExecutableError,
  ExecutableRequiredError,
  MissingInputError,
  MissingOutputError,
  UnknownOutputError,
  UnknownInputError,
  UnknownIdentifierError,
  WdlValidationError,
  WrongExpressionError,
  CommandRequiredError,
  WrongIdentifierError,
  WrongTypeError,
  ReservedKeywordError,
  ConditionalExpressionRequiredError,
};
