import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/',
});


api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // ou onde você guardar o token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
