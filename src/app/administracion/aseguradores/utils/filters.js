export const filtrosConfig = (
    filtroNombreApellido,
    setFiltroNombreApellido,
    filtroDni,
    setFiltroDni,
    filtroEmail,
    setFiltroEmail,
    filtroEstado,
    setFiltroEstado
  ) => [
    {
      valor: filtroNombreApellido,
      funcion: setFiltroNombreApellido,
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Nombre",
    },
    {
      valor: filtroDni,
      funcion: setFiltroDni,
      id: "dni",
      name: "dni",
      type: "text",
      placeholder: "DNI",
    },
    {
      valor: filtroEmail,
      funcion: setFiltroEmail,
      id: "email",
      name: "email",
      type: "text",
      placeholder: "Email",
    },
    {
      valor: filtroEstado,
      funcion: setFiltroEstado,
      id: "state",
      name: "state",
      type: "select",
      placeholder: "Estado",
      options: [
        { value: "", label: "Todos los estados" },
        { value: "active", label: "Activo" },
        { value: "blocked", label: "Bloqueado" },
        { value: "unverify", label: "No verificado" },
        { value: "payment_blocked", label: "Bloqueado por falta de pago" },
      ],
    },
  ];
  