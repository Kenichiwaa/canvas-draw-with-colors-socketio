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
var color_history = [];
var radius_histroy = [];


io.sockets.on('connection', function(socket) {
  connections.push(socket);
  console.log('Connected: %s sockets connected ', connections.length);
  console.log('Users' +users);

  // Disconnet
  socket.on('disconnect', function(data) {
     if(!socket.userName) return;
    users.splice(users.indexOf(socket.userName), 1);
    updateUsernames();
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected %s sockets connected ', connections.length);
  });
  //--- Draw ---------------------------------------------------------------------
   // first send the history to the new client
   for (var i in line_history && color_history && radius_histroy) {
      socket.emit('draw_line', {
          line: line_history[i],
          color: color_history[i],
          radius: radius_histroy[i]
      });

   }
   // add handler for message type "draw_line".
   socket.on('draw_line', function (data) {
      // add received line from client to history
      line_history.push(data.line);
      color_history.push(data.color);
      radius_histroy.push(data.radius);
      console.log(data.line);
      console.log(data.color);
      console.log(data.radius);
      console.log('line from client: '+data.line+' | color from client: '+ data.color+ ' | radius from client: '+ data.radius);
      // send line to all clients
      io.emit('draw_line', {
            line: data.line,
            color: data.color,
            radius: data.radius
      });
   });
});


var PORT = process.env.PORT || 4000;

server.listen(PORT, function(err, res) {
  console.log('listening to port: '+ PORT);
});
