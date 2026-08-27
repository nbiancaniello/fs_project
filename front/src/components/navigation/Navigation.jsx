import './Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCartShopping, faUser} from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../cart/CartProvider';
import {Link} from 'react-router-dom';
import { useState } from 'react';

function Navigation() {
   const { totalCost } = useCart();
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isProductsOpen, setIsProductsOpen] = useState(false);
   const [isAuthenticated, setIsAuthenticated] = useState(() => {
      // Cargar el estado de autenticación desde localStorage
      return localStorage.getItem('isAuthenticated') === 'true';
   });
   const [userInitials, setUserInitials] = useState(() => {
      // Cargar el estado de autenticación desde localStorage
      return localStorage.getItem('userInitials');
   })

   const closeMenu = () => {
      setIsMenuOpen(false);
      setIsProductsOpen(false);
   };

   return (
      <header className="navigation mb-2">
         <div className="nav-container mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
            <Link className='logo link text-2xl font-bold tracking-wide text-green-900' to="/" onClick={closeMenu}>AMA</Link>

            <div className="hidden items-center gap-4 lg:flex">
               <div className="relative">
                  <button
                     type="button"
                     className="nav-item-title inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-semibold text-green-900 shadow-sm transition hover:border-green-300 hover:bg-green-50"
                     onClick={() => setIsProductsOpen((open) => !open)}
                     aria-expanded={isProductsOpen}
                  >
                     Productos
                     <span className="text-xs">▾</span>
                  </button>
                  {isProductsOpen && (
                     <div className="absolute left-0 top-full z-20 mt-2 w-56 overflow-hidden rounded-2xl border border-green-100 bg-white shadow-lg">
                        <Link className="block px-4 py-3 text-sm text-green-900 transition hover:bg-green-50" to="/Products?filter=isPromotion" onClick={closeMenu}>Promociones</Link>
                        <Link className="block px-4 py-3 text-sm text-green-900 transition hover:bg-green-50" to="/Products?filter=isNewArrival" onClick={closeMenu}>Recién llegado</Link>
                        <div className="h-px bg-green-100" />
                        <Link className="block px-4 py-3 text-sm text-green-900 transition hover:bg-green-50" to="/Products/category/aceites" onClick={closeMenu}>Aceites</Link>
                        <Link className="block px-4 py-3 text-sm text-green-900 transition hover:bg-green-50" to="/Products/category/bebidas" onClick={closeMenu}>Bebidas</Link>
                        <Link className="block px-4 py-3 text-sm text-green-900 transition hover:bg-green-50" to="/Products/category/carniceria" onClick={closeMenu}>Carnicería</Link>
                        <Link className="block px-4 py-3 text-sm text-green-900 transition hover:bg-green-50" to="/Products/category/limpieza" onClick={closeMenu}>Limpieza</Link>
                     </div>
                  )}
               </div>
               {isAuthenticated && (
                  <Link className="nav-item-title rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-semibold text-green-900 shadow-sm transition hover:border-green-300 hover:bg-green-50" to="/orders" onClick={closeMenu}>Pedidos</Link>
               )}
            </div>

            <div className="hidden items-center gap-3 lg:flex">
               {isAuthenticated ? (
                  <>
                     <Link className='link' to="/shoppingCart" onClick={closeMenu}>
                        <span id="shop-cart" className="inline-flex items-center gap-2 rounded-full bg-green-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800">
                           <FontAwesomeIcon size="lg" icon={faCartShopping} />${totalCost}
                        </span>
                     </Link>
                     <Link className='link' to="/userProfile" onClick={closeMenu}>
                        <span id="user-profile" className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-semibold text-green-900 shadow-sm transition hover:border-green-300 hover:bg-green-50">
                           <FontAwesomeIcon size="lg" icon={faUser} />
                           {userInitials}
                        </span>
                     </Link>
                  </>
               ) : (
                  <>
                     <Link className='link' to="/login" onClick={closeMenu}>
                        <span id="user-login" className="inline-flex items-center rounded-full bg-green-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800">
                           Iniciar Sesión
                        </span>
                     </Link>
                     <Link className='link' to="/register" onClick={closeMenu}>
                        <span id="user-register" className="inline-flex items-center rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-semibold text-green-900 shadow-sm transition hover:border-green-300 hover:bg-green-50">
                           Registrarse
                        </span>
                     </Link>
                  </>
               )}
            </div>

            <button
               type="button"
               className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-green-200 bg-white text-green-900 shadow-sm transition hover:border-green-300 hover:bg-green-50 lg:hidden"
               onClick={() => setIsMenuOpen((open) => !open)}
               aria-expanded={isMenuOpen}
               aria-label="Abrir navegación"
            >
               <span className="text-xl">☰</span>
            </button>
         </div>

         {isMenuOpen && (
            <div className="fixed inset-0 z-30 lg:hidden">
               <button type="button" className="absolute inset-0 bg-black/30" onClick={closeMenu} aria-label="Cerrar navegación" />
               <div className="absolute right-0 top-0 h-full w-[min(20rem,88vw)] overflow-y-auto bg-white p-5 shadow-2xl">
                  <div className="mb-6 flex items-center justify-between">
                     <p className="text-lg font-bold text-green-900">Navegación</p>
                     <button type="button" className="rounded-full border border-green-200 px-3 py-1 text-sm text-green-900" onClick={closeMenu}>Cerrar</button>
                  </div>
                  <div className="space-y-3">
                     <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-2xl border border-green-100 px-4 py-3 text-left text-sm font-semibold text-green-900"
                        onClick={() => setIsProductsOpen((open) => !open)}
                        aria-expanded={isProductsOpen}
                     >
                        Productos
                        <span>▾</span>
                     </button>
                     {isProductsOpen && (
                        <div className="space-y-2 rounded-2xl border border-green-100 bg-green-50 p-2">
                           <Link className="block rounded-xl px-3 py-2 text-sm text-green-900 transition hover:bg-white" to="/Products?filter=isPromotion" onClick={closeMenu}>Promociones</Link>
                           <Link className="block rounded-xl px-3 py-2 text-sm text-green-900 transition hover:bg-white" to="/Products?filter=isNewArrival" onClick={closeMenu}>Recién llegado</Link>
                           <Link className="block rounded-xl px-3 py-2 text-sm text-green-900 transition hover:bg-white" to="/Products/category/aceites" onClick={closeMenu}>Aceites</Link>
                           <Link className="block rounded-xl px-3 py-2 text-sm text-green-900 transition hover:bg-white" to="/Products/category/bebidas" onClick={closeMenu}>Bebidas</Link>
                           <Link className="block rounded-xl px-3 py-2 text-sm text-green-900 transition hover:bg-white" to="/Products/category/carniceria" onClick={closeMenu}>Carnicería</Link>
                           <Link className="block rounded-xl px-3 py-2 text-sm text-green-900 transition hover:bg-white" to="/Products/category/limpieza" onClick={closeMenu}>Limpieza</Link>
                        </div>
                     )}
                     {isAuthenticated && (
                        <Link className="block rounded-2xl border border-green-100 px-4 py-3 text-sm font-semibold text-green-900" to="/orders" onClick={closeMenu}>Pedidos</Link>
                     )}
                  </div>

                  <div className="mt-6 space-y-3">
                     <a href="#" className="hidden" aria-hidden="true">.</a>
                     {isAuthenticated ? (
                        <>
                           <Link className='link block' to="/shoppingCart" onClick={closeMenu}>
                              <span id="shop-cart" className="flex items-center justify-center gap-2 rounded-full bg-green-700 px-4 py-3 text-sm font-semibold text-white shadow-sm">
                                 <FontAwesomeIcon size="lg" icon={faCartShopping} />${totalCost}
                              </span>
                           </Link>
                           <Link className='link block' to="/userProfile" onClick={closeMenu}>
                              <span id="user-profile" className="flex items-center justify-center gap-2 rounded-full border border-green-200 bg-white px-4 py-3 text-sm font-semibold text-green-900 shadow-sm">
                                 <FontAwesomeIcon size="lg" icon={faUser} />
                                 {userInitials}
                              </span>
                           </Link>
                        </>
                     ) : (
                        <>
                           <Link className='link block' to="/login" onClick={closeMenu}>
                              <span id="user-login" className="flex items-center justify-center rounded-full bg-green-700 px-4 py-3 text-sm font-semibold text-white shadow-sm">
                                 Iniciar Sesión
                              </span>
                           </Link>
                           <Link className='link block' to="/register" onClick={closeMenu}>
                              <span id="user-register" className="flex items-center justify-center rounded-full border border-green-200 bg-white px-4 py-3 text-sm font-semibold text-green-900 shadow-sm">
                                 Registrarse
                              </span>
                           </Link>
                        </>
                     )}
                  </div>
               </div>
            </div>
         )}
      </header>
   );
}

export default Navigation;