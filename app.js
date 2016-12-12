var express = require('express'),
    app = express(),
    http = require('http'),
    socketIo = require('socket.io'),
    mongoose = require('mongoose');

var Strat = require('./strat');
var bodyParser = require('body-parser');
var server = http.createServer(app);
var io = socketIo.listen(server);
server.listen(8000);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
console.log("Server running on 127.0.0.1:8000!!");
mongoose.connect('mongodb://localhost/siege-dev');

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/:id', function (req, res) {
   res.sendFile( __dirname + "/public/strat.html" );
})

app.post('/api/strat', function(req, res) {
  var id = req.body.id;
  var map = req.body.map;
  var strat = new Strat({
      id: id,
      map: map
    });
  console.log(strat);

  var promise = strat.save();

  promise.then(function (doc) {
    res.send(doc);
  })

})

app.get('/api/strat/:id', function(req, res) {
  var promise = Strat.find({ id: req.params.id});

  promise.then(function (doc) {
    res.send(doc);
  })

})

// event-handler for new incoming connections
io.on('connection', function (socket) {
  console.log('connected');

  socket.on('subscribe', function(data) {
    socket.join(data.room);
    io.in(data.room).emit('someone_joined', {
      map: socket.map
    });
  })
   socket.on('path:drawn', function (data) {
      io.in(data.room).emit('path:drawn', {
        path: data.path,
        user_id: data.user_id,
        path_id: data.path_id
      });
   });

   socket.on('path:remove', function (data) {
      io.in(data.room).emit('path:remove', {
        path: data.path,
        user_id: data.user_id,
        path_id: data.path_id
      });
   });
});

