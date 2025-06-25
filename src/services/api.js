// import axios from "axios";

// const API_URL = "http://localhost:8080";


// // Obtener todas las tareas
// export const getTasks = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/tasks`);
//     return response.data;
//   } catch (error) {
//     console.error("Error al obtener tareas", error);
//     return [];
//   }
// };

// // Login de usuario
// export const loginUser = async (email, password) => {
//   try {
//     const response = await axios.post(`${API_URL}/login`, { email, password });
//     return response.data;
//   } catch (error) {
//     console.error("Error en el login", error);
//     return { status: "error", message: "Error de conexión" };
//   }
// };

// // Registrar usuario
// export const registerUser = async (name, email, password) => {
//   try {
//     const response = await axios.post(`${API_URL}/register`, {
//       name,
//       email,
//       password,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error en el registro", error);
//     return { status: "error", message: "Error de conexión" };
//   }
// };

const API_URL = "http://localhost:8000";


// export async function loginUser(email, password) {
//   try {
//     const response = await fetch("http://localhost/task/backend/routes/api.php/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8"
//       },
//       body: JSON.stringify({ email, password })
//     });

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error en loginUser:", error);
//     return { status: "error", message: "Error en conexión con el servidor" };
//   }
// }



export const loginUser = async (email, password) => {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
  return await res.json();
};


const API_BASE = "https://task-backend-337d.onrender.com";  // Sin api.php porque es hosting remoto y asumo rutas friendly

export const fetchTasks = async () => {
  const res = await fetch(`${API_BASE}/tasks`);
  return await res.json();
};

export const createTask = async (task) => {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return await res.json();
};

export const updateTask = async (task) => {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return await res.json();
};

export const deleteTask = async (id) => {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "DELETE",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `id=${id}`,
  });
  return await res.json();
};




