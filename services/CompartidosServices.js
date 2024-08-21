import { getToken } from "./authService";

// Obtener la lista de tareas compartidas
export const obtenerCompartidos = async () => {
  const token = await getToken();
  const response = await fetch("http://localhost:3535/api/compartidos/lista", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  
  if (!response.ok) {
    throw new Error("Error al obtener la lista de tareas compartidas.");
  }

  return await response.json();
};

// Crear una nueva tarea compartida
export const crearCompartido = async (compartido) => {
  const token = await getToken();
  const response = await fetch("http://localhost:3535/api/compartidos/crear", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(compartido),
  });
  
  if (!response.ok) {
    throw new Error("Error al crear la tarea compartida.");
  }

  return await response.json();
};

// Actualizar una tarea compartida existente
export const actualizarCompartido = async (id, compartidoActualizado) => {
  const token = await getToken();
  const response = await fetch(`http://localhost:3535/api/compartidos/actualizar/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(compartidoActualizado),
  });
  
  if (!response.ok) {
    throw new Error("Error al actualizar la tarea compartida.");
  }

  return await response.json();
};

// Eliminar una tarea compartida
export const eliminarCompartido = async (id) => {
  const token = await getToken();
  const response = await fetch(`http://localhost:3535/api/compartidos/eliminar/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la tarea compartida.");
  }

  return await response.json();
};
