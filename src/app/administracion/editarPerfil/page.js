"use client";

import React, { useState, useEffect } from "react";
import Input from "../../componentes/Input";
import { useAuth } from "@/context/AuthContext";
import Header from "@/app/componentes/clientes/Header";
import ScreenLoader from "@/app/componentes/ScreenLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validarCliente } from "../../componentes/modals/validaciones/validaciones";

function EditProfile() {
  const api = process.env.NEXT_PUBLIC_URL_API;
  const [formData, setFormData] = useState({
    email: "",
    nombre: "",
    apellido: "",
    dni: "",
    calle: "",
    numero: "",
    piso: "",
    departamento: "",
    codigoPostal: "",
    telefono: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { token } = useAuth();

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
          telefono: data.phone,
          calle: data.address,
          numero: data.number,
          piso: data.floor,
          departamento: data.apartment,
          codigoPostal: data.zip_code,
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
      { name: "email", placeholder: "Email", required: true },
      { name: "nombre", placeholder: "Nombre", required: true },
      { name: "apellido", placeholder: "Apellido", required: true },
      { name: "dni", placeholder: "DNI", required: true },
      { name: "calle", placeholder: "Calle", required: true },
      { name: "numero", placeholder: "Número", required: true },
      { name: "piso", placeholder: "Piso", required: false },
      { name: "departamento", placeholder: "Departamento", required: false },
      { name: "codigoPostal", placeholder: "Código Postal", required: true },
      { name: "telefono", placeholder: "Teléfono", required: true },
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
          phone: formData.telefono,
          address: formData.calle,
          zip_code: formData.codigoPostal,
          number: formData.numero,
          apartment: formData.departamento,
          floor: formData.piso,
        }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Error: ${text}`);
      }

      if (!response.ok) {
        throw new Error("Error al agregar cliente.");
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
      { name: "email", placeholder: "Email", required: true },
      { name: "nombre", placeholder: "Nombre", required: true },
      { name: "apellido", placeholder: "Apellido", required: true },
      { name: "dni", placeholder: "DNI", required: true },
      { name: "calle", placeholder: "Calle", required: true },
      { name: "numero", placeholder: "Número", required: true },
      { name: "piso", placeholder: "Piso", required: false },
      { name: "departamento", placeholder: "Departamento", required: false },
      { name: "codigoPostal", placeholder: "Código Postal", required: true },
      { name: "telefono", placeholder: "Teléfono", required: true },
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
      <div className="bg-white shadow-lg rounded-lg w-full p-6 dark:bg-gray-800">
        <Header
          titulo="Editar Perfil"
          texto="Cambiar contraseña"
          accion={true}
        />
        <form className="grid grid-cols-4 gap-4" onSubmit={handleSubmit}>
          <Input
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
            name="nombre"
            label="Nombre"
            type="text"
            value={formData.nombre}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.nombre}
            className="col-span-2"
          />
          <Input
            name="apellido"
            label="Apellido"
            type="text"
            value={formData.apellido}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.apellido}
            className="col-span-2"
          />
          <Input
            name="dni"
            label="DNI"
            type="text"
            value={formData.dni}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.dni}
            className="col-span-4"
          />
          <Input
            name="calle"
            label="Calle"
            type="text"
            value={formData.calle}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.calle}
          />
          <Input
            name="numero"
            label="Número"
            type="text"
            value={formData.numero}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.numero}
          />
          <Input
            name="piso"
            label="Piso"
            type="text"
            value={formData.piso}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.piso}
          />
          <Input
            name="departamento"
            label="Departamento"
            type="text"
            value={formData.departamento}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.departamento}
          />
          <Input
            name="codigoPostal"
            label="Código Postal"
            type="text"
            value={formData.codigoPostal}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.codigoPostal}
          />
          <Input
            name="telefono"
            label="Teléfono"
            type="text"
            value={formData.telefono}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.telefono}
          />
          <div className="col-span-4 flex items-end">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center ml-auto"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditProfile;