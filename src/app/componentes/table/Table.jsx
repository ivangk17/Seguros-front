import Pagination from "./Pagination";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import FormularioFiltro from "./FormularioFiltro";

export default function Table(props) {
  const { acciones, filtros, paginado, cabeceras, datos, keys, filtrosSubmit } =
    props;
  return (
    <>
      {filtros ? (
        <FormularioFiltro filtros={filtros} handleSubmit={filtrosSubmit} />
      ) : (
        ""
      )}
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <TableHeader cabeceras={cabeceras} />
        <TableBody datos={datos} keys={keys} acciones={acciones} />
      </table>
      {paginado ? <Pagination paginado={paginado} /> : ""}
    </>
  );
}


{/* <div className="flex justify-between items-center mt-4">
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
</div> */}