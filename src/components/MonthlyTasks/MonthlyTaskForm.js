import React, { useState, useEffect } from 'react';
import './MonthlyTaskForm.css';

export default function MonthlyTaskForm({ selectedDate, task, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    fecha: selectedDate || '',
    titulo: '',
    descripcion: '',
    estado: 'Pendiente',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        fecha: task.fecha,
        titulo: task.titulo,
        descripcion: task.descripcion,
        estado: task.estado,
      });
    } else if (selectedDate) {
      setFormData(prev => ({ ...prev, fecha: selectedDate }));
    }
  }, [selectedDate, task]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="mtf-form" onSubmit={handleSubmit} noValidate>
      <div className="mtf-group">
        <label htmlFor="fecha" className="mtf-label">Fecha</label>
        <input
          type="date"
          id="fecha"
          name="fecha"
          className="mtf-input mtf-input-date"
          value={formData.fecha}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mtf-group">
        <label htmlFor="titulo" className="mtf-label">Título</label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          className="mtf-input mtf-input-text"
          placeholder="Título"
          value={formData.titulo}
          onChange={handleChange}
          required
          maxLength={100}
        />
      </div>

      <div className="mtf-group">
        <label htmlFor="descripcion" className="mtf-label">Descripción</label>
        <textarea
          id="descripcion"
          name="descripcion"
          className="mtf-textarea"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
          rows={4}
          maxLength={500}
        />
      </div>

      <div className="mtf-group">
        <label htmlFor="estado" className="mtf-label">Estado</label>
        <select
          id="estado"
          name="estado"
          className="mtf-select"
          value={formData.estado}
          onChange={handleChange}
        >
          <option value="Pendiente">Pendiente</option>
          <option value="En progreso">En progreso</option>
          <option value="Completado">Completado</option>
          <option value="Programado">Programado</option>
        </select>
      </div>

      <div className="mtf-buttons">
        <button type="submit" className="mtf-btn mtf-btn-submit">Guardar</button>
        <button type="button" className="mtf-btn mtf-btn-cancel" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}
