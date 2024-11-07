"use client";

import { useState } from "react";
import { Collapse } from "react-collapse";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-300 rounded-lg mb-2 dark:border-gray-600">
      <button
        onClick={toggleAccordion}
        className="flex justify-between items-center w-full p-4 text-left bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none"
      >
        <span className="font-semibold text-black dark:text-white">{title}</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 10l5 5 5-5H7z"
          />
        </svg>
      </button>
      <Collapse isOpened={isOpen}>
        <div className="p-4 bg-white dark:bg-gray-800 text-black dark:text-white">{children}</div>
      </Collapse>
    </div>
  );
}  

export default Accordion;
