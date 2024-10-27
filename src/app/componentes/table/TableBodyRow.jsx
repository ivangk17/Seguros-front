import Acciones from "./Acciones";

export default function TableBodyRow(props) {
  const { dato, keys, acciones } = props;
  return (
    <tr key={dato._id}>
      {keys.map((key) => (
        <td key={key} className="whitespace-nowrap px-4 py-2 text-center">
          {dato[key] || "S/D"}
        </td>
      ))}
      {acciones && (
        <td className="whitespace-nowrap px-6 py-4 text-center">
          <Acciones acciones={acciones} dato={dato} />
        </td>
      )}
    </tr>
  );
}
