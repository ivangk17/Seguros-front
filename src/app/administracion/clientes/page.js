"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ConfirmDeleteModal from "@/app/componentes/modals/ConfirmDeleteModal";
import ModalEdit from "@/app/componentes/modals/ModalEdit";
import ModalPolizas from "@/app/componentes/modals/ModalPolizas";
import ModalCreate from "@/app/componentes/modals/ModalCreate";
import Table from "@/app/componentes/table/Table";
import ScreenLoader from "@/app/componentes/ScreenLoader";
import Pagination from "@/app/componentes/table/Pagination";
import "react-toastify/dist/ReactToastify.css";

export default function ClientsList() {
  const api = process.env.NEXT_PUBLIC_URL_API;
  const [clientes, setClientes] = useState([]);
  const [cambios, setCambios] = useState(false);
  const [filtroNombreApellido, setFiltroNombreApellido] = useState("");
  const [filtroDni, setFiltroDni] = useState("");
  const [filtroEmail, setFiltroEmail] = useState("");
  const [filtroTelefono, setFiltroTelefono] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [clientesPorPagina, setClientesPorPagina] = useState(10);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [clientToEdit, setClientToEdit] = useState(null);
  const [showModalPolizas, setShowModalPolizas] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [polizas, setPolizas] = useState([]);

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
      setLoading(false);
    }
  };

  const fetchPolizas = async (clienteId) => {
    try {
      const url = `${api}polizas/listAsegurado/${clienteId}`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching polizas");
      }

      const data = await response.json();
      setPolizas(data);
    } catch (error) {
      toast.error("Ocurrió un error al obtener las pólizas.");
    }
  };

  useEffect(() => {
    fetchClients();
  }, [cambios]);

  const indexOfLastClient = paginaActual * clientesPorPagina;
  const indexOfFirstClient = indexOfLastClient - clientesPorPagina;
  const clientesActuales = clientes.slice(
    indexOfFirstClient,
    indexOfLastClient
  );

  const paginate = (numeroPagina) => setPaginaActual(numeroPagina);

  const handleClientesPorPaginaChange = (e) => {
    const newClientesPorPagina = Number(e.target.value);
    setClientesPorPagina(newClientesPorPagina);
    const newTotalPages = Math.ceil(clientes.length / newClientesPorPagina);
    if (paginaActual > newTotalPages) {
      setPaginaActual(newTotalPages);
    }
  };

  const handleSubmitFilters = (e) => {
    e.preventDefault();
    fetchClients(filtroNombreApellido, filtroDni, filtroEmail, filtroTelefono);
  };

  const handlePolizas = async (cliente) => {
    await fetchPolizas(cliente._id);
    setShowModalPolizas(true);
  };

  const handleAddClient = () => {
    setShowModalCreate(true);
  };

  const confirmCreate = async (formData) => {
    setShowModalCreate(false);

    toast.success("El cliente ha sido agregado con éxito.");
  };

  const handleEdit = (cliente) => {
    setClientToEdit(cliente);
    setShowModalEdit(true);
  };

  const handleDelete = (cliente) => {
    setClientToDelete(cliente);
    setShowModalDelete(true);
  };

  const confirmDelete = async (id) => {
    setShowModalDelete(false);
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
      setCambios((prev) => !prev);
      toast.success("El cliente ha sido eliminado con éxito.");
    } catch (error) {
      toast.error("Ocurrió un error al eliminar el cliente.");
      setError(error.message);
    }
  };

  const confirmEdit = async (formData) => {
    setShowModalEdit(false);
    try {
      const url = `${api}users/editarCliente/${clientToEdit._id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Error al editar el cliente");
      }
      setCambios((prev) => !prev);
      toast.success("El cliente ha sido editado con éxito.");
    } catch (error) {
      toast.error("Ocurrió un error al editar el cliente.");
    }
  };

  const acciones = [
    { nombre: "Editar", funcion: handleEdit },
    { nombre: "Eliminar", funcion: handleDelete },
    { nombre: "Ver Pólizas", funcion: handlePolizas },
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
      <div className="bg-white shadow-lg rounded-lg w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Administración de clientes</h2>
          <button
            onClick={handleAddClient}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
          >
            Agregar Cliente
          </button>
        </div>
        <Table
          cabeceras={["Nombre", "Apellido", "DNI", "Email", "Teléfono", "CUIT"]}
          datos={clientesActuales}
          keys={["name", "lastname", "dni", "email", "phone", "cuit"]}
          acciones={acciones}
          paginado={paginado}
          filtros={filtros}
          filtrosSubmit={handleSubmitFilters}
        />
      </div>
      <div className="flex justify-between items-center mt-4">
        <Pagination paginado={paginado} />
        <div className="flex items-center">
          <label htmlFor="clientesPorPagina" className="mr-2">
            Registros por página:
          </label>
          <select
            id="clientesPorPagina"
            value={clientesPorPagina}
            onChange={handleClientesPorPaginaChange}
            className="border rounded px-4 py-2"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
      <ModalPolizas
        show={showModalPolizas}
        onClose={() => setShowModalPolizas(false)}
        polizas={polizas}
      />
      <ModalEdit
        show={showModalEdit}
        onClose={() => setShowModalEdit(false)}
        onConfirm={confirmEdit}
        client={clientToEdit}
      />
      <ModalCreate
        show={showModalCreate}
        titulo="Registrar nuevo cliente"
        onClose={() => setShowModalCreate(false)}
        onSubmit={confirmCreate}
        atributos={[
          { id: "email", name: "email", type: "email", placeholder: "Email" },
          { id: "name", name: "name", type: "text", placeholder: "Nombre" },
          { id: "lastname", name: "lastname", type: "text", placeholder: "Apellido" },
          { id: "dni", name: "dni", type: "text", placeholder: "DNI" },
          { id: "cuit", name: "cuit", type: "text", placeholder: "CUIT" },
          { id: "domicilio", name: "domicilio", type: "text", placeholder: "Domicilio" },
          { id: "phone", name: "phone", type: "tel", placeholder: "Teléfono" },
      ]}
      />
      <ConfirmDeleteModal
        show={showModalDelete}
        onClose={() => setShowModalDelete(false)}
        onConfirm={() => confirmDelete(clientToDelete?._id)}
      />
    </>
  );
}
