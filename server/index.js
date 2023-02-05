const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('http');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(socket.id + ' connected');
});

server.listen(8080, () => {
  console.log('listening on 8080');
});
