var layers = [
  {
    visible: true,
    data: []
  },
  {
    visible: true,
    data: []
  },
  {
    visible: true,
    data: []
  },
];

var currentLayer = 0;

function toggleLayer(idx) {
  layers[idx].visible = !layers[idx].visible
  console.log(layers)
}

function setCurrent(idx) {
  currentLayer = idx;
}
