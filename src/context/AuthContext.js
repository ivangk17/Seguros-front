"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [menu, setMenu] = useState([])
  const [role, setRole] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const api = process.env.NEXT_PUBLIC_URL_API;

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken !== token) {
      setToken(storedToken);
    }
  }, [token]);

  const validateToken = async () => {
    if (!token) return false;

    try {
      const url = `${api}test/validateToken`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data.valid;
    } catch (error) {
      return false;
    }
  };
  
  return (
    <AuthContext.Provider value={{ token, setToken, validateToken, menu, showLogoutModal, setShowLogoutModal, setRole, role, setMenu }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
