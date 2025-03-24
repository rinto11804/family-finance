import api from './api';

export const authService = {
  register: async (userData) => {
    const response = await api.post('/users/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/users/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
}; 