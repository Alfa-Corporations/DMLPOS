import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';
import Login from './pages/Login';
import DashboardAdmin from './pages/DashboardAdmin';
import Orders from './pages/Orders';
import Inventory from './pages/Inventory';
import Users from './pages/Users';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

interface AppProps {
  socket?: any;
}

const App: React.FC<AppProps> = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <div className='App'>
        <Routes>
          {/* Ruta pública */}
          <Route path='/login' element={isAuthenticated ? <Navigate to='/dashboard' replace /> : <Login />} />

          {/* Rutas protegidas */}
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path='/orders'
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path='/inventory'
            element={
              <ProtectedRoute>
                <Inventory />
              </ProtectedRoute>
            }
          />

          <Route
            path='/users'
            element={
              <ProtectedRoute requiredRole='admin'>
                <Users />
              </ProtectedRoute>
            }
          />

          {/* Redirección por defecto */}
          <Route path='/' element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />

          {/* Ruta 404 */}
          <Route path='*' element={<div>404 - Página no encontrada</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
