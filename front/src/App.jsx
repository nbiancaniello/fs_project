import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Navigation from './components/navigation/Navigation'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import FrontPage from './components/frontPage/FrontPage'
import Orders from './components/orders/Orders';
import UserProfile from './components/user/UserProfile'
import ShoppingCart from './components/shoppingCart/ShoppingCart'
import ProductsList from './components/products/ProductsList'
import ProductById from './components/products/ProductById'
import ShoppingCartUserDetails from './components/shoppingCart/ShoppingCartUserDetails'
import ShoppingCartConfirmation from './components/shoppingCart/ShoppingCartConfirmation'
import ProductByCategory from './components/products/ProductByCategory'
import Login from './components/api/Login'
import Register from './components/api/Register'
import ProtectedRoute from './components/api/ProtectedRoute'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <main className='main-content'>
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/shoppingCart" element={<ProtectedRoute element={<ShoppingCart />} />} />
            <Route path="/Products" element={<ProductsList />} />
            <Route path="/Products/:id" element={<ProductById />} />
            <Route path="/Products/category/:category" element={<ProductByCategory />} />
            <Route path="/orders" element={<ProtectedRoute element={<Orders />} />} />
            <Route path="/userProfile" element={<ProtectedRoute element={<UserProfile />} />}/>
            <Route path="/ShoppingCartUserDetails" element={<ProtectedRoute element={<ShoppingCartUserDetails />} />} />
            <Route path="/ShoppingCartConfirmation" element={<ProtectedRoute element={<ShoppingCartConfirmation />} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
