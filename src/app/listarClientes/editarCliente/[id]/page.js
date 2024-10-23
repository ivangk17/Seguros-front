"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Swal from 'sweetalert2';
import ClienteForm from '../../../componentes/ClienteForm';

const EditarCliente = () => {
  const router = useRouter();
  const { id } = useParams();
  const [user, setUser] = useState(null);
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

  useEffect(() => {
    if (id) {
      // Fetch user data from the endpoint
      fetch(`http://localhost:3000/api/users/buscarCliente/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error fetching user data');
          }
          return response.json();
        })
        .then(data => {
          setUser(data);
          setFormData({
            email: data.email,
            name: data.nombre,
            lastname: data.apellido,
            dni: data.dni,
            phone: data.phone,
            cuit: data.cuit,
            domicilio: {
              address: data.domicilio.address,
              zip_code: data.domicilio.zip_code,
              province: data.domicilio.province,
              country: data.domicilio.country
            }
          });
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [id]);

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
      const response = await fetch(`http://localhost:3000/api/users/editarCliente/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess("Cliente actualizado exitosamente");
        Swal.fire({
          title: 'Éxito',
          text: 'Cliente actualizado exitosamente',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          router.push('/listarClientes');
        });
      } else {
        const data = await response.json();
        setError(data.error || "Error al actualizar el cliente");
      }
    } catch (error) {
      setError("Error al enviar la solicitud");
    }
  };

  const handleCancel = () => {
    router.push('/listarClientes');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <ClienteForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      buttonText="Guardar Cambios"
      cancelButtonText="Cancelar Cambios"
      cancelButtonPosition="left"
      error={error}
      success={success}
    />
  );
};

export default EditarCliente;