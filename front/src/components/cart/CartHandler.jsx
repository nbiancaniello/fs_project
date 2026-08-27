import { useState, useEffect } from "react";
import { useCart } from "./CartProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Cart.css';

// eslint-disable-next-line react/prop-types
function CartHandler({id, price, description, image, qty: initialQty, onQuantityChange, promotionPrice}) {
   const [qty, setQty] = useState(initialQty ||1);
   const { addItem, deleteItem } = useCart();

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
      if (typeof addItem === 'function') {
         addItem(id, description, promotionPrice > 0 ? promotionPrice : price, qty, image);
         if (onQuantityChange) {
            onQuantityChange(qty);
         }
      } else {
         console.error('addItem is not a function');
      }
   };

   const handleRemoveClick = (event) => {
      event.preventDefault(); // Prevent default form behavior
      setQty(1);
      if (typeof deleteItem === 'function') {
         deleteItem(id);
         if (onQuantityChange) {
            onQuantityChange(0);
         }
      } else {
         console.error('deleteItem is not a function');
      }      
   };

   const handleQtyChange = (event) => {
      setQty(Number(event.target.value));
   };

   return (
      <>      
         <div className="product-card-form-group flex items-center gap-3">
               <input
                  type="number"
                  value={qty}
                  id="cart-qty"
                  min={1}
                  max={100}
                  onChange={handleQtyChange}
                  className="w-20 rounded-xl border border-green-200 px-3 py-2 text-center text-sm font-semibold text-green-950 outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-100"
               />
            <div className="product-card-form-buttons flex gap-2">
               <button type="button" className="cart-button inline-flex h-11 w-11 items-center justify-center rounded-full bg-green-700 text-white shadow-sm transition hover:bg-green-800" onClick={handleAddClick}>
                  <FontAwesomeIcon size="lg" icon={faCheck} />
               </button>
               <button type="button" className="cart-button inline-flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white shadow-sm transition hover:bg-red-700" onClick={handleRemoveClick}>
                  <FontAwesomeIcon size="lg" icon={faTrash} />
               </button>
            </div>
         </div>
      </>
      
   );
}

export default CartHandler;