import './App.css';
import { SocketContext } from './contexts/SocketContext';

import Routes from '@/routes';
import socket from '@/utils/socket';

const App = () => {
  return (
    <SocketContext.Provider value={socket}>
      <Routes />
    </SocketContext.Provider>
  );
};

export default App;
