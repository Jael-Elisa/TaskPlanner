import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TaskHeatmap from './TaskHeatmap';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('http://localhost/task/backend/controllers/TaskController.php')
      .then(response => {
        const filteredTasks = response.data.filter(task => task.assigned_user == userId);
        setTasks(filteredTasks);
      })
      .catch(error => console.error("Error al obtener tareas", error));
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Seguro quieres eliminar esta tarea?")) {
      axios.delete(`http://localhost/task/backend/controllers/TaskController.php?id=${id}`)
        .then(() => {
          setTasks(tasks.filter(task => task.id !== id));
        })
        .catch(error => console.error("Error al eliminar tarea", error));
    }
  };

  const handleEdit = (id) => {
    navigate(`/task-form/${id}`);
  };
  

  return (
    <div>
      {tasks.length === 0 ? (
        <p>No hay tareas.</p>
      ) : (
        tasks.map(task => (
          <TaskHeatmap
            key={task.id}
            title={task.title}
            description={task.description}
            frequency={task.description}
            color={task.color}
            completedDates={task.completed_dates || []}
            onEdit={() => handleEdit(task.id)}
            onDelete={() => handleDelete(task.id)}
          />
        ))
      )}
    </div>
  );
}
