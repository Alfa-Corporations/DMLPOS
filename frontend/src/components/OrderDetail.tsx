import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { fetchOrderById, setCurrentOrder } from '../features/orderSlice';

interface OrderDetailProps {
  orderId: number;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ orderId }) => {
  const dispatch = useDispatch();
  const { currentOrder, loading } = useSelector((state: RootState) => state.orders);

  React.useEffect(() => {
    dispatch(fetchOrderById(orderId));
  }, [dispatch, orderId]);

  if (loading) return <div>Loading...</div>;
  if (!currentOrder) return <div>Order not found</div>;

  return (
    <div>
      <h2>Order Details</h2>
      <p>
        <strong>ID:</strong> {currentOrder.id}
      </p>
      <p>
        <strong>Table:</strong> {currentOrder.tableNumber}
      </p>
      <p>
        <strong>Status:</strong> {currentOrder.status}
      </p>
      <p>
        <strong>Total:</strong> ${currentOrder.total}
      </p>
      <p>
        <strong>Created:</strong> {new Date(currentOrder.createdAt).toLocaleString()}
      </p>
      <h3>Items</h3>
      <ul>
        {currentOrder.OrderItems?.map(item => (
          <li key={item.id}>
            Product {item.productId} - Quantity: {item.quantity} - Price: ${item.price}
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch(setCurrentOrder(null))} className='btn btn-secondary'>
        Back
      </button>
    </div>
  );
};

export default OrderDetail;
