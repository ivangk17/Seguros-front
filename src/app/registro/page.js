"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Input from "../componentes/Input";
import Image from "next/image";

const CrearAseguradorForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    lastname: "",
    dni: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    lastname: "",
    dni: "",
    submit: "",
  });
  const router = useRouter();

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
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (!value) {
      res = "Contraseña es requerida";
    } else if (value.length < minLength) {
      res = `La contraseña debe tener al menos ${minLength} caracteres`;
    } else if (!hasUpperCase) {
      res = "La contraseña debe tener al menos una letra mayúscula";
    } else if (!hasNumber) {
      res = "La contraseña debe tener al menos un número";
    } else if (!hasSpecialChar) {
      res = "La contraseña debe tener al menos un carácter especial";
    }

    return res;
  };

  const validateString = (
    value,
    minLength,
    msgRequired,
    msgLength,
    maxLength,
    msgMaxLength
  ) => {
    let res = "";
    if (!value) {
      res = msgRequired;
    } else if (value.length < minLength) {
      res = msgLength;
    } else if (maxLength && value.length > maxLength) {
      res = msgMaxLength;
    }
    return res;
  };
  const validateDni = (value) => {
    let res = "";
    if (!value) {
      res = "Dni es requerido";
    } else if (value.length < 6) {
      res = "Dni invalido";
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
    } else if (name === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validatePassword(value),
      }));
    } else if (name === "name") {
      setErrors((prev) => ({
        ...prev,
        name: validateString(
          value,
          2,
          "Nombre es requerido",
          "Nombre debe tener al menos 2 caracteres",
          80,
          "Nombre no puede tener más de 80 caracteres"
        ),
      }));
    } else if (name === "lastname") {
      setErrors((prev) => ({
        ...prev,
        lastname: validateString(
          value,
          2,
          "Apellido es requerido",
          "Apellido debe tener al menos 2 caracteres",
          80,
          "Apellido no puede tener más de 80 caracteres"
        ),
      }));
    } else if (name === "dni") {
      setErrors((prev) => ({ ...prev, dni: validateDni(value) }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors((prev) => ({ ...prev, submit: "" }));

    // Validar todos los campos antes de enviar
    const emailError = validateEmail(formData.email.trim());
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validatePassword(formData.confirmPassword);
    const nameError = validateString(
      formData.name.trim(),
      2,
      "Nombre es requerido",
      "Nombre debe tener al menos 2 caracteres",
      80,
      "Nombre no puede tener más de 80 caracteres"
    );
    const lastnameError = validateString(
      formData.lastname.trim(),
      2,
      "Apellido es requerido",
      "Apellido debe tener al menos 2 caracteres",
      80,
      "Apellido no puede tener más de 80 caracteres"
    );
    const dniError = validateDni(formData.dni.trim());

    setErrors({
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
      name: nameError,
      lastname: lastnameError,
      dni: dniError,
      submit: "",
    });

    if (
      emailError ||
      passwordError ||
      confirmPasswordError ||
      nameError ||
      lastnameError ||
      dniError
    ) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        submit: "Las contraseñas no coinciden",
      }));
      return;
    }

    const asegurador = {
      email: formData.email.trim(),
      password: formData.password,
      name: formData.name.trim(),
      lastname: formData.lastname.trim(),
      dni: formData.dni.trim(),
    };

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(asegurador),
      });

      if (response.ok) {
        Swal.fire({
          title: "Éxito",
          text: "Su cuenta ha sido creada con éxito.",
          icon: "success",
          confirmButtonText: "Ir al login",
        }).then(() => {
          router.push("/login");
        });
      } else {
        const data = await response.json();
        setErrors((prev) => ({
          ...prev,
          submit: data.error || "Error al crear la cuenta",
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: "Error interno, refresque la pagina e intente nuevamente",
      }));
    }
  };

  const handleCancel = () => {
    router.push("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="mx-auto my-36 flex h-auto w-[400px] flex-col border-2 bg-white text-black shadow-xl">
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
          <h1 className="text-center font-sans text-xl font-bold">Registro</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="my-2 w-72">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(event) => {
                handleChange(event);
                handleValidation(event);
              }}
              error={errors.email}
            />
          </div>
          <div className="my-2 w-72">
            <Input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={(event) => {
                handleChange(event);
                handleValidation(event);
              }}
              error={errors.password}
            />
          </div>
          <div className="my-2 w-72">
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar Contraseña"
              value={formData.confirmPassword}
              onChange={(event) => {
                handleChange(event);
                handleValidation(event);
              }}
              error={errors.confirmPassword}
            />
          </div>
          <div className="my-2 w-72">
            <Input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={(event) => {
                handleChange(event);
                handleValidation(event);
              }}
              error={errors.name}
            />
          </div>
          <div className="my-2 w-72">
            <Input
              type="text"
              name="lastname"
              placeholder="Apellido"
              value={formData.lastname}
              onChange={(event) => {
                handleChange(event);
                handleValidation(event);
              }}
              error={errors.lastname}
            />
          </div>
          <div className="my-2 w-72">
            <Input
              type="text"
              name="dni"
              placeholder="DNI"
              value={formData.dni}
              onChange={(event) => {
                handleChange(event);
                handleValidation(event);
              }}
              error={errors.dni}
            />
          </div>
          {errors.submit && (
            <small className="text-red-500 text-xs italic mt-1 text-center p-3">
              {errors.submit}
            </small>
          )}
          <div className="my-2 flex justify-center">
            <button
              type="submit"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Crear cuenta
              </span>
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-600 to-red-500 group-hover:from-red-600 group-hover:to-red-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Cancelar
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearAseguradorForm;
