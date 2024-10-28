import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useId, useEffect } from "react";

export function useOutsideClick(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

export default function ModalPolizas({ show, onClose, polizas }) {
  const [activePoliza, setActivePoliza] = useState(null);
  const ref = useRef(null);
  const id = useId();

  useOutsideClick(ref, () => setActivePoliza(null));

  const handleClose = () => {
    setActivePoliza(null);
    onClose();
  };

  if (!show) return null;

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900 bg-opacity-50 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {show && (
          <div className="fixed inset-0 flex items-center justify-center z-[100]">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9 }}
              animate={{ scale: show ? 1 : 0.9 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Pólizas del Cliente</h2>
                <button onClick={handleClose} className="text-gray-600 hover:text-gray-800">
                  &times;
                </button>
              </div>

              {!activePoliza ? (
                <div className="overflow-y-auto max-h-[60vh]">
                  {polizas.length > 0 ? (
                    <ul>
                      {polizas.map((poliza) => (
                        <motion.li
                          key={poliza._id}
                          onClick={() => setActivePoliza(poliza)}
                          className="py-2 border-b cursor-pointer"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <motion.h3
                                className="font-medium text-neutral-800 dark:text-neutral-200"
                              >
                                <strong>Dominio:</strong> {poliza.dominio}
                              </motion.h3>
                              <motion.p
                                className="text-neutral-600 dark:text-neutral-400"
                              >
                                <strong>Tipo de Cobertura:</strong> {poliza.tipoCobertura}
                              </motion.p>
                            </div>
                            <motion.button
                              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black"
                            >
                              Ver Detalles
                            </motion.button>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <p>No hay pólizas disponibles para este cliente.</p>
                  )}
                </div>
              ) : (
                <motion.div
                  ref={ref}
                  className="bg-white p-6 rounded-lg shadow-lg w-full"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <motion.h3
                        className="font-bold text-neutral-700 dark:text-neutral-200"
                      >
                        <strong>Dominio:</strong> {activePoliza.dominio}
                      </motion.h3>
                      <motion.p
                        className="text-neutral-600 dark:text-neutral-400"
                      >
                        <strong>Tipo de Cobertura:</strong> {activePoliza.tipoCobertura}
                      </motion.p>
                    </div>
                    <motion.button
                      className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black"
                      onClick={() => setActivePoliza(null)}
                    >
                      Cerrar
                    </motion.button>
                  </div>
                  <div className="pt-4 relative px-4">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400"
                    >
                      <p><strong>Aseguradora:</strong> {activePoliza.aseguradora}</p>
                      <p><strong>Prima Segura:</strong> {activePoliza.primaSegura}</p>
                      <p><strong>Deducible:</strong> {activePoliza.deducible}</p>
                      <p><strong>Vehículo:</strong></p>
                      <ul className="pl-4">
                        <li><strong>Número Identificador:</strong> {activePoliza.vehiculo.numeroIdentificador}</li>
                        <li><strong>Marca:</strong> {activePoliza.vehiculo.marca}</li>
                        <li><strong>Modelo:</strong> {activePoliza.vehiculo.modelo}</li>
                        <li><strong>Año:</strong> {activePoliza.vehiculo.anio}</li>
                        <li><strong>Dominio:</strong> {activePoliza.vehiculo.dominio}</li>
                        <li><strong>Color:</strong> {activePoliza.vehiculo.color}</li>
                        <li><strong>Tipo de Vehículo:</strong> {activePoliza.vehiculo.tipoVehiculo}</li>
                      </ul>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}