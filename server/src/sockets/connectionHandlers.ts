import { Socket } from 'socket.io';

export const handleConnectionEvents = (socket: Socket) => {
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log('joined room', roomId);
  });
};
