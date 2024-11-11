import { toast } from 'react-toastify';

const api = process.env.NEXT_PUBLIC_URL_API;

export const fetchPolizas = async (dominio) => {
  const queryParams = new URLSearchParams({ ...(dominio && { dominio }) }).toString();
  const url = `${api}polizas/list?${queryParams}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener las pólizas");
  }

  const data = await response.json();
  return data.map((poliza) => ({
    _id: poliza._id,
    dominio: poliza.dominio,
    marca: poliza.vehiculo.marca,
    modelo: poliza.vehiculo.modelo,
    anio: poliza.vehiculo.anio,
    tipoVehiculo: poliza.vehiculo.tipoVehiculo,
    aseguradora: poliza.aseguradora,
    tipoCobertura: poliza.tipoCobertura,
    primaSegura: poliza.primaSegura,
    deducible: poliza.deducible,
    asegurado: poliza.asegurado, 
  }));
};


export const fetchClientById = async (clienteId) => {
  const api = process.env.NEXT_PUBLIC_URL_API;
  const url = `${api}users/buscarCliente/${clienteId}`;
  
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener el cliente por ID");
  }

  const data = await response.json();
  return data;
};


export const crearPoliza = async (formData) => {
  try {
    const url = `${api}polizas/register`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.log(text);
      throw new Error(`Error: ${text}`);
    }

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      toast.error(`Error: ${data.error || response.statusText}`);
      throw new Error(data.error || response.statusText);
    }
  } catch (error) {
    toast.error(`${error.message}`);
    throw error;
  }
};

export const fetchDnis = async () => {
  try {
    const url = `${api}users/clients`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los DNI de clientes");
    }

    const data = await response.json();
    return data.map(client => ({
      value: client.dni,
      label: `${client.dni} - ${client.name} ${client.lastname}`
    })); 
  } catch (error) {
    throw new Error("Error al obtener los DNI de clientes");
  }
};

export const deletePoliza = async (polizaId) => {
  try {
    const url = `${api}polizas/${polizaId}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar la póliza");
    }

    toast.success("La póliza ha sido eliminada con éxito.");
    return true;
  } catch (error) {
    toast.error("Ocurrió un error al eliminar la póliza.");
    throw error;
  }
};

export const editarPoliza = async (polizaId, updatedData) => {
  try {
    const url = `${api}polizas/${polizaId}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedData),
    });

    // Validar si la respuesta es JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(`Respuesta inesperada del servidor: ${text}`);
    }

    // Procesar JSON normalmente
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Error al actualizar la póliza");
    }

    toast.success("La póliza ha sido actualizada con éxito.");
    return data;
  } catch (error) {
    toast.error("Ocurrió un error al actualizar la póliza.");
    throw error;
  }
};