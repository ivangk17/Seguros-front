import Input from "../Input";
import { useState, useEffect } from "react";
export default function ModalEdit(props) {
  const { show, dato, atributos, onClose, onConfirm } = props;
  if (!show) return null; // Si no se debe mostrar, no renderiza nada

  const [formData, setFormData] = useState({});
  useEffect(() => {
    setFormData(dato || {});
  }, [dato]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {atributos.map((atributo, index) => (
          <div className="flex flex-col" key={index}>
            <Input
              id={atributo.id}
              name={atributo.name}
              type={atributo.tipo}
              placeholder={atributo.placeholder}
              value={formData[atributo.name] || ""}
              onChange={handleChange}
            />
          </div>
        ))}
        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => onConfirm(formData)}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
