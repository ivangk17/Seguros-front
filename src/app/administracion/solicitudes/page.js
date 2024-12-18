"use client";
import { useEffect, useState } from "react";
import ScreenLoader from "@/app/componentes/ScreenLoader";
import Table from "@/app/componentes/table/Table";
import { motion } from "framer-motion";
import SolicitudDetalles from "@/app/administracion/solicitudes/SolicitudDetalles";
import { Modal, Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/app/componentes/clientes/Header";

const SolicitudesPage = () => {
  const api = process.env.NEXT_PUBLIC_URL_API;
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

  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroNombrePropietario, setFiltroNombrePropietario] = useState("");
/*   const [filtroFechaOcurrencia, setFiltroFechaOcurrencia] = useState(""); */
  const [paginaActual, setPaginaActual] = useState(1);
  const [solicitudesPorPagina] = useState(15);

  const fetchSolicitudes = async (
    estadoSolicitud,
    nombrePropietarioAsegurado,
/*     fechaOcurrencia */
  ) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        ...(estadoSolicitud && { estadoSolicitud }),
        ...(nombrePropietarioAsegurado && { nombrePropietarioAsegurado }),
/*         ...(fechaOcurrencia && { fechaDesde: fechaOcurrencia }), */
      }).toString();

      const url = `${api}solicitudes/list?${queryParams}`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Error al obtener solicitudes");

      const data = await response.json();
      setSolicitudes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setPaginaActual(1);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const handleAccept = async (solicitud) => {
    if (solicitud.estado !== "PENDIENTE") {
      toast.warning("Solo se pueden aceptar solicitudes en estado pendiente.");
      return;
    }

    try {
      const response = await fetch(`${api}solicitudes/modificarEstado`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          idSolicitud: solicitud._id,
          nuevoEstado: "ACEPTADO",
        }),
      });

      if (!response.ok) throw new Error("Error al aceptar la solicitud");

      await response.json();
      toast.success("Solicitud aceptada con éxito");
      fetchSolicitudes();
    } catch (err) {
      setError(err.message);
      toast.error("Error al aceptar la solicitud");
    }
  };

  const handleReject = async (solicitud) => {
    if (solicitud.estado !== "PENDIENTE") {
      toast.warning("Solo se pueden rechazar solicitudes en estado pendiente.");
      return;
    }

    try {
      const response = await fetch(`${api}solicitudes/modificarEstado`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          idSolicitud: solicitud._id,
          nuevoEstado: "RECHAZADO",
        }),
      });

      if (!response.ok) throw new Error("Error al rechazar la solicitud");

      await response.json();
      toast.success("Solicitud rechazada con éxito");
      fetchSolicitudes();
    } catch (err) {
      setError(err.message);
      toast.error("Error al rechazar la solicitud");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setRejectReason("");
  };

  const handleModalSubmit = async () => {
    if (selectedSolicitud.estado !== "PENDIENTE") {
      toast.warning("Solo se pueden rechazar solicitudes en estado pendiente.");
      return;
    }

    try {
      const response = await fetch(`${api}solicitudes/modificarEstado`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          idSolicitud: selectedSolicitud._id,
          nuevoEstado: "RECHAZADO",
          razonRechazo: rejectReason,
        }),
      });

      if (!response.ok) throw new Error("Error al rechazar la solicitud");

      await response.json();
      toast.success("Solicitud rechazada con éxito");
      fetchSolicitudes();
      handleModalClose();
    } catch (err) {
      setError(err.message);
      toast.error("Error al rechazar la solicitud");
    }
  };

  const paginado = {
    total: solicitudes.length,
    datosPorPagina: solicitudesPorPagina,
    paginaActual: paginaActual,
    funcion: (numeroPagina) => setPaginaActual(numeroPagina),
  };

  const handleSubmitFilters = (e) => {
    e.preventDefault();
    fetchSolicitudes(
      filtroEstado,
      filtroNombrePropietario,
/*       filtroFechaOcurrencia */
    );
  };

  const handleDescargarReporte = async (solicitud) => {
    try {
      const response = await fetch(
        `${api}solicitudes/getSolicitudPdf/${solicitud._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(data.error);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "solicitud.pdf";

      // Añadir el enlace al DOM, clicarlo y luego eliminarlo
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Liberar el objeto URL después de la descarga
      window.URL.revokeObjectURL(url);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const acciones = (solicitud) => {
    return getAccionesPorEstado(
      solicitud,
      handleDescargarReporte,
      handleAccept,
      handleReject
    );
  };

  const getAccionesPorEstado = (
    solicitud,
    handleDescargarReporte,
    handleAccept,
    handleReject
  ) => {
    const descargarReporteAction = {
      nombre: "Descargar reporte",
      funcion: handleDescargarReporte,
    };
    let acciones = [descargarReporteAction];
    if (solicitud.estado === "PENDIENTE") {
      acciones = [
        ...acciones,
        {
          nombre: "Aceptar",
          funcion: handleAccept,
          disabled: (solicitud) => solicitud.estado !== "PENDIENTE",
        },
        {
          nombre: "Rechazar",
          funcion: handleReject,
          disabled: (solicitud) => solicitud.estado !== "PENDIENTE",
        },
      ];
    }
    return acciones;
  };

  /*   const acciones = [
    {
      nombre: "Descargar reporte",
      funcion: handleDescargarReporte,
    },
    {
      nombre: "Aceptar",
      funcion: handleAccept,
      disabled: (solicitud) => solicitud.estado !== "PENDIENTE",
    },
    {
      nombre: "Rechazar",
      funcion: handleReject,
      disabled: (solicitud) => solicitud.estado !== "PENDIENTE",
    },
  ]; */

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
        <Header titulo="Administración de solicitudes" />
        <Table
          cabeceras={[
            "Nombre Completo",
            "Estado",
            "Email",
            "Teléfono",
            "Fecha Siniestro",
          ]}
          datos={solicitudes.slice(
            (paginaActual - 1) * solicitudesPorPagina,
            paginaActual * solicitudesPorPagina
          )}
          keys={[
            "propietarioAsegurado.datosPersona.nombreCompleto",
            "estado",
            "propietarioAsegurado.datosPersona.email",
            "propietarioAsegurado.datosPersona.telefono",
            "datosSiniestro.fechaOcurrencia",
          ]}
          acciones={acciones}
          paginado={paginado}
          filtros={[
            {
              valor: filtroEstado,
              funcion: setFiltroEstado,
              id: "estado",
              name: "estado",
              type: "select",
              placeholder: "Estado",
              options: [
                { value: "", label: "Estado" },
                { value: "ACEPTADO", label: "Aceptado" },
                { value: "PENDIENTE", label: "Pendiente" },
                { value: "RECHAZADO", label: "Rechazado" },
              ],
            },
            {
              valor: filtroNombrePropietario,
              funcion: setFiltroNombrePropietario,
              id: "propietario",
              name: "propietario",
              type: "text",
              placeholder: "Nombre completo",
            },
            /* {
              valor: filtroFechaOcurrencia,
              funcion: setFiltroFechaOcurrencia,
              id: "fechaOcurrencia",
              name: "fechaOcurrencia",
              type: "date",
              placeholder: "Fecha desde",
            }, */
          ]}
          filtrosSubmit={handleSubmitFilters}
          responsiveTable="2"
        />
        {selectedSolicitud && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: selectedSolicitud ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl h-full bg-white shadow-lg p-6 overflow-y-auto z-50 dark:bg-gray-800"
              initial={{ scale: 0.9 }}
              animate={{ scale: selectedSolicitud ? 1 : 0.9 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setSelectedSolicitud(null)}
                  className="text-right text-black dark:text-black"
                >
                  x
                </button>
              </div>
              <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
                Detalles de la Solicitud
              </h3>
              <SolicitudDetalles selectedSolicitud={selectedSolicitud} />
            </motion.div>
          </motion.div>
        )}
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Razón del rechazo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Especifica la razón del rechazo"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={handleModalSubmit}>
            Rechazar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SolicitudesPage;
