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
      <form id='shopping-cart-user-details' noValidate data-validated={validated} onSubmit={handleFormSubmit} className="space-y-4 rounded-3xl border border-green-100 bg-white p-6 shadow-sm">
         <div>
            <label className="mb-1 block text-sm font-semibold text-green-900">Nombre</label>
            <input type="text" defaultValue={user.firstName} disabled className="w-full rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-green-950" />
         </div>
         <div>
            <label className="mb-1 block text-sm font-semibold text-green-900">Apellido</label>
            <input type="text" defaultValue={user.lastName} disabled className="w-full rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-green-950" />
         </div>
         <div>
            <label className="mb-1 block text-sm font-semibold text-green-900">Email</label>
            <input type="email" defaultValue={user.email} disabled className="w-full rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-green-950" />
         </div>
         <div>
            <label className="mb-1 block text-sm font-semibold text-green-900">Teléfono</label>
            <input type="text" defaultValue={user.phone} disabled className="w-full rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-green-950" />
         </div>
         <div key="option-delivery" className="flex flex-col gap-3 rounded-2xl border border-green-100 bg-green-50 p-4 sm:flex-row">
            <label className="inline-flex items-center gap-2 text-sm font-medium text-green-900">
               <input
                  name="option"
                  type="radio"
                  id="option-delivery"
                  checked={selectedOption === 'option-delivery'}
                  onChange={handleOptionChange}
                  className="h-4 w-4 border-green-300 text-green-700"
               />
               Enviar a Domicilio
            </label>
            <label className="inline-flex items-center gap-2 text-sm font-medium text-green-900">
               <input
                  name="option"
                  type="radio"
                  id="option-pickup"
                  checked={selectedOption === 'option-pickup'}
                  onChange={handleOptionChange}
                  className="h-4 w-4 border-green-300 text-green-700"
               />
               Retiro en local
            </label>
         </div>
         
         {selectedOption === 'option-delivery' && (
            <div>
               <label className="mb-1 block text-sm font-semibold text-green-900">Domicilio</label>
               <input type="text" defaultValue={user.address} disabled className="w-full rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-green-950" />   
            </div>
         )}
         
         <button id="shopping-cart-end-button" type="submit" className="inline-flex items-center rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800">Finalizar Compra</button>
      </form>
   );
} 

export default ShoppingCartUserDetails;