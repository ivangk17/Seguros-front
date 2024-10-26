import TableBodyRow from "./TableBodyRow";

export default function TableBody(props) {
  const { keys, datos, acciones } = props;
  return (
    <tbody className="divide-y divide-gray-200">
      {datos.map((dato, index) => {
        return (
          <TableBodyRow key={index} keys={keys} dato={dato} acciones={acciones} />
        );
      })}
    </tbody>
  );
}
