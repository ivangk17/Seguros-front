import { useState } from "react";

export default function Input({
  name,
  label,
  type = "text",
  error,
  options = [],
  value,
  onChange,
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-gray-700 text-xs sm:text-sm md:text-base font-bold mb-1"
        >
          {label}
        </label>
      )}
      {type === "select" ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-3"
          {...rest}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          <input
            id={name}
            name={name}
            type={type === "password" && showPassword ? "text" : type}
            value={value}
            onChange={onChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-3"
            {...rest}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500"
            >
              {showPassword ? "👁️" : "🙈"}
            </button>
          )}
        </div>
      )}
      {error && (
        <small className="text-red-500 text-xs sm:text-sm italic mt-1">
          {error}
        </small>
      )}
    </div>
  );
}
