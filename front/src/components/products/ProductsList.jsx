import './Products.css';
import ProductCard from './ProductCard';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { imgLocation } from '../api/api';
import { useProducts } from './ProductContext';

function ProductsList({ filter: propFilter, items: propItems, title: propTitle }) {
   const { products, loading } = useProducts();
   const location = useLocation();

   const filter = propFilter || new URLSearchParams(location.search).get('filter') || null;

   const displayProducts = propItems || (
      filter === 'isPromotion'
         ? products.filter(p => p.isPromotion)
         : filter === 'isNewArrival'
            ? products.filter(p => p.isNewArrival)
            : products
   );

   const title = propTitle || (
      filter === 'isNewArrival'
         ? 'Nuevos Ingresos'
         : filter === 'isPromotion'
            ? 'Promociones'
            : 'Productos'
   );

   return (
      <>
         <h1 className="products-title">{title}</h1>
         <div className='products-list'>
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
               {loading && !propItems ? (
                  <p>Cargando...</p>
               ) : (
                  displayProducts.map((product) => (
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
               )}
            </div>
         </div>
      </>
   );
}

ProductsList.propTypes = {
   filter: PropTypes.string,
   items: PropTypes.array,
   title: PropTypes.string,
};

export default ProductsList;