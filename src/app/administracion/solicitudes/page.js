"use client";
import { useEffect, useState } from "react";
import ScreenLoader from "@/app/componentes/ScreenLoader";
import { ToastContainer } from "react-toastify";
import Table from "@/app/componentes/table/Table";
import { motion } from "framer-motion";
import SolicitudDetalles from "@/app/administracion/solicitudes/SolicitudDetalles";
import { Modal, Button } from "react-bootstrap";

const SolicitudesPage = () => {
  const api = process.env.NEXT_PUBLIC_URL_API;

  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroNombrePropietario, setFiltroNombrePropietario] = useState("");
  const [filtroFechaOcurrencia, setFiltroFechaOcurrencia] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [solicitudesPorPagina] = useState(15);

  const fetchSolicitudes = async (
    estadoSolicitud,
    nombrePropietarioAsegurado,
    fechaOcurrencia
  ) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        ...(estadoSolicitud && { estadoSolicitud }),
        ...(nombrePropietarioAsegurado && { nombrePropietarioAsegurado }),
        ...(fechaOcurrencia && { fechaDesde: fechaOcurrencia }),
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
      console.log(data);
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

  const indexOfLastSolicitud = paginaActual * solicitudesPorPagina;
  const indexOfFirstSolicitud = indexOfLastSolicitud - solicitudesPorPagina;
  const solicitudesActuales = solicitudes.slice(
    indexOfFirstSolicitud,
    indexOfLastSolicitud
  );

  const paginate = (numeroPagina) => setPaginaActual(numeroPagina);

  const handleView = (solicitud) => {
    setSelectedSolicitud(solicitud);
  };

  const handleAccept = async (solicitud) => {
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

      const updatedSolicitud = await response.json();
      setSolicitudes(
        solicitudes.map((s) =>
          s.id === updatedSolicitud.id ? updatedSolicitud : s
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReject = (solicitud) => {
    setSelectedSolicitud(solicitud); // Establecer la solicitud seleccionada
    setRejectReason(""); // Limpiar el motivo de rechazo
    setShowModal(true); // Mostrar el modal
  };

  const handleModalClose = () => {
    setShowModal(false);
    setRejectReason(""); // Limpiar el motivo de rechazo al cerrar el modal
  };

  const handleModalSubmit = async () => {
    try {
      const response = await fetch(`${api}solicitudes/modificarEstado`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          idSolicitud: selectedSolicitud.id,
          nuevoEstado: "RECHAZADO",
          razonRechazo: rejectReason, // Si necesitas enviar la razón del rechazo
        }),
      });

      if (!response.ok) throw new Error("Error al rechazar la solicitud");

      const updatedSolicitud = await response.json();
      setSolicitudes(
        solicitudes.map((s) =>
          s.id === updatedSolicitud.id ? updatedSolicitud : s
        )
      );
      setShowModal(false);
      setRejectReason(""); // Limpiar el motivo de rechazo después del envío
    } catch (err) {
      setError(err.message);
    }
  };

  const acciones = [
    {
      nombre: "Ver",
      funcion: handleView,
    },
    {
      nombre: "Aceptar",
      funcion: handleAccept,
    },
    {
      nombre: "Rechazar",
      funcion: handleReject,
    },
  ];

  const paginado = {
    total: solicitudes.length,
    datosPorPagina: solicitudesPorPagina,
    paginaActual: paginaActual,
    funcion: paginate,
  };

  const handleSubmitFilters = (e) => {
    e.preventDefault();
    fetchSolicitudes(
      filtroEstado,
      filtroNombrePropietario,
      filtroFechaOcurrencia
    );
  };

  const filtros = [
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
    {
      valor: filtroFechaOcurrencia,
      funcion: setFiltroFechaOcurrencia,
      id: "fechaOcurrencia",
      name: "fechaOcurrencia",
      type: "date",
      placeholder: "Fecha desde",
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
      <div className="bg-white shadow-lg rounded-lg w-full p-6 dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-black dark:text-white">
          Administración de solicitudes
        </h2>
        <Table
          cabeceras={[
            "Nombre Completo",
            "Estado",
            "CUIT",
            "Email",
            "Teléfono",
            "Fecha Siniestro",
          ]}
          datos={solicitudesActuales}
          keys={[
            "propietarioAsegurado.datosPersona.nombreCompleto",
            "estado",
            "propietarioAsegurado.datosPersona.cuit",
            "propietarioAsegurado.datosPersona.email",
            "propietarioAsegurado.datosPersona.telefono",
            "datosSiniestro.fechaOcurrencia",
          ]}
          acciones={acciones}
          paginado={paginado}
          filtros={filtros}
          filtrosSubmit={handleSubmitFilters}
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
          <Modal.Title>Razón del Rechazo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            className="form-control"
            placeholder="Escribe el motivo del rechazo..."
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleModalSubmit}>
            Rechazar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SolicitudesPage;
