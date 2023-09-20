import { WdlErrorType } from '../types';

const WdlErrorMessages: Record<WdlErrorType, string> = {
  [WdlErrorType.error]: 'General error',
  [WdlErrorType.nameRequired]: 'Name required',
  [WdlErrorType.uniqueNameRequired]: 'Unique name required',
  [WdlErrorType.typeRequired]: 'Type required',
  [WdlErrorType.valueRequired]: 'Value required',
  [WdlErrorType.unknownExecutable]: 'Unknown executable',
  [WdlErrorType.executableRequired]: 'Executable required',
  [WdlErrorType.missingInput]: 'Missing input',
  [WdlErrorType.missingOutput]: 'Missing output',
  [WdlErrorType.unknownInput]: 'Unknown input',
  [WdlErrorType.unknownOutput]: 'Unknown output',
  [WdlErrorType.unknownIdentifier]: 'Unknown identifier',
  [WdlErrorType.unsupported]: 'Not supported',
  [WdlErrorType.wrongExpression]: 'Invalid expression',
  [WdlErrorType.commandRequired]: 'Command required',
  [WdlErrorType.wrongIdentifier]: 'Invalid identifier',
  [WdlErrorType.wrongType]: 'Invalid type',
  [WdlErrorType.expressionRequired]: 'Conditional expression required',
};

export default WdlErrorMessages;
