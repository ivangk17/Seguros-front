import Select from "react-select";

const SelectWithError = ({ id, options, onChange, placeholder, error, value }) => {
  return (
    <div>
      <Select
        id={id}
        options={options}
        onChange={onChange}
        placeholder={placeholder}
        isClearable
        className="p-2 border rounded-md"
        value={options.find(option => option.value === value)}
      />
      {error && (
        <small className="text-red-500 text-xs italic mt-1">{error}</small>
      )}
    </div>
  );
};

export default SelectWithError;