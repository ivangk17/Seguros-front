"use client";

import React from 'react';

const ClienteForm = ({ formData, handleChange, handleSubmit, handleCancel, buttonText, cancelButtonText, cancelButtonPosition, error, success }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto w-full max-w-lg"> {/* Cambiado de max-w-2xl a max-w-lg */}
        <div className="mt-5 bg-white rounded-lg shadow-lg p-6"> {/* Reducido el padding */}
          <div className="flex">
            <div className="flex-1 py-3 pl-3 overflow-hidden"> {/* Reducido el padding */}
              <h1 className="inline text-2xl font-semibold leading-none">{buttonText}</h1> {/* Reducido el tamaño del texto */}
            </div>
          </div>
          <div className="px-3 pb-3"> {/* Reducido el padding */}
            {error && <p className="text-red-500 mb-2">{error}</p>} {/* Reducido el margin-bottom */}
            {success && <p className="text-green-500 mb-2">{success}</p>} {/* Reducido el margin-bottom */}
            <form onSubmit={handleSubmit} className="w-full p-4"> {/* Reducido el padding */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3"> {/* Reducido el gap */}
                <div className="mb-3"> {/* Reducido el margin-bottom */}
                  <label htmlFor="email" className="block text-gray-700 text-sm">Email:</label> {/* Reducido el tamaño del texto */}
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="text-black placeholder-gray-600 w-full px-3 py-2 mt-1 text-sm transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="name" className="block text-gray-700 text-sm">Nombre:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="text-black placeholder-gray-600 w-full px-3 py-2 mt-1 text-sm transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="lastname" className="block text-gray-700 text-sm">Apellido:</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                    className="text-black placeholder-gray-600 w-full px-3 py-2 mt-1 text-sm transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="dni" className="block text-gray-700 text-sm">DNI:</label>
                  <input
                    type="text"
                    id="dni"
                    name="dni"
                    value={formData.dni}
                    onChange={handleChange}
                    required
                    className="text-black placeholder-gray-600 w-full px-3 py-2 mt-1 text-sm transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="block text-gray-700 text-sm">Teléfono:</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="text-black placeholder-gray-600 w-full px-3 py-2 mt-1 text-sm transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="cuit" className="block text-gray-700 text-sm">CUIT:</label>
                  <input
                    type="text"
                    id="cuit"
                    name="cuit"
                    value={formData.cuit}
                    onChange={handleChange}
                    required
                    className="text-black placeholder-gray-600 w-full px-3 py-2 mt-1 text-sm transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>
              </div>

              <div className="mt-3">
                <h2 className="text-lg font-semibold text-gray-700">Domicilio:</h2> {/* Reducido el tamaño del texto */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3"> {/* Reducido el gap */}
                  <div className="mb-3">
                    <label htmlFor="address" className="block text-gray-700 text-sm">Dirección:</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.domicile.address}
                      onChange={handleChange}
                      required
                      className="text-black placeholder-gray-600 w-full px-3 py-2 mt-1 text-sm transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="zip_code" className="block text-gray-700 text-sm">Código Postal:</label>
                    <input
                      type="text"
                      id="zip_code"
                      name="zip_code"
                      value={formData.domicile.zip_code}
                      onChange={handleChange}
                      required
                      className="text-black placeholder-gray-600 w-full px-3 py-2 mt-1 text-sm transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="province" className="block text-gray-700 text-sm">Provincia:</label>
                    <input
                      type="text"
                      id="province"
                      name="province"
                      value={formData.domicile.province}
                      onChange={handleChange}
                      required
                      className="text-black placeholder-gray-600 w-full px-3 py-2 mt-1 text-sm transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="country" className="block text-gray-700 text-sm">País:</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.domicile.country}
                      onChange={handleChange}
                      required
                      className="text-black placeholder-gray-600 w-full px-3 py-2 mt-1 text-sm transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4"> {/* Reducido el gap */}
                <button
                  type="button"
                  onClick={handleCancel}
                  className="relative w-full flex justify-center items-center px-6 py-3 font-medium tracking-wide text-white capitalize bg-red-600 rounded-md hover:bg-red-700 focus:outline-none transition duration-300 transform active:scale-95 ease-in-out text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="20px" viewBox="0 0 24 24" width="20px" fill="#FFFFFF"> {/* Reducido el tamaño del icono */}
                    <g>
                      <rect fill="none" height="24" width="24"></rect>
                    </g>
                    <g>
                      <g>
                        <path d="M19,13H5v-2h14V13z"></path>
                      </g>
                    </g>
                  </svg>
                  <span className="pl-2 mx-1">{cancelButtonText}</span>
                </button>
                <button
                  type="submit"
                  className="relative w-full flex justify-center items-center px-6 py-3 font-medium tracking-wide text-white capitalize bg-black rounded-md hover:bg-gray-900 focus:outline-none transition duration-300 transform active:scale-95 ease-in-out text-sm" 
                >
                  <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="20px" viewBox="0 0 24 24" width="20px" fill="#FFFFFF"> {/* Reducido el tamaño del icono */}
                    <g>
                      <rect fill="none" height="24" width="24"></rect>
                    </g>
                    <g>
                      <g>
                        <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"></path>
                      </g>
                    </g>
                  </svg>
                  <span className="pl-2 mx-1">{buttonText}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClienteForm;