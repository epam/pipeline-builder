import pipeline from '../pipeline'; // import { Workflow, Action, Step } from '../pipeline';

const { Workflow, Action, Step } = pipeline;

/* eslint-disable no-template-curly-in-string */
function createFlow() {
  const flow = new Workflow('splitmerge', {
    i: {
      data: {
        type: 'File',
      },
    },
    o: {
      result: {
        type: 'File',
      },
    },
  });

  const split = flow.add(new Step('split', {
    i: {
      data: {
        type: 'File',
        bind: flow.i.data,
      },
    },
    o: {
      odd: {
        type: 'File',
        default: '"${data}.odd"',
      },
      even: {
        type: 'File',
        default: '"${data}.even"',
      },
    },
    data: {
      command: 'split ${data}',
    },
  }));

  const process = new Action('process', {
    i: {
      data: {
        type: 'File',
      },
    },
    o: {
      result: {
        type: 'File',
        default: '"${data}.processed"',
      },
    },
    data: {
      command: 'process ${data} -o ${data}.processed',
    },
  });

  const odd = flow.add(new Step('odd', process, {
    i: {
      data: split.o.odd,
    },
  }));

  const even = flow.add(new Step('even', process, {
    i: {
      data: split.o.even,
    },
  }));

  const merge = flow.add(new Step('merge', {
    i: {
      odd: {
        type: 'File',
        bind: odd.o.result,
      },
      even: {
        type: 'File',
        bind: even.o.result,
      },
    },
    o: {
      result: {
        type: 'File',
        default: '"merged.dat"',
      },
    },
    data: {
      command: 'merge ${odd} ${even} -o "merged.dat"',
    },
  }));

  flow.o.result.bind(merge.o.result);

  return flow;
}
/* eslint-enable no-template-curly-in-string */

export default { createFlow };
