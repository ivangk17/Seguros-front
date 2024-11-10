"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScreenLoader from "@/app/componentes/ScreenLoader";
import { validarContraseña } from "@/app/componentes/modals/validaciones/validaciones";



export default function PaginaRecuperacionContrasenia() {
  const api = process.env.NEXT_PUBLIC_URL_API;
  const [errores, setErrores] = useState({});
  const [contrasenia, setContrasenia] = useState('');
  const [confirmacionContrasenia, setConfirmacionContrasenia] = useState('');
  const [cargando, setCargando] = useState(false);

  

  const MSG_ERROR_CONTRASENIA_VACIA = "La contraseña no puede estar vacía."
  const MSG_ERROR_CONTRASENIA_CARACTERES = "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un signo."
  const MSG_ERROR_CONTRASENIAS_NO_COINCIDEN = "Las contraseñas no coinciden."
  const MSG_ERROR_CAMBIO_EXITOSO = "La contraseña se cambio correctamente, puede cerrar esta pestaña."


  const handleCambioContrasenia = async (event) => {
    event.preventDefault();
    const token = new URLSearchParams(window.location.search).get('token');
    
    if (contrasenia === "" || confirmacionContrasenia === "") {
      setErrores({ submit: MSG_ERROR_CONTRASENIA_VACIA });
    } else if (!validarContraseña(contrasenia)) {
      setErrores({ submit: MSG_ERROR_CONTRASENIA_CARACTERES });
    } else if (contrasenia !== confirmacionContrasenia) {
      setErrores({ submit: MSG_ERROR_CONTRASENIAS_NO_COINCIDEN });
    } else {
      setCargando(true);
      try {
        const url = `${api}resetPassword/${token}`;
  
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newPass: contrasenia, confirmPassword: confirmacionContrasenia }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.error);
        }
  
        toast.success(MSG_ERROR_CAMBIO_EXITOSO);
      } catch (error) {
        setErrores({ submit: error.message });
      } finally {
        setCargando(false);
      }
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {cargando && <ScreenLoader />}
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="mx-auto my-36 flex h-auto w-[400px] flex-col border-2 bg-white text-black shadow-xl">
        <div className="mx-8 mt-7 mb-3 flex flex-row justify-start space-x-2">
          <div className="h-7 w-3 bg-[#0DE6AC]"></div>
          <div className="w-3 text-center font-sans text-xl font-bold">
            <h1>Cambio de Contraseña</h1>
          </div>
        </div>
        <form onSubmit={handleCambioContrasenia} className="flex flex-col items-center">
          <div className="my-2 w-72">
            <input
              type="password"
              placeholder="Nueva Contraseña"
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
              className="mb-4 px-4 py-2 border rounded w-full"
            />
          </div>
          <div className="my-2 w-72">
            <input
              type="password"
              placeholder="Confirmar Contraseña"
              value={confirmacionContrasenia}
              onChange={(e) => setConfirmacionContrasenia(e.target.value)}
              className="mb-4 px-4 py-2 border rounded w-full"
            />
          </div>
          <div className="my-2 flex justify-center">
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Restablecer Contraseña
              </span>
            </button>
          </div>
        </form>
        {errores.submit && (
          <small className="text-red-500 text-xs italic mt-1 text-center">
            {errores.submit}
          </small>
        )}
      </div>
    </div>
  );
}