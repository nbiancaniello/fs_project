import axios from 'axios';

export const api = axios.create({
   baseURL: 'https://fs-project-cr99.onrender.com/api',
});

export const imgLocation = 'https://fs-project-cr99.onrender.com/static/uploads/';
