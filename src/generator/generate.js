import generateWDL from './WDL/generate';

/**
 * Generate workflow definition file.
 *
 * @memberOf module:pipeline
 * @param {Workflow} flow - Workflow being converted to a text file.
 * @param {object} [opts={}] - Generator options.
 * @param {string} [opts.format='wdl'] - Workflow definition format ('wdl', 'cwl').
 * @returns {string} Textual representation of the workflow.
 */
function generate(flow, opts = {}) {
  if (flow.hasImports) {
    throw new Error('Generation for scripts containing imports is not supported');
  }
  const format = opts.format || 'wdl';
  if (format === 'wdl') {
    return generateWDL(flow, opts);
  }
  throw new Error(`Unsupported format: ${format}`);
}

// Workaround for JSDoc bug.
// It doesn't understand "export default function ..." creating help for "exports.default" method.
export default generate;
