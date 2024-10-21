"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Swal from 'sweetalert2';

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

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto w-full max-w-2xl">
        <div className="mt-5 bg-white rounded-lg shadow-lg p-8">
          <div className="flex">
            <div className="flex-1 py-5 pl-5 overflow-hidden">
              <h1 className="inline text-3xl font-semibold leading-none">Editar Cliente</h1>
            </div>
          </div>
          <div className="px-5 pb-5">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <form onSubmit={handleSubmit} className="w-full p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-lg">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="text-black placeholder-gray-600 w-full px-4 py-3 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 text-lg">Nombre:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="text-black placeholder-gray-600 w-full px-4 py-3 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="lastname" className="block text-gray-700 text-lg">Apellido:</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                    className="text-black placeholder-gray-600 w-full px-4 py-3 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="dni" className="block text-gray-700 text-lg">DNI:</label>
                  <input
                    type="text"
                    id="dni"
                    name="dni"
                    value={formData.dni}
                    onChange={handleChange}
                    required
                    className="text-black placeholder-gray-600 w-full px-4 py-3 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 text-lg">Teléfono:</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="text-black placeholder-gray-600 w-full px-4 py-3 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="cuit" className="block text-gray-700 text-lg">CUIT:</label>
                  <input
                    type="text"
                    id="cuit"
                    name="cuit"
                    value={formData.cuit}
                    onChange={handleChange}
                    required
                    className="text-black placeholder-gray-600 w-full px-4 py-3 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>
              </div>

              <div className="mt-4">
                <h2 className="text-xl font-semibold text-gray-700">Domicilio:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700 text-lg">Dirección:</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.domicilio.address}
                      onChange={handleChange}
                      required
                      className="text-black placeholder-gray-600 w-full px-4 py-3 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="zip_code" className="block text-gray-700 text-lg">Código Postal:</label>
                    <input
                      type="text"
                      id="zip_code"
                      name="zip_code"
                      value={formData.domicilio.zip_code}
                      onChange={handleChange}
                      required
                      className="text-black placeholder-gray-600 w-full px-4 py-3 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="province" className="block text-gray-700 text-lg">Provincia:</label>
                    <input
                      type="text"
                      id="province"
                      name="province"
                      value={formData.domicilio.province}
                      onChange={handleChange}
                      required
                      className="text-black placeholder-gray-600 w-full px-4 py-3 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="country" className="block text-gray-700 text-lg">País:</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.domicilio.country}
                      onChange={handleChange}
                      required
                      className="text-black placeholder-gray-600 w-full px-4 py-3 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="relative w-full max-w-xs flex justify-center items-center px-8 py-4 font-medium tracking-wide text-white capitalize bg-black rounded-md hover:bg-gray-900 focus:outline-none transition duration-300 transform active:scale-95 ease-in-out text-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
                    <g>
                      <rect fill="none" height="24" width="24"></rect>
                    </g>
                    <g>
                      <g>
                        <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"></path>
                      </g>
                    </g>
                  </svg>
                  <span className="pl-2 mx-1">Guardar Cambios</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarCliente;