import { useState } from "react";

export const usePaginado = (items, itemsPorPagina) => {
  const [paginaActual, setPaginaActual] = useState(1);

  const indexOfLastItem = paginaActual * itemsPorPagina;
  const indexOfFirstItem = indexOfLastItem - itemsPorPagina;
  const itemsActuales = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (numeroPagina) => setPaginaActual(numeroPagina);

  const resetPagina = () => setPaginaActual(1);

  return {
    itemsActuales,
    paginaActual,
    itemsPorPagina,
    totalItems: items.length,
    paginate,
    resetPagina, // Asegúrate de que esta función esté incluida
  };
};