import { useState, useEffect } from "react";

export const useModals = () => {
  const [showModalCreateAsegurado, setShowModalCreateAsegurado] =
    useState(false);
  const [showModalEditAsegurado, setShowModalEditAsegurado] = useState(false);
  return {
    showModalCreateAsegurado,
    setShowModalCreateAsegurado,
    showModalEditAsegurado,
    setShowModalEditAsegurado
  };
};
