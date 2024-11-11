import Input from "../Input";
import Select from "react-select";

export default function FormularioFiltro({ filtros, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-4 flex-wrap my-2">
      {filtros.map((filtro, index) => (
        <div className="flex flex-col w-full sm:w-auto" key={index}>
          {filtro.type === "custom" ? (
            filtro.component
          ) : filtro.type === "select" ? (
            <Select
              id={filtro.id}
              name={filtro.name}
              placeholder={filtro.placeholder}
              options={filtro.options}
              value={filtro.options.find((option) => option.value === filtro.valor)}
              onChange={(option) => filtro.funcion(option ? option.value : "")}
              isClearable
              isSearchable={filtro.id === "asegurado"} // Solo permite escribir en el filtro de cliente
              className="react-select-container"
              classNamePrefix="react-select"
            />
          ) : (
            <Input
              id={filtro.id}
              name={filtro.name}
              type={filtro.type}
              placeholder={filtro.placeholder}
              value={filtro.valor}
              onChange={(e) => filtro.funcion(e.target.value)}
            />
          )}
        </div>
      ))}
      <div className="flex flex-col">
        <button
          type="submit"
          className="mb-3 inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Filtrar
          </span>
        </button>
      </div>
    </form>
  );
}