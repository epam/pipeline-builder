import '../dist/pipeline.css';
import './pipe_webpack.css';

import pipeline from '../dist/pipeline.js';

function createFlow() {
  var flow = new pipeline.Workflow('flow');
  var a = flow.add(new pipeline.Step('A', {
    i: { in: {} },
    o: { out: {} },
  }));
  var b = flow.add(new pipeline.Step('B', {
    i: { in: { bind: a.o.out } },
    o: { out: {} },
  }));
  var c = flow.add(new pipeline.Step('C', {
    i: { in: { bind: b.o.out } },
    o: { out: {} },
  }));

  return flow;
}

window.onload = function() {
  document.getElementById('version').textContent = pipeline.VERSION;

  var diagram = new pipeline.Visualizer(document.getElementById('diagram'));
  diagram.attachTo(createFlow());
}
