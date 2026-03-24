import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../store/slices/orderSlice';
import type { RootState } from '../store/store';
import Layout from '../components/Layout';

const Orders: React.FC = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders() as any);
  }, [dispatch]);

  return (
    <Layout>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h1>Pedidos</h1>
        <button className='btn btn-success'>Nuevo Pedido</button>
      </div>

      {loading ? (
        <div className='text-center'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Cargando...</span>
          </div>
        </div>
      ) : (
        <div className='table-responsive'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Estado</th>
                <th>Total</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    <span className={`badge bg-${order.status === 'pending' ? 'warning' : order.status === 'completed' ? 'success' : 'secondary'}`}>{order.status}</span>
                  </td>
                  <td>${order.total}</td>
                  <td>{new Date().toLocaleDateString()}</td>
                  <td>
                    <button className='btn btn-sm btn-outline-primary me-2'>Ver</button>
                    <button className='btn btn-sm btn-outline-success'>Actualizar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default Orders;
