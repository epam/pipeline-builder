import _ from 'lodash';

import './pipeline.scss';

import pipeline from './pipeline';
import example1 from './app/example1';
import example3 from './app/example3';

function processButton(elementName, func) {
  const button = document.getElementById(elementName);
  if (button) {
    button.addEventListener('click', func);
  }
}

let diagram = null;
let flow1 = null;

function removeChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function ignoreFunctions(value, other) {
  if (_.isFunction(value) && _.isFunction(other)) {
    return true;
  }
  return undefined;
}

async function initialize() {
  // create flow by API
  flow1 = example1.createFlow();

  // create flow by parsing a WDL file
  const flow3 = await example3.createFlow();

  // compare results
  const equal = _.isEqualWith(flow1, flow3, ignoreFunctions);
  const comparison = equal ? 'the same' : '<span style="color:red">different</span>';
  const infoDiv = document.getElementById('info');
  if (infoDiv) {
    infoDiv.innerHTML =
      `Using version <b>${pipeline.VERSION}</b> created <code>${flow1.name}</code> workflow</br>` +
      `<code>example1</code> and <code>example3</code> workflow models are <b>${comparison}</b>`;
  }

  removeChildren(document.getElementById('diagram'));
  diagram = new pipeline.Visualizer(document.getElementById('diagram'));
  diagram.attachTo(flow1);
  window.flow = flow1;
}

// build user WDL on demand
processButton('btn-build', () => {
  const elem = document.getElementById('txt-script');
  const baseURI = document.getElementById('base-url').value || null;
  if (elem) {
    pipeline.parse(elem.value, { baseURI }).then((res) => {
      if (res.status) {
        flow1 = res.model[0];
        diagram.attachTo(flow1);
      } else {
        throw new Error(res.message, 'wdl parsing error');
      }
    });
  }
});

processButton('btn-generate', () => {
  const elem = document.getElementById('txt-script');
  if (elem) {
    elem.value = pipeline.generate(flow1);
  }
});

processButton('btn-get-svg', () => {
  const element = document.createElement('a');
  const blob = new Blob([diagram.paper.getSVG()], {type: 'text/plain;charset=utf-8'});
  element.setAttribute('href', window.URL.createObjectURL(blob));
  element.setAttribute('download', 'diagram.svg');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
});

processButton('btn-get-png', () => {
  diagram.paper.getPNG((data) => {
    const element = document.createElement('a');
    element.setAttribute('href', window.URL.createObjectURL(data));
    element.setAttribute('download', 'diagram.png');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  });
});


processButton('btn-zoom-in', () => {
  diagram.zoom.zoomIn();
});

processButton('btn-zoom-out', () => {
  diagram.zoom.zoomOut();
});

processButton('btn-fit-page', () => {
  diagram.zoom.fitToPage();
});

processButton('btn-layout', () => {
  diagram.layout();
});

processButton('btn-en-ports', () => {
  diagram.togglePorts(true);
});

processButton('btn-dis-ports', () => {
  diagram.togglePorts(false);
});

processButton('btn-load-zip', () => {
  document.getElementById('file').click();
});

document.getElementById('file').addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  const elem = document.getElementById('txt-script');
  const baseUrl = document.getElementById('base-url').value || null;

  document.getElementById('file').value = '';

  if (elem && elem.value && file && file.name.indexOf('.zip') === file.name.length - 4) {
    pipeline.parse(elem.value, { zipFile: file, baseUrl }).then((res) => {
      if (res.status) {
        flow1 = res.model[0];
        diagram.attachTo(flow1);
      } else {
        throw new Error(res.message, 'wdl parsing error');
      }
    });
  } else {
    throw new Error('No data to parse');
  }
});

initialize();
if (module.hot) {
  module.hot.accept(initialize);
}
