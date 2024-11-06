import './Navigation.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCartShopping, faUser, faRightToBracket, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useCart } from '../cart/CartProvider';
import {Link} from 'react-router-dom';
import { useState } from 'react';

function Navigation() {
   const { totalCost } = useCart();
   const [isAuthenticated, setIsAuthenticated] = useState(() => {
      // Cargar el estado de autenticación desde localStorage
      return localStorage.getItem('isAuthenticated') === 'true';
   });

   return (
      <Navbar expand="lg" className=" mb-2 navigation">
         <Container className="nav-container" fluid>
            <Navbar.Brand><Link className='link' to="/">Autoservicio Miguel Angel</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <Navbar.Offcanvas
               id="offcanvasNavbar"
               aria-labelledby="offcanvasNavbarLabel"
               placement="end"
            >
               <Offcanvas.Header closeButton>
                  <Offcanvas.Title id="offcanvasNavbarLabel">
                     Navegación
                  </Offcanvas.Title>
               </Offcanvas.Header>
               <Offcanvas.Body>
                  <Nav className="justify-content-flex-start flex-grow-1 pe-3">
                     <NavDropdown title="Productos" id="offcanvasNavbarDropdown">
                        <NavDropdown.Item as={Link} to="/Products?filter=isPromotion">Promociones</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/Products?filter=isNewArrival">Recién llegado</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to="/Products/category/aceites">Aceites</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/Products/category/bebidas">Bebidas</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/Products/category/carniceria">Carnicería</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/Products/category/limpieza">Limpieza</NavDropdown.Item>
                     </NavDropdown>
                     <Nav.Link as={Link} to="/orders">Pedidos</Nav.Link>
                  </Nav>
                  <Form className="d-flex">
                     <Form.Control
                        disabled
                        type="search"
                        placeholder="Buscar"
                        className="me-2"
                        aria-label="Search"
                     />
                     <Button disabled id="search-button" /*variant="outline-success"*/>
                        <FontAwesomeIcon size="lg" icon={faMagnifyingGlass} />
                     </Button>
                  </Form>
                  <Link className='link' to="/shoppingCart">
                     <Button id="shop-cart" >
                        <FontAwesomeIcon size="lg" icon={faCartShopping} />${totalCost}
                     </Button>
                  </Link>
                  {isAuthenticated ? (
                     <Link className='link' to="/userProfile">
                        <Button id="user-profile" >
                           <FontAwesomeIcon size="lg" icon={faAddressCard} />
                        </Button>
                     </Link>
                  ) : (
                     <>
                     <Link className='link' to="/login">
                        <Button id="user-profile" >
                           <FontAwesomeIcon size="lg" icon={faRightToBracket} />
                        </Button>
                     </Link>
                     <Link className='link' to="/register">
                        <Button id="user-profile" >
                           <FontAwesomeIcon size="lg" icon={faUser} />
                        </Button>
                     </Link>
                     </>
                  )}
                  {/* <Link className='link' to="/userProfile">
                     <Button id="user-profile" >
                        <FontAwesomeIcon size="lg" icon={faUser} />
                     </Button>
                  </Link> */}
               </Offcanvas.Body>
            </Navbar.Offcanvas>
         </Container>
      </Navbar>
   );
}

export default Navigation;