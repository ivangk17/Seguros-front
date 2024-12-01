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
      sm: [2, 3, 6],
      md: [0, 2, 3, 6],
      lg: [0, 2, 3, 5, 6],
      xl: [0, 1, 2, 3, 4, 5, 6],
    },
    {
      xs: [0, 1, 10],
      sm: [0, 1, 10],
      md: [0, 1, 2, 3, 4, 10],
      lg: [0, 1, 2, 3, 4, 5, 6, 7, 10],
      xl: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    {
      xs: [0, 1, 5],
      sm: [0, 1, 5],
      md: [0, 1, 2, 5],
      lg: [0, 1, 2, 3, 5],
      xl: [0, 1, 2, 3, 4, 5],
    },
    {
      xs: [2, 5],
      sm: [2, 3, 5],
      md: [0, 2, 3, 5],
      lg: [0, 2, 3, 5],
      xl: [0, 1, 2, 3, 4, 5],
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
