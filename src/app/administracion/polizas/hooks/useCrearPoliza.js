import { useState } from "react";
import { crearPoliza } from "../services/polizasService";
import { toast } from "react-toastify";

export const useCrearPoliza = () => {
  const [loadingCrearPoliza, setLoadingCrearPoliza] = useState(false);
  const [errorCrearPoliza, setErrorCrearPoliza] = useState(null);

  const crearPolizaData = async (formData) => {
    setLoadingCrearPoliza(true);
    try {
      await crearPoliza(formData);
      toast.success("La póliza ha sido agregada con éxito.");
    } catch (error) {
      setErrorCrearPoliza(error.message);
      throw new Error(error.message);
    } finally {
      setLoadingCrearPoliza(false);
    }
  };

  return {
    crearPolizaData,
    loadingCrearPoliza,
    errorCrearPoliza,
  };
};
