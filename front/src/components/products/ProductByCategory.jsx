import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import ProductCard from "./ProductCard";
import './Products.css';
import {api, imgLocation} from "../api/api";
function ProductByCategory() {
   const { category } = useParams();
   const [products, setProducts] = useState([]);
   const [error, setError] = useState(null);

   const fetchProductsByCategory = async (category) => {
      try {
         const response = await api.get(`/products/category/${category}`);
         return response.data;
   
      } catch (error) {
         console.error(error);
         return;
      }
   }

   useEffect(() => {
      const fetchProduct = async () => {
         try {
            const products = await fetchProductsByCategory(category)
            if (products.length > 0) {
               setProducts(products);
            } else {
               setError('No hay productos para esta categoría');
            }
         } catch (err) {
            setError(err.message);
         }
      };

      fetchProduct();
   }, [category]);

   if (error) {
      return <p>Error: {error}</p>;
   }
   if (!products.length) {
      return <p>Loading...</p>;
   }

   return (
      <>
         <h1 className="products-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
         <div className='products-list'>
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
               {products.map((product) => (
                  <ProductCard
                     key={product._id}
                     _id={product._id}
                     price={product.price}
                     description={product.description}
                     image={`${imgLocation}${product.image}`}
                     className={"product-card-add-button"}
                     promotionPrice={product.promotionPrice}
                  />
               ))
               }
            </div>
         </div>
      </>
      
   );
}

export default ProductByCategory;