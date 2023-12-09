import React from 'react';
import { Socket } from 'socket.io-client';

import socket from '@/utils/socket';

export const SocketContext = React.createContext<Socket>(socket);
