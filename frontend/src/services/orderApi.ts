import axios from './api';

export const orderApi = {
  getAll: () => axios.get('/orders'),
  getById: (id: number) => axios.get(`/orders/${id}`),
  create: (data: any) => axios.post('/orders', data),
  updateStatus: (id: number, status: string) => axios.put(`/orders/${id}/status`, { status }),
  delete: (id: number) => axios.delete(`/orders/${id}`)
};
