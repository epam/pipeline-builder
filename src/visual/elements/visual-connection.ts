import { shapes } from 'jointjs';
import { getParameterConnection } from '../utilities/get-parameter-identifier';
import VisualElement from './visual-element';
import {
  ContextTypes,
} from '../../model/context-types';
import {
  IParameter,
} from '../../model/types';
import Parameter from '../../model/parameter';
import {
  IParameterConnection,
  isParameterConnection,
  IVisualConnection,
  IVisualElement,
  VisualConnectionOptions,
} from '../types';
import booleanProp from './utilities/boolean-prop';

function parseParameterConnection(
  parameter: IParameter | IParameterConnection,
): IParameterConnection {
  if (isParameterConnection(parameter)) {
    const {
      id,
      port,
    } = parameter;
    return {
      id,
      port,
    };
  }
  if (parameter instanceof Parameter) {
    return getParameterConnection(parameter);
  }
  return undefined;
}

class VisualConnection extends shapes.standard.Link implements IVisualConnection {
  private _sourceConnection: IParameterConnection | undefined;

  private _targetConnection: IParameterConnection | undefined;

  private _temp: boolean;

  constructor(options: VisualConnectionOptions) {
    const {
      source: sourceParameter,
      target: targetParameter,
    } = options || {};
    super({
      ...(options || {}),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      source: parseParameterConnection(sourceParameter),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      target: parseParameterConnection(targetParameter),
      attrs: {
        line: {
          stroke: '#999999',
          strokeWidth: 1,
          markerEnd: 'url(#default-workflow-marker)',
          class: 'visual-connection-line',
        },
      },
    });
    this.setOptions(options);
  }

  get sourceParameter(): IParameter | undefined {
    return this.get('sourceParameter');
  }

  get sourceConnection(): IParameterConnection | undefined {
    return this._sourceConnection;
  }

  get sourceElement(): IVisualElement | undefined {
    return this.parseConnection(this.sourceConnection);
  }

  get targetParameter(): IParameter | undefined {
    return this.get('targetParameter');
  }

  get targetConnection(): IParameterConnection | undefined {
    return this._targetConnection;
  }

  get targetElement(): IVisualElement | undefined {
    return this.parseConnection(this.targetConnection);
  }

  get temporary(): boolean {
    return !!this._temp;
  }

  get visible(): boolean {
    if (this.temporary) {
      return true;
    }
    const {
      sourceElement,
      targetElement,
    } = this;
    const parameterParent = (parameter: IParameter) => (parameter
    && parameter.parent
    && parameter.contextType === ContextTypes.declaration
      ? parameter.parent
      : undefined);
    return !!sourceElement
      && !!targetElement
      && sourceElement.visible
      && targetElement.visible
      && !(
        parameterParent(this.targetParameter) === parameterParent(this.sourceParameter)
        && !!parameterParent(this.targetParameter)
      );
  }

  get selected(): boolean {
    return booleanProp(this.get('selected'), false);
  }

  set selected(selected: boolean) {
    if (this.selected !== selected) {
      this.set('selected', !!selected);
    }
  }

  get level(): number {
    const getLevel = (element: IVisualElement) => (element ? element.level : 0);
    return Math.max(
      getLevel(this.sourceElement),
      getLevel(this.targetElement),
    );
  }

  get isWorkflowConnection(): boolean {
    return booleanProp(this.get('isWorkflowConnection'), false);
  }

  private getIsWorkflowConnection(): boolean {
    const isWorkflowInputOrDeclaration = (parameter: IParameter) => parameter
      && parameter.parent
      && parameter.parent.contextType === ContextTypes.workflow
      && [
        ContextTypes.input,
        ContextTypes.declaration,
      ].includes(parameter.contextType);
    return isWorkflowInputOrDeclaration(this.sourceParameter)
      || isWorkflowInputOrDeclaration(this.targetParameter);
  }

  setOptions(options: VisualConnectionOptions) {
    const {
      source = this.sourceParameter,
      target = this.targetParameter,
      temp = this._temp || false,
    } = options || {};
    this._temp = temp;
    this.set('sourceParameter', source);
    this.set('targetParameter', target);
    this.set('isWorkflowConnection', this.getIsWorkflowConnection());
    this._sourceConnection = parseParameterConnection(source);
    this._targetConnection = parseParameterConnection(target);
    this.prop('source', this._sourceConnection);
    this.prop('target', this._targetConnection);
    this.router('normal');
    this.connector('smooth');
  }

  parseConnection(connection: IParameterConnection): VisualElement | undefined {
    if (!connection || !this.graph) {
      return undefined;
    }
    const {
      id,
    } = connection;
    const model = this.graph.getCell(id);
    if (model instanceof VisualElement) {
      return model;
    }
    return undefined;
  }
}

export default VisualConnection;
