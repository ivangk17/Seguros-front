"use client";
import { useAuth } from '../../context/AuthContext';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const crearAsegurador = () => {
    router.push('/crearAsegurador');
  };

  const listarClientes = () => {
    router.push('/listarClientes');
  }

  if (!user) {
    return null;
  }
  return (
    <div className="welcome-container flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-black">Bienvenido</h1> 
      <p className="mb-4 text-black">Has iniciado sesión exitosamente.</p>
      
      <button 
        onClick={crearAsegurador}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Crear Asegurado
      </button>
      <button
        onClick={listarClientes}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Listar Clientes
      </button>
    </div>
  );
}