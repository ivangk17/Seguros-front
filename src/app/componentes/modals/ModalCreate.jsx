import { motion } from "framer-motion";
import Input from "../Input";
import SelectWithSearch from "../SelectWithSearch";
import { useState, useEffect } from "react";
import { validarCliente, validarPoliza } from "./validaciones/validaciones";

export default function ModalCreate(props) {
  const {
    titulo,
    show,
    onClose,
    onSubmit,
    atributos,
    tipo,
    initialData = {},
    disabled
  } = props;
  if (!show) return null;

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (show) {
      setFormData(initialData);
    }
  }, [show]);

  const handleChange = (e, actionMeta) => {
    const { name, value } = e.target ? e.target : actionMeta;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
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
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 dark:bg-gray-700 dark:bg-opacity-70"
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: show ? 1 : 0.9 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            {titulo}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {atributos.map((atributo, index) => (
            <div className="flex flex-col mb-4" key={index}>
              <label
                htmlFor={atributo.id}
                className="mb-1 text-gray-700 dark:text-gray-300 p-1"
              >
                {atributo.placeholder}
              </label>
              {atributo.type === "custom" ? (
                atributo.component
              ) : atributo.type === "select" ? (
                <SelectWithSearch
                  id={atributo.id}
                  name={atributo.name}
                  options={atributo.options}
                  onChange={(selectedOption) => handleChange(selectedOption, { name: atributo.name })}
                  value={atributo.options.find(option => option.value === formData[atributo.name])}
                  placeholder={atributo.placeholder}
                />
              ) : (
                <Input
                  id={atributo.id}
                  name={atributo.name}
                  type={atributo.type}
                  placeholder={atributo.placeholder}
                  options={atributo.options || []}
                  onChange={handleChange}
                  value={formData[atributo.name] || ''}
                  error={errors[atributo.name]}
                  disabled={atributo.disabled ? atributo.disabled : false}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded mr-2 dark:bg-gray-600 dark:text-gray-200"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded dark:bg-blue-800"
            onClick={handleSubmit}
          >
            Guardar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}