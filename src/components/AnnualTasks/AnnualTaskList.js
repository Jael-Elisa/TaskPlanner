import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AnnualTaskList.css'; // Asegúrate que solo afecta este componente

export default function AnnualTaskList() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost/task/backend/routes/annual_task.php')
      .then(res => {
        if (Array.isArray(res.data)) {
          setTasks(res.data);
        } else {
          console.error('Respuesta inesperada:', res.data);
          setTasks([]);
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error al cargar tareas anuales');
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar esta tarea?')) {
      axios.delete('http://localhost/task/backend/routes/annual_task.php', { data: { id } })
        .then(() => {
          setTasks(tasks.filter(task => task.id !== id));
          alert('Tarea eliminada');
        })
        .catch(err => {
          console.error(err);
          alert('Error al eliminar tarea');
        });
    }
  };

  return (
    <div className="atl-list">
      {tasks.length === 0 ? (
        <p className="atl-empty">No hay tareas anuales registradas.</p>
      ) : (
        tasks.map(task => (
          <div key={task.id} className="atl-card">
            <h3 className="atl-title">{task.titulo}</h3>
            <p className="atl-item"><strong>📋 Descripción:</strong> {task.descripcion}</p>
            <p className="atl-item"><strong>📅 Fecha inicio:</strong> {task.fecha_inicio}</p>
            <p className="atl-item"><strong>📅 Fecha fin:</strong> {task.fecha_fin}</p>
            <p className="atl-item"><strong>⏳ Progreso:</strong> {task.progreso}</p>
            <p className="atl-item"><strong>📌 Estado:</strong> {task.estado}</p>
            <div className="atl-actions">
              <button onClick={() => navigate(`/annual-tasks/edit/${task.id}`)} className="atl-btn-edit">✏️</button>
              <button onClick={() => handleDelete(task.id)} className="atl-btn-delete">🗑️</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
