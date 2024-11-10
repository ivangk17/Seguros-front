export const usePaginado = (paginaActual, clientesPorPagina, datos, setPaginaActual) => {
    const totalClientes = datos.length;
    const indexOfLastClient = paginaActual * clientesPorPagina;
    const indexOfFirstClient = indexOfLastClient - clientesPorPagina;
    const clientesActuales = datos.slice(indexOfFirstClient, indexOfLastClient);
  
    // Función para cambiar de página
    const paginate = (numeroPagina) => setPaginaActual(numeroPagina);
  
    const paginado = {
      total: totalClientes,
      datosPorPagina: clientesPorPagina,
      paginaActual: paginaActual,
      funcion: paginate,
    };
  
    return {
      clientesActuales,
      paginado,
    };
  };
