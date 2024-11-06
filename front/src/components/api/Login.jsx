import { useState } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';

const Login = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const {login} = useAuth();
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try{
         const response = await api.post('users/login', {username, password});
         const { userID } = response.data;
         login(userID); // Call the login after a successful login
         getCart(userID);
         navigate('/');
         window.location.reload();
      } catch(err) {
         alert('Error login user: ', err.response.data);
      }
   }

   const getCart = async (userID) => {
      const BASE_URL = `http://localhost:5000/api/carts/${userID}`;
      try {
         const response = await axios.get(BASE_URL); // Use axios to get data
         var data = response.data; // Extract data from the response
   
         // Ensure data.products exists and is an array
         if (data) {
            localStorage.setItem("items", JSON.stringify(data.items));            
         } else {
            throw new Error('Data format is incorrect.'); // Check data structure
         }
      } catch (error) {
         console.error('Failed to fetch cart:', error);
      }
   };

return(
   <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
            <input type="text" 
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)} 
            required
            />
            <input type="password" 
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} 
            required
            />
         <button type="submit">Login</button>
         <br></br>
         <br></br>
         <button onClick={() => navigate('/register')}>Register</button>
      </form>
   </div>
)};

export default Login;