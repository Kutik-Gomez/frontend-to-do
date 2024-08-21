import AsyncStorage from "@react-native-async-storage/async-storage";

// Función para iniciar sesión y obtener el token
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
      await AsyncStorage.setItem('token', data.token); // Almacenar el token directamente aquí
      return { success: true };
    } else {
      return { error: data.message || "Correo o clave incorrectos", success: false };
    }
  } catch (error) {
    console.error("Error al intentar iniciar sesión:", error);
    return { error: "No se pudo conectar con el servidor", success: false };
  }
};

// Función para obtener el token
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
    console.error("Error al obtener el token:", error);
    return null;
  }
};

// Función para eliminar el token (Cerrar sesión)
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.error("Error al eliminar el token:", error);
  }
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = async () => {
  const token = await getToken();
  return token !== null;
};
