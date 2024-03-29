import { io, Socket } from 'socket.io-client';

const socket: Socket = io(import.meta.env.VITE_BASE_URL, {
  transports: ['websocket'],
  auth: {
    token: localStorage?.getItem('accessToken'),
  },
});

export default socket;
