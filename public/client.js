var roomId = window.location.pathname.split('/')[1];
console.log(roomId)

document.addEventListener("DOMContentLoaded", function() {
  $.ajax({
    type: "Get",
    url: '/api/strat/' + roomId,
    success: function(data) {
      console.log(data)
    },
    dataType: 'json'
  });

  var socket = io.connect();

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
  var canvas = new fabric.Canvas('drawing', {
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

  function pathDrawn (e) {
    //console.log(e);
    socket.emit('path:drawn', {
      room: roomId,
      path: e
    })
  }

  socket.on('connect', function(data) {
      // Connected, let's sign-up for to receive messages for this room
    socket.emit("subscribe", {
      room: roomId
    });
  });

  socket.on('someone_joined', function(data) {
  });

  socket.on('path:drawn', function(data) {
    console.log('recieved path update:', data.path.path)
    fabric.util.enlivenObjects([data.path.path], function(objects) {
      objects.forEach(function(o) {
        canvas.add(o);
      });
    });
  });
});
