import * as JSZip from 'jszip';
import parseWDL from './WDL/parse';

/**
 * Parsing result object
 * @typedef {Object} ParseResult
 * @property {boolean} status Status of parsing result
 * @property {string} message Faulty message if status is false
 * @property {array} model Array of workflow steps
 * @property {array} actions Array of actions that took place into the source script
 */

/**
 * Parse workflow definition file.
 *
 * @memberOf module:pipeline
 * @param {string} text - Text file contents to parse.
 * @param {object} [opts={}] - Parser options.
 * @param {string} [opts.format='wdl'] - Workflow definition format ('wdl', 'cwl').
 * @returns {ParseResult} Parsing result object
 */
function parse(text, opts = {}) {
  const format = opts.format || 'wdl';
  if (format === 'wdl') {
    if (opts.zipFile) {
      return JSZip.loadAsync(opts.zipFile).then((files) => {
        const zipWdlFiles = [];

        files.forEach((relativePath, zipEntry) => {
          if (!zipEntry.dir && zipEntry.name.indexOf('.wdl') === zipEntry.name.length - 4) {
            zipWdlFiles.push(zipEntry);
          }
        });

        return Promise.all(zipWdlFiles.map(zipWdlFile => zipWdlFile.async('string').then(str => ({
          name: zipWdlFile.name.split('/').pop(),
          wdl: str,
        }))))
          // todo baseURI
          .then(wdlArray => parseWDL(text, { wdlArray }));
      }, (e) => {
        throw new Error(`Parse zip file: ${e}`);
      });
    }
    return new Promise((resolve) => {
      const data = parseWDL(text, opts);
      resolve(data);
    });
  }
  throw new Error(`Unsupported format: ${format}`);
}


// Workaround for JSDoc bug.
// It doesn't understand "export default function ..." creating help for "exports.default" method.
export default parse;
