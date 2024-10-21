export default function Pagination({
  totalClients,
  clientsPerPage,
  currentPage,
  paginate,
}) {
  const pageNumbers = Array.from(
    { length: Math.ceil(totalClients / clientsPerPage) },
    (_, i) => i + 1
  );

  return (
    <div className="fixed bottom-4 right-4">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`mx-1 px-4 py-2 rounded ${
            currentPage === number
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
