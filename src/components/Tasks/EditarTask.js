import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarTask() {
  const { id } = useParams(); // recibe el id desde la URL
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#000000');
  const [priority, setPriority] = useState('media');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(false);

  // Obtener id de usuario asignado guardado en localStorage
  const assigned_user = JSON.parse(localStorage.getItem('user'))?.id;

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`http://localhost/task/backend/controllers/TaskController.php?id=${id}`)
        .then(response => {
          // Aquí asumimos que la API devuelve un objeto con la tarea
          let task = response.data;

          // Si la API devuelve un array, tomar el primer elemento
          if (Array.isArray(task)) {
            task = task[0];
          }

          console.log('Tarea recibida:', task);

          setTitle(task.title || '');
          setDescription(task.description || '');

          // Validar color para que sea siempre un color hexadecimal válido
          if (task.color && /^#([0-9A-Fa-f]{6})$/.test(task.color)) {
            setColor(task.color);
          } else if (task.color && /^[0-9A-Fa-f]{6}$/.test(task.color)) {
            setColor(`#${task.color}`);
          } else {
            setColor('#000000');
          }

          setPriority(task.priority || 'media');

          // Asegurar formato correcto para date (YYYY-MM-DD)
          if (task.deadline) {
            // Intentar convertir a string válido de fecha
            const date = new Date(task.deadline);
            if (!isNaN(date)) {
              setDeadline(date.toISOString().slice(0, 10));
            } else {
              setDeadline('');
            }
          } else {
            setDeadline('');
          }
        })
        .catch(error => {
          console.error("Error al cargar tarea:", error);
          // Opcional: mostrar mensaje de error al usuario
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.put(`http://localhost/task/backend/controllers/TaskController.php?id=${id}`, {
            id, // ← este campo es necesario si el backend lo requiere
            title,
            description,
            color,
            priority,
            assigned_user,
            deadline
          });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
      // Opcional: mostrar mensaje de error al usuario
    }
  };

  if (loading) return <p>Cargando tarea...</p>;

  return (
    <div className="diario-container">
      <h2>Editar Tarea</h2>
      <form onSubmit={handleSubmit} className="diario-form">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
}
