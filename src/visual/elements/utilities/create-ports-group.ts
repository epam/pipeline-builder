export default function createPortsGroup(positionName) {
  return {
    position: { name: positionName },
    attrs: {
      portBody: {
        magnet: true,
        fill: 'white',
        stroke: 'black',
      },
      label: {
        textVerticalAnchor: 'middle',
      },
    },
    label: {
      position: {
        name: positionName,
      },
      markup: [{
        tagName: 'text',
        selector: 'label',
        className: 'visual-parameter-label',
      }],
    },
    markup: [{
      tagName: 'circle',
      selector: 'portBody',
    }],
  };
}
