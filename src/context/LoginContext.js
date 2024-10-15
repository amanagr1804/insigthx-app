import React, { createContext, useContext, useState } from 'react';

// Create a context for login state
const LoginContext = createContext();

// Create a provider component
export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwtToken, setJwtToken] = useState(null);

  const login = (token) => {
    setIsLoggedIn(true);
    setJwtToken(token);
    localStorage.setItem('jwtToken', token); // Save token in localStorage
  };

  const logout = () => {
    setIsLoggedIn(false);
    setJwtToken(null);
    localStorage.removeItem('jwtToken');
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, jwtToken, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook to use the login context
export const useLogin = () => {
  return useContext(LoginContext);
};
