export default function ConfirmDeleteModal({
  show,
  client,
  onClose,
  onConfirm,
}) {
  if (!show) return null; // Si no se debe mostrar, no renderiza nada

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          ¿Está seguro de que desea eliminar este cliente?
        </h2>
        <p>
          {client?.name} {client?.lastname} (DNI: {client?.dni})
        </p>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={() => onConfirm(client._id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
