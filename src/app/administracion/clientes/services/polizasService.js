const api = process.env.NEXT_PUBLIC_URL_API;

export const getPolizasByAsegurado = async (clienteId) => {
  try {
    const url = `${api}polizas/listAsegurado/${clienteId}`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al recuperar las pólizas del usuario.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === "TypeError") {
      throw new Error(
        "En estos momentos no es posible obtener la póliza. Por favor, inténtalo más tarde."
      );
    }
    throw new Error(
      error.message || "Error inesperado al obtener las pólizas."
    );
  }
};

export const crearPoliza = async (formData) => {
  const api = process.env.NEXT_PUBLIC_URL_API;
  try {
    const url = `${api}polizas/register`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(`Error: ${text}`);
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || response.statusText);
    }
    return data;
  } catch (error) {
    if (error.name === "TypeError") {
      throw new Error(
        "En estos momentos no es posible obtener la póliza. Por favor, inténtalo más tarde."
      );
    }
    throw new Error(
      error.message || "Error inesperado al obtener las pólizas."
    );
  }
};
