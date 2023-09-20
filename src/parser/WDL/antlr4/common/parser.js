import antlr4, { ParseTreeWalker } from 'antlr4';
import ContextProcessor from './context-processor';
import { ContextTypeSymbol, ContextTypes } from '../../../../model/types';
import ErrorListener from './error-listener';
import ParserError from './parser-error';

const ParserListenerEvents = {
  version: 'version',
  importStart: 'import-start',
  importEnd: 'import-end',
  importAlias: 'import-alias',
  structStart: 'struct-start',
  structEnd: 'struct-end',
  workflowStart: 'workflow-start',
  workflowInputsStart: 'workflow-inputs-start',
  workflowInputsEnd: 'workflow-inputs-end',
  workflowOutputsStart: 'workflow-outputs-start',
  workflowOutputsEnd: 'workflow-outputs-end',
  workflowEnd: 'workflow-end',
  taskStart: 'task-start',
  taskInputsStart: 'task-inputs-start',
  taskInputsEnd: 'task-inputs-end',
  taskOutputsStart: 'task-outputs-start',
  taskOutputsEnd: 'task-outputs-end',
  taskRuntime: 'task-runtime',
  taskCommandStart: 'task-command-start',
  taskCommandEnd: 'task-command-end',
  taskCommand: 'task-command',
  taskEnd: 'task-end',
  callStart: 'call-start',
  callInputStart: 'call-input-start',
  callInputEnd: 'call-input-end',
  callAfterStart: 'call-after-start',
  callAfterEnd: 'call-after-end',
  callEnd: 'call-end',
  scatterStart: 'scatter-start',
  scatterEnd: 'scatter-end',
  conditionalStart: 'conditional-start',
  conditionalEnd: 'conditional-end',
  parametersMetaStart: 'parameters-meta-start',
  parametersMetaEnd: 'parameters-meta-end',
  metaElementsStart: 'meta-elements-start',
  metaElementsEnd: 'meta-elements-end',
  metaElement: 'meta-element',
  boundDeclarationStart: 'bound-declaration-start',
  boundDeclarationEnd: 'bound-declaration-end',
  unboundDeclaration: 'unbound-declaration',
};

/**
 * @param {antlr4.ParseTreeListener.constructor} TreeWalker
 * @param {{[event: ParserListenerEvents]: string}} [processors]
 * @returns {CommonListener}
 */
function createCommonListener(TreeWalker, processors = {}) {
  function getProcessorProperties(event, defaultProperties) {
    if (typeof processors[event] === 'object') {
      const {
        handler,
        ...rest
      } = processors[event];
      return {
        ...(defaultProperties || {}),
        ...rest,
      };
    }
    return defaultProperties || {};
  }
  function getProcessorHandler(event, defaultHandler) {
    if (typeof processors[event] === 'string') {
      return processors[event];
    }
    if (typeof processors[event] === 'object') {
      const {
        handler = defaultHandler,
      } = processors[event];
      return handler;
    }
    return defaultHandler;
  }
  class CommonListener extends TreeWalker {
    constructor() {
      super();
      /**
       * @type {ContextProcessor}
       */
      this.context = new ContextProcessor();
      [
        [ParserListenerEvents.version, 'enterVersion', this.processVersion.bind(this)],
        [ParserListenerEvents.importStart, 'enterImport_doc', this.importStart.bind(this)],
        [ParserListenerEvents.importEnd, 'exitImport_doc', this.importEnd.bind(this)],
        [ParserListenerEvents.importAlias, 'enterImport_alias', this.importAlias.bind(this)],
        [ParserListenerEvents.structStart, 'enterStruct', this.structStart.bind(this)],
        [ParserListenerEvents.structEnd, 'exitStruct', this.structEnd.bind(this)],
        [ParserListenerEvents.workflowStart, 'enterWorkflow', this.workflowStart.bind(this)],
        [ParserListenerEvents.workflowInputsStart, 'enterWorkflow_input', this.workflowInputsStart.bind(this)],
        [ParserListenerEvents.workflowInputsEnd, 'exitWorkflow_input', this.workflowInputsEnd.bind(this)],
        [ParserListenerEvents.workflowOutputsStart, 'enterWorkflow_output', this.workflowOutputsStart.bind(this)],
        [ParserListenerEvents.workflowOutputsEnd, 'exitWorkflow_output', this.workflowOutputsEnd.bind(this)],
        [ParserListenerEvents.workflowEnd, 'exitWorkflow', this.workflowEnd.bind(this)],
        [ParserListenerEvents.taskStart, 'enterTask', this.taskStart.bind(this)],
        [ParserListenerEvents.taskInputsStart, 'enterTask_input', this.taskInputsStart.bind(this)],
        [ParserListenerEvents.taskInputsEnd, 'exitTask_input', this.taskInputsEnd.bind(this)],
        [ParserListenerEvents.taskOutputsStart, 'enterTask_output', this.taskOutputsStart.bind(this)],
        [ParserListenerEvents.taskOutputsEnd, 'exitTask_output', this.taskOutputsEnd.bind(this)],
        [ParserListenerEvents.taskEnd, 'exitTask', this.taskEnd.bind(this)],
        [ParserListenerEvents.callStart, 'enterCall', this.callStart.bind(this)],
        [ParserListenerEvents.callEnd, 'exitCall', this.callEnd.bind(this)],
        [ParserListenerEvents.callInputStart, 'enterCall_input', this.callInputStart.bind(this)],
        [ParserListenerEvents.callInputEnd, 'exitCall_input', this.callInputEnd.bind(this)],
        [ParserListenerEvents.callAfterStart, 'enterCall_after', this.callAfterStart.bind(this)],
        [ParserListenerEvents.callAfterEnd, 'exitCall_after', this.callAfterEnd.bind(this)],
        [ParserListenerEvents.scatterStart, 'enterScatter', this.scatterStart.bind(this)],
        [ParserListenerEvents.scatterEnd, 'exitScatter', this.scatterEnd.bind(this)],
        [ParserListenerEvents.conditionalStart, 'enterConditional', this.conditionalStart.bind(this)],
        [ParserListenerEvents.conditionalEnd, 'exitConditional', this.conditionalEnd.bind(this)],
        [ParserListenerEvents.parametersMetaStart, 'enterParameter_meta', this.parametersMetaStart.bind(this)],
        [ParserListenerEvents.parametersMetaEnd, 'exitParameter_meta', this.parametersMetaEnd.bind(this)],
        [ParserListenerEvents.metaElementsStart, 'enterMeta', this.metaElementsStart.bind(this)],
        [ParserListenerEvents.metaElementsEnd, 'exitMeta', this.metaElementsEnd.bind(this)],
        [ParserListenerEvents.metaElement, 'enterMeta_kv', this.metaElement.bind(this)],
        [ParserListenerEvents.taskRuntime, 'enterTask_runtime_kv', this.taskRuntime.bind(this)],
        [ParserListenerEvents.taskCommandStart, 'enterTask_command', this.taskCommandStart.bind(this)],
        [ParserListenerEvents.taskCommandEnd, 'exitTask_command', this.taskCommandEnd.bind(this)],
        [ParserListenerEvents.taskCommand, 'enterTask_command_expr_with_string', this.taskCommand.bind(this)],
        [ParserListenerEvents.boundDeclarationStart, 'enterBound_decls', this.boundDeclarationStart.bind(this)],
        [ParserListenerEvents.boundDeclarationEnd, 'exitBound_decls', this.boundDeclarationEnd.bind(this)],
        [ParserListenerEvents.unboundDeclaration, 'enterUnbound_decls', this.unboundDeclaration.bind(this)],
      ]
        .forEach(([event, defaultHandler, fn]) => {
          this[getProcessorHandler(event, defaultHandler)] = fn;
        });
    }

    processVersion(ctx) {
      this.context.setPropertiesFromContext(
        ctx,
        getProcessorProperties(ParserListenerEvents.version, {
          version: 'ReleaseVersion',
        }),
      );
    }

    importStart(ctx) {
      this.context
        .pushItem('imports', ContextTypes.import)
        .setPropertiesFromContext(
          ctx,
          getProcessorProperties(ParserListenerEvents.importStart, {
            source: 'string',
            alias: 'import_as.Identifier',
          }),
        );
    }

    importEnd() {
      this.context.popItem();
    }

    importAlias(ctx) {
      this.context
        .pushItem('structs', ContextTypes.importAlias, ContextTypes.import)
        .setPropertiesFromContext(
          ctx,
          getProcessorProperties(ParserListenerEvents.importAlias, {
            struct: 'Identifier[0]',
            alias: 'Identifier[1]',
          }),
        )
        .popItem();
    }

    structStart(ctx) {
      this.context
        .pushItem('structs', ContextTypes.struct, ContextTypes.document)
        .setPropertiesFromContext(
          ctx,
          getProcessorProperties(ParserListenerEvents.structStart, {
            name: 'Identifier',
          }),
        );
    }

    structEnd() {
      const struct = this.context.getCurrent(ContextTypes.struct);
      if (struct) {
        struct.properties = (struct.elements || []).map((o) => ({
          ...o,
          [ContextTypeSymbol]: ContextTypes.structProperty,
        }));
        delete struct.elements;
      }
      this.context.popItem();
    }

    workflowStart(ctx) {
      this.context
        .pushItem('workflows', ContextTypes.workflow, ContextTypes.document)
        .setPropertiesFromContext(
          ctx,
          getProcessorProperties(ParserListenerEvents.workflowStart, {
            name: 'Identifier',
          }),
        );
    }

    processElements(type) {
      const obj = this.context.getCurrent(type);
      if (obj) {
        const {
          elements = [],
        } = obj;
        obj.declarations = elements.filter(
          (element) => element[ContextTypeSymbol] === ContextTypes.declaration,
        );
        obj.actions = elements.filter(
          (element) => element[ContextTypeSymbol] !== ContextTypes.declaration,
        );
        delete obj.elements;
      }
    }

    workflowEnd() {
      this.processElements(ContextTypes.workflow);
      this.context.popItem();
    }

    taskStart(ctx) {
      this.context
        .pushItem('tasks', ContextTypes.task, ContextTypes.document)
        .setPropertiesFromContext(
          ctx,
          getProcessorProperties(ParserListenerEvents.taskStart, {
            name: 'Identifier',
          }),
        );
    }

    taskEnd() {
      this.processElements(ContextTypes.task);
      this.context.popItem();
    }

    callStart(ctx) {
      this.context.pushItem('elements', ContextTypes.call)
        .setPropertiesFromContext(
          ctx,
          getProcessorProperties(ParserListenerEvents.callStart, {
            executable: 'call_name',
            alias: 'call_alias.Identifier',
          }),
        );
    }

    callEnd() {
      this.context.popItem();
    }

    callInputStart(ctx) {
      this.context
        .pushItem('inputs', ContextTypes.input, ContextTypes.call)
        .setPropertiesFromContext(
          ctx,
          getProcessorProperties(ParserListenerEvents.callInput, {
            name: 'Identifier',
            expression: 'expr',
          }),
        );
    }

    callInputEnd() {
      this.context.popItem();
    }



    callAfterStart(ctx) {
      this.context
        .pushItem('after', ContextTypes.callAfter, ContextTypes.call)
        .setPropertiesFromContext(
          ctx,
          getProcessorProperties(ParserListenerEvents.callAfterStart, {
            call: 'Identifier',
          }),
        );
    }

    callAfterEnd() {
      this.context.popItem();
    }

    /**
     * @param {{parentType: ContextTypes, property: string, childrenProperty: string?}} options
     */
    reduceChildrenArray(options = {}) {
      const {
        parentType,
        property,
        childrenProperty = 'elements',
      } = options || {};
      const current = this.context.getCurrent(...[parentType].filter(Boolean));
      if (current) {
        current[property] = (current[property] || []).reduce((arr, obj) => ([
          ...arr,
          ...(obj[childrenProperty] || []),
        ]), []);
      }
    }

    workflowInputsStart(ctx) {
      this.context.pushItem('inputs', ContextTypes.inputs, ContextTypes.workflow)
        .setPropertiesFromContext(
          ctx,
          getProcessorProperties(ParserListenerEvents.workflowInputsStart),
        );
    }

    workflowInputsEnd() {
      this.context.popItem();
      this.reduceChildrenArray({
        parentType: ContextTypes.workflow,
        property: 'inputs',
      });
    }

    workflowOutputsStart(ctx) {
      this.context.pushItem('outputs', ContextTypes.outputs, ContextTypes.workflow)
        .setPropertiesFromContext(
          ctx,
          getProcessorProperties(ParserListenerEvents.workflowOutputsStart),
        );
    }

    workflowOutputsEnd() {
      this.context.popItem();
      this.reduceChildrenArray({
        parentType: ContextTypes.workflow,
        property: 'outputs',
      });
    }

    scatterStart(ctx) {
      this.context.pushItem('elements', ContextTypes.scatter)
        .setPropertiesFromContext(
          ctx,
          getProcessorProperties(ParserListenerEvents.scatterStart, {
            iterator: 'Identifier',
            binding: 'expr',
          }),
        );
    }

    scatterEnd() {
      this.processElements(ContextTypes.scatter);
      this.context.popItem();
    }

    conditionalStart(ctx) {
      this.context.pushItem('elements', ContextTypes.conditional)
        .setPropertiesFromContext(
          ctx,
          getProcessorProperties(ParserListenerEvents.conditionalStart, {
            expression: 'expr',
          }),
        );
    }

    conditionalEnd() {
      this.processElements(ContextTypes.conditional);
      this.context.popItem();
    }

    parametersMetaStart(ctx) {
      this.context.pushItem('parametersMeta', ContextTypes.parameterMeta)
        .setPropertiesFromContext(
          ctx,
          getProcessorProperties(ParserListenerEvents.parametersMetaStart),
        );
    }

    parametersMetaEnd() {
      this.context.popItem();
      this.reduceChildrenArray({
        property: 'parametersMeta',
        childrenProperty: 'meta',
      });
    }

    metaElementsStart(ctx) {
      this.context.pushItem('meta', ContextTypes.meta)
        .setPropertiesFromContext(
          ctx,
          getProcessorProperties(ParserListenerEvents.metaElementsStart),
        );
    }

    metaElementsEnd() {
      this.context.popItem();
    }

    metaElement(ctx) {
      this.context
        .pushItem('meta', ContextTypes.metaElement, ContextTypes.parameterMeta, ContextTypes.meta)
        .setPropertiesFromContext(
          ctx,
          getProcessorProperties(ParserListenerEvents.metaElement, {
            parameter: 'MetaIdentifier',
            meta: 'meta_value',
          }),
        )
        .popItem();
    }

    taskRuntime(ctx) {
      this.context
        .pushItem('runtime', ContextTypes.runtime, ContextTypes.task)
        .setPropertiesFromContext(
          ctx,
          getProcessorProperties(ParserListenerEvents.taskRuntime, {
            property: 'Identifier',
            value: 'expr',
          }),
        )
        .popItem();
    }

    taskInputsStart(ctx) {
      this.context.pushItem('inputs', ContextTypes.inputs, ContextTypes.task)
        .setPropertiesFromContext(
          ctx,
          getProcessorProperties(ParserListenerEvents.taskInputsStart),
        );
    }

    taskInputsEnd() {
      this.context.popItem();
      this.reduceChildrenArray({
        parentType: ContextTypes.task,
        property: 'inputs',
      });
    }

    taskOutputsStart(ctx) {
      this.context.pushItem('outputs', ContextTypes.outputs, ContextTypes.task)
        .setPropertiesFromContext(
          ctx,
          getProcessorProperties(ParserListenerEvents.taskOutputsStart),
        );
    }

    taskOutputsEnd() {
      this.context.popItem();
      this.reduceChildrenArray({
        parentType: ContextTypes.task,
        property: 'outputs',
      });
    }

    taskCommandStart(ctx) {
      this.context
        .pushItem('commands', ContextTypes.command, ContextTypes.task)
        .setPropertiesFromContext(
          ctx,
          getProcessorProperties(ParserListenerEvents.taskCommandStart, {
            begin: (o) => o.BeginLBrace() || o.BeginHereDoc(),
            end: 'EndCommand',
          }),
        )
        .pushItem('parts', '__command_part__', ContextTypes.command)
        .setPropertiesFromContext(
          ctx,
          getProcessorProperties(ParserListenerEvents.taskCommandStart, {
            command: 'task_command_string_part',
          }),
        )
        .popItem();
    }

    taskCommandEnd() {
      const current = this.context
        .getCurrent(ContextTypes.command);
      if (current) {
        const { parts = [] } = current;
        current.command = parts.map((part) => part.command).join('');
        delete current.parts;
      }
      this.context.popItem();
    }

    taskCommand(ctx) {
      this.context
        .pushItem('parts', '__command_part__', ContextTypes.command)
        .setPropertiesFromContext(
          ctx,
          getProcessorProperties(ParserListenerEvents.taskCommand, {
            command: (o) => o,
          }),
        )
        .popItem();
    }

    getDeclarationType() {
      const current = this.context.getCurrent();
      if (!current) {
        return ContextTypes.declaration;
      }
      switch (current[ContextTypeSymbol]) {
        case ContextTypes.inputs:
          return ContextTypes.input;
        case ContextTypes.outputs:
          return ContextTypes.output;
        default:
          return ContextTypes.declaration;
      }
    }

    unboundDeclaration(ctx) {
      this.context
        .pushItem('elements', this.getDeclarationType())
        .setPropertiesFromContext(
          ctx,
          getProcessorProperties(ParserListenerEvents.unboundDeclaration, {
            name: 'Identifier',
            type: 'wdl_type',
          }),
        )
        .popItem();
    }

    boundDeclarationStart(ctx) {
      this.context
        .pushItem('elements', this.getDeclarationType())
        .setPropertiesFromContext(
          ctx,
          getProcessorProperties(ParserListenerEvents.boundDeclarationStart, {
            name: 'Identifier',
            type: 'wdl_type',
            value: 'expr',
          }),
        );
    }

    boundDeclarationEnd() {
      this.context.popItem();
    }
  }

  return new CommonListener();
}

function createParser(Lexer, Parser, ParserListener, version) {
  return (wdlContent) => {
    const inputStream = new antlr4.InputStream(wdlContent);
    const lexer = new Lexer(inputStream);
    lexer.removeErrorListeners();
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new Parser(tokens);
    parser.removeErrorListeners();
    const errorListener = new ErrorListener();
    lexer.addErrorListener(errorListener);
    parser.addErrorListener(errorListener);
    try {
      const wdl = parser.document();
      const listener = createCommonListener(ParserListener);
      ParseTreeWalker.DEFAULT.walk(listener, wdl);
      if (errorListener.errors.length > 0) {
        throw new ParserError(errorListener.errors);
      }
      const result = listener.context.context;
      return {
        ...result,
        version,
      };
    } catch (e) {
      if (e instanceof ParserError) {
        throw e;
      }
      throw new Error(`Error parsing wdl: ${e}`);
    }
  };
}

export default createParser;
