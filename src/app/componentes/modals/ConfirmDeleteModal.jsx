import { motion } from "framer-motion";

export default function ConfirmDeleteModal(props) {
  const {
    show,
    dato,
    onClose,
    onConfirm,
    atributos,
    mensaje,
    mensajeAdicional = "",
  } = props;
  if (!show) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-11/12 sm:w-96 max-w-md mx-auto"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-lg sm:text-xl font-semibold">{mensaje}</h2>
        <h3 className="text-gray-500 mb-4 mt-2 text-sm sm:text-base">
          Esta acción es irreversible. {mensajeAdicional}
        </h3>
        <p className="text-sm sm:text-base mb-4">
          {atributos.map((atributo) => (
            <span key={atributo}>{dato ? dato[atributo] : ""} </span>
          ))}
        </p>
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-400 text-white px-3 py-2 rounded text-sm sm:text-base"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-red-600 text-white px-3 py-2 rounded text-sm sm:text-base"
            onClick={() => onConfirm(dato._id)}
          >
            Eliminar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
