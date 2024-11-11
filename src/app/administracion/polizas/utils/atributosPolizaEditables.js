export const atributosPolizaEditables = [
    {
        id: "tipoCobertura",
        name: "tipoCobertura",
        type: "select",
        placeholder: "Tipo de Cobertura",
        required: true,
        options: [
          { value: "Responsabilidad Civil", label: "Responsabilidad Civil" },
          { value: "Terceros Completo", label: "Terceros Completo" },
          { value: "Terceros Completo con Daños Parciales", label: "Terceros Completo con Daños Parciales" },
          { value: "Todo Riesgo", label: "Todo Riesgo" }
        ],
      },
      {
        id: "primaSegura",
        name: "primaSegura",
        type: "number",
        placeholder: "Prima Segura",
        required: true,
      },
      {
        id: "deducible",
        name: "deducible",
        type: "number",
        placeholder: "Deducible",
        required: true,
      }
]