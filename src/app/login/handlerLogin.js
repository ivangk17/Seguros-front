export async function handlerLogin(usuario, setInicio, setError, setToken, setUser) {

  const url = "http://localhost:3000/api/users/loginAdminYAsegurador";

  try {
    const request = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });

    if (request.status === 200) {
      const response = (await request.json())
      const token = response.token;
      const usuario = JSON.stringify(response.user);
      setToken(token);
      setUser(usuario);
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', usuario);
    } else {
      setError('Credenciales inválidas');
    }
  } catch (error) {
    setError('Error al realizar la solicitud');
  } finally {
    setInicio(true);
  }
}