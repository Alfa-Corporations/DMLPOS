import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/inventorySlice';
import type { RootState } from '../store/store';
import Layout from '../components/Layout';

const Inventory: React.FC = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state: RootState) => state.inventory);

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  return (
    <Layout>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h1>Inventario</h1>
        <button className='btn btn-success'>Nuevo Producto</button>
      </div>

      {loading ? (
        <div className='text-center'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Cargando...</span>
          </div>
        </div>
      ) : (
        <div className='row'>
          {products.map(product => (
            <div key={product.id} className='col-md-4 mb-4'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>{product.name}</h5>
                  <p className='card-text'>{product.description}</p>
                  <div className='d-flex justify-content-between align-items-center'>
                    <span className='h6 text-primary'>${product.price}</span>
                    <span className={`badge ${product.stock > 10 ? 'bg-success' : product.stock > 0 ? 'bg-warning' : 'bg-danger'}`}>Stock: {product.stock}</span>
                  </div>
                  <div className='mt-3'>
                    <button className='btn btn-outline-primary btn-sm me-2'>Editar</button>
                    <button className='btn btn-outline-danger btn-sm'>Eliminar</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Inventory;
