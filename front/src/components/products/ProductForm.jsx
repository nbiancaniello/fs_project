import { useState } from "react";
import { Button } from "react-bootstrap";
import CartHandler from '../cart/CartHandler';
import { useAuth } from '../api/AuthContext';

// eslint-disable-next-line react/prop-types
function ProductForm({id, price, description, image, className, promotionPrice}) {
   const [visible, setVisible] = useState(false);
   const { isAuthenticated } = useAuth();

   const handleClickbAddRemoveButton = () => {
      setVisible(!visible);
   };

   const handleVisibilityChange = () => {
      // Optionally adjust visibility or quantity based on actions
      setVisible(false); // For example, hide after add
   };

   return (
      <>
         {isAuthenticated && (
            <div className="product-card-form">
            {!visible && (
               <Button variant="none" className={className} onClick={handleClickbAddRemoveButton}>
                  Agregar al carrito
               </Button>
            )
            }

            {visible && (
               <CartHandler id={id} description={description} price={price} image={image} onQuantityChange={handleVisibilityChange} promotionPrice={promotionPrice}/>

            )}   
            </div>
         )}
      </>
      
   );
}

export default ProductForm;