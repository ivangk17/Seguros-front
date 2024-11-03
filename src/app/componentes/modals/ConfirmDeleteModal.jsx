import { motion } from "framer-motion";

export default function ConfirmDeleteModal(props) {
  const { show, dato, onClose, onConfirm, atributos, mensaje } = props;
  if (!show) return null; // Si no se debe mostrar, no renderiza nada

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        initial={{ scale: 0.9 }}
        animate={{ scale: show ? 1 : 0.9 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold">{mensaje}</h2>
        <h3 className="text-gray-500 mb-4">Esta acción es irreversible.</h3>
        <p>
          {atributos.map((atributo) => (
            <span key={atributo}>{dato ? dato[atributo] : ""} </span>
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
      </motion.div>
    </motion.div>
  );
}

