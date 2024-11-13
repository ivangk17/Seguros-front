export const getAccionesPorEstado = (
  cliente,
  handleDeleteClientClick,
  handleClickCreatePoliza,
  handleChangeState,
  handleViewPolizas
) => {
  const viewPolizasAction = {
    nombre: "Ver Pólizas",
    funcion: () => handleViewPolizas(cliente),
  };

  let acciones = [viewPolizasAction];

  switch (cliente.state) {
    case "active":
      acciones = [
        ...acciones,
        {
          nombre: "Agregar póliza",
          funcion: () => handleClickCreatePoliza(cliente),
        },
        {
          nombre: "Bloquear falta de pago",
          funcion: () => handleChangeState(cliente, "payment_blocked"),
        },
        {
          nombre: "Eliminar",
          funcion: () => handleDeleteClientClick(cliente),
        },
      ];
      break;

    case "blocked":
      acciones = [
        ...acciones,
        {
          nombre: "Activar",
          funcion: () => handleChangeState(cliente, "active"),
        },
        {
          nombre: "Eliminar",
          funcion: () => handleDeleteClientClick(cliente),
        },
      ];
      break;

    case "payment_blocked":
      acciones = [
        ...acciones,
        {
          nombre: "Activar",
          funcion: () => handleChangeState(cliente, "active"),
        },
        {
          nombre: "Eliminar",
          funcion: () => handleDeleteClientClick(cliente),
        },
      ];
      break;

    default:
      break;
  }

  return acciones;
};
