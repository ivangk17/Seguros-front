export default function Pagination(props) {
  const pageNumbers = Array.from(
    { length: Math.ceil(props.paginado.total / props.paginado.datosPorPagina) },
    (_, i) => i + 1
  );

  return (
    <div className="fixed bottom-4 right-4">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => props.paginado.funcion(number)}
          className={`mx-1 px-4 py-2 rounded ${
            props.paginado.paginaActual === number
              ? "bg-indigo-600 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
}
