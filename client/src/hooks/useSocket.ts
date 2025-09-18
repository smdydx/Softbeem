
import { useRef, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = (serverPath: string = '') => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Only create socket if we don't have one
    if (!socketRef.current) {
      socketRef.current = io(serverPath || 'http://localhost:5000', {
        transports: ['websocket', 'polling'],
        autoConnect: true,
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [serverPath]);

  return socketRef.current;
};
