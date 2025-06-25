import React from 'react';
import './MonthlyTaskList.css';

export default function MonthlyTaskList({ tasks, onEdit, onDelete }) {
  if (!tasks.length) {
    return <p className="no-tasks-msg">No hay tareas mensuales aún.</p>;
  }

  return (
    <div className="monthly-task-list">
      {tasks.map(task => (
        <div key={task.id} className="task-card">
          <h3 className="task-title">{task.titulo}</h3>
          <p className="task-date"><strong>Fecha:</strong> {task.fecha}</p>
          <p className="task-desc"><strong>Descripción:</strong> {task.descripcion}</p>
          <p className="task-status"><strong>Estado:</strong> {task.estado}</p>
          <div className="task-actions">
            <button onClick={() => onEdit(task)} className="btn btn-edit" aria-label={`Editar ${task.titulo}`}>✏️</button>
            <button onClick={() => onDelete(task.id)} className="btn btn-delete" aria-label={`Eliminar ${task.titulo}`}>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );
}
