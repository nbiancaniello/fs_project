/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import ProductForm from './ProductForm';
import './Products.css';
import axios from 'axios';

function ProductById() {
   const { id } = useParams();
   const [product, setProduct] = useState(null);
   const [error, setError] = useState(null);

   const fetchProductsById = async (id) => {
      const BASE_URL = `http://localhost:5000/api/products/${id}`;
      try {
         const response = await axios.get(BASE_URL);
         return response.data;
   
      } catch (error) {
         console.error(error);
         return;
      }
   }

   useEffect(() => {
      const fetchProduct = async () => {
         try {
            const data = await fetchProductsById(id)
            if (data) {
               setProduct(data);
            } else {
               setError('Product not found');
            }
         } catch (err) {
            setError(err.message);
         }
      };

      fetchProduct();
   }, [id]);

   if (error) {
      return <p>Error: {error}</p>;
   }

   if (!product) {
      return <p>Loading...</p>;
   }

   return (
         <div className="product-details">
            <div className="product-details-image">
               <img src={`/products/img/${product.image}`} alt={product.description} />
            </div>
            <div className="product-details-info">
               <h1 className="product-details-info-title">{product.description}</h1>
               <div className="product-details-info-prices">
                  <p>Precio Regular:</p><p className={`product-details-info-price ${product.isPromotion && 'product-details-info-price-through'}`}>${product.price}</p>
                  <p className="product-details-info-discount">{product.isPromotion && ( <>${product.promotionPrice}</>)}</p>
               </div>
               <ProductForm 
                  _id={product._id}
                  price={product.price}
                  description={product.description}
                  image={product.image}
                  className={"product-details-info-button"}
                  />   
            </div>
         </div>
   );
}

export default ProductById;