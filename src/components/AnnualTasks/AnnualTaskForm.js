import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './AnnualTaskForm.css';

export default function AnnualTaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    progreso: '',
    estado: 'pendiente'
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost/task/backend/routes/annual_task.php?id=${id}`)
        .then(res => {
          if (res.data) {
            setFormData({
              ...res.data,
              fecha_inicio: res.data.fecha_inicio ? res.data.fecha_inicio.split(' ')[0] : '',
              fecha_fin: res.data.fecha_fin ? res.data.fecha_fin.split(' ')[0] : '',
            });
          }
        })
        .catch(() => alert('Error al cargar la tarea'));
    }
  }, [id]);

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (id) {
      axios.put('http://localhost/task/backend/routes/annual_task.php', {...formData, id})
        .then(() => {
          alert('Tarea actualizada');
          navigate('/annual-tasks');
        })
        .catch(() => alert('Error al actualizar la tarea'));
    } else {
      axios.post('http://localhost/task/backend/routes/annual_task.php', formData)
        .then(() => {
          alert('Tarea creada');
          navigate('/annual-tasks');
        })
        .catch(() => alert('Error al crear la tarea'));
    }
  };

  return (
    <form className="annual-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={formData.titulo}
        onChange={handleChange}
        required
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={formData.descripcion}
        onChange={handleChange}
      />
      <label>Fecha inicio:</label>
      <input
        type="date"
        name="fecha_inicio"
        value={formData.fecha_inicio || ''}
        onChange={handleChange}
      />
      <label>Fecha fin:</label>
      <input
        type="date"
        name="fecha_fin"
        value={formData.fecha_fin || ''}
        onChange={handleChange}
      />
      <input
        type="text"
        name="progreso"
        placeholder="Progreso"
        value={formData.progreso}
        onChange={handleChange}
      />
      <select name="estado" value={formData.estado} onChange={handleChange} required>
        <option value="pendiente">Pendiente</option>
        <option value="en progreso">En progreso</option>
        <option value="completada">Completada</option>
      </select>
      <button type="submit">{id ? 'Actualizar' : 'Crear'} Tarea</button>
    </form>
  );
}
