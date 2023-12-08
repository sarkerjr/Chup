import { Server as IOServer } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';

import authSocketMiddleware from './middleware/auth.socket.middleware';

// socket handlers
import { handleConnectionEvents } from './sockets/connectionHandlers';
import { handleMessageEvents } from '@/sockets/messageHandlers';

const setupSocket = (server: any) => {
  const io = new IOServer(server, {
    cors: {
      origin: true,
      credentials: true,
    },
  });

  // Socket.IO authentication middleware
  io.use(authSocketMiddleware);

  io.on('connection', (socket) => {
    socket.on('newTestMessage', (data) => {
      console.log('newTestMessage', data);
    });

    handleConnectionEvents(socket);

    handleMessageEvents(socket);
  });

  // Socket.IO Admin UI
  instrument(io, {
    auth: false,
    mode: 'development',
  });

  return io;
};

export default setupSocket;
