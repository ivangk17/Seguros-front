export const getAccionesPorEstado = (asegurador, handleChangeState) => {
  let acciones = [];

  switch (asegurador.state) {
    case "active":
      acciones = [
        ...acciones,
        {
          nombre: "Bloquear falta de pago",
          funcion: () => handleChangeState(asegurador, "payment_blocked"),
        },
      ];
      break;

    case "blocked":
      acciones = [
        ...acciones,
        {
          nombre: "Activar",
          funcion: () => handleChangeState(asegurador, "active"),
        },
      ];
      break;

    case "payment_blocked":
      acciones = [
        ...acciones,
        {
          nombre: "Activar",
          funcion: () => handleChangeState(asegurador, "active"),
        },
      ];
      break;
    case "unverify":
      acciones = [
        ...acciones,
        {
          nombre: "Activar",
          funcion: () => handleChangeState(asegurador, "active"),
        },
      ];
      break;

    default:
      break;
  }

  return acciones;
};
