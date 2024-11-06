import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(() => {
      // Cargar el estado de autenticación desde localStorage
      return localStorage.getItem('isAuthenticated') === 'true';
    });
   
   const login = (userID) => { 
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userID", userID);
   };

   const logout = () => {
      setIsAuthenticated(false);
      localStorage.removeItem("isAuthenticated");
   };

   return (
      <AuthContext.Provider value={{isAuthenticated, login, logout}}>
         {children}
      </AuthContext.Provider>
   )
};

export const useAuth = () => useContext(AuthContext);