const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('http');

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log(socket.io + ' connected');
});

server.listen(8080, () => {
  console.log('listening on 8080');
});
