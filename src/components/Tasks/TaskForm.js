import React, { useState } from 'react';
import './Diario.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Diario() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#000000');
  const [priority, setPriority] = useState('media');
  const [deadline, setDeadline] = useState('');
  const navigate = useNavigate();

  const assigned_user = JSON.parse(localStorage.getItem('user'))?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost/task/backend/routes/TaskRoutes.php', {
        title,
        description,
        color,
        priority,
        assigned_user,
        deadline,
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al guardar la tarea:', error);
    }
  };

  return (
    <div className="diario-container">
      <h2>Nueva Tarea</h2>
      <form onSubmit={handleSubmit} className="diario-form">
        <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
