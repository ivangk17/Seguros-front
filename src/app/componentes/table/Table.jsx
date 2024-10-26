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
