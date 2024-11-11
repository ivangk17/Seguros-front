// hooks/usePolizas.js
import { useState, useEffect } from "react";
import { fetchPolizas } from "../services/polizasService";
import { fetchClientById } from "../services/polizasService"; // Importa el endpoint para obtener el cliente por ID

export const usePolizas = () => {
  const [polizas, setPolizas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtroDominio, setFiltroDominio] = useState("");

  const fetchPolizasData = async () => {
    setLoading(true);
    try {
      const polizasData = await fetchPolizas(filtroDominio);

      // Agregar el nombre completo de cada cliente asegurado a cada póliza
      const polizasWithClientNames = await Promise.all(
        polizasData.map(async (poliza) => {
          try {
            // Llama al endpoint para obtener los detalles del cliente
            const cliente = await fetchClientById(poliza.asegurado);
            const nombreCompleto = `${cliente.name} ${cliente.lastname}`;
            return { ...poliza, aseguradoNombre: nombreCompleto };
          } catch {
            // Maneja el caso donde el cliente no existe o falla la solicitud
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
