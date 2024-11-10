import { useState, useEffect } from "react";
import { fetchClients } from "../services/clientsService";

export const usePolizas = () => {
  const [polizas, setPolizas] = useState([]);

  return {
    polizas,
    setPolizas,
  };
};
