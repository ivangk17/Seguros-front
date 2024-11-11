export const filtrosConfigPolizas = (
  filtroDominio,
  setFiltroDominio,
  filtroAsegurado,
  setFiltroAsegurado,
  filtroCobertura,
  setFiltroCobertura
) => [
  {
    valor: filtroDominio,
    funcion: setFiltroDominio,
    id: "dominio",
    name: "dominio",
    type: "text",
    placeholder: "DOMINIO",
  },
  {
    valor: filtroAsegurado,
    funcion: setFiltroAsegurado,
    id: "asegurado",
    name: "asegurado",
    type: "text",
    placeholder: "ASEGURADO",
  },
  {
    valor: filtroCobertura,
    funcion: setFiltroCobertura,
    id: "tipoCobertura",
    name: "tipoCobertura",
    type: "select",
    placeholder: "Tipo de Cobertura",
    options: [
      { value: "", label: "Todas las coberturas" },
      { value: "Responsabilidad Civil", label: "Responsabilidad Civil" },
      { value: "Terceros Completo", label: "Terceros Completo" },
      {
        value: "Terceros Completo con Daños Parciales",
        label: "Terceros Completo con Daños Parciales",
      },
      { value: "Todo Riesgo", label: "Todo Riesgo" },
    ],
  },
];
