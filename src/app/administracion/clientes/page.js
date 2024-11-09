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
import "react-toastify/dist/ReactToastify.css";
import { crearPoliza } from "../polizas/polizaService";
import { cambiarEstadoCliente, createCliente } from "./utils/clientsService";
import { useClients } from "./utils/useClients";
import { filtrosConfig } from "./utils/filters";
import { atributosCliente } from "./utils/atributes";
import Header from "@/app/componentes/clientes/Header";
import { useModals } from "./utils/useModals";

export default function ClientsList() {
  const {
    clientes,
    clientesPorPagina,
    paginaActual,
    loading,
    error,
    filtroNombreApellido,
    filtroDni,
    filtroEmail,
    filtroTelefono,
    filtroEstado,
    setFiltroNombreApellido,
    setFiltroDni,
    setFiltroEmail,
    setFiltroTelefono,
    setFiltroEstado,
    setPaginaActual,
    setCambios,
    setLoading,
  } = useClients();

  const {
    showModalCreateAsegurado,
    setShowModalCreateAsegurado
  } = useModals();

  const filtros = filtrosConfig(
    filtroNombreApellido,
    setFiltroNombreApellido,
    filtroDni,
    setFiltroDni,
    filtroEmail,
    setFiltroEmail,
    filtroTelefono,
    setFiltroTelefono,
    filtroEstado,
    setFiltroEstado
  );

  const handleSubmitFilters = (e) => {
    e.preventDefault();
    setCambios((prev) => !prev);
    setPaginaActual(1);
  };

  const handleSubmitCreateClient = async (formData) => {
    setLoading(true);
    try {
      await createCliente(formData);
      setLoading(false);
      toast.success("El cliente ha sido creado exitosamente.");
      setShowModalCreateAsegurado(false);
      setCambios((prev) => !prev);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [showModalPolizas, setShowModalPolizas] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);

  const [showModalCreatePoliza, setShowModalCreatePoliza] = useState(false);
  const [polizas, setPolizas] = useState([]);

  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [clienteDNI, setClienteDNI] = useState();

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

  const indexOfLastClient = paginaActual * clientesPorPagina;
  const indexOfFirstClient = indexOfLastClient - clientesPorPagina;
  const clientesActuales = clientes.slice(
    indexOfFirstClient,
    indexOfLastClient
  );

  const paginate = (numeroPagina) => setPaginaActual(numeroPagina);

  const handlePolizas = async (cliente) => {
    await fetchPolizas(cliente._id);
    setShowModalPolizas(true);
  };

  const handleAddPoliza = (cliente) => {
    setClienteDNI(cliente.dni);
    setShowModalCreatePoliza(true);
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

  const handleCambiarEstado = (cliente) => {
    try {
      cambiarEstadoCliente(cliente);
      setCambios((prev) => !prev);
    } catch (error) {
      console.log(error.message);
    }
  };

 

  const acciones = (cliente) => {
    let acciones = [];
    switch (cliente.state) {
      case "active":
        acciones = [
          { nombre: "Eliminar", funcion: () => handleDeleteClick(cliente) },
          { nombre: "Crear Poliza", funcion: () => handleAddPoliza(cliente) },
          { nombre: "Bloquear", funcion: () => handleCambiarEstado(cliente) },
          {
            nombre: "Bloquear impago",
            funcion: () => handleCambiarEstado(cliente),
          },
        ];
        break;
      case "blocked":
        acciones = [
          { nombre: "Eliminar", funcion: () => handleDeleteClick(cliente) },
          { nombre: "Activar", funcion: () => handleCambiarEstado(cliente) },
        ];
        break;
      case "payment_blocked":
        acciones = [
          { nombre: "Eliminar", funcion: () => handleDeleteClick(cliente) },
          { nombre: "Activar", funcion: () => handleCambiarEstado(cliente) },
        ];
        break;
      default:
        break;
    }

    return acciones;
  };

  const paginado = {
    total: clientes.length,
    datosPorPagina: clientesPorPagina,
    paginaActual: paginaActual,
    funcion: paginate,
  };

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
        <Header
          titulo="Administración de clientes"
          accion={() => setShowModalCreateAsegurado(true)}
          texto="Agregar cliente"
        />
        <Table
          cabeceras={[
            "Nombre",
            "Apellido",
            "DNI",
            "Email",
            "Teléfono",
            "Estado",
          ]}
          datos={clientesActuales}
          keys={["name", "lastname", "dni", "email", "phone", "state"]}
          acciones={acciones}
          paginado={paginado}
          filtros={filtros}
          filtrosSubmit={handleSubmitFilters}
        />
      </div>
      <ModalCreate
        show={showModalCreateAsegurado}
        titulo="Registrar nuevo cliente"
        onClose={() => setShowModalCreateAsegurado(false)}
        onSubmit={handleSubmitCreateClient}
        atributos={atributosCliente}
        tipo="cliente"
      />

      <ModalPolizas
        show={showModalPolizas}
        onClose={() => setShowModalPolizas(false)}
        polizas={polizas}
      />

      <ConfirmDeleteModal
        show={showModalDelete}
        dato={clienteSeleccionado}
        onClose={() => setShowModalDelete(false)}
        onConfirm={confirmDelete}
        atributos={["email", "phone"]}
        mensaje="¿Estás seguro de eliminar esta póliza?"
        acciones={acciones}
      />
      <ModalCreate
        show={showModalCreatePoliza}
        titulo="Añadir Póliza al Cliente"
        onClose={() => setShowModalCreatePoliza(false)}
        onSubmit={confirmCreatePoliza}
        atributos={[
          {
            id: "dni",
            name: "dni",
            type: "number",
            placeholder: "DNI de la persona",
            required: true,
          },
          {
            id: "aseguradora",
            name: "aseguradora",
            type: "text",
            placeholder: "Aseguradora",
            required: true,
          },
          {
            id: "tipoCobertura",
            name: "tipoCobertura",
            type: "select",
            placeholder: "Tipo de Cobertura",
            required: true,
            options: [
              { value: "Tipo de Cobertura", label: "Tipo de Cobertura" },
              {
                value: "Responsabilidad Civil",
                label: "Responsabilidad Civil",
              },
              { value: "Terceros Completo", label: "Terceros Completo" },
              {
                value: "Terceros Completo con Daños Parciales",
                label: "Terceros Completo con Daños Parciales",
              },
              { value: "Todo Riesgo", label: "Todo Riesgo" },
            ],
          },
          {
            id: "primaSegura",
            name: "primaSegura",
            type: "number",
            placeholder: "Prima Segura",
            required: true,
          },
          {
            id: "deducible",
            name: "deducible",
            type: "number",
            placeholder: "Deducible",
            required: true,
          },
          {
            id: "dominio",
            name: "dominio",
            type: "text",
            placeholder: "Dominio",
            required: true,
          },
          {
            id: "marca",
            name: "marca",
            type: "text",
            placeholder: "Marca",
            required: true,
          },
          {
            id: "modelo",
            name: "modelo",
            type: "text",
            placeholder: "Modelo",
            required: true,
          },
          {
            id: "anio",
            name: "anio",
            type: "number",
            placeholder: "Año",
            required: true,
          },
          {
            id: "color",
            name: "color",
            type: "text",
            placeholder: "Color",
            required: true,
          },
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
          {
            id: "numeroIdentificador",
            name: "numeroIdentificador",
            type: "text",
            placeholder: "Numero identificador",
            required: true,
          },
        ]}
        tipo="poliza"
        initialData={{ dni: clienteDNI }} // Cambiado a initialData
      />
    </>
  );
}

{
  /* <ConfirmDeleteModal
        show={showModalDelete}
        onClose={() => setShowModalDelete(false)}
        onConfirm={() => confirmDelete(clientToDelete?._id)}
      /> */
}

{
  /*  <div className="flex justify-between items-center mt-4">
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
      </div> */
}
/* const handleClientesPorPaginaChange = (e) => {
    const newClientesPorPagina = Number(e.target.value);
    setClientesPorPagina(newClientesPorPagina);
    const newTotalPages = Math.ceil(clientes.length / newClientesPorPagina);
    if (paginaActual > newTotalPages) {
      setPaginaActual(newTotalPages);
    }
  }; */
{
  /*    <ModalEdit
        show={showModalEditCliente}
        dato={clienteSeleccionado}
        atributos={[
          {
            id: "phone",
            name: "phone",
            type: "phone",
            placeholder: "Telefono",
            required: true,
          },
        ]}
        onClose={() => setshowModalEditCliente(false)}
        onConfirm={handleEditConfirm}
        titulo="Editar Póliza"
      /> */
}

/* const handleEditConfirm = (updatedData) => {
    setShowModalEdit(false);
    toast.success("Póliza actualizada exitosamente");
    setCambios(!cambios);
  }; */


  /*  const confirmEdit = async (formData) => {
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
  }; */