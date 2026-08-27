/* eslint-disable react/prop-types */
import './Products.css';
import ProductForm from './ProductForm';
import { Link } from 'react-router-dom';

 function ProductCard({_id, price, description, image, className, promotionPrice}) {
   return (
      <div className="product-card">
         <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
            <Link to={`/Products/${_id}`} className="block overflow-hidden">
               <img className="card-img h-56 w-full object-cover" src={image} alt={description} />
            </Link>
            <div className="flex flex-1 flex-col gap-3 p-4">
               <h3 className='card-description text-lg font-semibold text-green-950'>{description}</h3>
               <p className={promotionPrice === 0 ? 'card-price text-base font-semibold text-green-800' : 'card-price-through text-base font-semibold text-green-800 line-through'}>$ {price}</p>
               {promotionPrice > 0 && <p className='card-promotion-price text-base font-bold text-emerald-700'>$ {promotionPrice}</p>}
               <ProductForm 
                  id={_id}
                  price={price}
                  description={description}
                  image={image}
                  className={className}
                  promotionPrice={promotionPrice}
                  />
            </div>
         </article>
      </div>
   );
}

export default ProductCard;