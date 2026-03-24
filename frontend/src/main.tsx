import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { io } from 'socket.io-client';
import { SocketProvider } from './hooks/useSocket';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App.tsx';

// Configurar Socket.IO
const socket = io('http://localhost:8000');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <SocketProvider socket={socket}>
        <App socket={socket} />
      </SocketProvider>
    </Provider>
  </StrictMode>
);
