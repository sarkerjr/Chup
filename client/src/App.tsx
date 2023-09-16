import { useEffect } from 'react';
import { io } from 'socket.io-client';

// project imports
import Chat from './pages/chats';

const socket = io('http://localhost:8080');

const App = () => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log(`connected user id: ${socket.id}`);
    });
  }, []);

  return <Chat />;
};

export default App;
