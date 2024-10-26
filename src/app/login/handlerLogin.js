export async function handlerLogin(usuario, setErrors, setToken) {
  const api = process.env.NEXT_PUBLIC_URL_API;
  const url = `${api}users/login`;
  const MSG_ERROR_CONEXION =
    "En este momento no hay conexion, intente nuevamente mas tarde";
  try {
    const request = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });

    switch (request.status) {
      case 200: {
        const response = await request.json();
        const token = response.token;
        setToken(token);
        sessionStorage.setItem("token", token);
        break;
      }
      case 400: {
        const response = await request.text();
        setErrors((prev) => ({
          ...prev,
          submit: response,
        }));
        break;
      }
      case 401: {
        const response = await request.text();
        setErrors((prev) => ({
          ...prev,
          submit: response,
        }));
        break;
      }
      default: {
        const response = await request.json();
        console.log(response);
        setErrors((prev) => ({ ...prev, submit: MSG_ERROR_CONEXION }));
        break;
      }
    }
  } catch (error) {
    setErrors((prev) => ({
      ...prev,
      submit: MSG_ERROR_CONEXION,
    }));
  }
}
