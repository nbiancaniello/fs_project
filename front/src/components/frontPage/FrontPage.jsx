import { Container } from 'react-bootstrap';
import ProductsList from '../products/ProductsList';
import './FrontPage.css';

function FrontPage() {
   return (
      <Container className='frontPage-container'>
         <ProductsList filter={"isNewArrival"}/>
         <ProductsList filter={"isPromotion"}/>
      </Container>
   );
}

export default FrontPage;