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

export default function PolizasList() {
  const api = process.env.NEXT_PUBLIC_URL_API;
  const [polizas, setPolizas] = useState([]);
  const [cambios, setCambios] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filtroDominio, setFiltroDominio] = useState(""); // Nuevo estado para el filtro


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
        dominio: poliza.dominio,
        marca: poliza.vehiculo.marca,
        modelo: poliza.vehiculo.modelo,
        anio: poliza.vehiculo.anio,
        tipoVehiculo: poliza.vehiculo.tipoVehiculo,
        aseguradora: poliza.aseguradora,
        tipoCobertura: poliza.tipoCobertura,
        primaSegura: poliza.primaSegura,
      }));

      setPolizas(mapeo);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolizas(); // Llamar con el filtro actual
  }, [cambios]);



  const handleSubmitFilters = (e) => {
    e.preventDefault();
    fetchPolizas(filtroDominio); // Refrescar la tabla al cambiar el filtro
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
        <h2 className="text-lg font-semibold">Administración de polizas</h2>
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
          ]}
          filtros={filtros}
          filtrosSubmit={handleSubmitFilters}
          /* acciones={acciones}
          paginado={paginado}*/
        />
      </div>
    </>
  );
}
