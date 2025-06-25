const API_URL = "http://localhost/task/backend/routes/api.php";

export const getTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/tasks`);
    const data = await response.json();
    return data.tasks || [];
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    return [];
  }
};

export const createTask = async (task) => {
  try {
    const response = await fetch(`${API_URL}/create-task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al crear tarea:", error);
    return { status: "error", message: "Fallo en la solicitud" };
  }
};

export const updateTaskStatus = async (id, newStatus) => {
  try {
    const response = await fetch(`${API_URL}/update-task-status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status: newStatus }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    return { status: "error", message: "Fallo al actualizar estado" };
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/delete-task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    return { status: "error", message: "Fallo al eliminar tarea" };
  }
};
