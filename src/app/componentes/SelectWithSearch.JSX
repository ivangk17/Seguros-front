import React from 'react';
import Select from 'react-select';

const SelectWithSearch = ({ options, onChange, value, placeholder }) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '0.375rem',
      borderColor: '#D1D5DB',
      padding: '0.375rem',
     
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  return (
    <Select
      styles={customStyles}
      options={options}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      isSearchable
    />
  );
};

export default SelectWithSearch;