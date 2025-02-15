import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if a session exists in localStorage
    const userSession = localStorage.getItem('userSession');
    // If session exists, set isLoggedIn to true
    if (userSession) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Handle login by saving the session in localStorage and updating state
  const handleLogin = (session) => {
    localStorage.setItem('userSession', JSON.stringify(session));
  };

  // Handle logout by removing session from localStorage and updating state
  const handleLogout = () => {
    localStorage.removeItem('userSession');
    setIsLoggedIn(false);
    toast.success('Logged out');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
