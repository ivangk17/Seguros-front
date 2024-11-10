export const menues = (setShowLogoutModal, role) => {
  const menues = {
    asegurador: [
      { url: "/administracion/clientes", descripcion: "Clientes" },
      { url: "/administracion/polizas", descripcion: "Polizas" },
      { url: "/administracion/solicitudes", descripcion: "Solicitudes" },
      { url: "/administracion/editarPerfil", descripcion: "Editar perfil" },
      {
        url: "#",
        descripcion: "Cerrar sesión",
        logout: true,
        onClick: () => {
          setShowLogoutModal(true);
        },
      },
    ],
    admin: [
      { url: "/administracion/aseguradores", descripcion: "Aseguradores" },
      {
        url: "#",
        descripcion: "Cerrar sesión",
        logout: true,
        onClick: () => {
          setShowLogoutModal(true);
        },
      },
    ],
  };
  return menues[role];
};
