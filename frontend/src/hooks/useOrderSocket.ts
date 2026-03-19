import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateOrderFromSocket } from '../features/orderSlice';
import socket from './socket';

export const useOrderSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('orderUpdated', (order: any) => {
      dispatch(updateOrderFromSocket(order));
    });

    socket.on('orderCreated', (order: any) => {
      dispatch(updateOrderFromSocket(order));
    });

    return () => {
      socket.off('orderUpdated');
      socket.off('orderCreated');
    };
  }, [dispatch]);
};
