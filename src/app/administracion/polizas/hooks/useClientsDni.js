import { useState, useEffect } from "react";
import { fetchDnis } from "../services/polizasService"; 
import { toast } from "react-toastify";

export const useClientsDni = () => {
  const [dnis, setDnis] = useState([]);
  const [loadingDnis, setLoadingDnis] = useState(false);

  const fetchDnisData = async () => {
    setLoadingDnis(true);
    try {
      const dnisData = await fetchDnis();  
      setDnis(dnisData);                 
    } catch (error) {
      toast.error("Ocurrió un error al obtener los DNI.");
    } finally {
      setLoadingDnis(false);
    }
  };

  useEffect(() => {
    fetchDnisData();
  }, []);

  return { dnis, loadingDnis, fetchDnisData };
};
