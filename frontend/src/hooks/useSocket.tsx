import { useEffect, useContext, createContext } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../store/slices/notificationSlice';

const SocketContext = createContext<any>(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return socket;
};

export const SocketProvider = ({ children, socket }: { children: React.ReactNode; socket: any }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Conectar socket
    socket.connect();

    // Eventos de socket
    socket.on('newOrder', (data: any) => {
      console.log('Nueva orden:', data);
      dispatch(
        addNotification({
          message: `Nueva orden #${data.id} recibida`,
          type: 'order',
          isRead: false
        })
      );
    });

    socket.on('orderUpdated', (data: any) => {
      console.log('Orden actualizada:', data);
      dispatch(
        addNotification({
          message: `Orden #${data.id} actualizada a ${data.status}`,
          type: 'order',
          isRead: false
        })
      );
    });

    socket.on('notification', (data: any) => {
      console.log('Notificación:', data);
      dispatch(
        addNotification({
          message: data.message,
          type: data.type || 'system',
          isRead: false
        })
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, dispatch]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
