import { motion } from "framer-motion";
import Input from "../Input";
import { useState, useEffect } from "react";
import { validarCliente, validarPoliza } from "./validaciones/validaciones";

export default function ModalCreate(props) {
  const { titulo, show, onClose, onSubmit, atributos, tipo } = props;
  if (!show) return null;

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({});
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };
  

  const handleSubmit = () => {
    let newErrors = {};
    if (tipo === "cliente") {
      newErrors = validarCliente(formData, atributos);
    } else if (tipo === "poliza") {
      newErrors = validarPoliza(formData, atributos);
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
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
    className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl" // Cambiado de max-w-2xl a max-w-4xl
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
        ×
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
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
          />
          {errors[atributo.name] && (
            <span className="text-red-500 text-sm p-1">
              {errors[atributo.name]}
            </span>
          )}
        </div>
      ))}
    </div>

    <div className="mt-4 flex justify-end">
      <button
        className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
        onClick={onClose}
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
