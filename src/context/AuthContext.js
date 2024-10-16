
"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [user, setUser] = useState(sessionStorage.getItem('user'));

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    const storedUser = sessionStorage.getItem('user');
    if (storedToken) {
      setToken(storedToken);
      setUser(storedUser);
    }
  }, [user, token]);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

