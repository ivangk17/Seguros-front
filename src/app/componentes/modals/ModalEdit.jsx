import { motion } from "framer-motion";
import Input from "../Input";
import { useState, useEffect } from "react";
import { validarPoliza } from "./validaciones/validaciones";

export default function ModalEdit({
  show,
  dato,
  atributos,
  onClose,
  onConfirm,
  titulo,
  tipo
}) {
  if (!show) return null; // Si no se debe mostrar, no renderiza nada

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(dato || {});
  }, [dato]);

  const validate = () => {
    const newErrors = {};
    atributos.forEach((atributo) => {
      if (atributo.required && !formData[atributo.name]) {
        newErrors[atributo.name] = `${atributo.placeholder} es obligatorio`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined, // Limpiar el error si el usuario corrige el campo
      });
    }
  };

  const handleSubmit = () => {
    let newErrors = {};
    if (tipo === "cliente") {
      // newErrors = validarCliente(formData, atributos);
    } else if (tipo === "poliza") {
      newErrors = validarPoliza(formData, atributos);
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onConfirm(formData);
    }
  };

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
          <h2 className="text-lg font-semibold">{titulo}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            &times;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
          {atributos.map((atributo, index) => (
            <div className="flex flex-col mb-4" key={index}>
              <label htmlFor={atributo.id} className="mb-1 text-gray-700 p-1">
                {atributo.placeholder}
              </label>
              <Input
                id={atributo.id}
                name={atributo.name}
                type={atributo.type}
                placeholder={atributo.placeholder}
                options={atributo.options || []}
                onChange={handleChange}
                value={formData[atributo.name] || ''}
                error={errors[atributo.name]}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
            onClick={onClose} // Cerrar al hacer clic en Cancelar
          >
            Cancelar
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Guardar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
