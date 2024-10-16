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
  }); //creo objeto formdata con variables vacias

  const [error, setError] = useState(null); //creo variable error con valor null
  const [success, setSuccess] = useState(null); //creo variable success con valor null
  const router = useRouter(); //creo variable router con valor de la ruta actual

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }; //creo funcion handleChange que recibe un evento y actualiza el objeto formdata con los valores del evento

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
          router.push('/welcome'); 
        });
      } else {
        const data = await response.json();
        setError(data.message || "Error al crear el asegurado");
      }
    } catch (error) {
      setError("Error al enviar la solicitud");
    }
  }; // creo funcion handleSubmit que recibe un evento, previene el comportamiento por defecto, setea las variables error y
  // success en null, realiza una peticion POST  con el objeto formdata y el token de sesion,si la respuesta es correcta setea 
  //la variable success con un mensaje y redirige a la ruta /welcome, si la respuesta no es correcta setea la variable error con un mensaje

  return (
    <div className="crear-asegurador-container flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Crear Asegurado</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastname" className="block text-gray-700">Apellido:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dni" className="block text-gray-700">DNI:</label>
          <input
            type="text"
            id="dni"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Crear Asegurado
        </button>
      </form>
    </div>
  );
}