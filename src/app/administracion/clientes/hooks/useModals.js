import { useState, useEffect } from "react";

export const useModals = () => {
  const [showModalCreateAsegurado, setShowModalCreateAsegurado] =
    useState(false);
  const [showModalDeleteAsegurado, setShowModalDeleteAsegurado] =
    useState(false);
  const [showModalViewPolizas, setShowModalViewPolizas] = useState(false);
  const [showModalCreatePoliza, setShowModalCreatePoliza] = useState(false);
  return {
    showModalCreateAsegurado,
    setShowModalCreateAsegurado,
    showModalDeleteAsegurado,
    setShowModalDeleteAsegurado,
    showModalViewPolizas,
    setShowModalViewPolizas,
    showModalCreatePoliza,
    setShowModalCreatePoliza
  };
};
