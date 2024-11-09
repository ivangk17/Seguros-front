const api = process.env.NEXT_PUBLIC_URL_API;

export const changeStateClient = async (cliente, newState) => {
  const validStates = ["payment_blocked", "active"];

  if (!validStates.includes(newState)) {
    throw new Error("El estado proporcionado no es válido.");
  }

  const { _id } = cliente;

  try {
    const url = `${api}users/editarEstado/${_id}`;
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
      throw new Error("Error al cambiar el estado cliente.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error.message || "Error inesperado en la creación del cliente"
    );
  }
};

export const fetchClients = async (search, dni, email, phone, state) => {
  try {
    const queryParams = new URLSearchParams({
      ...(search && { search }),
      ...(dni && { dni }),
      ...(email && { email }),
      ...(phone && { phone }),
      ...(state && { state }),
    }).toString();

    const url = `${api}users/clients?${queryParams}`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching clients");
    }

    const data = await response.json();
    const stateMap = {
      active: "Activo",
      payment_blocked: "Bloqueo falta de pago",
      blocked: "Bloqueo de seguridad",
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

export const createCliente = async (formData) => {
  try {
    const url = `${api}users/register/client`;
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

    if (!response.ok) {
      throw new Error("Error al agregar cliente.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error.message || "Error inesperado en la creación del cliente"
    );
  }
};

export const deleteCliente = async (idAsegurado) => {
  try {
    const url = `${api}users/${idAsegurado}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el cliente");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error.message || "Error inesperado en la eliminación del cliente"
    );
  }
};
