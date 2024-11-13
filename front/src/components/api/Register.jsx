import { useState } from 'react';
import {api} from './api';
import { useNavigate } from 'react-router-dom';
import  './api.css';

const Register = () => {
   const[username, setUsername] = useState('');
   const[password, setPassword] = useState('');
   const[email, setEmail] = useState('');

   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try{
         await api.post('users/register', {username, password, email});
         navigate('/login');
         window.location.reload();
      } catch(err) {
         if (err.response && err.response.data) {
            alert('Error al registrar usuario: ' + err.response.data);  // Show backend error message
         } else {
            alert('Ocurrió un error al registrar tu usuario.');  // Show a general error message if no response
         }
      }
   }

return(
   <div className='input-container'>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
         <input type="text" 
         value={username}
         placeholder="Username"
         onChange={(e) => setUsername(e.target.value)} 
         required
         />
         <br></br>
         <br></br>
         <input type="password" 
         value={password}
         placeholder="Password"
         onChange={(e) => setPassword(e.target.value)} 
         required
         />
         <br></br>
         <br></br>
         <input type="email" 
         value={email}
         placeholder="Email"
         onChange={(e) => setEmail(e.target.value)} 
         required
         />
         <br></br>
         <br></br>
         <button type="submit">Registrar</button>
         <br></br>
         <br></br>
         <p>Ya estás registrado? <strong><a className='register-link' onClick={() => navigate('/login')}>Logueate acá</a></strong></p>
      </form>
   </div>
)};

export default Register;