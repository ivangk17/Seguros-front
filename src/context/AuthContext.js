"use client";
import { createContext, useContext, useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [role, setRole] = useState(sessionStorage.getItem("role"));
  const router = useRouter();
  const api = process.env.NEXT_PUBLIC_URL_API;
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storeRole = sessionStorage.getItem("role");
    if (storedToken !== token || storeRole !== role) {
      setToken(storedToken);
      try {
        const decode = jwt.decode(token);
        setRole(decode.role);
        sessionStorage.setItem("role", role);
        sessionStorage.setItem("token", token);
      } catch (error) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
      }
    }
  }, [token, role]);

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
    <AuthContext.Provider
      value={{ token, setToken, validateToken, role, setRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
