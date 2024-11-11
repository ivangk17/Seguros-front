import TableBodyRow from "./TableBodyRow";

export default function TableBody(props) {
  const { keys, datos, acciones, columnasVisibles } = props;
  return (
    <tbody className="divide-y divide-gray-200">
      {datos.length === 0 ? (
        <tr>
          <td colSpan={keys.length} className="text-center py-4 text-gray-500">
            No hay registros con los filtros aplicados
          </td>
        </tr>
      ) : (
        datos.map((dato, index) => (
          <TableBodyRow
            key={index}
            keys={keys}
            dato={dato}
            acciones={acciones}
            columnasVisibles={columnasVisibles}
          />
        ))
      )}
    </tbody>
  );
}
