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
  calculateDisplayed();
}

function setCurrent(idx) {
  currentLayer = idx;
}

function setLevel(level) {
  currentMapLevel = level;
  canvas.setBackgroundImage("./maps/bank/" + level + ".jpg", canvas.renderAll.bind(canvas), {
    backgroundImageStretch: false
  });

  calculateDisplayed();
}

function calculateDisplayed (level) {
  var canvasObjects = canvas._objects;
  _.forEach(canvasObjects, function (obj) {
    var objLayer = obj.layer;
    if (obj.map_level === currentMapLevel && layers[objLayer].visible) {
      obj.visible = true;
    } else {
      obj.visible = false;
    }
  })
  canvas.renderAll();
}

var mapInfo = {
  bank: {
    levels: 4
  }
}
var map = mapInfo.bank;
