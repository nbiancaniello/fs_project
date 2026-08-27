/* eslint-disable react/prop-types */
import CartHandler from '../cart/CartHandler';
import './ShoppingCart.css';
import { useEffect, useState } from 'react';

const ShoppingCartItem = ({ id, description, price, qty, image }) => {
   const[subtotal, setSubtotal] = useState(0);

   useEffect(() => {
      setSubtotal(parseFloat(price) * parseInt(qty));
   }, [price, qty]);

   const updateSubtotal = (qty) => {
      setSubtotal(parseFloat(price) * parseInt(qty));
   };

   return (
      <div className='cart-row'>
         <div className='cart-item flex items-center gap-4 rounded-2xl border border-green-100 bg-white p-4 shadow-sm' id={id}>
            <img src={image} alt={description} className='cart-img h-24 w-24 rounded-2xl object-cover'/>
            <p className='cart-description'>{description}</p>
            <CartHandler id={id} description={description} price={price} image={image} onQuantityChange={updateSubtotal} />
            <p className='cart-price'>$ {subtotal}</p>
         </div>
      </div>
   );
};

export default ShoppingCartItem;