import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/slices/userSlice';
import type { RootState } from '../store/store';
import Layout from '../components/Layout';

const Users: React.FC = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers() as any);
  }, [dispatch]);

  return (
    <Layout>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h1>Usuarios</h1>
        <button className='btn btn-success'>Nuevo Usuario</button>
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
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className='badge bg-primary'>{user.role}</span>
                  </td>
                  <td>
                    <span className='badge bg-success'>Activo</span>
                  </td>
                  <td>
                    <button className='btn btn-sm btn-outline-primary me-2'>Editar</button>
                    <button className='btn btn-sm btn-outline-danger'>Eliminar</button>
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

export default Users;
