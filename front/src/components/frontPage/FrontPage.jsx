import ProductsList from '../products/ProductsList';
import './FrontPage.css';

function FrontPage() {
   return (
      <div className='frontPage-container mx-auto w-full max-w-7xl px-4'>
         <ProductsList filter={"isNewArrival"}/>
         <ProductsList filter={"isPromotion"}/>
      </div>
   );
}

export default FrontPage;