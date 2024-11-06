import './ShoppingCart.css';
import ShoppingCartItem from './ShoppingCartItem';
import { useCart } from '../cart/CartProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShopSlash} from '@fortawesome/free-solid-svg-icons/faShopSlash';
import HorizontalRule from './HorizontalRule';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

const ShoppingCart = () => {
  const { items, totalCost } = useCart(); 

  return (
    <div className='shopping-cart'>
        <h2> Carrito de Compras </h2>
        {items.length === 0 &&
        <div className='empty-cart'>
          <FontAwesomeIcon size='10x' icon={faShopSlash} />
          <p>No hay items en el carrito</p>
        </div>}
        {items.map((item) => (
          <ShoppingCartItem key={item.id} id={item.id} description={item.description} price={item.price} qty={item.qty} image={item.image} />
        ))}
        {items.length !== 0 &&
        <div>
          <HorizontalRule/>
          <p className='shopping-cart-total'>Total: ${totalCost}</p>
          <Link to="/ShoppingCartUserDetails">
              <Button id="shopping-cart-accept-button" >Continuar Compra</Button>
          </Link>
          {/* <Button href='/ShoppingCartUserDetails' id='shopping-cart-accept-button'>Continuar Compra</Button> */}
        </div>
        }
    </div>
  );
};

export default ShoppingCart;