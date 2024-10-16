"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { handlerLogin } from "./handlerLogin";
import { useAuth } from '../../context/AuthContext';

export default function PageLogin() {
  const [error, setError] = useState(null);
  const { token, setToken, user, setUser } = useAuth();
  const [inicio, setInicio] = useState(false);
  const router = useRouter();

  useEffect(() => { 
    if (token) {
      router.push('/welcome');
    } 
  }, [token, inicio, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const usuario = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    await handlerLogin(usuario, setInicio, setError, setToken, setUser);
  };

  if (token) {
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="mx-auto my-36 flex h-[300px] w-[350px] flex-col border-2 bg-white text-black shadow-xl">
        <div className="mx-8 mt-7 mb-1 flex flex-row justify-start space-x-2">
          <div className="h-7 w-3 bg-[#0DE6AC]"></div>
          <div className="w-3 text-center font-sans text-xl font-bold"><h1>Login</h1></div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input 
            className="my-2 w-72 border p-2" 
            type="email" 
            name="email"
            placeholder="Username" 
            required
          />
          <input 
            className="my-2 w-72 border p-2" 
            type="password" 
            name="password"
            placeholder="Password" 
            required
          />
          <div className="my-2 flex justify-center">
            <button 
              type="submit"
              className="w-72 border bg-[#0DE6AC] p-2 font-sans"
            >
              Login
            </button>
          </div>
        </form>
        {error && (
          <div className="text-red-500 text-sm mt-2 text-center">
            {error}
          </div>
        )}
        <div className="mx-7 my-3 flex justify-between text-sm font-semibold">
          <div><h1>Forget Password</h1>
          </div>
        </div>
      </div>
    </div>
  );
}