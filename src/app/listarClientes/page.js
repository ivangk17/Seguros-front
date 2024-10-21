"use client";

import { useState, useEffect } from 'react';

export default function ClientsList() {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDni, setFilterDni] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(10);

  // Función para obtener los clientes desde la API
  const fetchClients = async (search, dni, email) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        ...(search && { search }),
        ...(dni && { dni }),
        ...(email && { email }),
      }).toString();

      const response = await fetch(`http://localhost:3000/api/users/clients?${queryParams}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching clients");
      }

      const data = await response.json();
      setClients(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Llamar a fetchClients cuando el componente se monta para listar todos los clientes
  useEffect(() => {
    fetchClients();
  }, []);

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchClients(searchTerm, filterDni, filterEmail);
  };

  return (
    <div>
      {/* Filtros */}
      <form className="mb-4 flex gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Buscar por nombre:</label>
          <input
            type="text"
            placeholder="Nombre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">DNI:</label>
          <input
            type="text"
            placeholder="DNI"
            value={filterDni}
            onChange={(e) => setFilterDni(e.target.value)}
            className="border rounded p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Email:</label>
          <input
            type="email"
            placeholder="Email"
            value={filterEmail}
            onChange={(e) => setFilterEmail(e.target.value)}
            className="border rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="self-center mt-6 rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          Filtrar
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">Nombre</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">Apellido</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">DNI</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">Email</th>
              <th className="px-4 py-2 text-center"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentClients.map((client) => (
              <tr key={client._id}>
                <td className="whitespace-nowrap px-4 py-2 text-center">{client.name}</td>
                <td className="whitespace-nowrap px-4 py-2 text-center">{client.lastname}</td>
                <td className="whitespace-nowrap px-4 py-2 text-center">{client.dni}</td>
                <td className="whitespace-nowrap px-4 py-2 text-center">{client.email}</td>
                <td className="whitespace-nowrap px-4 py-2 text-center">
                  <a
                    href="#"
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    Editar
                  </a>
                  <button className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700 ml-2">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mostrar loading o error */}
      {loading && <p>Cargando clientes...</p>}
      {error && <p>Error: {error}</p>}

      {/* Paginación */}
      <div className="fixed bottom-4 right-4">
        {Array.from({ length: Math.ceil(clients.length / clientsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-4 py-2 rounded ${
              currentPage === i + 1 ? "bg-indigo-600 text-white" : "bg-gray-300 text-black"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
