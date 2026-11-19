import React, { createContext, useContext, useState, useEffect } from 'react';
import { restaurantData } from '../data/restaurant';

const AuthContext = createContext();
const AUTH_STORAGE_KEY = 'subakes_owner_auth';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch (e) {
      return false;
    }
  });

  const [authError, setAuthError] = useState('');

  const login = (username, password) => {
    const creds = restaurantData.ownerCredentials;
    if (username.trim() === creds.username && password === creds.password) {
      setIsAuthenticated(true);
      setAuthError('');
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      } catch (e) {
        console.warn('Unable to persist auth state:', e);
      }
      return true;
    } else {
      setAuthError('Invalid credentials. Please use the demo credentials provided below.');
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.warn('Unable to remove auth state:', e);
    }
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      authError,
      setAuthError,
      credentials: restaurantData.ownerCredentials
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
