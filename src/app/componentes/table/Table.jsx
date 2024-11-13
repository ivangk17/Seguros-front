import Pagination from "./Pagination";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import FormularioFiltro from "./FormularioFiltro";

export default function Table(props) {
  const {
    acciones,
    filtros,
    paginado,
    cabeceras,
    datos,
    keys,
    filtrosSubmit,
    responsiveTable,
  } = props;
  const columnasVisibles = [
    {
      xs: [2, 6],
      sm: [2, 3, 6], // Mostrar la columna 0, 1 y 5 (acciones) en pantallas pequeñas
      md: [0, 2, 3, 6], // Mostrar la columna 0, 1, 2 y 5 (acciones) en pantallas medianas
      lg: [0, 2, 3, 5, 6], // Mostrar la columna 0, 1, 2, 3 y 5 (acciones) en pantallas grandes
      xl: [0, 1, 2, 3, 4, 5, 6], // Mostrar la columna 0, 1, 2, 3, 4 y 5 (acciones) en pantallas extra grandes
    },
    {
      xs: [0, 1, 10],
      sm: [0, 1, 10], // Mostrar la columna 0, 1 y 5 (acciones) en pantallas pequeñas
      md: [0, 1, 2, 3, 4, 10], // Mostrar la columna 0, 1, 2 y 5 (acciones) en pantallas medianas
      lg: [0, 1, 2, 3, 4, 5, 6, 7, 10], // Mostrar la columna 0, 1, 2, 3 y 5 (acciones) en pantallas grandes
      xl: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // Mostrar la columna 0, 1, 2, 3, 4 y 5 (acciones) en pantallas extra grandes
    },
    {
      xs: [0, 1, 5],
      sm: [0, 1, 5], // Mostrar la columna 0, 1 y 5 (acciones) en pantallas pequeñas
      md: [0, 1, 2, 5], // Mostrar la columna 0, 1, 2 y 5 (acciones) en pantallas medianas
      lg: [0, 1, 2, 3, 5], // Mostrar la columna 0, 1, 2, 3 y 5 (acciones) en pantallas grandes
      xl: [0, 1, 2, 3, 4, 5], // Mostrar la columna 0, 1, 2, 3, 4 y 5 (acciones) en pantallas extra grandes
    },
    {
      xs: [2, 5],
      sm: [2, 3, 5], // Mostrar la columna 0, 1 y 5 (acciones) en pantallas pequeñas
      md: [0, 2, 3, 5], // Mostrar la columna 0, 1, 2 y 5 (acciones) en pantallas medianas
      lg: [0, 2, 3, 5], // Mostrar la columna 0, 1, 2, 3 y 5 (acciones) en pantallas grandes
      xl: [0, 1, 2, 3, 4, 5], // Mostrar la columna 0, 1, 2, 3, 4 y 5 (acciones) en pantallas extra grandes
    },
  ];
  const cols = columnasVisibles[responsiveTable];

  return (
    <>
      {filtros ? (
        <FormularioFiltro filtros={filtros} handleSubmit={filtrosSubmit} />
      ) : (
        ""
      )}
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm table-auto">
        <TableHeader cabeceras={cabeceras} columnasVisibles={cols} />
        <TableBody
          datos={datos}
          keys={keys}
          acciones={acciones}
          columnasVisibles={cols}
        />
      </table>
      {paginado ? <Pagination paginado={paginado} /> : ""}
    </>
  );
}

{
  /* <div className="flex justify-between items-center mt-4">
<Pagination paginado={paginado} />
<div className="flex items-center">
  <label htmlFor="clientesPorPagina" className="mr-2">
    Registros por página:
  </label>
  <select
    id="clientesPorPagina"
    value={clientesPorPagina}
    onChange={handleClientesPorPaginaChange}
    className="border rounded px-4 py-2"
  >
    <option value={5}>5</option>
    <option value={10}>10</option>
    <option value={15}>15</option>
    <option value={20}>20</option>
  </select>
</div>
</div> */
}
