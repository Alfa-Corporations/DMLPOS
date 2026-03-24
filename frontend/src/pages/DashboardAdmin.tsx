import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import Layout from '../components/Layout';

const DashboardAdmin: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Layout>
      <div className='row'>
        <div className='col-12'>
          <h1 className='mb-4'>Panel de Administrador</h1>
          <p className='lead'>Bienvenido, {user?.name}</p>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-4 mb-4'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title'>Pedidos</h5>
              <p className='card-text'>Gestionar pedidos en tiempo real</p>
              <a href='/orders' className='btn btn-primary'>
                Ver Pedidos
              </a>
            </div>
          </div>
        </div>

        <div className='col-md-4 mb-4'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title'>Inventario</h5>
              <p className='card-text'>Control de productos y stock</p>
              <a href='/inventory' className='btn btn-primary'>
                Ver Inventario
              </a>
            </div>
          </div>
        </div>

        {user?.role === 'admin' && (
          <div className='col-md-4 mb-4'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>Usuarios</h5>
                <p className='card-text'>Administrar usuarios y roles</p>
                <a href='/users' className='btn btn-primary'>
                  Ver Usuarios
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DashboardAdmin;
