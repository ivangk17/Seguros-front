"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { handlerLogin } from "./handlerLogin";
import { useAuth } from "../../context/AuthContext";
import Input from "../componentes/Input";

export default function PageLogin() {
  const [errors, setErrors] = useState({ email: "", password: "", submit: "" });
  const { token, setToken } = useAuth();
  const [inicio, setInicio] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/administracion");
    }
  }, [token, inicio, router]);

  const validateEmail = (value) => {
    let res = "";
    if (!value) {
      res = "Email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      res = "Email no es válido";
    }
    return res;
  };

  const validatePassword = (value) => {
    let res = "";
    if (!value) {
      res = "Contraseña es requerida";
    } else if (value.length < 2) {
      res = "La contraseña debe tener al menos 6 caracteres";
    }
    return res;
  };

  const handleValidation = (event) => {
    const input = event.target;
    const name = input.getAttribute("name");
    const value = input.value;
    if (name === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(value.trim()) }));
    } else if (name === "password") {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const noHayErrores = !errors.email && !errors.password;
    if (noHayErrores) {
      const formData = new FormData(event.target);
      const email = formData.get("email").trim();
      const password = formData.get("password");
      if (!validateEmail(email) && !validatePassword(password)) {
        const usuario = {
          email: email,
          password: password,
        };
        await handlerLogin(usuario, setErrors, setToken);
      } else {
        setErrors((prev) => ({
          ...prev,
          submit:
            "Hay errores en el formulario, corrijalos e intente nuevamente",
        }));
      }
    }
  };

  if (token) {
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="mx-auto my-36 flex h-[350px] w-[400px] flex-col border-2 bg-white text-black shadow-xl">
        <div className="mx-8 mt-7 mb-3 flex flex-row justify-start space-x-2">
          <div className="h-7 w-3 bg-[#0DE6AC]"></div>
          <div className="w-3 text-center font-sans text-xl font-bold">
            <h1>Login</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="my-2 w-72">
            <Input
              id="email"
              name="email"
              placeholder="Usuario"
              onChange={(event) => handleValidation(event)}
              error={errors.email}
            />
          </div>
          <div className="my-2 w-72">
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Contraseña"
              onChange={(event) => handleValidation(event)}
              error={errors.password}
            />
          </div>
          <div className="my-2 flex justify-center">
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Iniciar sesion
              </span>
            </button>
          </div>
        </form>
        {errors.submit && (
          <small className="text-red-500 text-xs italic mt-1 text-center">
            {errors.submit}
          </small>
        )}{" "}
        <div className="mx-7 my-3 flex justify-end text-sm font-semibold">
          <h1>Forget Password</h1>
        </div>
      </div>
    </div>
  );
}
