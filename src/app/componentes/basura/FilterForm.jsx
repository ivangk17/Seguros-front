import Input from "../Input";

export default function FilterForm({
  searchTerm,
  filterDni,
  filterEmail,
  filterPhone, // Nuevo prop para el filtro de teléfono
  setSearchTerm,
  setFilterDni,
  setFilterEmail,
  setFilterPhone, // Nuevo prop para la función de actualización del filtro de teléfono
  handleSubmit,
}) {
  return (
    <form className="mb-4 flex gap-4 my-2" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <Input
          id="nombre"
          name="nombre"
          type="text"
          placeholder="Nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <Input
          id="dni"
          name="dni"
          type="text"
          placeholder="DNI"
          value={filterDni}
          onChange={(e) => setFilterDni(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <Input
          id="email"
          name="email"
          type="text"
          placeholder="Email"
          value={filterEmail}
          onChange={(e) => setFilterEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <Input
          id="phone"
          name="phone"
          type="text"
          placeholder="Teléfono"
          value={filterPhone}
          onChange={(e) => setFilterPhone(e.target.value)}
        />
      </div>
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