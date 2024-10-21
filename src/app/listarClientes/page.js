"use client";

import { useState, useEffect } from "react";
import ClientsTable from "../componentes/ClientsTable";
import Pagination from "../componentes/Pagination";
import FilterForm from "../componentes/FilterForm";
import ConfirmDeleteModal from "../componentes/ConfirmDeleteModal";
import { useRouter } from "next/navigation";

export default function ClientsList() {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDni, setFilterDni] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterPhone, setFilterPhone] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(15);

  // Estado para el modal
  const [showModal, setShowModal] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  const router = useRouter();

  const fetchClients = async (search, dni, email, phone) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        ...(search && { search }),
        ...(dni && { dni }),
        ...(email && { email }),
        ...(phone && { phone }), 
      }).toString();

      const response = await fetch(
        `http://localhost:3000/api/users/clients?${queryParams}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

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

  useEffect(() => {
    fetchClients();
  }, []);

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchClients(searchTerm, filterDni, filterEmail, filterPhone);
  };

  const handleEdit = (client) => {
    router.push(`/listarClientes/editarCliente/${client._id}`);
  };

  const handleDelete = (client) => {
    setClientToDelete(client); 
    setShowModal(true);
  };

  const confirmDelete = async (id) => {
    setShowModal(false);
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el cliente");
      }

      setClients(clients.filter((client) => client._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <FilterForm
        searchTerm={searchTerm}
        filterDni={filterDni}
        filterEmail={filterEmail}
        filterPhone={filterPhone}
        setSearchTerm={setSearchTerm}
        setFilterDni={setFilterDni}
        setFilterEmail={setFilterEmail}
        setFilterPhone={setFilterPhone}
        handleSubmit={handleSubmit}
      />

      <ClientsTable
        clients={currentClients}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {loading && <p>Cargando clientes...</p>}
      {error && <p>Error: {error}</p>}

      <Pagination
        totalClients={clients.length}
        clientsPerPage={clientsPerPage}
        currentPage={currentPage}
        paginate={paginate}
      />

      <ConfirmDeleteModal
        show={showModal}
        client={clientToDelete}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}