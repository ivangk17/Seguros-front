"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScreenLoader from "@/app/componentes/ScreenLoader";
import { validarContraseña } from "@/app/componentes/modals/validaciones/validaciones";
import Input from "@/app/componentes/Input";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function PaginaRecuperacionContrasenia() {
  const api = process.env.NEXT_PUBLIC_URL_API;
  const [errores, setErrores] = useState({});
  const [contrasenia, setContrasenia] = useState("");
  const [confirmacionContrasenia, setConfirmacionContrasenia] = useState("");
  const [cargando, setCargando] = useState(false);
  const [cambioExitoso, setCambioExitoso] = useState(false);
  const router = useRouter();
  const {token} = useAuth();

  if(token){
    router.push('/');
    return null;
  }

  const MSG_ERROR_CONTRASENIA_VACIA = "La contraseña no puede estar vacía.";
  const MSG_ERROR_CONTRASENIA_CARACTERES =
    "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un signo.";
  const MSG_ERROR_CONTRASENIAS_NO_COINCIDEN = "Las contraseñas no coinciden.";
  const MSG_ERROR_CAMBIO_EXITOSO =
    "La contraseña se cambió correctamente, puede cerrar esta pestaña.";

  const handleCambioContrasenia = async (event) => {
    event.preventDefault();
    const token = new URLSearchParams(window.location.search).get("token");

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
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPass: contrasenia,
            confirmPassword: confirmacionContrasenia,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error);
        }
        setCambioExitoso(true);
        /*         toast.success(MSG_ERROR_CAMBIO_EXITOSO); */
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
          <div className="mx-auto mt-7 mb-3 flex flex-col items-center">
            <div className="relative w-24 h-24 mb-3">
              <Image
                src="/img/logo.png"
                alt="Logo"
                className="rounded-full object-cover"
                layout="fill"
                priority
                style={{ filter: "opacity(0.7)" }}
              />
            </div>
            <h1 className="text-center font-sans text-xl font-bold">
              {cambioExitoso
                ? "Cambio de Contraseña Exitoso"
                : "Cambio de Contraseña"}
            </h1>
          </div>
        </div>

        {/* Solo muestra el formulario si el cambio no ha sido exitoso */}
        {!cambioExitoso ? (
          <form
            onSubmit={handleCambioContrasenia}
            className="flex flex-col items-center"
          >
            <div className="my-2 w-72">
              <Input
                name="nuevaContrasenia"
                label="Nueva Contraseña"
                type="password"
                value={contrasenia}
                onChange={(e) => setContrasenia(e.target.value)}
              />
            </div>
            <div className="my-2 w-72">
              <Input
                name="confirmacionContrasenia"
                label="Confirmar Contraseña"
                type="password"
                value={confirmacionContrasenia}
                onChange={(e) => setConfirmacionContrasenia(e.target.value)}
              />
            </div>
            {errores.submit && (
              <small className="text-red-500 text-xs italic mt-1 text-center mb-3">
                {errores.submit}
              </small>
            )}
            <div className="my-2 flex justify-center">
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Restablecer Contraseña
                </span>
              </button>
            </div>
          </form>
        ) : (
          // Mostrar botón de ir al login solo si el cambio de contraseña fue exitoso
          <div className="my-2 flex justify-center">
            <button
              onClick={() => router.push("/login")}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Ir al login
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
