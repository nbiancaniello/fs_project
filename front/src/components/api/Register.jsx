import { useState } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
   const[username, setUsername] = useState('');
   const[password, setPassword] = useState('');

   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try{
         await api.post('users/register', {username, password});
         navigate('/login');
         window.location.reload();
      } catch(err) {
         alert('Error registering user: ', err.response.data);
      }
   }

return(
   <div>
      <h1>Register</h1>
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
         <button type="submit">Register</button>
      </form>
   </div>
)};

export default Register;