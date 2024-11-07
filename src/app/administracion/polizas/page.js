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
import { crearPoliza } from "./polizaService";

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
    try {
      await crearPoliza(formData);
      setShowModalCreate(false);
      setCambios((prev) => !prev);
    } catch (error) {
      console.error(error.message);
    }
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
      <div className="bg-white shadow-lg rounded-lg w-full p-6 dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black dark:text-white">Administración de polizas</h2>
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
          { id: "tipoCobertura", name: "tipoCobertura", type: "text", placeholder: "Tipo de Cobertura", required: true },
          { id: "primaSegura", name: "primaSegura", type: "number", placeholder: "Prima Segura", required: true },
          { id: "deducible", name: "deducible", type: "number", placeholder: "Deducible", required: true }
        ]}
        onClose={() => setShowEditModal(false)}
        titulo="Editar Póliza"
        acciones = {acciones}
        tipo="poliza"
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
          { id: "dni", name: "dni", type: "number", placeholder: "DNI de la persona", required: true },
          { id: "aseguradora", name: "aseguradora", type: "aseguradora", placeholder: "Aseguradora", required: true  },
          {
            id: "tipoCobertura",
            name: "tipoCobertura",
            type: "select",
            placeholder: "Tipo de Cobertura",
            required: true,
            options: [
              { value: "Tipo de Cobertura", label: "Tipo de Cobertura" },
              { value: "Responsabilidad Civil", label: "Responsabilidad Civil" },
              { value: "Terceros Completo", label: "Terceros Completo" },
              { value: "Terceros Completo con Daños Parciales", label: "Terceros Completo con Daños Parciales" },
              { value: "Todo Riesgo", label: "Todo Riesgo" }
            ],
          },
          { id: "primaSegura", name: "primaSegura", type: "number", placeholder: "Prima Segura", required: true  },
          { id: "deducible", name: "deducible", type: "number", placeholder: "Deducible", required: true  },
          { id: "dominio", name: "dominio", type: "dominio", placeholder: "Dominio", required: true  },
          { id: "marca", name: "marca", type: "text", placeholder: "Marca", required: true  },
          { id: "modelo", name: "modelo", type: "text", placeholder: "Modelo", required: true  },
          { id: "anio", name: "anio", type: "number", placeholder: "Año", required: true  },
          { id: "color", name: "color", type: "text", placeholder: "Color", required: true  },
          {
            id: "tipoVehiculo",
            name: "tipoVehiculo",
            type: "select",
            placeholder: "Tipo de Vehiculo",
            required: true,
            options: [
              { value: "", label: "Tipo de Vehiculo" },
              { value: "AUTO", label: "Auto" },
              { value: "MOTO", label: "Moto" },
              { value: "CAMION", label: "Camion" },
            ],
          },
          { id: "numeroIdentificador", name: "numeroIdentificador", type: "text", placeholder: "Numero identificador", required: true  }
        ]}
        tipo= "poliza"
      />
    </>
  );
}
