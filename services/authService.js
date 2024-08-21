export const loginUsuario = async (correo, clave) => {
    try {
      const response = await fetch("http://localhost:3535/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, clave }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return { token: data.token, success: true };
      } else {
        return { error: data.message || "Correo o clave incorrectos", success: false };
      }
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      return { error: "No se pudo conectar con el servidor", success: false };
    }
  };
  