/* global PACKAGE_VERSION:false */

import Workflow from './model/Workflow';
import Action from './model/Action';
import Step from './model/Step';
import Group from './model/Group';
import Visualizer from './visual/Visualizer';
import parse from './parser/parse';
import generate from './generator/generate';

/**
 * {@link https://github.com/lodash/lodash} &mdash;
 * A modern JavaScript utility library delivering modularity, performance & extras.
 *
 * @external lodash
 */

/**
 * {@link https://github.com/clientIO/joint} &mdash;
 * JavaScript diagramming library.
 *
 * Dependencies:
 * - [jquery](https://jquery.com/),
 * - [lodash](https://lodash.com/),
 * - [backbone](http://backbonejs.org/),
 * - [graphlib](https://github.com/cpettitt/graphlib) &mdash; data structures for undirected and directed multi-graphs,
 * - [dagre](https://github.com/cpettitt/dagre) &mdash; graph layout.
 *
 * @external jointjs
 */

/**
 * The main module of a Pipeline Builder.
 *
 * @module pipeline
 */
export default {
  /**
   * Package version as a [SemVer](http://semver.org/) string, e.g. `"0.1.0-alpha"`.
   *
   * @static
   * @type {string}
   * @example
   * const pipeline = require('pipeline');
   * console.log(pipeline.VERSION);
   */
  VERSION: PACKAGE_VERSION,

  /**
   * @static
   * @type {Workflow}
   */
  Workflow,
  /**
   * @static
   * @type {Action}
   */
  Action,
  /**
   * @static
   * @type {Step}
   */
  Step,
  /**
   * @static
   * @type {Group}
   */
  Group,
  /**
   * @static
   * @type {Visualizer}
   */
  Visualizer,

  parse,
  generate,
};
