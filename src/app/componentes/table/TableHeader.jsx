import TableHeaderItem from "./TableHeaderItem";

export default function TableHeader(props) {
  const { cabeceras, columnasVisibles } = props;
  return (
    <thead className="ltr:text-left rtl:text-right">
      <tr>
        {cabeceras.map((cabecera, index) => {
          const visibilityClass = getVisibilityClass(index, columnasVisibles);
          console.log(index);
          return (
            <TableHeaderItem
              key={index}
              nombreColumna={cabecera}
              visibilityClass={visibilityClass}
            />
          );
        })}
        <th
          className={`whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center ${getVisibilityClass(
            cabeceras.length,
            columnasVisibles
          )}`}
        >
          Acciones
        </th>
      </tr>
    </thead>
  );
}

function getVisibilityClass(index, columnasVisibles) {
  let visibilityClass = "hidden"; // Por defecto, ocultar la columna

  // Asignar las clases correspondientes a cada tamaño de pantalla
  if (columnasVisibles.xs.includes(index)) visibilityClass += " col-xs-visible "; // Pantallas menores a 640px
  if (columnasVisibles.sm.includes(index)) visibilityClass += " sm:table-cell "; // sm
  if (columnasVisibles.md.includes(index)) visibilityClass += " md:table-cell "; // md
  if (columnasVisibles.lg.includes(index)) visibilityClass += " lg:table-cell "; // lg
  if (columnasVisibles.xl.includes(index)) visibilityClass += " xl:table-cell "; // xl

  return visibilityClass.trim(); // Devuelve las clases concatenadas
}
