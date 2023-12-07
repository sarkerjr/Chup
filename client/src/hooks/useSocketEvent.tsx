import { useContext, useEffect } from 'react';
import { SocketContext } from '@/contexts/SocketContext';

export const useSocketEvent = (
  eventName: string,
  handler: (...args: any[]) => void
): void => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on(eventName, handler);
    return () => {
      socket.off(eventName, handler);
    };
  }, [eventName, handler, socket]);
};
