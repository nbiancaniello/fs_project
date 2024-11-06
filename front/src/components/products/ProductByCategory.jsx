import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Container, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";
import './Products.css';
import axios from 'axios';

function ProductByCategory() {
   const { category } = useParams();
   const [products, setProducts] = useState([]);
   const [error, setError] = useState(null);

   const fetchProductsByCategory = async (category) => {
      const BASE_URL = `http://localhost:5000/api/products/category/${category}`;
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
   if (!products.length === 0) {
      return <p>Loading...</p>;
   }

   return (
      <div className='products-list'>
         <h1 className="products-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
         <Container>
            <Row>
               {products.map((product) => (
                  <ProductCard
                     key={product._id}
                     _id={product._id}
                     price={product.price}
                     description={product.description}
                     image={`/products/img/${product.image}`}
                     className={"product-card-add-button"}
                     promotionPrice={product.promotionPrice}
                  />
               ))
               }
            </Row>
         </Container>
      </div>
   );
}

export default ProductByCategory;