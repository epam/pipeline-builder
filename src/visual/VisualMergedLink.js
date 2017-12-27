import _ from 'lodash';
import VisualLink from './VisualLink';

/**
 * Represents graphical link for merged connections
 * @private
 */
export default class VisualMergedLink extends VisualLink {

  constructor(opts) {
    super(_.defaultsDeep(opts, { type: 'VisualMergedLink' }), true);
  }

}
