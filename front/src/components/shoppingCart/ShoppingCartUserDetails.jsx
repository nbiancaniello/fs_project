import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useCart } from '../cart/CartProvider';
import { useNavigate } from 'react-router-dom';
import {api} from '../api/api';

function ShoppingCartUserDetails() {
   const [user, setUser] = useState(null);
   const [error, setError] = useState(null);
   const [orderID, setOrderID] = useState('');
   const [selectedOption, setSelectedOption] = useState('option-delivery');
   const { emptyCart } = useCart();
   const [validated, setValidated] = useState(false);
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
            } else {
               setError('User not found');
            }
         } catch (err) {
            setError(err.message);
         }
      };

      fetchUser();
   }, []);

   const handleOptionChange = (event) => {
      setSelectedOption(event.target.id);
   };

   // UseEffect to trigger after orderID is set
   useEffect(() => {
      if (orderID) {
         // When orderID is set, call the functions that need it
         createOrder();
         sendEmail();
         emptyCart();  // Empty the cart
         navigate('/ShoppingCartConfirmation');
      }
   }, [orderID]);  // Depend on orderID to trigger this effect

   const handleFormSubmit = (event) => {
      const form = event.currentTarget;
      event.preventDefault();

      if (form.checkValidity() === false) {
         setValidated(true);
      } else {
         const now = new Date();
         const formattedDate = now.getFullYear().toString().slice(-2) + 
               (now.getMonth() + 1).toString().padStart(2, '0') + 
               now.getDate().toString().padStart(2, '0') + 
               now.getHours().toString().padStart(2, '0') + 
               now.getMinutes().toString().padStart(2, '0') + 
               now.getSeconds().toString().padStart(2, '0');
         setOrderID(user.firstName.charAt(0) + user.lastName.charAt(0) + formattedDate);
      }
   };
   
   const createOrder = async () => {
      try {
         await api.post('/orders', {
            orderID: orderID,
            userID: localStorage.getItem('userID'),
            totalAmount: calculateTotal(),
            items: JSON.parse(localStorage.getItem('items')) || [],
            deliveryOption: selectedOption
         });
      } catch (error) {
         console.error(error);
      }
   };

   const calculateTotal = () => {
      const items = JSON.parse(localStorage.getItem('items')) || [];
      const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);
      return total;
   };

   const sendEmail = async () => {
      try {
         const response = await api.post(`/mail/sendEmail`, {
            orderID : orderID, 
            firstName: user.firstName, 
            lastName: user.lastName,
            items: JSON.parse(localStorage.getItem('items')) || [],
            total : calculateTotal(), 
            email: user.email,
            address: selectedOption === 'option-delivery' ? user.address : ""
         });
         return response.data;
      } catch (error) {
         console.error(error);
         return;
      }
   };

   if (error) {
      return <p>Error: {error}</p>;
   }

    // Wait until user data is fetched
   if (!user) {
      return <p>Loading...</p>;
   }

   return (
      <Form id='shopping-cart-user-details' noValidate validated={validated} onSubmit={handleFormSubmit}>
         <Form.Label>Nombre</Form.Label>
         <Form.Control
            type="text"
            defaultValue={user.firstName}
            disabled
         />
         <Form.Label>Apellido</Form.Label>
         <Form.Control
            type="text"
            defaultValue={user.lastName}
            disabled
         />
         <Form.Label>Email</Form.Label>
         <Form.Control
            type="email"
            defaultValue={user.email}
            disabled
         />
         <Form.Label>Teléfono</Form.Label>
         <Form.Control
            type="text"
            defaultValue={user.phone}
            disabled
         />
         <div key="option-delivery" className="mb-3">
            <Form.Check 
               inline
               name="option"
               type="radio"
               id="option-delivery"
               checked={selectedOption === 'option-delivery'}
               label="Enviar a Domicilio"
               onChange={handleOptionChange}
            />
            <Form.Check
               inline
               name="option"
               type="radio"
               id="option-pickup"
               checked={selectedOption === 'option-pickup'}
               label="Retiro en local"
               onChange={handleOptionChange}
            />
         </div>
         
         {selectedOption === 'option-delivery' && (
            <>
               <Form.Label>Domicilio</Form.Label>
               <Form.Control
                  type="text"
                  defaultValue={user.address}
                  disabled
               />   
            </>
         )}
         
         <Button id="shopping-cart-end-button" type="submit">Finalizar Compra</Button>
      </Form>
   );
} 

export default ShoppingCartUserDetails;