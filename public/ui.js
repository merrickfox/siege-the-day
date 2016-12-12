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
var currentMapLevel = 0;

function toggleLayer(idx) {
  layers[idx].visible = !layers[idx].visible
  console.log(layers)
}

function setCurrent(idx) {
  currentLayer = idx;
}

function setLevel(level) {
  currentMapLevel = level;
  canvas.setBackgroundImage("./maps/bank/" + level + ".jpg", canvas.renderAll.bind(canvas), {
    backgroundImageStretch: false
  });

  displayLevel(level);
}

function displayLevel (level) {
  var canvasObjects = canvas._objects;
  _.forEach(canvasObjects, function (obj) {
    if (obj.map_level === level) {
      obj.visible = true;
    } else {
      obj.visible = false;
    }
  })
  console.log(canvas._objects);
  canvas.renderAll();
}

var mapInfo = {
  bank: {
    levels: 4
  }
}
var map = mapInfo.bank;
