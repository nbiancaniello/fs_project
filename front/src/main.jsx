import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './components/cart/CartProvider.jsx'
import { AuthProvider } from './components/api/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
)
