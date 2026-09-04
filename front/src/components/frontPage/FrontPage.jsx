import ProductsList from '../products/ProductsList';
import { useProducts } from '../products/ProductContext';
import './FrontPage.css';

function FrontPage() {
   const { newArrivals, promotions, loading } = useProducts();

   if (loading) return <p className="p-4 text-center">Cargando...</p>;

   return (
      <div className="frontPage-container mx-auto w-full max-w-7xl px-4">
         <ProductsList title="Nuevos Ingresos" items={newArrivals} />
         <ProductsList title="Promociones" items={promotions} />
      </div>
   );
}

export default FrontPage;