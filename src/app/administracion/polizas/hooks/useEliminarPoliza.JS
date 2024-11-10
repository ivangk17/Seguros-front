import { useState } from "react";
import { deletePoliza } from "../services/polizasService";

export const useEliminarPoliza = () => {
  const [loadingEliminarPoliza, setLoadingEliminarPoliza] = useState(false);
  const [errorEliminarPoliza, setErrorEliminarPoliza] = useState(null);

  const eliminarPoliza = async (polizaId) => {
    setLoadingEliminarPoliza(true);
    setErrorEliminarPoliza(null);

    try {
      await deletePoliza(polizaId);
    } catch (error) {
      setErrorEliminarPoliza(error.message);
      throw error;
    } finally {
      setLoadingEliminarPoliza(false);
    }
  };

  return { eliminarPoliza, loadingEliminarPoliza, errorEliminarPoliza };
};
