import React, { useState, useEffect } from 'react';
import './StudyForm.css';
import axios from 'axios';

export default function StudyForm({ editing, current }) {
  const [topic, setTopic] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [temas, setTemas] = useState('');
  const [progreso, setProgreso] = useState(Array(3).fill(''));
  const [notas, setNotas] = useState('');

  useEffect(() => {
    if (editing && current) {
      setTopic(current.topic);
      setDate(current.date);
      setTime(current.time);
      setTemas(current.temas || '');
      setProgreso(current.progreso || Array(4).fill(''));
      setNotas(current.notas || '');
    }
  }, [editing, current]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic || !date || !time) return alert("Todos los campos obligatorios deben completarse");

    const progresoUnico = progreso.find(p => p.trim() !== '') || '';

    axios.post('http://localhost/task/backend/routes/study_task.php', {
      id: current?.id || Date.now(),
      date,
      time,
      topic,
      temas,
      progreso: progresoUnico,
      notas
    })
    .then(() => {
      alert('Guardado con éxito');
      setTopic('');
      setDate('');
      setTime('');
      setTemas('');
      setProgreso(Array(4).fill(''));
      setNotas('');
    })
    .catch(err => {
      console.error('Error al guardar la tarea de estudio:', err);
      alert('Error al guardar.');
    });
  };

  const handleProgresoChange = (index, value) => {
    const updated = [...progreso];
    updated[index] = value;
    setProgreso(updated);
  };

  return (
    <div className="study-form-container">
      <div className="header-image">
        <h2>Planificador de Estudio</h2>
      </div>

      <form onSubmit={handleSubmit} className="study-form two-columns">
        {/* 🟫 Columna izquierda */}
        <div className="form-column">
          <label className="label-date">
            Fecha:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-date"
            />
          </label>

          <label>Tareas:</label>
          <input
            type="text"
            placeholder="Escribe tus tareas..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="input-topic"
          />

          <label>Hora:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="input-time"
          />

          <label>Notas:</label>
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Escribe tus notas"
            className="notes-box"
          />
        </div>

        {/* 🟫 Columna derecha */}
        <div className="form-column">
          <div className="days-week">
            <span>L</span><span>M</span><span>Mr</span><span>J</span><span>V</span><span>S</span><span>D</span>
          </div>

          <label>Temas de hoy:</label>
          <textarea
            value={temas}
            onChange={(e) => setTemas(e.target.value)}
            placeholder="Escribe los temas..."
            className="temas-box"
          />

          <label>Progreso de estudio:</label>
          {progreso.map((item, i) => (
            <input
              key={i}
              value={item}
              onChange={(e) => handleProgresoChange(i, e.target.value)}
              placeholder={`Progreso ${i + 1}`}
              className="progress-bar"
            />
          ))}
        </div>

        <button type="submit" className="btn-submit">
          {editing ? 'Actualizar' : 'Agregar'}
        </button>
      </form>
    </div>
  );
}
