"use client";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import ScreenLoader from "@/app/componentes/ScreenLoader";
import { ToastContainer, toast } from "react-toastify";
import Header from "@/app/componentes/clientes/Header";
import Table from "@/app/componentes/table/Table";
import { filtrosConfig } from "./utils/filters";

import "react-toastify/dist/ReactToastify.css";
import { useAseguradores } from "./hooks/useAseguradores";
import { usePaginado } from "./hooks/usePaginado";
import { getAccionesPorEstado } from "./utils/adminActions";
import { changeStateClient } from "./services/aseguradoresService";

export default function AseguradoresPage() {
  const router = useRouter();
  const { token, role } = useAuth();
  const [canUse, setCanUse] = useState(null);
  useEffect(() => {
    if (token) {
      try {
        const decode = jwt.decode(token);
        const role = decode.role;
        setCanUse(role === "admin");
      } catch (error) {
        console.error("Error al decodificar el token", error);
        setCanUse(false);
      }
    } else {
      setCanUse(false);
    }
  }, [token, role]);

  const {
    aseguradores,
    setAseguradores,
    cambios,
    setCambios,
    loading,
    setLoading,
    aseguradoresPorPagina,
    paginaActual,
    filtroNombreApellido,
    filtroDni,
    filtroEmail,
    filtroEstado,
    setFiltroNombreApellido,
    setFiltroDni,
    setFiltroEmail,
    setFiltroEstado,
    setPaginaActual,
  } = useAseguradores();

  const filtros = filtrosConfig(
    filtroNombreApellido,
    setFiltroNombreApellido,
    filtroDni,
    setFiltroDni,
    filtroEmail,
    setFiltroEmail,
    filtroEstado,
    setFiltroEstado
  );

  const { aseguradoresActuales, paginado } = usePaginado(
    paginaActual,
    aseguradoresPorPagina,
    aseguradores,
    setPaginaActual
  );

  const acciones = (asegurador) => {
    return getAccionesPorEstado(asegurador, handleChangeState);
  };
  const handleSubmitFilters = (e) => {
    e.preventDefault();
    setCambios((prev) => !prev);
    setPaginaActual(1);
  };
  const handleChangeState = async (asegurador, newState) => {
    setLoading(true);
    try {
      await changeStateClient(asegurador, newState);
      setLoading(false);
      toast.success("El estado del asegurador ha sido modificado exitosamente.");
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
        <Header titulo="Administración de aseguradores" />

        <Table
          cabeceras={["Nombre", "Apellido", "DNI", "Email", "Estado"]}
          filtros={filtros}
          datos={aseguradoresActuales}
          keys={["name", "lastname", "dni", "email", "stateToShow"]}
          paginado={paginado}
          acciones={acciones}
          filtrosSubmit={handleSubmitFilters}
        />
      </div>
    </>
  );
}
