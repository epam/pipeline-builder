import VisualLink from './VisualLink';

/**
 * Represents graphical link for merged connections
 * @private
 */
export default class VisualMergedLink extends VisualLink {

  constructor(opts) {
    super(opts, true);
    this.attr({
      '.connection': {
        stroke: '#457fd2',
        'stroke-width': 4,
      },
    });
  }

}
