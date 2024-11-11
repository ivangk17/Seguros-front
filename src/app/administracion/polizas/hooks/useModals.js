import { useState } from "react";

export const useModals = () => {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return {
    showModalCreate,
    setShowModalCreate,
    showModalDelete,
    setShowModalDelete,
    showEditModal,
    setShowEditModal,
  };
};
