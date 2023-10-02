import Executable from '../executable';
import {
  ContextTypes,
} from '../context-types';
import { IWorkflow, IWorkflowOptions } from '../types';

class Workflow extends Executable<ContextTypes.workflow> implements IWorkflow {
  static deserializeWorkflow(options: IWorkflowOptions): Workflow {
    return new Workflow(options);
  }

  constructor(options: IWorkflowOptions) {
    super(ContextTypes.workflow, options);
  }

  protected getWdlContentHeader(): string {
    return `workflow ${this.name}`;
  }

  toString(): string {
    if (this.name) {
      return `workflow "${this.name}"`;
    }
    return 'workflow';
  }
}

export default Workflow;
