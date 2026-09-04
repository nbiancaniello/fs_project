import axios from 'axios';

export const api = axios.create({
   //baseURL: 'https://fs-project-cr99.onrender.com/api',
   baseURL: 'http://localhost:5001/api',
});

//export const imgLocation = 'https://fs-project-cr99.onrender.com/static/uploads/';
export const imgLocation = 'http://localhost:5001/static/uploads/';
