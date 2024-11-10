"use client";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScreenLoader from "@/app/componentes/ScreenLoader";
import { validarEmail } from "@/app/componentes/modals/validaciones/validaciones";



export default function PaginaEnviarMail() {
    const api = process.env.NEXT_PUBLIC_URL_API;
    const [errores, setErrores] = useState({});
    const [email, setMail] = useState('');
    const [cargando, setCargando] = useState(false);

    const MSG_ERROR_MAIL_VACIO = "Debe ingresar un email"
    const MSG_ERROR_MAIL_INVALIDO = "Mail invalido"
    const MSG_MAIL_ENVIADO = "Mail enviado, revise su casilla"

    const handleEnviarMailRecuperacion = async (event) => {
        event.preventDefault();      
      
        if (email === "") {
          setErrores({ submit:  MSG_ERROR_MAIL_VACIO});
        } else if (!validarEmail(email)) {
          setErrores({ submit:  MSG_ERROR_MAIL_INVALIDO});
        } else {
          setCargando(true);
          try {
            const url = `${api}users/resetPassword/${email}`;
      
            const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              }
            });
      
            const data = await response.json();
      
            if (!response.ok) {
              throw new Error(data.error);
            }
      
            toast.success(MSG_MAIL_ENVIADO);
            setErrores({})
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
                <h1>Recuperar contraseña</h1>
              </div>
            </div>
            <form onSubmit={handleEnviarMailRecuperacion} className="flex flex-col items-center">
              <div className="my-2 w-72">
                <input
                  type="text"
                  placeholder="Email de recuperacion"
                  value={email}
                  onChange={(e) => setMail(e.target.value)}
                  className="mb-4 px-4 py-2 border rounded w-full"
                />
              </div>
              <div className="my-2 flex justify-center">
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Recuperar contraseña
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