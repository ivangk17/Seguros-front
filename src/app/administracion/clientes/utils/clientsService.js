import { toast } from "react-toastify";

const api = process.env.NEXT_PUBLIC_URL_API;

const CLIENTE_ACTIVO = "ACTIVO";
const CLIENTE_INACTIVO = "INACTIVO";

export const cambiarEstadoCliente = async (cliente) => {
  const estado =
    cliente.estado === CLIENTE_ACTIVO ? CLIENTE_INACTIVO : CLIENTE_ACTIVO;

  const { _id } = cliente;
  try {
    const url = `${api}users/editarEstado/${_id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({ estado }),
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(`Error: ${text}`);
    }

    if (response.ok) {
      toast.success(`El cliente ${cliente.fullName} ahora esta ${estado}`);
    } else {
      toast.error(`Error`);
    }
  } catch (error) {
    toast.error(`Error catch:`, error.message);
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
    return data;
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
    throw new Error(error.message || "Error fetching clients");
  }
};
