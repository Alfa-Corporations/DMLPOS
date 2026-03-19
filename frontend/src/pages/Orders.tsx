import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFailure } from '../features/orderSlice';
import { RootState } from '../store';
import axios from 'axios';

const Orders: React.FC = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    const fetchOrders = async () => {
      dispatch(fetchOrdersStart());
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(fetchOrdersSuccess(response.data));
      } catch (err: any) {
        dispatch(fetchOrdersFailure(err.message));
      }
    };
    fetchOrders();
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Orders</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Table</th>
            <th>Status</th>
            <th>Total</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.tableNumber}</td>
              <td>{order.status}</td>
              <td>${order.total}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
