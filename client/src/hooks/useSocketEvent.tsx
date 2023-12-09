import { useContext, useEffect, useCallback } from 'react';
import { SocketContext } from '@/contexts/SocketContext';

export const useSocketEvent = (
  eventName: string,
  handler?: (...args: any[]) => void
) => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    // Register the event listener for receiving events
    if (handler) {
      socket.on(eventName, handler);

      // Cleanup the event listener when the component unmounts
      return () => {
        socket.off(eventName, handler);
      };
    }
  }, [eventName, handler, socket]);

  // Provide a function to emit events
  const emitEvent = useCallback(
    (...args: any) => {
      socket.emit(eventName, ...args);
    },
    [eventName, socket]
  );

  return emitEvent;
};
