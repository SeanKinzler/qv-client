const socketIO = require('socket.io')();

const config = (server) => {
  const io = socketIO.listen(server);

  io.sockets.on('connection', (socket) => {
    socket.on('offer', (data) => {
      socket.to(data.recipient).emit('offer', data);
    });

    socket.on('answer', (data) => {
      socket.to(data.recipient).emit('answer', data);
    });

    socket.on('ice-candidate', (data) => {
      socket.to(data.recipient).emit('ice-candidate', data);
    });

    socket.on('ice-merge', (data) => {
      socket.to(data.recipient).emit('ice-merge', data);
    });

    socket.on('check', (data) => {
      if (socket.adapter.rooms[data.roomName]) {
        const userIds = socket.adapter.rooms[data.roomName].sockets.keys();
        let yourId;

        socket.join(data.roomName);

        socket.adapter.rooms[data.roomName].sockets.forEach((key) => {
          if (userIds.indexOf(key) === -1) {
            yourId = key;
          }
        });

        socket.emit('joined', {
          message: `You have joined the room: "${data.roomName}"`,
          userIds: userIds,
          yourId: yourId,
        });

        socket.emit('chatMessage', {
          user: `You have joined the room: ${data.roomName}`,
          text: '',
        });

        socket.broadcast.to(data.roomName).emit('chatMessage', {
          user: '',
          text: `${data.user} has joined the room.`,
        });
      } else {
        socket.join(data.roomName);

        socket.emit('created', `You have created the room: "${data.roomName}"`);
      }
    });

    socket.on('chatMessage', (data) => {
      socket.broadcast.to(data.room).emit('chatMessage', data);
    });
  });
};


module.exports = config;
