export default function ClientsTable({ clients, handleEdit, handleDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
              Nombre
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
              Apellido
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
              DNI
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
              Email
            </th>
            <th className="px-4 py-2 text-center"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {clients.map((client) => (
            <tr key={client._id}>
              <td className="whitespace-nowrap px-4 py-2 text-center">
                {client.name}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-center">
                {client.lastname}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-center">
                {client.dni}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-center">
                {client.email}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-center">
                <button
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  onClick={() => handleEdit(client)}
                >
                  Editar
                </button>
                <button
                  className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700 ml-2"
                  onClick={() => handleDelete(client)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
