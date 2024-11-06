"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ConfirmDeleteModal from "@/app/componentes/modals/ConfirmDeleteModal";
import ModalEdit from "@/app/componentes/modals/ModalEdit";
import ModalPolizas from "@/app/componentes/modals/ModalPolizas";
import Table from "@/app/componentes/table/Table";
import ScreenLoader from "@/app/componentes/ScreenLoader";
import Pagination from "@/app/componentes/table/Pagination";
import "react-toastify/dist/ReactToastify.css";
import ModalCreate from "@/app/componentes/modals/ModalCreate";

export default function PolizasList() {
  const api = process.env.NEXT_PUBLIC_URL_API;
  const [polizas, setPolizas] = useState([]);
  const [cambios, setCambios] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filtroDominio, setFiltroDominio] = useState("");
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPoliza, setSelectedPoliza] = useState(null);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const fetchPolizas = async (dominio) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        ...(dominio && { dominio })
      }).toString();
      const url = `${api}polizas/list?${queryParams}`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          "Ocurrió un error al listar las polizas, refresque la página e intente nuevamente."
        );
      }

      const data = await response.json();
      console.log("Datos recibidos:", data);
      const mapeo = await data.map((poliza) => ({
          _id: poliza._id,
          dominio: poliza.dominio,
          marca: poliza.vehiculo.marca,
          modelo: poliza.vehiculo.modelo,
          anio: poliza.vehiculo.anio,
          tipoVehiculo: poliza.vehiculo.tipoVehiculo,
          aseguradora: poliza.aseguradora,
          tipoCobertura: poliza.tipoCobertura,
          primaSegura: poliza.primaSegura,
          deducible: poliza.deducible
      }));

      setPolizas(mapeo);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolizas(); 
  }, [cambios]);



  const handleSubmitFilters = (e) => {
    e.preventDefault();
    fetchPolizas(filtroDominio);
  };

  const handleAddPoliza = () => {
    setShowModalCreate(true);
  };

  const confirmCreate = async (formData) => {
    setShowModalCreate(false);

    toast.success("La poliza ha sido agregada con éxito.");
  };

  const filtros=[
    {
      valor: filtroDominio,
      funcion: setFiltroDominio,
      id: "dominio",
      name: "dominio",
      type: "text",
      placeholder: "DOMINIO",
    },
  ]

  const handleEditClick = (poliza) => {
    setSelectedPoliza(poliza); // Setea la póliza que se va a editar
    setShowEditModal(true); // Muestra el modal
  };
  
  const handleEditConfirm = async (updatedPoliza) => {
    const { _id } = updatedPoliza;
    const fieldsToUpdate = {
      tipoCobertura: updatedPoliza.tipoCobertura,
      primaSegura: updatedPoliza.primaSegura,
      deducible: updatedPoliza.deducible
    }
    try {
      const response = await fetch(`${api}polizas/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(fieldsToUpdate),
      });


      if (!response.ok) {
        throw new Error('Error al actualizar la póliza');
      }

      const data = await response.json();
      
      setPolizas((prev) =>
        prev.map((poliza) =>
          poliza._id === data._id ? data : poliza
        )
      );

      toast.success("Póliza actualizada exitosamente");
      setShowEditModal(false);
      setCambios(!cambios)
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeleteClick = (poliza) => {
    setSelectedPoliza(poliza)
    setShowModalDelete(true);
  };

  const confirmDelete = async (id) => {
    setShowModalDelete(false);
    try {
      const url = `${api}polizas/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la poliza");
      }
      setCambios((prev) => !prev);
      toast.success("La poliza a sido eliminada con éxito.");
    } catch (error) {
      toast.error("Ocurrió un error al eliminar la poliza.");
      setError(error.message);
    }
    
    
  };


  const acciones = [
    { nombre: "Editar", funcion: (poliza) => handleEditClick(poliza) }, // Cambié a `funcion`
    { nombre: "Eliminar", funcion: (poliza) => handleDeleteClick(poliza) },
  ];
  
  


  return (
    <>
      {loading && <ScreenLoader />}
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Administración de polizas</h2>
          <button
          onClick={handleAddPoliza}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
          >
            Agregar Poliza
          </button>
        </div>
        <Table
          cabeceras={[
            "Dominio",
            "Marca",
            "Modelo",
            "Año",
            "Tipo vehículo",
            "Aseguradora",
            "Cobertura",
            "Prima",
            "Deducible"
          ]}
          datos={polizas}
          keys={[
            "dominio",
            "marca",
            "modelo",
            "anio",
            "tipoVehiculo",
            "aseguradora",
            "tipoCobertura",
            "primaSegura",
            "deducible"
          ]}
          filtros={filtros}
          filtrosSubmit={handleSubmitFilters}
          acciones={acciones}
          /*paginado={paginado}*/
        />

      </div>
      <ModalEdit
        show={showEditModal}
        dato={selectedPoliza}
        onConfirm={handleEditConfirm}
        atributos={[
          { id: "tipoCobertura", name: "tipoCobertura", tipo: "text", placeholder: "Tipo de Cobertura", required: true },
          { id: "primaSegura", name: "primaSegura", tipo: "number", placeholder: "Prima Segura", required: true },
          { id: "deducible", name: "deducible", tipo: "number", placeholder: "Deducible", required: true }
        ]}
        onClose={() => setShowEditModal(false)}
        titulo="Editar Póliza"
        acciones = {acciones}
      />
      <ConfirmDeleteModal
        show={showModalDelete}
        dato={selectedPoliza}
        onConfirm={confirmDelete}
        atributos={["email", "phone"]} // Define aquí los atributos que quieres mostrar
        onClose={() => setShowModalDelete(false)}
        mensaje="¿Estás seguro de eliminar esta póliza?"
        acciones= {acciones}
      />
      <ModalCreate
        show={showModalCreate}
        titulo="Crear una poliza"
        onClose={() => setShowModalCreate(false)}
        onSubmit={confirmCreate}
        atributos={[
          { id: "dominio", name: "dominio", type: "dominio", placeholder: "Dominio" },
          { id: "tipoCobertura", name: "tipoCobertura", type: "tipoCobertura", placeholder: "Tipo de Cobertura" },
          { id: "aseguradora", name: "aseguradora", type: "aseguradora", placeholder: "Aseguradora" },
          { id: "primaSegura", name: "primaSegura", type: "primaSegura", placeholder: "Prima Segura" },
          { id: "deducible", name: "deducible", type: "deducible", placeholder: "Deducible" }
        ]}
      />
    </>
  );
}
