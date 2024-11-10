import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import './User.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
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
      const BASE_URL = `http://localhost:5000/api/users/${userID}`;
      try {
         const response = await axios.get(BASE_URL);
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
         await axios.put(`http://localhost:5000/api/users/${userID}`, {
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

   const handleLogout = () => {
      localStorage.clear();
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
            <Alert variant={alertVariant} className="fade show" role="alert">
               {alertMessage}
            </Alert>
         )}
         <Form id='user-details' noValidate validated={validated} onSubmit={handleFormSubmit}>
            <Form.Group as={Col} controlId="validationCustom01">
               <Form.Label>Nombre</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Nombre"
                  defaultValue={user.firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
               />
               <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="validationCustom02">
               <Form.Label>Apellido</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Apellido"
                  defaultValue={user.lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
               />
               <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
            </Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
               type="email"
               placeholder="Email"
               defaultValue={user.email}
               onChange={(e) => setEmail(e.target.value)}
                  required
               />
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
               type="text"
               placeholder="Teléfono"
               defaultValue={user.phone}
               onChange={(e) => setPhone(e.target.value)}
                  required
               />
            <Form.Label>Domicilio</Form.Label>
            <Form.Control
               type="text"
               placeholder="Domicilio"
               defaultValue={user.address}
               onChange={(e) => setAddress(e.target.value)}
                  required
            />
            <Button  id="user-profile-save" type="submit">Guardar Cambios</Button>
            <Button  id="user-logout" type="submit" onClick={handleLogout}>Cerrar Sesión</Button>
         </Form>
      </div>
   );
}

export default UserProfile;