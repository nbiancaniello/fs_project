import './User.css';
import { useEffect, useState } from 'react';
import {api} from '../api/api';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
   const [user, setUser] = useState(null);
   const [error, setError] = useState(null);
   const [validated, setValidated] = useState(false); 
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [address, setAddress] = useState('');
   const [showAlert, setShowAlert] = useState(false); 
   const [alertMessage, setAlertMessage] = useState('');
   const [alertVariant, setAlertVariant] = useState('success');
   const navigate = useNavigate();

   const fetchCustomerData = async (userID) => {
      try {
         const response = await api.get(`/users/${userID}`);
         return response.data;
      } catch (error) {
         console.error(error);
         return;
      }
   };

   useEffect(() => {
      const fetchUser = async () => {
         try {
            const data = await fetchCustomerData(localStorage.getItem('userID'))
            if (data) {
               setUser(data);
               setFirstName(data.firstName);
               setLastName(data.lastName);
               setEmail(data.email);
               setPhone(data.phone);
               setAddress(data.address);
            } else {
               setError('User not found');
            }
         } catch (err) {
            setError(err.message);
         }
      };

      fetchUser();
   }, []);

   if (error) {
      return <p>Error: {error}</p>;
   }

   if (!user) {
      return <p>Loading...</p>;
   }

   const handleFormSubmit = (event) => {
      const form = event.currentTarget;
      event.preventDefault();

      if (form.checkValidity() === false) {
         setValidated(true);
      } else {
         updateProfile();
         
      }
   };

   const updateProfile = async () => {
      try {
         const userID = localStorage.getItem('userID');
         await api.put(`/users/${userID}`, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            address: address,
         });
         displayMessage('Usuario actualizado con éxito', 'success');
      } catch (error) {
         console.error(error);
         displayMessage('Error al actualizar el usuario. Inténtalo de nuevo', 'danger');
      }
   };

   const handleLogout = async () => {
      await localStorage.clear();
      navigate('/');
      window.location.reload();
   };

   const displayMessage = (text, variant) => {
      setAlertMessage(text);
      setAlertVariant(variant);
      setShowAlert(true);

      setTimeout(() => {
         setShowAlert(false);
      }, 3000);
   }

   return (
      <div className='user-profile'>
         {/* Display success/error alert */}
         {showAlert && (
            <div className={`fade show mb-4 rounded-2xl border px-4 py-3 text-sm font-medium ${alertVariant === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-800'}`} role="alert">
               {alertMessage}
            </div>
         )}
         <h1>Detalles de usuario</h1>
         <form id='user-details' noValidate data-validated={validated} onSubmit={handleFormSubmit} className="space-y-4 rounded-3xl border border-green-100 bg-white p-6 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
               <div>
                  <label className="mb-1 block text-sm font-semibold text-green-900">Nombre</label>
                  <input
                     type="text"
                     placeholder="Nombre"
                     value={firstName}
                     onChange={(e) => setFirstName(e.target.value)}
                     required
                     className="w-full rounded-2xl border border-green-200 px-4 py-3 text-green-950 outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-100"
                  />
               </div>
               <div>
                  <label className="mb-1 block text-sm font-semibold text-green-900">Apellido</label>
                  <input
                     type="text"
                     placeholder="Apellido"
                     value={lastName}
                     onChange={(e) => setLastName(e.target.value)}
                     required
                     className="w-full rounded-2xl border border-green-200 px-4 py-3 text-green-950 outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-100"
                  />
               </div>
            </div>
            <div>
               <label className="mb-1 block text-sm font-semibold text-green-900">Email</label>
               <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-green-200 px-4 py-3 text-green-950 outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-100"
               />
            </div>
            <div>
               <label className="mb-1 block text-sm font-semibold text-green-900">Teléfono</label>
               <input
                  type="text"
                  placeholder="Teléfono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-green-200 px-4 py-3 text-green-950 outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-100"
               />
            </div>
            <div>
               <label className="mb-1 block text-sm font-semibold text-green-900">Domicilio</label>
               <input
                  type="text"
                  placeholder="Domicilio"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-green-200 px-4 py-3 text-green-950 outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-100"
               />
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
               <button type="submit" className="inline-flex items-center rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800">Guardar Cambios</button>
               <button type="button" onClick={handleLogout} className="inline-flex items-center rounded-full border border-green-200 bg-white px-6 py-3 text-sm font-semibold text-green-900 shadow-sm transition hover:border-green-300 hover:bg-green-50">Cerrar Sesión</button>
            </div>
         </form>
      </div>
   );
}

export default UserProfile;