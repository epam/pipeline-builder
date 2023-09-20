import { WdlEvent } from './events';
import {
  ContextTypes,
  ContextTypeSymbol,
  PrimitiveTypes,
  CompoundTypes,
  isCall,
  isScatter,
  isAction,
  isExecutable,
  isScatterIterator,
  isWorkflow,
  isTask,
  isConditional,
  WdlVersion,
  WdlErrorType,
} from './types';
import { Action } from './action';
import Call from './call';
import Conditional from './conditional';
import Scatter from './scatter';
import Task from './task';
import WdlDocument from './document';
import Workflow from './workflow';
import Project from './project';
import * as WdlErrors from './validation';
import print from './utilities/print';
import {
  InputParameter,
  OutputParameter,
  DeclarationParameter,
} from './parameter';

WdlDocument.defaultProject = Project.default;

Action.registerActionInitializer(ContextTypes.call, Call);
Action.registerActionInitializer(ContextTypes.conditional, Conditional);
Action.registerActionInitializer(ContextTypes.scatter, Scatter);

export {
  ContextTypeSymbol,
  Call,
  Conditional,
  Scatter,
  InputParameter,
  OutputParameter,
  DeclarationParameter,
  Task,
  Workflow,
  ContextTypes,
  WdlEvent,
  WdlDocument,
  Project,
  print,
  PrimitiveTypes,
  CompoundTypes,
  isCall,
  isScatter,
  isAction,
  isExecutable,
  isScatterIterator,
  isWorkflow,
  isTask,
  isConditional,
  WdlVersion,
  WdlErrors,
  WdlErrorType,
};
