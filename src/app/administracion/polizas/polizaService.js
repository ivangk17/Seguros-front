// polizaService.js
import { toast } from 'react-toastify';

export const crearPoliza = async (formData) => {
    const api = process.env.NEXT_PUBLIC_URL_API;
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
      toast.success("La póliza ha sido agregada con éxito.");
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
