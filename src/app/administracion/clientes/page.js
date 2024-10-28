"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ConfirmDeleteModal from "@/app/componentes/modals/ConfirmDeleteModal";
import ModalEdit from "@/app/componentes/modals/ModalEdit";
import ModalPolizas from "@/app/componentes/modals/ModalPolizas";
import Table from "@/app/componentes/table/Table";
import ScreenLoader from "@/app/componentes/ScreenLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientsList() {
  //URL Api
  const api = process.env.NEXT_PUBLIC_URL_API;

  //Datos
  const [clientes, setClientes] = useState([]);
  const [cambios, setCambios] = useState(false);

  //Filtros
  const [filtroNombreApellido, setFiltroNombreApellido] = useState("");
  const [filtroDni, setFiltroDni] = useState("");
  const [filtroEmail, setFiltroEmail] = useState("");
  const [filtroTelefono, setFiltroTelefono] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [clientesPorPagina] = useState(15);
  const [error, setError] = useState(null);
  /*    const [loading, setLoading] = useState(false); */

  // Modals
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [clientToEdit, setClientToEdit] = useState(null);
  const [showModalPolizas, setShowModalPolizas] = useState(false);
  const [polizas, setPolizas] = useState([]);

  //Loader
  const [loading, setLoading] = useState([]);

  const fetchClients = async (search, dni, email, phone) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        ...(search && { search }),
        ...(dni && { dni }),
        ...(email && { email }),
        ...(phone && { phone }),
      }).toString();
      const url = `${api}users/clients?${queryParams}`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching clients");
      }

      const data = await response.json();
      setClientes(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setPaginaActual(1);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [cambios]);

  const indexOfLastClient = paginaActual * clientesPorPagina;
  const indexOfFirstClient = indexOfLastClient - clientesPorPagina;
  const clientesActuales = clientes.slice(
    indexOfFirstClient,
    indexOfLastClient
  );

  const paginate = (numeroPagina) => setPaginaActual(numeroPagina);

  const handleSubmitFilters = (e) => {
    e.preventDefault();
    fetchClients(filtroNombreApellido, filtroDni, filtroEmail, filtroTelefono);
  };

  const handlePolizas = async (cliente) => {
    await fetchPolizas(cliente._id);
    setShowModalPolizas(true);
  };
  const handleEdit = (cliente) => {
    console.log(cliente);
    setClientToEdit(cliente);
    setShowModalEdit(true);
  };

  const handleDelete = (cliente) => {
    console.log(cliente);
    setClientToDelete(cliente);
    setShowModalDelete(true);
  };

  const confirmDelete = async (id) => {
    setShowModalDelete(false);
    try {
      const url = `${api}users/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el cliente");
      }
      setCambios((prev) => !prev);
      toast.success("El cliente ha sido eleminado con éxito.");
    } catch (error) {
      toast.error("Ocurrió un error al eliminar el cliente.");
      setError(error.message);
    }
  };

  const confirmEdit = async (formData) => {
    setShowModalEdit(false);
    try {
      const url = `${api}users/editarCliente/${clientToEdit._id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Error al editar el cliente");
      }
      setCambios((prev) => !prev);
      toast.success("El cliente ha sido editado con éxito.");
    } catch (error) {
      toast.error("Ocurrió un error al editar el cliente.");
    }
  };

  const fetchPolizas = async (clienteId) => {
    try {
      const url = `${api}polizas/listAsegurado/${clienteId}`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Error fetching polizas");
      }
  
      const data = await response.json();
      setPolizas(data);
    } catch (error) {
      toast.error("Ocurrió un error al obtener las pólizas.");
    }
  };
    const acciones = [
    {
      nombre: "Editar",
      funcion: handleEdit,
    },
    {
      nombre: "Eliminar",
      funcion: handleDelete,
    },
    {
      nombre: "Ver Pólizas",
      funcion: handlePolizas,
    },
  ];
   const paginado = {
    total: clientes.length,
    datosPorPagina: clientesPorPagina,
    paginaActual: paginaActual,
    funcion: paginate,
  };

  const filtros = [
    {
      valor: filtroNombreApellido,
      funcion: setFiltroNombreApellido,
      id: "name",
      name: "nombre",
      type: "text",
      placeholder: "Nombre",
    },
    {
      valor: filtroDni,
      funcion: setFiltroDni,
      id: "dni",
      name: "dni",
      type: "text",
      placeholder: "DNI",
    },
    {
      valor: filtroEmail,
      funcion: setFiltroEmail,
      id: "email",
      name: "email",
      type: "text",
      placeholder: "Email",
    },
    {
      valor: filtroTelefono,
      funcion: setFiltroTelefono,
      id: "telefono",
      name: "telefono",
      type: "text",
      placeholder: "Teléfono",
    },
  ];

  return (
    <>
      {loading ? <ScreenLoader /> : ""}
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="bg-white shadow-lg rounded-lg w-full p-6">
        <h2 className="text-lg font-semibold">Administración de clientes</h2>
        <Table
          cabeceras={["Nombre", "Apellido", "DNI", "Email", "Teléfono", "CUIT"]}
          datos={clientesActuales}
          keys={["name", "lastname", "dni", "email", "phone", "cuit"]}
          acciones={acciones}
          paginado={paginado}
          filtros={filtros}
          filtrosSubmit={handleSubmitFilters}
        />
      </div>
      <ModalPolizas
        show={showModalPolizas}
        onClose={() => setShowModalPolizas(false)}
        polizas={polizas}
      />
      <ConfirmDeleteModal
        show={showModalDelete}
        dato={clientToDelete}
        onClose={() => setShowModalDelete(false)}
        onConfirm={confirmDelete}
        atributos={["name", "lastname", "dni"]}
        mensaje={`¿Está seguro que desea eliminar al cliente?`}
      />
      <ModalEdit
        show={showModalEdit}
        dato={clientToEdit}
        onClose={() => setShowModalEdit(false)}
        onConfirm={confirmEdit}
        atributos={[
          { id: "name", name: "name", tipo: "text", placeholder: "Nombre" },
          {
            id: "lastname",
            name: "lastname",
            tipo: "text",
            placeholder: "Apellido",
          },
          { id: "dni", name: "dni", tipo: "text", placeholder: "DNI" },
          { id: "email", name: "email", tipo: "text", placeholder: "Email" },
          { id: "phone", name: "phone", tipo: "text", placeholder: "Teléfono" },
          { id: "cuit", name: "cuit", tipo: "text", placeholder: "CUIT" },
          {
            id: "address",
            name: "address",
            tipo: "text",
            placeholder: "Dirección",
          },
          {
            id: "zip_code",
            name: "zip_code",
            tipo: "text",
            placeholder: "Código Postal",
          },
          {
            id: "province",
            name: "province",
            tipo: "text",
            placeholder: "Provincia",
          },
          { id: "country", name: "country", tipo: "text", placeholder: "País" },
        ]}
        titulo="Editar cliente"
      />
    </>
  );
}