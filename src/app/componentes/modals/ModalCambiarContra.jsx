// ChangePasswordModal.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "../../componentes/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePasswordModal = ({ show, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    oldPass: "",
    newPass: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  if (!show) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  const validarContrasena = (contrasena) => {
    const mayuscula = /[A-Z]/.test(contrasena);
    const numero = /[0-9]/.test(contrasena);
    const caracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(contrasena);
    const largo = contrasena.length >= 8;

    return mayuscula && numero && caracterEspecial && largo;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.oldPass) {
      newErrors.oldPass = "La contraseña actual es obligatoria";
    }
    if (!formData.newPass) {
      newErrors.newPass = "La nueva contraseña es obligatoria";
    } else if (!validarContrasena(formData.newPass)) {
      newErrors.newPass =
        "Formato erróneo de contraseña: La misma debe contener un número, una mayúscula, un caracter especial y debe ser de al menos 8 caracteres.";
    }
    if (formData.newPass !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await onSubmit(formData);
      } catch (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          oldPass: error.message,
        }));
      }
    }
  };

  return (
    <motion.div
    className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50" // Añadimos z-50 aquí
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            Cambiar Contraseña
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            name="oldPass"
            label="Contraseña Actual"
            type="password"
            value={formData.oldPass}
            onChange={handleInputChange}
            error={errors.oldPass}
          />
          <Input
            name="newPass"
            label="Nueva Contraseña"
            type="password"
            value={formData.newPass}
            onChange={handleInputChange}
            error={errors.newPass}
          />
          <Input
            name="confirmPassword"
            label="Confirmar Nueva Contraseña"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
          />
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded mr-2 dark:bg-gray-600 dark:text-gray-200"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded dark:bg-blue-800"
            >
              Cambiar Contraseña
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ChangePasswordModal;