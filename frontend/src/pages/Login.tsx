import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import axios from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      dispatch(login({ user: response.data.user, token: response.data.token }));
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input type='email' className='form-control' id='email' value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input type='password' className='form-control' id='password' value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type='submit' className='btn btn-primary'>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
