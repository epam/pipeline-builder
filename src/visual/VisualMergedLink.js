import _ from 'lodash';
// import joint from 'jointjs';
import VisualLink from './VisualLink';


export default class VisualMergedLink extends VisualLink {

  constructor(opts) {
    const addOpts = {
      type: 'merged.link',
      attrs: {
        '.link-tools': {
          display: 'none',
        },
        '.marker-arrowheads': {
          display: 'none',
        },
      },
/*
      labels: [
        {
          position: 0.5,
          attrs: {
            text: {
              text: 'Merged',
              'font-family': 'sans-serif',
              fill: '#ffffff',
            },
            rect: {
              stroke: '#457fd2',
              fill: '#457fd2',
              'stroke-width': 5,
              rx: 5,
              ry: 5,
            },
          },
        },
      ],
*/
    };

    super(_.defaultsDeep(opts, addOpts));
    this.attr({
      '.connection': {
        stroke: '#457fd2',
        'stroke-width': 4,
      },
    });

    // this.conn = this.attributes.conn;
  }

}
