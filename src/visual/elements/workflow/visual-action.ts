import defaultsDeep from '../../utilities/defaults-deep';
import { ContextTypes } from '../../../model';
import { getEntityIdentifier } from '../../utilities/get-entity-identifier';
import VisualElement from '../visual-element';
import {
  ICreateConnectionOptions,
  IVisualAction,
  IVisualConnection,
  IVisualElement,
  VisualActionDefaultOptions,
  VisualActionOptions,
} from '../../types';
import { Action, ActionWithOutputs } from '../../../model/action';
import VisualDeclarations from '../visual-declarations';
import { IAction, IParameter } from '../../../model/types';

type VisualActionInitializer = {
  new(options: VisualActionOptions): VisualAction;
  defaultOptions?: VisualActionDefaultOptions;
};

class VisualAction extends VisualElement implements IVisualAction {
  static initializers: Map<ContextTypes, VisualActionInitializer> = new Map();

  static initializersDefaultOptions: Map<ContextTypes, VisualActionDefaultOptions> = new Map();

  static defaultOptions: VisualActionDefaultOptions = {
    attrs: {
      body: {
        d: 'M 0 0 L calc(w) 0 L calc(w) calc(h) L 0 calc(h) L 0 0',
      },
    },
  };

  /**
   * @typedef {VisualAction.constructor} VisualActionInitializer
   * @property {VisualAction.Options} [defaultOptions]
   */

  /**
   * @param {ContextTypes} contextType
   * @param {VisualActionInitializer} initializer
   * @param {VisualAction.Options} [options]
   */
  static registerInitializer(
    contextType: ContextTypes,
    initializer: VisualActionInitializer,
    options: VisualActionDefaultOptions = undefined,
  ): void {
    VisualAction.initializers.set(contextType, initializer);
    VisualAction.initializersDefaultOptions.set(
      contextType,
      options || initializer.defaultOptions || {},
    );
  }

  static initialize(options: VisualActionOptions): VisualAction {
    const {
      entity,
    } = options || { entity: undefined };
    const type = entity ? entity.contextType : undefined;
    const Initializer = VisualAction.initializers.get(type);
    const defaultOptions = VisualAction.initializersDefaultOptions.get(type) || {};
    const opts = defaultsDeep<VisualActionOptions>(
      options,
      defaultOptions,
    );
    if (Initializer) {
      return new Initializer(opts);
    }
    return new VisualAction(opts);
  }

  private _action: IAction | undefined;

  private _subActionCells: VisualAction[];

  private _declarationsBlock: VisualDeclarations | undefined;

  constructor(options: VisualActionOptions) {
    const {
      entity,
    } = options || {};
    if (!entity) {
      throw new Error('VisualAction should be initialized with action');
    }
    const opts = defaultsDeep<VisualActionOptions>(
      {
        id: getEntityIdentifier(entity),
      },
      options,
      VisualAction.defaultOptions,
    );
    super(opts);
  }

  get action(): IAction | undefined {
    const { entity } = this;
    return entity instanceof Action ? entity : undefined;
  }

  getChildrenElements(): IVisualElement[];
  getChildrenElements(recursive: boolean): IVisualElement[];
  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  getChildrenElements(recursive: boolean = false): IVisualElement[] {
    return [
      this._declarationsBlock,
      ...this._subActionCells,
      ...(recursive ? this._subActionCells : [])
        .map((child) => child.getChildrenElements(recursive))
        .reduce((r, c) => r.concat(c), []),
    ].filter(Boolean);
  }

  setOptions(options: VisualActionOptions): void {
    const {
      entity,
      paper,
    } = options;
    if (!entity) {
      throw new Error('VisualAction should be initialized with action');
    }
    this._subActionCells = [];
    const declarationsBlockOptions = {
      entity,
      paper,
    };
    if (this._declarationsBlock) {
      this._declarationsBlock.setOptions(declarationsBlockOptions);
    } else {
      this._declarationsBlock = new VisualDeclarations(declarationsBlockOptions);
      this.embed(this._declarationsBlock);
    }
    super.setOptions(options);
  }

  update() {
    this.updateActions();
    super.update();
  }

  updateParameters() {
    if (this._declarationsBlock) {
      this._declarationsBlock.updateParameters();
    }
    super.updateParameters();
  }

  getInputPorts(): IParameter[] {
    return this.action ? this.action.getActionInputs() : [];
  }

  getOutputPorts(): IParameter[] {
    if (this.action instanceof ActionWithOutputs) {
      return this.action.getActionOutputs();
    }
    return [];
  }

  updateActions(): void {
    const {
      actions = [],
    } = this.action || {};
    const subActionsInfo = this._subActionCells
      .map((subAction) => ({
        visualAction: subAction,
        remove: !actions.includes(subAction.action),
      }));
    const toRemove = subActionsInfo
      .filter((subActionInfo) => subActionInfo.remove)
      .map((subActionInfo) => subActionInfo.visualAction);
    const toUpdate = subActionsInfo
      .filter((subActionInfo) => !subActionInfo.remove)
      .map((subActionInfo) => subActionInfo.visualAction);
    const toAdd = actions
      .filter((action) => !this._subActionCells.some((sa) => sa.action === action));
    toRemove.forEach((subAction) => {
      try {
        this.unembed(subAction);
        subAction.remove();
      } catch (noop) {
        // noop
      }
    });
    toUpdate.forEach((subAction) => {
      subAction.update();
    });
    const added = toAdd.map((action) => VisualAction.initialize({
      entity: action,
    }));
    this.embed(added);
    this._subActionCells = [
      ...toUpdate,
      ...added,
    ];
    this._subActionCells.forEach((action) => action.requestFit());
  }

  protected shouldHandleParameter(parameter: IParameter): boolean {
    return super.shouldHandleParameter(parameter)
      && parameter.contextType !== ContextTypes.declaration;
  }

  override createConnections(options?: ICreateConnectionOptions): IVisualConnection[] {
    const links = super.createConnections(options);
    const {
      recursive = true,
    } = options || ({} as ICreateConnectionOptions);
    if (recursive) {
      [
        ...this._subActionCells,
        this._declarationsBlock,
      ].forEach((child) => {
        links.push(...child.createConnections(options));
      });
    }
    return links;
  }
}

export default VisualAction;
