import SideBarItem from "./SideBarItem";
import Image from "next/image";
import { useState } from "react";

export default function SideBar(props) {
  const { items } = props;
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar el estado del sidebar
  const toggleSidebar = () => {
    setIsOpen((prevState) => !prevState);
  };

  // Función para cerrar el sidebar directamente
  const closeSidebar = () => {
    setIsOpen(false);
  };
  return (
    <>
      <button
        onClick={toggleSidebar}
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`} // Cambiar la clase dependiendo del estado
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <a href="#" className="flex items-center ps-2.5 mb-5">
            <div className="relative w-10 h-10 rounded-full overflow-hidden mr-1">
              <Image
                src="/img/logo.png" // Ruta de la imagen en public/img
                alt="Logo"
                layout="fill"
                objectFit="cover" // Hace que la imagen se adapte sin deformarse
              />
            </div>
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Grupo 5 Seguros
            </span>
          </a>
          <ul className="space-y-2 font-medium">
            {items.map((item, index) => (
              <SideBarItem key={index} item={item} closeSidebar={closeSidebar} />
            ))}
            <li
              onClick={closeSidebar}
              className="text-gray-500 dark:text-gray-400 cursor-pointer sm:hidden hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg"
            >
              <span>Cerrar menú</span>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
