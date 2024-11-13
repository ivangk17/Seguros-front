import Acciones from "./Acciones";

const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj) || "S/D";
};

export default function TableBodyRow(props) {
  const { dato, keys, acciones, columnasVisibles } = props;
  const accionesDinamicas =
    typeof acciones === "function" ? acciones(dato) : acciones;
  return (
    <tr key={dato._id} className="dark:text-black">
      {keys.map((key, index) => {
        // Obtener la clase de visibilidad de la columna
        const visibilityClass = getVisibilityClass(index, columnasVisibles);

        return (
          <td
            key={key}
            className={`whitespace-nowrap px-4 py-2 text-center dark:text-black ${visibilityClass}`}
          >
            {getNestedValue(dato, key)}
          </td>
        );
      })}
      {acciones && (
        <td
          className={`whitespace-nowrap px-4 py-2 text-center dark:text-black ${getVisibilityClass(
            keys.length,
            columnasVisibles
          )}`}
        >
          <Acciones acciones={accionesDinamicas} dato={dato} />
        </td>
      )}
    </tr>
  );
}
function getVisibilityClass(index, columnasVisibles) {
  let visibilityClass = "hidden"; // Por defecto, ocultar la columna

  // Asignar las clases correspondientes a cada tamaño de pantalla
  if (columnasVisibles.xs.includes(index))
    visibilityClass += " col-xs-visible "; // Pantallas menores a 640px
  if (columnasVisibles.sm.includes(index)) visibilityClass += " sm:table-cell "; // sm
  if (columnasVisibles.md.includes(index)) visibilityClass += " md:table-cell "; // md
  if (columnasVisibles.lg.includes(index)) visibilityClass += " lg:table-cell "; // lg
  if (columnasVisibles.xl.includes(index)) visibilityClass += " xl:table-cell "; // xl

  return visibilityClass.trim(); // Devuelve las clases concatenadas
}
