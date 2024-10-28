// ModalPolizas.js
import { motion } from "framer-motion";

export default function ModalPolizas({ show, onClose, polizas }) {
  if (!show) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: show ? 1 : 0.9 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Pólizas del Cliente</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            &times;
          </button>
        </div>

        <div className="overflow-y-auto max-h-60">
          {polizas.length > 0 ? (
            <ul>
              {polizas.map((poliza) => (
                <li key={poliza._id} className="py-2 border-b">
                  <p><strong>Asegurado:</strong> {poliza.asegurado}</p>
                  <p><strong>Dominio:</strong> {poliza.dominio}</p>
                  <p><strong>Tipo de Cobertura:</strong> {poliza.tipoCobertura}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay pólizas disponibles para este cliente.</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
