/* eslint-disable react/prop-types */
import './Products.css';
import { Card } from 'react-bootstrap';
import Column from 'react-bootstrap/Col';
import ProductForm from './ProductForm';
import { Link } from 'react-router-dom';

 function ProductCard({_id, price, description, image, className, promotionPrice}) {
   return (
      <Column>
         <div className="product-card">
            <Card key={_id}>
               <Link to={`/products/${_id}`}><Card.Img className ="card-img" variant="top" src={image} /></Link>
               <Card.Body>
                  <Card.Title className='card-description'>{description}</Card.Title>
                  <Card.Text className={promotionPrice === 0 ? 'card-price' : 'card-price-through'}>$ {price}</Card.Text>
                  {promotionPrice > 0 && <Card.Text className='card-promotion-price'>$ {promotionPrice}</Card.Text>}
                  <ProductForm 
                     id={_id}
                     price={price}
                     description={description}
                     image={image}
                     className={className}
                     promotionPrice={promotionPrice}
                     />
               </Card.Body>
            </Card>
         </div>
      </Column>
   );
}

export default ProductCard;