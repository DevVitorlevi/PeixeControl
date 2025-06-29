import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333', // ou URL da sua API online
});

export default api;
