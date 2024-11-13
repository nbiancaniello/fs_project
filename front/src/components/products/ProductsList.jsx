import './Products.css';
import ProductCard from './ProductCard';
import { Container, Row } from 'react-bootstrap';
import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {api, imgLocation} from '../api/api';

function ProductsList({ filter: propFilter }) {
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const location = useLocation();

   ProductsList.propTypes = {
      filter: PropTypes.string,
   };
   const getFilter = useCallback(() => {
      return propFilter || new URLSearchParams(location.search).get('filter') || null;
   }, [propFilter, location.search]);

   const fetchProducts = async (filter = null) => {
      try {
         const response = await api.get('/products');
         var data = response.data; // Extract data from the response
   
         // Ensure data.products exists and is an array
         if (data) {
            if (filter) {
               switch (filter) {
                  case 'isPromotion':
                     //data.products = data.products.filter(product => product.isPromotion);
                     data = data.filter(product => product.isPromotion);
                     break;
                  case 'isNewArrival':
                     data = data.filter(product => product.isNewArrival);
                     break;
                  default:
                     break;
               }
            }
            return data; // Return the filtered products
         } else {
            throw new Error('Data format is incorrect.'); // Check data structure
         }
      } catch (error) {
         console.error('Failed to fetch products:', error);
         return []; // Return an empty array or handle as needed
      }
   };
   
   useEffect(() => {
      const fetchFilteredProducts = async () => {
         const filter = getFilter();
         try {
            const data = await fetchProducts(filter);
            if (data) {
               setProducts(data);
               setLoading(false);
            }
         } catch (error) {
            console.error('Failed to fetch products:', error);
         }
      };

      fetchFilteredProducts();
   }, [getFilter, location.search, propFilter]);

   return (
      <>
         <h1 className="products-title">{getFilter() === "isNewArrival" ? "Nuevos Ingresos" : "Promociones"}</h1>
         <div className='products-list'>
            <Container>
               <Row xs={1} sm={2} md={2} lg={2} xl={3} xxl={3} className='g-4'>
                  {loading ? <p>Cargando...</p> : products.map((product) => (
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
               </Row>
            </Container>
         </div>
      </>
      
   );
}

export default ProductsList;