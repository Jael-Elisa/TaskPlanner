import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './EditarStudyTask.css';


export default function EditarStudyTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    topic: '',
    date: '',
    time: '',
    temas: '',
    progreso: '',
    notas: ''
  });

  useEffect(() => {
    // Obtener los datos existentes
    axios.get(`http://localhost/task/backend/routes/study_task.php?id=${id}`)
      .then(res => {
        setFormData(res.data);
      })
      .catch(err => {
        console.error(err);
        alert('Error al cargar tarea');
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost/task/backend/routes/study_task.php`, {
      ...formData,
      id
    })
      .then(() => {
        alert('Tarea actualizada');
        navigate('/dashboard');
      })
      .catch(err => {
        console.error(err);
        alert('Error al actualizar');
      });
  };

  return (
    <form className="editar-studytask-form" onSubmit={handleUpdate}>
  <h2 className="editar-studytask-title">Editar Tarea</h2>

  <input
    type="text"
    name="topic"
    value={formData.topic}
    onChange={handleChange}
    placeholder="Tema"
    required
    className="editar-studytask-input"
  />

  <input
    type="date"
    name="date"
    value={formData.date}
    onChange={handleChange}
    required
    className="editar-studytask-input"
  />

  <input
    type="time"
    name="time"
    value={formData.time}
    onChange={handleChange}
    required
    className="editar-studytask-input"
  />

  <textarea
    name="temas"
    value={formData.temas}
    onChange={handleChange}
    placeholder="Temas..."
    className="editar-studytask-textarea"
  />

  <input
    name="progreso"
    value={formData.progreso}
    onChange={handleChange}
    placeholder="Progreso"
    className="editar-studytask-input"
  />

  <textarea
    name="notas"
    value={formData.notas}
    onChange={handleChange}
    placeholder="Notas..."
    className="editar-studytask-textarea"
  />

  <button type="submit" className="editar-studytask-button">Actualizar</button>
</form>

  );
}
