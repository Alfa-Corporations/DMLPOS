import axios from 'axios';
import { store } from '../store/store';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1'
});

// Interceptor para agregar token
api.interceptors.request.use(
  config => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Interceptor para manejar refresh token
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Lógica para refresh token
      // ...
    }
    return Promise.reject(error);
  }
);

export default api;
