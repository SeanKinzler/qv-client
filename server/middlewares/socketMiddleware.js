var server = require('./app-config.js');
var socketIO = require('socket.io')();

var io = socketIO.listen(server);

io.sockets.on('connection', function(socket) {

  socket.on('offer', function (data) {
    socket.to(data.recipient).emit('offer', data);
  });

  socket.on('answer', function (data) {
    socket.to(data.recipient).emit('answer', data);
  });

  socket.on('ice-candidate', function (data) {
    socket.to(data.recipient).emit('ice-candidate', data);
  });

  socket.on('ice-merge', function (data) {
    socket.to(data.recipient).emit('ice-merge', data);
  });

  socket.on('check', function (data) {
    if (socket.adapter.rooms[data.roomName]) {
      var userIds = socket.adapter.rooms[data.roomName].sockets.keys();
      var yourId;

      socket.join(data.roomName);

      for (let key in socket.adapter.rooms[data.roomName].sockets) {
        if (userIds.indexOf(key) === -1) {
          yourId = key;
        }
      }

      socket.emit('joined', {
        message: 'You have joined the room: "' + data.roomName + '"',
        userIds: userIds,
        yourId: yourId
      });

      socket.emit('chatMessage', {
        user: 'You have joined the room: ' + data.roomName,
        text: '',
      });

      socket.broadcast.to(data.roomName).emit('chatMessage', {
        user: '',
        text: data.user + ' has joined the room.',
      });  

    } else {
      socket.join(data.roomName);

      socket.emit('created', 'You have created the room: "' + data.roomName + '"');
    }
  });

  socket.on('chatMessage', function (data) {
    socket.broadcast.to(data.room).emit('chatMessage', data);
  });
});


module.exports = server;





