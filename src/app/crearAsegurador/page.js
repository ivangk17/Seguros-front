"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import ClienteForm from '../componentes/ClienteForm';

export default function CrearAsegurador() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    lastname: "",
    dni: "",
    phone: "",
    cuit: "",
    domicilio: {
      address: "",
      zip_code: "",
      province: "",
      country: ""
    }
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.domicilio) {
      setFormData({
        ...formData,
        domicilio: {
          ...formData.domicilio,
          [name]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch("http://localhost:3000/api/users/register/client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess("Asegurado creado exitosamente");
        Swal.fire({
          title: 'Éxito',
          text: 'Asegurado creado exitosamente',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          router.push('/listarClientes'); 
        });
      } else {
        const data = await response.json();
        setError(data.message || "Error al crear el asegurado");
      }
    } catch (error) {
      setError("Error al enviar la solicitud");
    }
  };

  const handleCancel = () => {
    router.push('/welcome');
  };

  return (
    <ClienteForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      buttonText="Crear Asegurado"
      cancelButtonText="Cancelar"
      cancelButtonPosition="left"
      error={error}
      success={success}
    />
  );
}