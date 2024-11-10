import { useState, useEffect } from "react";
import { fetchAseguradores } from "../services/aseguradoresService";

export const useAseguradores = () => {
  const [aseguradores, setAseguradores] = useState([]);
  const [cambios, setCambios] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [aseguradoresPorPagina, setAseguradoresPorPagina] = useState(10);
  const [filtroNombreApellido, setFiltroNombreApellido] = useState("");
  const [filtroDni, setFiltroDni] = useState("");
  const [filtroEmail, setFiltroEmail] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const fetchAseguradoresData = async () => {
    setLoading(true);
    try {
      const data = await fetchAseguradores(
        filtroNombreApellido,
        filtroDni,
        filtroEmail,
        filtroEstado
      );
      setAseguradores(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAseguradoresData();
  }, [cambios]);

  return {
    aseguradores,
    setAseguradores,
    cambios,
    setCambios,
    loading,
    setLoading,
    aseguradoresPorPagina,
    paginaActual,
    setPaginaActual,
    setAseguradoresPorPagina,
    filtroNombreApellido,
    filtroDni,
    filtroEmail,
    filtroEstado,
    setFiltroNombreApellido,
    setFiltroDni,
    setFiltroEmail,
    setFiltroEstado,
  };
};
