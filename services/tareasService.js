import { getToken } from "./authService";

// Obtener la lista de tareas
export const obtenerTareas = async () => {
  const token = await getToken();
  const response = await fetch("http://localhost:3535/api/tareas/lista", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  
  if (!response.ok) {
    throw new Error("Error al obtener la lista de tareas.");
  }

  return await response.json();
};

// Crear una nueva tarea
export const crearTarea = async (tarea) => {
  const token = await getToken();
  const response = await fetch("http://localhost:3535/api/tareas/crear", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tarea),
  });
  
  if (!response.ok) {
    throw new Error("Error al crear la tarea.");
  }

  return await response.json();
};

// Actualizar una tarea existente
export const actualizarTarea = async (id, tareaActualizada) => {
  const token = await getToken();
  const response = await fetch(`http://localhost:3535/api/tareas/actualizar/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tareaActualizada),
  });
  
  if (!response.ok) {
    throw new Error("Error al actualizar la tarea.");
  }

  return await response.json();
};

// Eliminar una tarea
export const eliminarTarea = async (id) => {
  const token = await getToken();
  const response = await fetch(`http://localhost:3535/api/tareas/eliminar/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la tarea.");
  }

  return await response.json();
};
