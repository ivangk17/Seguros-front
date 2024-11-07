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
import { crearPoliza } from "../polizas/polizaService";
import { cambiarEstadoCliente } from "./clienteSerice";

export default function ClientsList() {
  const api = process.env.NEXT_PUBLIC_URL_API;
  const [clientes, setClientes] = useState([]);
  const [cambios, setCambios] = useState(false);
  const [filtroNombreApellido, setFiltroNombreApellido] = useState("");
  const [filtroDni, setFiltroDni] = useState("");
  const [filtroEmail, setFiltroEmail] = useState("");
  const [filtroTelefono, setFiltroTelefono] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [clientesPorPagina, setClientesPorPagina] = useState(10);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [showModalPolizas, setShowModalPolizas] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalCreatePoliza, setShowModalCreatePoliza] = useState(false);
  const [polizas, setPolizas] = useState([]);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [clienteDNI, setClienteDNI] = useState(222); // Ejemplo de DNI prellenado


  const fetchClients = async (search, dni, email, phone, estado) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        ...(search && { search }),
        ...(dni && { dni }),
        ...(email && { email }),
        ...(phone && { phone }),
        ...(estado && {estado})
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
    fetchClients(filtroNombreApellido, filtroDni, filtroEmail, filtroTelefono, filtroEstado);
  };

  const handlePolizas = async (cliente) => {
    await fetchPolizas(cliente._id);
    setShowModalPolizas(true);
  };

  const handleAddClient = () => {
    setShowModalCreate(true);
  };

  const handleAddPoliza = (cliente) =>{
    setClienteDNI(cliente.dni);
    setShowModalCreatePoliza(true);
  }

  const confirmCreate = async (formData) => {
    try {
      const url = `${api}users/register/client`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });      
  
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Error: ${text}`);
      }
  
      const data = await response.json();
      if (response.ok) {
        setShowModalCreate(false);
        toast.success("El cliente ha sido agregado con éxito.");
        setCambios((prev) => !prev);
      } else {
        toast.error(`Error: ${data.error || response.statusText}`);
      }
    } catch (error) {
      console.log(error.message);
      
      toast.error(`Error: ${error.message}`);
    }
  };

  const confirmCreatePoliza = async (formData) => {
    try {
      await crearPoliza(formData);
      setShowModalCreatePoliza(false);
      setCambios((prev) => !prev);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteClick = (cliente) => {
    console.log(cliente);
    
    setClienteSeleccionado(cliente);
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

  const handleEditClick = (cliente) => {
    setClienteSeleccionado(cliente);
    setShowModalEdit(true);
  };
  
  const handleEditConfirm = (updatedData) => {
    setShowModalEdit(false);
    toast.success("Póliza actualizada exitosamente");
    setCambios(!cambios);
  };

  const handleCambiarEstado = (cliente) =>{
    try {
      cambiarEstadoCliente(cliente)
      setCambios((prev) => !prev);
    } catch (error) {
      console.log(error.message);
    }
  }

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

  const acciones = (cliente) => {
    const accionesBase = [
      { nombre: "Editar", funcion: (poliza) => handleEditClick(poliza) },
      { nombre: "Eliminar", funcion: (poliza) => handleDeleteClick(poliza) },
      { nombre: "Crear Poliza", funcion: (cliente) => handleAddPoliza(cliente) }
    ];
  
    const accionEstado = cliente.estado === "ACTIVO"
    
      ? { nombre: "Inactivar", funcion: (cliente) => handleCambiarEstado(cliente) }
      : { nombre: "Activar", funcion: (cliente) => handleCambiarEstado(cliente) };
      console.log(`${cliente.email} ${cliente.estado}`);
    return [...accionesBase, accionEstado];
  };

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
    {
      valor: filtroEstado,
      funcion: setFiltroEstado,
      id: "estado",
      name: "estado",
      type: "select",
      placeholder: "Estado",
      options: [
        { value: "", label: "Estado" },
        { value: "ACTIVO", label: "Activo" },
        { value: "INACTIVO", label: "Inactivo" },
      ]
    }
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
      <div className="bg-white shadow-lg rounded-lg w-full p-6 dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black dark:text-white">Administración de clientes</h2>
          <button
            onClick={handleAddClient}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
          >
            Agregar Cliente
          </button>
        </div>
        <Table
          cabeceras={["Nombre", "Apellido", "DNI", "Email", "Teléfono", "Estado"]}
          datos={clientesActuales}
          keys={["name", "lastname", "dni", "email", "phone", "estado"]}
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
        dato={clienteSeleccionado}
        atributos={[
          { id: "phone", name: "phone", type: "phone", placeholder: "Telefono", required: true },
        ]}
        onClose={() => setShowModalEdit(false)}
        onConfirm={handleEditConfirm}
        titulo="Editar Póliza"
      />
      <ModalCreate
  show={showModalCreate}
  titulo="Registrar nuevo cliente"
  onClose={() => setShowModalCreate(false)}
  onSubmit={confirmCreate}
  atributos={[
    { id: "name", name: "name", type: "text", placeholder: "Nombre", required: true },
    { id: "lastname", name: "lastname", type: "text", placeholder: "Apellido", required: true },
    { id: "dni", name: "dni", type: "number", placeholder: "DNI", required: true },
    { id: "cuit", name: "cuit", type: "number", placeholder: "CUIT", required: true },
    {
      id: "gender",
      name: "gender",
      type: "select",
      placeholder: "Género",
      required: true,
      options: [
        { value: "", label: "Genero" },
        { value: "HOMBRE", label: "Masculino" },
        { value: "MUJER", label: "Femenino" },
      ],
    },
    { id: "email", name: "email", type: "email", placeholder: "Email", required: true },
    { id: "phone", name: "phone", type: "number", placeholder: "Teléfono", required: true },
    { id: "date_of_birth", name: "date_of_birth", type: "date", placeholder: "Fecha de nacimiento", required: true },
    { id: "address", name: "address", type: "text", placeholder: "Calle", required: true },
    { id: "number", name: "number", type: "number", placeholder: "Número", required: true },
    { id: "floor", name: "floor", type: "number", placeholder: "Piso" },
    { id: "apartment", name: "apartment", type: "text", placeholder: "Departamento" },
    { id: "zip_code", name: "zip_code", type: "number", placeholder: "Código Postal", required: true },
  ]}
  tipo="cliente"
/>
      <ConfirmDeleteModal
        show={showModalDelete}
        dato={clienteSeleccionado}
        onClose={() => setShowModalDelete(false)}
        onConfirm={confirmDelete}
        atributos={["email", "phone"]}
        mensaje="¿Estás seguro de eliminar esta póliza?"
        acciones= {acciones}
      />
      <ModalCreate
        show={showModalCreatePoliza}
        titulo="Añadir Póliza al Cliente"
        onClose={() => setShowModalCreatePoliza(false)}
        onSubmit={confirmCreatePoliza}
        atributos={[
          { id: "dni", name: "dni", type: "number", placeholder: "DNI de la persona", required: true },
          { id: "aseguradora", name: "aseguradora", type: "text", placeholder: "Aseguradora", required: true },
          {
            id: "tipoCobertura",
            name: "tipoCobertura",
            type: "select",
            placeholder: "Tipo de Cobertura",
            required: true,
            options: [
              { value: "Tipo de Cobertura", label: "Tipo de Cobertura" },
              { value: "Responsabilidad Civil", label: "Responsabilidad Civil" },
              { value: "Terceros Completo", label: "Terceros Completo" },
              { value: "Terceros Completo con Daños Parciales", label: "Terceros Completo con Daños Parciales" },
              { value: "Todo Riesgo", label: "Todo Riesgo" }
            ],
          },
          { id: "primaSegura", name: "primaSegura", type: "number", placeholder: "Prima Segura", required: true },
          { id: "deducible", name: "deducible", type: "number", placeholder: "Deducible", required: true },
          { id: "dominio", name: "dominio", type: "text", placeholder: "Dominio", required: true },
          { id: "marca", name: "marca", type: "text", placeholder: "Marca", required: true },
          { id: "modelo", name: "modelo", type: "text", placeholder: "Modelo", required: true },
          { id: "anio", name: "anio", type: "number", placeholder: "Año", required: true },
          { id: "color", name: "color", type: "text", placeholder: "Color", required: true },
          {
            id: "tipoVehiculo",
            name: "tipoVehiculo",
            type: "select",
            placeholder: "Tipo de Vehiculo",
            required: true,
            options: [
              { value: "", label: "Tipo de Vehiculo" },
              { value: "AUTO", label: "Auto" },
              { value: "MOTO", label: "Moto" },
              { value: "CAMION", label: "Camion" },
            ],
          },
          { id: "numeroIdentificador", name: "numeroIdentificador", type: "text", placeholder: "Numero identificador", required: true }
        ]}
        tipo="poliza"
        initialData={{ dni: clienteDNI }} // Cambiado a initialData
      />
      {/* <ConfirmDeleteModal
        show={showModalDelete}
        onClose={() => setShowModalDelete(false)}
        onConfirm={() => confirmDelete(clientToDelete?._id)}
      /> */}
    </>
  );
}
