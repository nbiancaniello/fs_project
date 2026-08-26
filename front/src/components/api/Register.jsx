import { useState } from 'react';
import { api } from './api';
import { useNavigate } from 'react-router-dom';
import './api.css';

const Register = () => {
   const [formData, setFormData] = useState({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: ''
   });
   const [errors, setErrors] = useState({});
   const [isLoading, setIsLoading] = useState(false);
   const navigate = useNavigate();

   const validateForm = () => {
      const newErrors = {};
      
      if (!formData.username.trim()) {
         newErrors.username = 'El usuario es requerido';
      }
      
      if (!formData.password) {
         newErrors.password = 'La contraseña es requerida';
      } else if (formData.password.length < 6) {
         newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      }
      
      if (!formData.email) {
         newErrors.email = 'El email es requerido';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
         newErrors.email = 'Email inválido';
      }
      
      if (!formData.phone.trim()) {
         newErrors.phone = 'El teléfono es requerido';
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
         newErrors.phone = 'Teléfono inválido (debe tener 10 dígitos)';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
         ...prev,
         [name]: value
      }));
      // Clear error when user starts typing
      if (errors[name]) {
         setErrors(prev => ({
            ...prev,
            [name]: ''
         }));
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!validateForm()) {
         return;
      }

      setIsLoading(true);
      try {
         await api.post('users/register', formData);
         navigate('/login');
         alert('Usuario registrado con éxito');
      } catch (err) {
         const errorMessage = err.response?.data || 'Ocurrió un error al registrar tu usuario.';
         setErrors(prev => ({
            ...prev,
            submit: errorMessage
         }));
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className='input-container'>
         <h1>Registro</h1>
         <form onSubmit={handleSubmit}>
            {errors.submit && <div className="error-message">{errors.submit}</div>}
            
            <div className="form-group">
               <input
                  type="text"
                  name="username"
                  value={formData.username}
                  placeholder="Usuario"
                  onChange={handleChange}
                  className={errors.username ? 'error' : ''}
               />
               {errors.username && <span className="error-text">{errors.username}</span>}
            </div>

            <div className="form-group">
               <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="Contraseña"
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
               />
               {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-group">
               <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  placeholder="Nombre"
                  onChange={handleChange}
               />
            </div>

            <div className="form-group">
               <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  placeholder="Apellido"
                  onChange={handleChange}
               />
            </div>

            <div className="form-group">
               <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Email"
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
               />
               {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
               <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  placeholder="Teléfono"
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
               />
               {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            <div className="form-group">
               <input
                  type="text"
                  name="address"
                  value={formData.address}
                  placeholder="Dirección"
                  onChange={handleChange}
               />
            </div>

            <button 
               type="submit" 
               disabled={isLoading}
               className={isLoading ? 'loading' : ''}
            >
               {isLoading ? 'Registrando...' : 'Registrar'}
            </button>

            <p>
               ¿Ya estás registrado?{' '}
               <strong>
                  <a className='register-link' onClick={() => navigate('/login')}>
                     Logueate acá
                  </a>
               </strong>
            </p>
         </form>
      </div>
   );
};

export default Register;