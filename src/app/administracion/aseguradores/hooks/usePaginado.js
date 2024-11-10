export const usePaginado = (
  paginaActual,
  aseguradoresPorPagina,
  datos,
  setPaginaActual
) => {
  const totalAseguradores = datos.length;
  const indexOfLastClient = paginaActual * aseguradoresPorPagina;
  const indexOfFirstClient = indexOfLastClient - aseguradoresPorPagina;
  const aseguradoresActuales = datos.slice(
    indexOfFirstClient,
    indexOfLastClient
  );

  const paginate = (numeroPagina) => setPaginaActual(numeroPagina);

  const paginado = {
    total: totalAseguradores,
    datosPorPagina: aseguradoresPorPagina,
    paginaActual: paginaActual,
    funcion: paginate,
  };

  return {
    aseguradoresActuales,
    paginado,
  };
};
