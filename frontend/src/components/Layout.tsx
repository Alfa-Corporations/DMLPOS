import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import { RootState } from '../store';

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            DMLPOS
          </Link>
          <div className='navbar-nav'>
            <Link className='nav-link' to='/'>
              Dashboard
            </Link>
            <Link className='nav-link' to='/users'>
              Users
            </Link>
            <Link className='nav-link' to='/orders'>
              Orders
            </Link>
          </div>
          <div className='navbar-nav ms-auto'>
            <span className='navbar-text me-3'>Welcome, {user?.username}</span>
            <button className='btn btn-outline-light' onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className='container mt-4'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
