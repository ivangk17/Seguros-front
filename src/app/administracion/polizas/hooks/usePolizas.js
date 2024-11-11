// hooks/usePolizas.js
import { useState, useEffect } from "react";
import { fetchPolizas } from "../services/polizasService";
import { fetchClientById } from "../services/polizasService";

export const usePolizas = () => {
  const [polizas, setPolizas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtroDominio, setFiltroDominio] = useState("");

  const fetchPolizasData = async () => {
    setLoading(true);
    try {
      const polizasData = await fetchPolizas(filtroDominio);

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
  }, [filtroDominio]);

  return {
    polizas,
    loading,
    error,
    filtroDominio,
    setFiltroDominio,
    fetchPolizasData,
  };
};
