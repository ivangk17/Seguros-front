export default function TableBodyRow(props) {
  const { dato, keys, acciones } = props;
  return (
    <tr key={dato._id}>
      {keys.map((key) => (
        <td key={key} className="whitespace-nowrap px-4 py-2 text-center">
          {dato[key] || "S/D"}
        </td>
      ))}
      {acciones
        ? acciones.map((accion, index) => (
            <td key={index} className="whitespace-nowrap px-4 py-2 text-center">
              <button
                className={` ${accion.color} ${accion.hover} inline-block rounded px-4 py-2 text-xs font-medium text-white `}
                onClick={() => accion.funcion(dato)}
              >
                {accion.nombre}
              </button>
            </td>
          ))
        : ""}
    </tr>
  );
}
