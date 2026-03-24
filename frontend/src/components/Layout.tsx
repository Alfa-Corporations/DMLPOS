import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import type { RootState } from '../store/store';
import { useSocket } from '../hooks/useSocket';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const socket = useSocket();

  const handleLogout = () => {
    dispatch(logout());
    socket.disconnect();
    navigate('/login');
  };

  return (
    <div className='d-flex flex-column min-vh-100'>
      {/* Navbar */}
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
        <div className='container'>
          <Link className='navbar-brand' to='/dashboard'>
            DIUR POS
          </Link>

          <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav'>
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav me-auto'>
              <li className='nav-item'>
                <Link className='nav-link' to='/dashboard'>
                  Dashboard
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/orders'>
                  Pedidos
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/inventory'>
                  Inventario
                </Link>
              </li>
              {user?.role === 'admin' && (
                <li className='nav-item'>
                  <Link className='nav-link' to='/users'>
                    Usuarios
                  </Link>
                </li>
              )}
            </ul>

            <ul className='navbar-nav'>
              <li className='nav-item dropdown'>
                <a className='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-bs-toggle='dropdown'>
                  {user?.name}
                </a>
                <ul className='dropdown-menu'>
                  <li>
                    <button className='dropdown-item' onClick={handleLogout}>
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className='flex-grow-1'>
        <div className='container mt-4'>{children}</div>
      </main>

      {/* Footer */}
      <footer className='bg-light text-center text-muted py-3 mt-auto'>
        <div className='container'>
          <p>&copy; 2026 DIUR POS - Sistema de Punto de Venta</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
