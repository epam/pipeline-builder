import _ from 'lodash';
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
 * @param {string} [opts.format='wdl'] - Workflow definition format ('wdl').
 * @param {file} [opts.zipFile=null] - Zip with import WDL files
 * @param {array} [opts.subWfDetailing=null] - Array of Sub Workflow names that should be detailed; if array includes '*' each Sub Workflow will be detailed.
 * @param {number} [opts.recursionDepth=0] - Integer that describes Sub Workflow detailing depth
 * @param {string} [opts.baseURI=null] - Base URI for WDL import statements
 * @returns {Promise} Parsing result object
 */
function parse(text, opts = {}) {
  const format = opts.format || 'wdl';
  const subWfDetailing = (opts.subWfDetailing && _.isArray(opts.subWfDetailing)) ? opts.subWfDetailing : null;
  const recursionDepth = opts.recursionDepth || 0;
  const baseURI = opts.baseURI || null;
  const zipFile = opts.zipFile || null;

  if (format === 'wdl') {
    if (zipFile) {
      return JSZip.loadAsync(zipFile).then((files) => {
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
          .then(wdlArray => parseWDL(text, { wdlArray, baseURI, subWfDetailing, recursionDepth }));
      }, e => Promise.reject(`Parse zip file: ${e}`));
    }
    return parseWDL(text, opts);
  }
  return Promise.reject(`Unsupported format: ${format}`);
}


// Workaround for JSDoc bug.
// It doesn't understand "export default function ..." creating help for "exports.default" method.
export default parse;
