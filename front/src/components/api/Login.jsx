import { useState } from 'react';
import {api} from './api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import  './api.css';

const Login = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const {login} = useAuth();
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try{
         const response = await api.post('users/login', {username, password});
         const { userID, userInitials } = response.data;
         login(userID, userInitials); // Call the login after a successful login
         await getCart(userID);
         navigate('/');
         window.location.reload();
      } catch(err) {
         if (err.response && err.response.data) {
            alert('Error login user: ' + err.response.data);  // Show backend error message
         } else {
            alert('An error occurred during login.');  // Show a general error message if no response
         }
      }
   }

   const getCart = async (userID) => {
      try {
         const response = await api.get(`/carts/${userID}`);
         var data = response.data; // Extract data from the response
         console.log(data);
         // Ensure data.products exists and is an array
         if (data) {
            // localStorage.setItem("items", JSON.stringify(data.items.flatMap(itemObj => itemObj.items)));
            localStorage.setItem("items", JSON.stringify(data.items.flatMap(itemObj => itemObj.items)));
         } else {
            throw new Error('Data format is incorrect.'); // Check data structure
         }
      } catch (error) {
         console.error('Failed to fetch cart:', error);
      }
   };

return(
   <div className='input-container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
            <input type="text" 
            value={username}
            placeholder="Usuario"
            onChange={(e) => setUsername(e.target.value)} 
            required
            />
            <br></br>
            <br></br>
            <input type="password" 
            value={password}
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)} 
            required
            />
            <br></br>
            <br></br>
         <button type="submit">Login</button>
         <br></br>
         <br></br>
         <p>Sin cuenta de usuario? <strong><a className='register-link' onClick={() => navigate('/register')}>Registrate acá</a></strong></p>
      </form>
   </div>
)};

export default Login;