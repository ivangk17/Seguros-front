"use client";
import React, { useState } from "react";
import { usePolizas } from "./hooks/usePolizas";
import { useModals } from "./hooks/useModals";
import { useClientsDni } from "./hooks/useClientsDni";
import { useCrearPoliza } from "./hooks/useCrearPoliza";
import { useEliminarPoliza } from "./hooks/useEliminarPoliza";
import { useEditarPoliza } from "./hooks/useEditarPoliza";
import { ToastContainer, toast } from "react-toastify";
import ConfirmDeleteModal from "@/app/componentes/modals/ConfirmDeleteModal";
import ModalEdit from "@/app/componentes/modals/ModalEdit";
import ModalCreate from "@/app/componentes/modals/ModalCreate";
import Table from "@/app/componentes/table/Table";
import ScreenLoader from "@/app/componentes/ScreenLoader";
import { atributosPoliza } from "./utils/atributosPoliza";
import { cabecerasTablaPolizas } from "./utils/cabecerasTabla";
import "react-toastify/dist/ReactToastify.css";
import { atributosPolizaEditables } from "./utils/atributosPolizaEditables";
import { atributosPolizaDelete } from "./utils/atributosPolizaDelete";
import { filtrosConfigPolizas } from "./utils/filtrosConfig";

export default function PolizasList() {
  const aseguradoId = "ID_DEL_ASEGURADO";

  const {
    polizas,
    loading,
    filtroDominio,
    setFiltroDominio,
    fetchPolizasData,
  } = usePolizas(aseguradoId);
  const {
    showModalCreate,
    setShowModalCreate,
    showModalDelete,
    setShowModalDelete,
    showEditModal,
    setShowEditModal,
  } = useModals();
  const { dnis, loadingDnis } = useClientsDni();
  const { crearPolizaData, loadingCrearPoliza, errorCrearPoliza } =
    useCrearPoliza();
  const { eliminarPoliza, loadingEliminarPoliza, errorEliminarPoliza } =
    useEliminarPoliza();
  const { actualizarPoliza, loadingEditarPoliza, errorEditarPoliza } =
    useEditarPoliza();
  const [selectedPoliza, setSelectedPoliza] = useState(null);

  const handleAddPoliza = () => setShowModalCreate(true);

  const filtros = filtrosConfigPolizas(filtroDominio, setFiltroDominio);

  const handleDeleteClick = (poliza) => {
    setSelectedPoliza(poliza);
    setShowModalDelete(true);
  };

  const handleEditClick = (poliza) => {
    setSelectedPoliza(poliza);
    setShowEditModal(true);
  };

  const acciones = [
    { nombre: "Editar", funcion: handleEditClick },
    { nombre: "Eliminar", funcion: handleDeleteClick },
  ];

  const confirmEdit = async (updatedData) => {
    try {
      const { _id, ...datosSinId } = updatedData; 
      await actualizarPoliza(selectedPoliza._id, datosSinId);
      setShowEditModal(false);
      fetchPolizasData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const confirmCreate = async (formData) => {
    try {
      await crearPolizaData(formData);
      setShowModalCreate(false);
      fetchPolizasData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const confirmDelete = async () => {
    try {
      await eliminarPoliza(selectedPoliza._id);
      setShowModalDelete(false);
      fetchPolizasData(); 
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      {loading && <ScreenLoader />}
      <ToastContainer position="top-right" autoClose={3500} />
      <div className="bg-white shadow-lg rounded-lg w-full p-6 dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Administración de pólizas</h2>
          <button
            onClick={handleAddPoliza}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
          >
            Agregar Póliza
          </button>
        </div>
        <Table
          cabeceras={cabecerasTablaPolizas}
          datos={polizas}
          keys={[
            "aseguradoNombre", 
            "dominio",
            "marca",
            "modelo",
            "anio",
            "tipoVehiculo",
            "aseguradora",
            "tipoCobertura",
            "primaSegura",
            "deducible",
          ]}
          filtros={filtros}
          filtrosSubmit={fetchPolizasData}
          acciones={acciones}
        />
      </div>

      <ModalCreate
        titulo="Crear una poliza"
        tipo="poliza"
        show={showModalCreate}
        onClose={() => setShowModalCreate(false)}
        onSubmit={confirmCreate}
        atributos={atributosPoliza.map((attr) =>
          attr.id === "dni" ? { ...attr, options: dnis } : attr
        )}
      />

      <ModalEdit
        show={showEditModal}
        dato={selectedPoliza}
        onConfirm={confirmEdit}
        atributos={atributosPolizaEditables}
        onClose={() => setShowEditModal(false)}
        tipo="poliza"
      />

      <ConfirmDeleteModal
        show={showModalDelete}
        dato={selectedPoliza}
        onConfirm={confirmDelete}
        onClose={() => setShowModalDelete(false)}
        atributos={atributosPolizaDelete}
        mensaje="¿Estás seguro de eliminar esta póliza?"
        acciones={acciones}
      />
    </>
  );
}