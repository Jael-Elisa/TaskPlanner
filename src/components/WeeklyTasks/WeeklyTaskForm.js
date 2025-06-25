import React, { useState, useEffect } from 'react';
import './WeeklyTaskForm.css';

const WeeklyTaskForm = ({ onSave, editingTask, onCancel }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    task_date: '',
    status: 'pendiente'
  });

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask);
    } else {
      setTask({ title: '', description: '', task_date: '', status: 'pendiente' });
    }
  }, [editingTask]);

  const handleChange = e => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(task);
    setTask({ title: '', description: '', task_date: '', status: 'pendiente' });
  };

  return (
    <form className="weekly-task-form" onSubmit={handleSubmit}>

      <div className="form-row">
        <label htmlFor="title">Título *</label>
        <input
          id="title"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Título de la tarea"
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Descripción (opcional)"
          rows={3}
        />
      </div>

      <div className="form-row half-width">
        <label htmlFor="task_date">Fecha *</label>
        <input
          id="task_date"
          type="date"
          name="task_date"
          value={task.task_date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row half-width">
        <label htmlFor="status">Estado</label>
        <select
          id="status"
          name="status"
          value={task.status}
          onChange={handleChange}
        >
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En progreso</option>
          <option value="completada">Completada</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-save">
          {editingTask ? 'Actualizar' : 'Agregar'}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-cancel"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default WeeklyTaskForm;
