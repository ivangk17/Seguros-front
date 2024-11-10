"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScreenLoader from "../componentes/ScreenLoader";

export default function PaginaCambioContraseña() {
  const api = process.env.NEXT_PUBLIC_URL_API;
  const [errores, setErrores] = useState({});
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const MSG_ERROR_CONTRASENIA_VACIA = "La contraseña no puede estar vacía.";
  const MSG_ERROR_CONTRASENIA_CARACTERES = "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un signo.";
  const MSG_ERROR_CONTRASENIAS_NO_COINCIDEN = "Las contraseñas no coinciden.";

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= minLength && hasUpperCase && hasSpecialChar;
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem("token");

    if (!token) {
      setErrores({ submit: "Token de autenticación no encontrado." });
      return;
    }

    if (newPassword === "" || confirmPassword === "") {
      setErrores({ submit: MSG_ERROR_CONTRASENIA_VACIA });
    } else if (!validatePassword(newPassword)) {
      setErrores({ submit: MSG_ERROR_CONTRASENIA_CARACTERES });
    } else if (newPassword !== confirmPassword) {
      setErrores({ submit: MSG_ERROR_CONTRASENIAS_NO_COINCIDEN });
    } else {
      setLoading(true);
      try {
        const url = `http://localhost:3001/api/users/changePassword/${token}`;

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: JSON.stringify({ oldPass: oldPassword, newPass: newPassword, confirmPassword }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error);
        }
        toast.success('Contraseña cambiada con éxito!');
        setTimeout(() => {
          router.push('/administracion');
        }, 1000);
      } catch (error) {
        setErrores({ submit: error.message });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {loading && <ScreenLoader />}
      <div className="mx-auto my-36 flex h-auto w-[400px] flex-col border-2 bg-white text-black shadow-xl">
        <div className="mx-8 mt-7 mb-3 flex flex-row justify-start space-x-2">
          <div className="h-7 w-3 bg-[#0DE6AC]"></div>
          <div className="w-3 text-center font-sans text-xl font-bold">
            <h1>Cambiar Contraseña</h1>
          </div>
        </div>
        <form onSubmit={handleChangePassword} className="flex flex-col items-center">
          <div className="my-2 w-72">
            <input
              type="password"
              placeholder="Contraseña Actual"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="mb-4 px-4 py-2 border rounded w-full"
            />
          </div>
          <div className="my-2 w-72">
            <input
              type="password"
              placeholder="Nueva Contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mb-4 px-4 py-2 border rounded w-full"
            />
          </div>
          <div className="my-2 w-72">
            <input
              type="password"
              placeholder="Confirmar Nueva Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mb-4 px-4 py-2 border rounded w-full"
            />
          </div>
          <div className="my-2 flex justify-center">
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Cambiar Contraseña
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
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
