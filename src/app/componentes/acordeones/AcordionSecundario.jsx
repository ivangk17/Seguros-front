// SecondaryAccordion.js
import React, { useState } from 'react';

const SecondaryAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`border border-gray-300 rounded-md my-2`}>
      <div
        className={`flex justify-between items-center p-2 cursor-pointer bg-gray-100 hover:bg-gray-200 ${isOpen ? 'bg-gray-200' : ''}`}
        onClick={toggleAccordion}
      >
        <h3 className="font-medium text-gray-800">{title}</h3>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </div>
      {isOpen && <div className="p-2 border-t border-gray-300">{children}</div>}
    </div>
  );
};

export default SecondaryAccordion;
