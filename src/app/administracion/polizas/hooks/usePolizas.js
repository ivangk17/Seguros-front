import { useState, useEffect } from "react";
import { fetchPolizas, fetchClients } from "../services/polizasService";
import { usePaginado } from "../hooks/usePaginado";

export const usePolizas = () => {
  const [polizas, setPolizas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtroDominio, setFiltroDominio] = useState("");
  const [filtroAsegurado, setFiltroAsegurado] = useState("");
  const [filtroCobertura, setFiltroCobertura] = useState("");
  const [cambios, setCambios] = useState(false);
  const [aseguradosOptions, setAseguradosOptions] = useState([]);

  const { itemsActuales: polizasActuales, paginaActual, itemsPorPagina, totalItems, paginate, resetPagina } = usePaginado(polizas, 10);

  const fetchPolizasData = async () => {
    setLoading(true);
    try {
      const polizasData = await fetchPolizas(
        filtroDominio,
        filtroAsegurado,
        filtroCobertura
      );

      const polizasWithClientNames = polizasData.map((poliza) => ({
        ...poliza,
        aseguradoNombre: `${poliza.aseguradoNombre} ${poliza.aseguradoApellido}`,
      }));

      setPolizas(polizasWithClientNames);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAseguradosOptions = async () => {
    try {
      const clients = await fetchClients();
      const options = clients.map(client => ({
        value: client._id,
        label: `${client.name} ${client.lastname}`
      }));
      setAseguradosOptions(options);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchPolizasData();
  }, [cambios]);

  useEffect(() => {
    fetchAseguradosOptions();
  }, []);

  return {
    polizas: polizasActuales,
    loading,
    error,
    filtroDominio,
    setFiltroDominio,
    filtroAsegurado,
    setFiltroAsegurado,
    filtroCobertura,
    setFiltroCobertura,
    fetchPolizasData,
    setCambios,
    aseguradosOptions,
    paginaActual,
    itemsPorPagina,
    totalItems,
    paginate,
    resetPagina, // Asegúrate de que esta función esté incluida
  };
};