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

      // Asegúrate de que `asegurado` esté definido antes de llamar a `fetchClientById`
      const polizasWithClientNames = await Promise.all(
        polizasData.map(async (poliza) => {
          if (poliza.asegurado) {  // Verifica si el ID del asegurado está definido
            const cliente = await fetchClientById(poliza.asegurado);
            return {
              ...poliza,
              aseguradoNombre: `${cliente.name} ${cliente.lastname}`,
            };
          } else {
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
