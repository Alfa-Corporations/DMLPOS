import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/slices/authSlice';
import type { RootState } from '../store/store';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(login({ email, password }) as any);
      if (result.type === login.fulfilled.type) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light'>
      <div className='row w-100 justify-content-center'>
        <div className='col-md-6 col-lg-4'>
          <div className='card shadow'>
            <div className='card-body p-5'>
              <div className='text-center mb-4'>
                <h2 className='card-title'>DIUR POS</h2>
                <p className='text-muted'>Sistema de Punto de Venta</p>
              </div>

              {error && (
                <div className='alert alert-danger' role='alert'>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label htmlFor='email' className='form-label'>
                    Email
                  </label>
                  <input type='email' className='form-control' id='email' value={email} onChange={e => setEmail(e.target.value)} required disabled={loading} />
                </div>

                <div className='mb-3'>
                  <label htmlFor='password' className='form-label'>
                    Contraseña
                  </label>
                  <input type='password' className='form-control' id='password' value={password} onChange={e => setPassword(e.target.value)} required disabled={loading} />
                </div>

                <button type='submit' className='btn btn-primary w-100' disabled={loading}>
                  {loading ? (
                    <>
                      <span className='spinner-border spinner-border-sm me-2' role='status'></span>
                      Iniciando sesión...
                    </>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
