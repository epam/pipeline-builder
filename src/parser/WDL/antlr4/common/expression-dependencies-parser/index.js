import antlr4, { ParseTreeWalker } from 'antlr4';
import Lexer from './ExpressionLexer';
import Parser from './ExpressionParser';
import ParserListener from './ExpressionParserListener';
import ContextProcessor from '../context-processor';
import ErrorListener from '../error-listener';
import ParserError from '../parser-error';
import { extractValue } from "../utilities";

const ExpressionSymbol = Symbol('expression');
const DependencySymbol = Symbol('dependency');

class Listener extends ParserListener {
  constructor() {
    super();
    this.context = new ContextProcessor();
    this.context.context[ExpressionSymbol] = true;
  }

  registerExpressionPossibleDependency(ctx, getter) {
    const current = this.context.getCurrent();
    if (current && current[DependencySymbol]) {
      this.context
        .pushItem('parts', '__dependency_part__', '__dependency__')
        .setPropertiesFromContext(ctx, {
          name: getter,
        })
        .popItem();
    }
  }

  dependencyStartOrContinue(ctx) {
    const current = this.context.getCurrent();
    if (current && current[ExpressionSymbol]) {
      this.context
        .pushItem('dependencies', '__dependency__')
        .setProperties({
          [DependencySymbol]: true,
          context: ctx,
        });
    }
  }

  dependencyEndOrContinue(ctx) {
    const current = this.context.getCurrent();
    if (current && current[DependencySymbol] && current.context === ctx) {
      this.context.popItem();
      const processDependency = (dep) => {
        if (/^(true|false)$/i.test(dep)) {
          return /^true$/i.test(dep);
        }
        if (!Number.isNaN(Number(dep))) {
          return Number(dep);
        }
        return dep;
      };
      current.parts = (current.parts || [])
        .map((part) => processDependency(part.name))
        .filter((part) => typeof part === 'string'
          && !/^"[^"]*"$/i.test(part)
          && !/^'[^']*'$/i.test(part))
        .reverse();
      delete current[DependencySymbol];
      delete current.context;
    }
  }

  enterGet_name(ctx) {
    this.dependencyStartOrContinue(ctx);
    this.registerExpressionPossibleDependency(ctx, 'Identifier');
  }

  exitGet_name(ctx) {
    this.dependencyEndOrContinue(ctx);
  }

  formatPrimitive(ctx) {
    const primitive = ctx.primitive_literal();
    if (primitive && primitive.Identifier()) {
      return primitive;
    }
    return undefined;
  }

  enterPrimitives(ctx) {
    const primitiveCtx = this.formatPrimitive(ctx);
    if (primitiveCtx) {
      this.dependencyStartOrContinue(primitiveCtx);
      this.registerExpressionPossibleDependency(primitiveCtx, 'Identifier');
    }
  }

  exitPrimitives(ctx) {
    const primitive = this.formatPrimitive(ctx);
    if (primitive) {
      this.dependencyEndOrContinue(primitive);
    }
  }

  enterLeft_name(ctx) {
    this.dependencyStartOrContinue(ctx);
    this.registerExpressionPossibleDependency(ctx, 'Identifier');
  }

  exitLeft_name(ctx) {
    this.dependencyEndOrContinue(ctx);
  }
}

function parseExpressionDependencies(expression) {
  if (!expression || !expression.length) {
    return {
      expression,
      dependencies: [],
    };
  }
  const inputStream = new antlr4.InputStream(expression);
  const lexer = new Lexer(inputStream);
  lexer.removeErrorListeners();
  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new Parser(tokens);
  parser.removeErrorListeners();
  const errorListener = new ErrorListener();
  lexer.addErrorListener(errorListener);
  parser.addErrorListener(errorListener);
  const wdl = parser.document();
  const listener = new Listener();
  ParseTreeWalker.DEFAULT.walk(listener, wdl);
  if (errorListener.errors.length > 0) {
    throw new ParserError(errorListener.errors);
  }
  const dependencies = (listener.context.context.dependencies || [])
    .map((deps) => deps.parts)
    .filter((deps) => deps.length > 0)
    .map((deps) => deps.join('.'));
  return {
    expression,
    dependencies,
  };
}

export default parseExpressionDependencies;
