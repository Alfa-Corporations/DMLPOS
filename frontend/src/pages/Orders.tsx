import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import OrderList from '../components/OrderList';
import OrderDetail from '../components/OrderDetail';

const Orders: React.FC = () => {
  const { currentOrder } = useSelector((state: RootState) => state.orders);

  return <div>{currentOrder ? <OrderDetail orderId={currentOrder.id} /> : <OrderList />}</div>;
};

export default Orders;
