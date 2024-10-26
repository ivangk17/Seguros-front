export default function ConfirmDeleteModal(props) {
  const { show, dato, onClose, onConfirm, atributos } = props;
  if (!show) return null; // Si no se debe mostrar, no renderiza nada

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">{props.mensaje}</h2>
        <h3 className="text-gray-500 mb-4">Esta acción es irreversible.</h3>
        <p>
          {atributos.map((atributo) => (
            dato[atributo] + " " 
          ))}
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
            onClick={() => onConfirm(dato._id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
