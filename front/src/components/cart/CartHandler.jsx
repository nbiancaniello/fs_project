import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import { useCart } from "./CartProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../api/AuthContext';
import './Cart.css';
import Alert from 'react-bootstrap/Alert'

// eslint-disable-next-line react/prop-types
function CartHandler({id, price, description, image, qty: initialQty, onQuantityChange, promotionPrice}) {
   const [qty, setQty] = useState(initialQty ||1);
   const { addItem, deleteItem } = useCart();
   const { isAuthenticated } = useAuth();
   const [showAlert, setShowAlert] = useState(false); 
   const [alertMessage, setAlertMessage] = useState('');
   const [alertVariant, setAlertVariant] = useState('success');

   useEffect(() => {
      // Initialize qty from local storage when the component mounts
      const savedItems = JSON.parse(localStorage.getItem("items")) || [];
      const item = savedItems.find(item => item.id === id);
      if (item) {
         setQty(item.qty);
      }
   }, [id]);

   const handleAddClick = (event) => {
      event.preventDefault(); // Prevent default form behavior
      if (isAuthenticated) {
         if (typeof addItem === 'function') {
            addItem(id, description, promotionPrice > 0 ? promotionPrice : price, qty, image);
            if (onQuantityChange) {
               onQuantityChange(qty);
            }
         } else {
            console.error('addItem is not a function');
         }
      } else {
         displayMessage('Debes iniciar sesión para agregar al carrito', 'success');
      }
   };

   const handleRemoveClick = (event) => {
      event.preventDefault(); // Prevent default form behavior
      if (isAuthenticated) {
         
      setQty(1);
      if (typeof deleteItem === 'function') {
         deleteItem(id);
         if (onQuantityChange) {
            onQuantityChange(0);
         }
      } else {
         console.error('deleteItem is not a function');
      }
      } else {
         displayMessage('Debes iniciar sesión para agregar al carrito', 'success');
      }
   };

   const handleQtyChange = (event) => {
      setQty(Number(event.target.value));
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
      <>
         {/* Display success/error alert */}
         {showAlert && (
            <Alert variant={alertVariant} className="fade show" role="alert">
               {alertMessage}
            </Alert>
         )}
      
         <Form>
            <div className="product-card-form-group">
               <Form.Control
                  type="number"
                  value={qty}
                  id="cart-qty"
                  min={1}
                  max={100}
                  onChange={handleQtyChange}
               />
            <div className="product-card-form-buttons">
               <Button className="btn btn-success cart-button" onClick={handleAddClick} >
                  <FontAwesomeIcon size="lg" icon={faCheck} />
               </Button>
               <Button className="btn btn-danger cart-button" onClick={handleRemoveClick} >
                  <FontAwesomeIcon size="lg" icon={faTrash} />
               </Button>
            </div>
            </div>
         </Form>
      </>
      
   );
}

export default CartHandler;