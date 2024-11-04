export default function Input({ name, label, type = "text", error, options = [], ...rest }) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      {type === "select" ? (
        <select
          id={name}
          name={name}
          {...rest}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3"
        >
          <option value="">Seleccione una opción</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          {...rest}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3"
        />
      )}
      {error && (
        <small className="text-red-500 text-xs italic mt-1">{error}</small>
      )}
    </div>
  );
}
