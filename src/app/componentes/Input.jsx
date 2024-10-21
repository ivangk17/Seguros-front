import { useState } from "react";

export default function Input({ name, type = "text", error, ...rest }) {
  return (
    <>
      <input
        id={name}
        name={name}
        type={type}
        {...rest}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3"
      />
      {error && (
        <small className="text-red-500 text-xs italic mt-1">{error}</small>
      )}{" "}
    </>
  );
}
