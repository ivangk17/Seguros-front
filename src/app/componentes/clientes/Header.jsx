import React from "react";

export default function Header(props) {
  const { accion, titulo, texto } = props;
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-black dark:text-white">
        {titulo}
      </h2>

      {accion && (
        <button
          onClick={accion}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
        >
          {texto}
        </button>
      )}
    </div>
  );
}
