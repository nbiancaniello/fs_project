import axios from 'axios';

export const api = axios.create({
   baseURL: 'https://fs-project-cr99.onrender.com/api',
   // baseURL: 'https://localhost:5000/api',
});

export const imgLocation = 'https://fs-project-cr99.onrender.com/static/uploads/';
// export const imgLocation = 'https://localst:5000/static/uploads/';
