import Acciones from "./Acciones";

const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj) || "S/D";
};

export default function TableBodyRow(props) {
  const { dato, keys, acciones } = props;
  return (
    <tr key={dato._id} className="dark:text-black"> 
      {keys.map((key) => (
        <td key={key} className="whitespace-nowrap px-4 py-2 text-center dark:text-black">
          {getNestedValue(dato, key)}
        </td>
      ))}
      {acciones && (
        <td className="whitespace-nowrap px-6 py-4 text-center dark:text-black">
          <Acciones acciones={acciones} dato={dato} />
        </td>
      )}
    </tr>
  );
}
