"use client";

//hooks
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useClients } from "./hooks/useClients";
import { usePaginado } from "./hooks/usePaginado";
import { usePolizas } from "./hooks/usePolizas";
import { useAuth } from "@/context/AuthContext";

//componentes
import { ToastContainer, toast } from "react-toastify";
import ConfirmDeleteModal from "@/app/componentes/modals/ConfirmDeleteModal";
import ModalPolizas from "@/app/componentes/modals/ModalPolizas";
import ModalCreate from "@/app/componentes/modals/ModalCreate";
import Table from "@/app/componentes/table/Table";
import ScreenLoader from "@/app/componentes/ScreenLoader";

//estilos
import "react-toastify/dist/ReactToastify.css";

//servicios
import {
  changeStateClient,
  createCliente,
  deleteCliente,
} from "./services/clientsService";
import { getPolizasByAsegurado, crearPoliza } from "./services/polizasService";

//utiliades

import { filtrosConfig } from "./utils/filters";
import {
  atributosCliente,
  atributosClienteDelete,
  atributosPoliza,
} from "./utils/atributes";
import { getAccionesPorEstado } from "./utils/clientsActions";
import Header from "@/app/componentes/clientes/Header";
import { useModals } from "./hooks/useModals";
import { keysTabla } from "./utils/keys";
import { cabecerasTabla } from "./utils/cabeceras";

import jwt from "jsonwebtoken";

export default function ClientsList() {
  const { token, role } = useAuth();
  const router = useRouter();
  const [canUse, setCanUse] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decode = jwt.decode(token);
        const role = decode.role;
        setCanUse(role === "asegurador");
      } catch (error) {
        console.error("Error al decodificar el token", error);
        setCanUse(false);
      }
    } else {
      setCanUse(false);
    }
  }, [token, role]);

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
    clienteDNI,
    setClienteDNI,
    clienteSeleccionado,
    setClienteSeleccionado,
  } = useClients();

  const {
    showModalCreateAsegurado,
    setShowModalCreateAsegurado,
    showModalDeleteAsegurado,
    setShowModalDeleteAsegurado,
    showModalViewPolizas,
    setShowModalViewPolizas,
    showModalCreatePoliza,
    setShowModalCreatePoliza,
  } = useModals();

  const { clientesActuales, paginado } = usePaginado(
    paginaActual,
    clientesPorPagina,
    clientes,
    setPaginaActual
  );

  const { polizas, setPolizas } = usePolizas();

  //utilities
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

  const acciones = (cliente) => {
    return getAccionesPorEstado(
      cliente,
      handleDeleteClientClick,
      handleClickCreatePoliza,
      handleChangeState,
      handleViewPolizas
    );
  };

  //handleClicks
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

  const handleDeleteClientClick = (cliente) => {
    setClienteSeleccionado(cliente);
    setShowModalDeleteAsegurado(true);
  };

  const handleSubmitDeleteCliente = async (idAsegurado) => {
    setLoading(true);
    try {
      await deleteCliente(idAsegurado);
      setLoading(false);
      toast.success("El cliente ha sido elimando exitosamente.");
      setCambios((prev) => !prev);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    } finally {
      setShowModalDeleteAsegurado(false);
    }
  };

  const handleViewPolizas = async (cliente) => {
    setLoading(true);
    try {
      const data = await getPolizasByAsegurado(cliente._id);
      setPolizas(data);
      setShowModalViewPolizas(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClickCreatePoliza = (cliente) => {
    setClienteDNI(cliente.dni);
    setShowModalCreatePoliza(true);
  };

  const handleSubmitCreatePoliza = async (formData) => {
    setLoading(true);
    try {
      await crearPoliza(formData);
      setLoading(false);
      toast.success("La poliza ha sido creada exitosamente.");
      setShowModalCreatePoliza(false);
      setCambios((prev) => !prev);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const handleChangeState = async (cliente, newState) => {
    setLoading(true);
    try {
      await changeStateClient(cliente, newState);
      setLoading(false);
      toast.success("El estado de cliente ha sido modificado exitosamente.");
      setShowModalCreatePoliza(false);
      setCambios((prev) => !prev);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  if (canUse === null) return <ScreenLoader />;
  if (!canUse) {
    router.push("/");
    return null;
  }

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
          cabeceras={cabecerasTabla}
          datos={clientesActuales}
          keys={keysTabla}
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
      <ConfirmDeleteModal
        show={showModalDeleteAsegurado}
        dato={clienteSeleccionado}
        onClose={() => setShowModalDeleteAsegurado(false)}
        onConfirm={handleSubmitDeleteCliente}
        atributos={atributosClienteDelete}
        mensaje="¿Estás seguro de eliminar esta cliente?"
      />
      <ModalPolizas
        show={showModalViewPolizas}
        onClose={() => setShowModalViewPolizas(false)}
        polizas={polizas}
      />
      <ModalCreate
        show={showModalCreatePoliza}
        titulo="Añadir Póliza al Cliente"
        onClose={() => setShowModalCreatePoliza(false)}
        onSubmit={handleSubmitCreatePoliza}
        atributos={atributosPoliza}
        tipo="poliza"
        initialData={{ dni: clienteDNI }}
      />
    </>
  );
}
