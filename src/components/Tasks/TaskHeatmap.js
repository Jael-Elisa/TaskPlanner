import React, { useState } from 'react';
import './TaskHeatmap.css';

export default function TaskHeatmap({ title, description, frequency, completedDates = [], color = "#FF8CE1", onEdit, onDelete }) {
  const currentYear = new Date().getFullYear();

  // Estado local para los días marcados como completados
  const [localCompleted, setLocalCompleted] = useState(new Set(completedDates));

  const toggleDay = (dateStr) => {
    setLocalCompleted(prev => {
      const updated = new Set(prev);
      if (updated.has(dateStr)) {
        updated.delete(dateStr);
      } else {
        updated.add(dateStr);
      }
      return updated;
    });
  };

  // Función para oscurecer el color base
  const darkenColor = (hex, amount = 0.5) => {
    const num = parseInt(hex.replace("#", ""), 16);
    let r = (num >> 16) * amount;
    let g = ((num >> 8) & 0x00FF) * amount;
    let b = (num & 0x0000FF) * amount;
    r = Math.min(255, Math.round(r));
    g = Math.min(255, Math.round(g));
    b = Math.min(255, Math.round(b));
    return `rgb(${r}, ${g}, ${b})`;
  };

  const darkColor = darkenColor(color, 0.4);

  const days = [];
  for (let i = 0; i < 365; i++) {
    const date = new Date(currentYear, 0, i + 1);
    const dateStr = date.toISOString().split('T')[0];
    const isCompleted = localCompleted.has(dateStr);

    days.push(
      <div
        key={i}
        className="day-square"
        onClick={() => toggleDay(dateStr)}
        title={dateStr}
        style={{
          backgroundColor: isCompleted ? color : darkColor,
          cursor: 'pointer',
        }}
      ></div>
    );
  }

  return (
    <div className="task-card">
      <div className="task-header">
        <div className="icon">🕒</div>
        <div className="task-info">
          <strong className="task-title">{title}</strong>
          <p className="task-frequency">{frequency}</p>
        </div>
        <div className="task-actions">
        <span title="Editar" onClick={onEdit} className="action-icon">📝</span>

        <span title="Eliminar" onClick={onDelete} className="action-icon">🗑️</span>

        </div>
      </div>
      <div className="task-grid">
        {days}
      </div>
    </div>
  );
}
