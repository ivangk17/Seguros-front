"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';

export default function CrearAsegurador() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    lastname: "",
    dni: ""
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto w-full max-w-xl"> {/* Cambié el ancho aquí */}
        <div className="mt-5 bg-white rounded-lg shadow-lg p-8"> {/* Aumenté el padding y añadí shadow-lg */}
          <div className="flex">
            <div className="flex-1 py-5 pl-5 overflow-hidden">
              <h1 className="inline text-3xl font-semibold leading-none">Crear Asegurado</h1> {/* Aumenté el tamaño del texto */}
            </div>
          </div>
          <div className="px-5 pb-5">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <form onSubmit={handleSubmit} className="w-full p-6"> 
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-lg">Email:</label> {/* Aumenté el tamaño del texto */}
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
  
              <button
                type="submit"
                className="relative w-full flex justify-center items-center px-8 py-4 font-medium tracking-wide text-white capitalize bg-black rounded-md hover:bg-gray-900 focus:outline-none transition duration-300 transform active:scale-95 ease-in-out text-lg"
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
                <span className="pl-2 mx-1">Crear Asegurado</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  
}
