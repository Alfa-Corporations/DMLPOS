import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { fetchOrders, updateOrderStatus } from '../features/orderSlice';
import { useOrderSocket } from '../hooks/useOrderSocket';

const OrderList: React.FC = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state: RootState) => state.orders);

  useOrderSocket();

  React.useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleStatusChange = (id: number, status: string) => {
    dispatch(updateOrderStatus({ id, status }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Orders</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Table</th>
            <th>Status</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.tableNumber}</td>
              <td>{order.status}</td>
              <td>${order.total}</td>
              <td>
                <select value={order.status} onChange={e => handleStatusChange(order.id, e.target.value)} className='form-select'>
                  <option value='pending'>Pending</option>
                  <option value='preparing'>Preparing</option>
                  <option value='ready'>Ready</option>
                  <option value='delivered'>Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
