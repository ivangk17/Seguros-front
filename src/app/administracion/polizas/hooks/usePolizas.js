import { useState, useEffect } from "react";
import { fetchPolizas, fetchClientById } from "../services/polizasService";

export const usePolizas = () => {
  const [polizas, setPolizas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtroDominio, setFiltroDominio] = useState("");
  const [filtroAsegurado, setFiltroAsegurado] = useState("");
  const [filtroCobertura, setFiltroCobertura] = useState("");
  const [cambios, setCambios] = useState(false);

  const fetchPolizasData = async () => {
    setLoading(true);
    try {
      const polizasData = await fetchPolizas(
        filtroDominio.toUpperCase(),
        filtroAsegurado,
        filtroCobertura
      );

      const polizasWithClientNames = await Promise.all(
        polizasData.map(async (poliza) => {
          try {
            const cliente = await fetchClientById(poliza.asegurado);
            const nombreCompleto = `${cliente.name} ${cliente.lastname}`;
            return { ...poliza, aseguradoNombre: nombreCompleto };
          } catch {
            return { ...poliza, aseguradoNombre: "Cliente no encontrado" };
          }
        })
      );

      setPolizas(polizasWithClientNames);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolizasData();
  }, [cambios]);

  return {
    polizas,
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
  };
};
