/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';
import {api, imgLocation} from '../api/api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
   const [items, setItems] = useState(() => {
      try {
         const savedItems = JSON.parse(localStorage.getItem("items"));
         return savedItems || [];
      } catch (error) {
         console.error("Failed to parse Items from localStorage:", error);
         return [];
      }
   });

   useEffect(() => {
      try {
         localStorage.setItem("items", JSON.stringify(items));
      } catch (error) {
         console.error("Failed to save Items to localStorage:", error);
      }
   }, [items]);

   useEffect(() => {
      try {
         const storedItems = localStorage.getItem("items");
         if (storedItems) {
         const parsedItems = JSON.parse(storedItems);
         if (Array.isArray(parsedItems)) {
            const formattedItems = parsedItems.map(item => ({
               ...item,
               qty: parseFloat(item.qty) || 0, 
               price: parseFloat(item.price) || 0.0
               
            }));
   
            // Sort the products array by id
            const sortedItems = formattedItems.sort((a, b) => a.id - b.id);
            setItems(sortedItems);
         } else {
            console.error("Parsed items are not an array:", parsedItems);
         }
         }
      } catch (error) {
         console.error("Failed to load items from localStorage:", error);
      }
   }, []);

   const addItem = (id, description, price, qty, image) => {
      const updatedItems = [...items];
      const existingItemIndex = updatedItems.findIndex(item => item.id === id);
      // Remove the path from the image
      const regex = new RegExp(`^${imgLocation}`);
      image = image.replace(regex, '');
      if (existingItemIndex > -1) {
         updatedItems[existingItemIndex].qty = qty;
      } else {
         updatedItems.push({ id, description, price, qty, image });
      }
      setItems(updatedItems);
      localStorage.setItem("items", JSON.stringify(updatedItems));
      updateCart();
   };

   const deleteItem = (id) => {
      // setItems((currItems) => currItems.filter(item => item.id !== id));
      const updatedItems = items.filter(item => item.id !== id);
      setItems(updatedItems);
      localStorage.setItem("items", JSON.stringify(updatedItems));
      updateCart();
   };

   const totalCost = items.reduce((acc, item) => acc + item.price * item.qty, 0);

   const emptyCart = () => {
      setItems([]);
      localStorage.removeItem("items");
      updateCart();
   };

   // This will save the items to the database when the cart is updated
   const updateCart = async () => {
      try {
         const items = JSON.parse(localStorage.getItem('items')) || [];
         const userID = localStorage.getItem('userID');
         await api.put(`/carts/${userID}`, {
            items: items
         });
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <CartContext.Provider value={{ addItem, deleteItem, totalCost, items, emptyCart }}>
         {children}
      </CartContext.Provider>
   );
};
