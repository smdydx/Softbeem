
import { useRef } from 'react';

export const useSocket = () => {
  const socketRef = useRef<any>(null);
  
  return {
    socket: socketRef.current,
    connect: () => {
      // Socket connection logic here if needed
    },
    disconnect: () => {
      // Socket disconnection logic here if needed
    }
  };
};
