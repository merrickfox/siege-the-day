var roomId = window.location.pathname.split('/')[1];
var userId = getRandomString();
var canvas, socket;
console.log(roomId)

document.addEventListener("DOMContentLoaded", function() {
  $.ajax({
    type: "Get",
    url: '/api/strat/' + roomId,
    success: function(data) {
    },
    dataType: 'json'
  });

  $(document).keydown(function(e){
    if( e.which === 90 && (event.ctrlKey||event.metaKey) && e.shiftKey ){
      //redo
    }
    else if( e.which === 90 && (event.ctrlKey||event.metaKey) ){
      removeLast();
    }
  });



  var mouse = {
    click: false,
    move: false,
    pos: {
      x: 0,
      y: 0
    },
    pos_prev: false
  };
  // get canvas element and create context

  canvas = new fabric.Canvas('drawing', {
    isDrawingMode: true
  });
  canvas.on('path:created', pathDrawn)

  canvas.freeDrawingBrush.color = '#ff0000';
  canvas.freeDrawingBrush.width = 5;
  var width = 2560;
  var height = 1440

  canvas.setWidth(width);
  canvas.setHeight(height);
  canvas.setBackgroundImage("./maps/bank/0.jpg", canvas.renderAll.bind(canvas), {
    backgroundImageStretch: false
  });
  setTimeout(function() {
    $("body").scrollLeft(640);
    $("body").scrollTop(360);
  }, 20)
});

function remove (id) {
  var canvasObjects = canvas._objects;
  var objectToRemove = _.find(canvasObjects, {id: id})
  console.log(objectToRemove);
  canvas.remove(objectToRemove);
}

function removeLast () {
  var canvasObjects = canvas._objects;
    if(canvasObjects.length !== 0){
     var last = canvasObjects[canvasObjects.length -1]; //Get last object
     canvas.remove(last);
     socket.emit('path:remove', {
      room: roomId,
      user_id: userId,
      path_id: last.id
    })
   }
}

function exp () {
  var canvasObjects = canvas._objects;

  if(canvasObjects.length !== 0){
    canvasObjects[canvasObjects.length -1].visible = !canvasObjects[canvasObjects.length -1].visible;
    canvas.renderAll()
  }
  console.log(canvasObjects);
}

function removePaths (paths) {

}

function addPaths (paths) {
  _.forEach([paths], function (path) {
    fabric.util.enlivenObjects([path], function(objects) {
      objects.forEach(function(o) {
        canvas.add(o);
        calculateDisplayed();
      });
    });
  });
}

function getRandomString () {
  return Math.random().toString(36).substring(7);
}

function joinRoom() {
  socket = io.connect();
  setupEvents();
}

function pathDrawn (e) {
    var canvasObjects = canvas._objects;
    var id = getRandomString();
    if(canvasObjects.length !== 0){
       canvasObjects[canvasObjects.length -1].id = id; //Get last object
       canvasObjects[canvasObjects.length -1].layer = currentLayer;
       canvasObjects[canvasObjects.length -1].map_level = currentMapLevel;
    }

    socket.emit('path:drawn', {
      room: roomId,
      user_id: userId,
      path_id: id,
      layer: currentLayer,
      map_level: currentMapLevel,
      path: e
    })
  }

function setupEvents() {
  socket.on('connect', function(data) {
      // Connected, let's sign-up for to receive messages for this room
    socket.emit("subscribe", {
      room: roomId,
      username: username
    });
  });

  socket.on('someone_joined', function(data) {
    console.log('someone_joined', data)
    users.push(data.username);
    populateUserList();
  });

  socket.on('path:drawn', function(data) {
    layers[currentLayer].data.push(data.path.path);

    if (data.user_id !== userId) {
      console.log('socket path: ', data.path)
      var path = data.path.path;
      path.id = data.path_id;
      path.layer = data.layer;
      path.map_level = data.map_level;
      addPaths(path);
    }

  });

  socket.on('path:remove', function(data) {
    if (data.user_id !== userId) {
      remove(data.path_id);
    }
  });
}


