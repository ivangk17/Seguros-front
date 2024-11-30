const api = process.env.NEXT_PUBLIC_URL_API;

export const fetchAseguradores = async (search, dni, email, state) => {
  try {
    const queryParams = new URLSearchParams({
      ...(search && { search }),
      ...(dni && { dni }),
      ...(email && { email }),
      ...(state && { state }),
    }).toString();
    const url = `${api}users/getAseguradores?${queryParams}`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching aseguradores");
    }

    const data = await response.json();
    const stateMap = {
      active: "Activo",
      payment_blocked: "Bloqueo falta de pago",
      blocked: "Bloqueo de seguridad",
      unverify: "No verificado",
    };

    const dataMapped = data.map((client) => {
      const stateToShow = stateMap[client.state] || "Estado desconocido";

      return { ...client, stateToShow };
    });
    return dataMapped;
  } catch (error) {
    throw new Error(error.message || "Error fetching clients");
  }
};

export const changeStateClient = async (asegurado, newState) => {
  const validStates = ["payment_blocked", "active"];

  if (!validStates.includes(newState)) {
    throw new Error("El estado proporcionado no es válido.");
  }

  const { _id } = asegurado;

  try {
    const url = `${api}users/editarEstadoAsegurador/${_id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({ newState }),
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(`Error: ${text}`);
    }

    if (!response.ok) {
      throw new Error("Error al cambiar el estado del asegurador.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error.message || "Error inesperado en el cambio de estador del asegurador"
    );
  }
};
