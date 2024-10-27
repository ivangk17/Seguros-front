"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ConfirmDeleteModal from "@/app/componentes/ConfirmDeleteModal";
import Table from "@/app/componentes/table/Table";
import ScreenLoader from "@/app/componentes/ScreenLoader";

export default function ClientsList() {
  //Router
  const router = useRouter();

  //URL Api
  const api = process.env.NEXT_PUBLIC_URL_API;

  //Datos
  const [clientes, setClientes] = useState([]);

  //Filtros
  const [filtroNombreApellido, setFiltroNombreApellido] = useState("");
  const [filtroDni, setFiltroDni] = useState("");
  const [filtroEmail, setFiltroEmail] = useState("");
  const [filtroTelefono, setFiltroTelefono] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [clientesPorPagina] = useState(15);
  const [error, setError] = useState(null);
  /*    const [loading, setLoading] = useState(false); */

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  //Loader
  const [loading, setLoading] = useState([]);

  const fetchClients = async (search, dni, email, phone) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        ...(search && { search }),
        ...(dni && { dni }),
        ...(email && { email }),
        ...(phone && { phone }),
      }).toString();
      const url = `${api}users/clients?${queryParams}`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching clients");
      }

      const data = await response.json();
      setClientes(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setPaginaActual(1);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const indexOfLastClient = paginaActual * clientesPorPagina;
  const indexOfFirstClient = indexOfLastClient - clientesPorPagina;
  const clientesActuales = clientes.slice(
    indexOfFirstClient,
    indexOfLastClient
  );

  const paginate = (numeroPagina) => setPaginaActual(numeroPagina);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchClients(filtroNombreApellido, filtroDni, filtroEmail, filtroTelefono);
  };

  const handleEdit = (cliente) => {
    router.push(`/listarClientes/editarCliente/${cliente._id}`);
  };

  const handleDelete = (cliente) => {
    setClientToDelete(cliente);
    setShowModal(true);
  };

  const confirmDelete = async (id) => {
    setShowModal(false);
    try {
      const url = `${api}users/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el cliente");
      }

      setClien(clientes.filter((cliente) => cliente._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const acciones = [
    {
      nombre: "Editar",
      funcion: handleEdit,
    },
    {
      nombre: "Eliminar",
      funcion: handleDelete,
    },
  ];

  const paginado = {
    total: clientes.length,
    datosPorPagina: clientesPorPagina,
    paginaActual: paginaActual,
    funcion: paginate,
  };

  const filtros = [
    {
      valor: filtroNombreApellido,
      funcion: setFiltroNombreApellido,
      id: "name",
      name: "nombre",
      type: "text",
      placeholder: "Nombre",
    },
    {
      valor: filtroDni,
      funcion: setFiltroDni,
      id: "dni",
      name: "dni",
      type: "text",
      placeholder: "DNI",
    },
    {
      valor: filtroEmail,
      funcion: setFiltroEmail,
      id: "email",
      name: "email",
      type: "text",
      placeholder: "Email",
    },
    {
      valor: filtroTelefono,
      funcion: setFiltroTelefono,
      id: "telefono",
      name: "telefono",
      type: "text",
      placeholder: "Teléfono",
    },
  ];

  return (
    <>
      {loading ? <ScreenLoader /> : ""}
      <div className="bg-white shadow-lg rounded-lg w-full p-6">
        <h2 className="text-lg font-semibold">Administración de clientes</h2>
        <Table
          cabeceras={["Nombre", "Apellido", "DNI", "Email", "Teléfono", "CUIT"]}
          datos={clientesActuales}
          keys={["name", "lastname", "dni", "email", "phone", "cuit"]}
          acciones={acciones}
          paginado={paginado}
          filtros={filtros}
          filtrosSubmit={handleSubmit}
        />
      </div>

      <ConfirmDeleteModal
        show={showModal}
        client={clientToDelete}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
