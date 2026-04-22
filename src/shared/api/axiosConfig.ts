import axios from 'axios';

export interface ApiError {
  status: number;
  code: string;
  text: string;
}

export interface ApiErrorAuth {
  message: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://your-backend.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
