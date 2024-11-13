"use client";

import React, { useState, useEffect } from "react";
import Input from "../../componentes/Input";
import { useAuth } from "@/context/AuthContext";
import Header from "@/app/componentes/clientes/Header";
import ScreenLoader from "@/app/componentes/ScreenLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validarCliente } from "../../componentes/modals/validaciones/validaciones";
import ChangePasswordModal from "../../componentes/modals/ModalCambiarContra";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";

function EditProfile() {
  const router = useRouter();
  const [canUse, setCanUse] = useState(null);
  const api = process.env.NEXT_PUBLIC_URL_API;
  const [formData, setFormData] = useState({
    email: "",
    nombre: "",
    apellido: "",
    dni: "",
    address: "",
    number: "",
    floor: "",
    apartment: "",
    zip_code: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const { token, role } = useAuth();

  useEffect(() => {
    if (token) {
      try {
        const decode = jwt.decode(token);
        const role = decode.role;
        setCanUse(role === "asegurador");
      } catch (error) {
        console.error("Error al decodificar el token", error);
        setCanUse(false);
      }
    } else {
      setCanUse(false);
    }
  }, [token, role]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${api}users/getDatosPerfil`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw Error("Error al obtener datos del perfil");

        const data = await response.json();
        setFormData({
          email: data.email,
          nombre: data.name,
          apellido: data.lastname,
          dni: data.dni,
          phone: data.phone,
          address: data.address,
          number: data.number,
          floor: data.floor,
          apartment: data.apartment,
          zip_code: data.zip_code,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserProfile();
  }, [api, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateField = (field, value) => {
    const atributos = [
      { name: "address", placeholder: "Calle", required: true },
      { name: "number", placeholder: "Número", required: true },
      { name: "floor", placeholder: "Piso", required: false },
      { name: "apartment", placeholder: "Departamento", required: false },
      { name: "zip_code", placeholder: "Código Postal", required: true },
      { name: "phone", placeholder: "Teléfono", required: true },
    ];

    const formDataToValidate = { [field]: value };
    const validationErrors = validarCliente(formDataToValidate, atributos);
    return validationErrors[field] || "";
  };

  const updateUserProfile = async () => {
    try {
      const response = await fetch(`${api}users/editarPerfil`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phone: formData.phone,
          address: formData.address,
          zip_code: formData.zip_code,
          number: formData.number,
          apartment: formData.apartment,
          floor: formData.floor,
        }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Error: ${text}`);
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const atributos = [
      { name: "address", placeholder: "Calle", required: true },
      { name: "number", placeholder: "Número", required: true },
      { name: "floor", placeholder: "Piso", required: false },
      { name: "apartment", placeholder: "Departamento", required: false },
      { name: "zip_code", placeholder: "Código Postal", required: true },
      { name: "phone", placeholder: "Teléfono", required: true },
    ];

    const validationErrors = validarCliente(formData, atributos);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      await updateUserProfile();
      toast.success("Perfil actualizado exitosamente");
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (formData) => {
    try {
      const response = await fetch(`${api}users/changePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Contraseña antigua incorrecta.");
      }

      toast.success("Contraseña cambiada exitosamente");
      setShowChangePasswordModal(false);
    } catch (err) {
      throw new Error("Contraseña antigua incorrecta.");
    }
  };
  if (canUse === null) return <ScreenLoader />;
  if (!canUse) {
    router.push("/");
    return null;
  }
  return (
    <>
      {loading && <ScreenLoader />}
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
      <div className="bg-white shadow-lg rounded-lg w-full p-4 sm:p-6 md:p-8 dark:bg-gray-800">
        <Header
          titulo="Editar Perfil"
          texto="Cambiar contraseña"
          accion={() => setShowChangePasswordModal(true)}
        />
        <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" onSubmit={handleSubmit}>
          <Input
            id="email"
            name="email"
            label="Email"
            type="text"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            disabled
            className="col-span-4"
          />
          <Input
            id="nombre"
            name="nombre"
            label="Nombre"
            type="text"
            value={formData.nombre}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.nombre}
            className="col-span-2"
            disabled
          />
          <Input
            id="apellido"
            name="apellido"
            label="Apellido"
            type="text"
            value={formData.apellido}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.apellido}
            className="col-span-2"
            disabled
          />
          <Input
            id="dni"
            name="dni"
            label="DNI"
            type="text"
            value={formData.dni}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.dni}
            className="col-span-4"
            disabled
          />
          <Input
            id="address"
            name="address"
            label="Calle"
            type="text"
            value={formData.address}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.address}
          />
          <Input
            id="number"
            name="number"
            label="Número"
            type="text"
            value={formData.number}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.number}
          />
          <Input
            id="floor"
            name="floor"
            label="Piso"
            type="text"
            value={formData.floor}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.floor}
          />
          <Input
            id="apartment"
            name="apartment"
            label="Departamento"
            type="text"
            value={formData.apartment}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.apartment}
          />
          <Input
            id="zip_code"
            name="zip_code"
            label="Código Postal"
            type="text"
            value={formData.zip_code}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.zip_code}
          />
          <Input
            id="phone"
            name="phone"
            label="Teléfono"
            type="text"
            value={formData.phone}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.phone}
          />
          <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex items-end">
            <button
              type="submit"
              className="w-full text-xs sm:text-sm md:text-base text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
      <ChangePasswordModal
        show={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
        onSubmit={handleChangePassword}
      />
    </>
  );
}

export default EditProfile;
