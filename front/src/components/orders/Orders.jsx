import { useState, useEffect } from "react";
import {api, imgLocation} from "../api/api";
import './Orders.css';

function Orders() {
   const [orders, setOrders] = useState([]);
   const [error, setError] = useState(null);
   const fetchOrdersByUsername = async (userID) => {
      try {
         const response = await api.get(`/orders/${userID}`);
         return response.data;
      } catch (error) {
         console.error(error);
         return;
      }
   };

   useEffect(() => {
      const fetchProduct = async () => {
         try {
            const data = await fetchOrdersByUsername(localStorage.getItem('userID'))
            if (data) {
               setOrders(data);
            } else {
               setError('Orders not found');
            }
         } catch (err) {
            setError(err.message);
         }
      };

      fetchProduct();
   }, []);

   if (error) {
      return <p>Error: {error}</p>;
   }

   if (!orders) {
      return <p>Loading...</p>;
   }

   const formatDate = (dateString) => {
      const date = new Date(dateString);
      
      // Get day, month, year, hours, and minutes
      const day = String(date.getUTCDate()).padStart(2, '0');
      const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const year = date.getUTCFullYear();
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');

      return `${day}/${month}/${year} ${hours}:${minutes}`;
   };

   return (
      <>
      <div className='orders-container'>
         
         {orders.length === 0 &&
         <div className='empty-orders'>
            {/* <FontAwesomeIcon size='10x' icon={faShopSlash} /> */}
            <p>Aún no tienes órdenes</p>
         </div>}
         {orders.length !== 0 && <h2>Órdenes</h2>}
         {orders.map((order) => (
            <div key={order._id} className='order-row'>
               <p className="order-row-label">#{order.orderID} - Fecha: {formatDate(order.dateIssued)}</p>
               {order.items && order.items.length > 0 ? ( // Check if items array exists
                  order.items.map((item) => (
                        <div key={item.id} className='order-item-row'>
                           <p>{item.description}</p>
                           <p>Cant: {item.qty}</p>
                           <p>${item.price}</p>
                           {item.image && <img src={`${imgLocation}${item.image}`}alt={item.description} />}
                        </div>
                     ))
                  
               ) : (
               <p>No items in this order.</p>
               )}
               <p className="order-row-label">Total: ${order.totalAmount}</p>
            </div>
         ))}
      </div>
      </>
      
   );
}

export default Orders;