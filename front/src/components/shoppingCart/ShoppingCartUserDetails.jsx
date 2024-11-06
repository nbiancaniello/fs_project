import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useCart } from '../cart/CartProvider';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
function ShoppingCartUserDetails() {
   const [user, setUser] = useState(null);
   const [error, setError] = useState(null);
   const [selectedOption, setSelectedOption] = useState('option-delivery');
   const { emptyCart } = useCart();
   const [validated, setValidated] = useState(false);
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

   const handleFormSubmit = (event) => {
      const form = event.currentTarget;
      event.preventDefault();

      if (form.checkValidity() === false) {
         setValidated(true);
      } else {
         createOrder();
         emptyCart();
         navigate('/ShoppingCartConfirmation');
      }
   };
   
   const createOrder = async () => {
      try {
         await axios.post('http://localhost:5000/api/orders', {
            userID: localStorage.getItem('userID'),
            totalAmount: calculateTotal(),
            items: [
               JSON.parse(localStorage.getItem('items')) || [],
            ],
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
            required
         />
         <Form.Label>Apellido</Form.Label>
         <Form.Control
            type="text"
            defaultValue={user.lastName}
            disabled
            required
         />
         <Form.Label>Email</Form.Label>
         <Form.Control
            type="email"
            defaultValue={user.email}
            disabled
            required
         />
         <Form.Label>Teléfono</Form.Label>
         <Form.Control
            type="text"
            defaultValue={user.phone}
            disabled
            required
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
                  required
               />   
            </>
         )}
         
         <Button id="shopping-cart-end-button" type="submit">Finalizar Compra</Button>
      </Form>
   );
} 

export default ShoppingCartUserDetails;