var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

var users = [];
var connections = [];

// store draw history
var line_history = [];


io.sockets.on('connection', function(socket) {
  //--- Draw ---------------------------------------------------------------------
   // first send the history to the new client
   for (var i in line_history) {
      socket.emit('draw_line', { line: line_history[i] } );
   }
   // add handler for message type "draw_line".
   socket.on('draw_line', function (data) {
      // add received line to history
      line_history.push(data.line);
      // send line to all clients
      io.emit('draw_line', { line: data.line });
   });
});







var PORT = process.env.PORT || 4000;

server.listen(PORT, function(err, res) {
  console.log('listening to port: '+ PORT);
});
