import Input from "../Input";

export default function FormularioFiltro(props) {
  const { filtros, handleSubmit } = props;
  return (
    <form className="mb-4 flex gap-4 my-2" onSubmit={handleSubmit}>
      {filtros.map((filtro, index) => (
        <div className="flex flex-col" key={index}>
          <Input
            id={filtro.id}
            name={filtro.name}
            type={filtro.type}
            placeholder={filtro.placeholder}
            value={filtro.valor}
            onChange={(e) => filtro.funcion(e.target.value)}
          />
        </div>
      ))}
      <div className="flex flex-col">
        <button className="mb-3 inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Filtrar
          </span>
        </button>
      </div>
    </form>
  );
}
