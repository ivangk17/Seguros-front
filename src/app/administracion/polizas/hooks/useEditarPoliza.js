import { useState } from "react";
import { editarPoliza } from "../services/polizasService";

export const useEditarPoliza = () => {
  const [loadingEditarPoliza, setLoadingEditarPoliza] = useState(false);
  const [errorEditarPoliza, setErrorEditarPoliza] = useState(null);

  const actualizarPoliza = async (polizaId, updatedData) => {
    setLoadingEditarPoliza(true);
    setErrorEditarPoliza(null);

    try {
      await editarPoliza(polizaId, updatedData);
    } catch (error) {
      setErrorEditarPoliza(error.message);
      throw error;
    } finally {
      setLoadingEditarPoliza(false);
    }
  };

  return { actualizarPoliza, loadingEditarPoliza, errorEditarPoliza };
};
