import axios from 'axios';

export const api = axios.create({
   baseURL: 'http://localhost:5000/api',
});

export const imgLocation = 'http://localhost:5000/static/uploads/';