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
    visibleColumns,
  } = props;
  const columnasVisibles = {
    xs: [0, 5],
    sm: [0, 5], // Mostrar la columna 0, 1 y 5 (acciones) en pantallas pequeñas
    md: [0, 1, 2, 5], // Mostrar la columna 0, 1, 2 y 5 (acciones) en pantallas medianas
    lg: [0, 1, 2, 3, 5], // Mostrar la columna 0, 1, 2, 3 y 5 (acciones) en pantallas grandes
    xl: [0, 1, 2, 3, 4, 5], // Mostrar la columna 0, 1, 2, 3, 4 y 5 (acciones) en pantallas extra grandes
  };
  return (
    <>
      {filtros ? (
        <FormularioFiltro filtros={filtros} handleSubmit={filtrosSubmit} />
      ) : (
        ""
      )}
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm table-auto">
        <TableHeader
          cabeceras={cabeceras}
          columnasVisibles={columnasVisibles}
        />
        <TableBody
          datos={datos}
          keys={keys}
          acciones={acciones}
          columnasVisibles={columnasVisibles}
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
