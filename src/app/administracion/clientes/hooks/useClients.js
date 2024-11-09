import { useState, useEffect } from "react";
import { fetchClients } from "../services/clientsService";

export const useClients = () => {
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clienteDNI, setClienteDNI] = useState();
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  const fetchClientsData = async () => {
    setLoading(true);
    try {
      const data = await fetchClients(
        filtroNombreApellido,
        filtroDni,
        filtroEmail,
        filtroTelefono,
        filtroEstado
      );
      setClientes(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientsData();
  }, [cambios]);

  return {
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
    setClientesPorPagina,
    setCambios,
    setLoading,
    clienteDNI,
    setClienteDNI,
    clienteSeleccionado,
    setClienteSeleccionado
  };
};
