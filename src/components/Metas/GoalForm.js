import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './GoalForm.css'; // Asegúrate que este CSS esté importado

export default function GoalForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    tipo: 'diaria',
    fecha_inicio: '',
    fecha_fin: '',
    progreso: '',
    estado: 'pendiente',
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost/task/backend/routes/goal.php?id=${id}`)
        .then(res => {
          const data = res.data;
          if (data.fecha_inicio) data.fecha_inicio = data.fecha_inicio.split(' ')[0];
          if (data.fecha_fin) data.fecha_fin = data.fecha_fin.split(' ')[0];
          setFormData(data);
        })
        .catch(err => {
          console.error(err);
          alert('Error al cargar meta');
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value || '',  // Asegura no undefined
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`http://localhost/task/backend/routes/goal.php`, { ...formData, id })
        .then(() => {
          alert('Meta actualizada');
          navigate('/metas');
        })
        .catch(err => {
          console.error(err);
          alert('Error al actualizar meta');
        });
    } else {
      axios.post('http://localhost/task/backend/routes/goal.php', formData)
        .then(() => {
          alert('Meta creada');
          navigate('/metas');
        })
        .catch(err => {
          console.error(err);
          alert('Error al crear meta');
        });
    }
  };

  return (
    <form className="goal-form-container" onSubmit={handleSubmit}>

      <h2>{id ? 'Editar Meta' : 'Nueva Meta'}</h2>

      <label htmlFor="titulo">Título</label>
      <input
        id="titulo"
        type="text"
        name="titulo"
        value={formData.titulo}
        onChange={handleChange}
        placeholder="Título"
        required
      />

      <label htmlFor="descripcion">Descripción</label>
      <textarea
        id="descripcion"
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
      />

      <label htmlFor="tipo">Tipo</label>
      <select
        id="tipo"
        name="tipo"
        value={formData.tipo}
        onChange={handleChange}
        required
      >
        <option value="diaria">Diaria</option>
        <option value="semanal">Semanal</option>
        <option value="mensual">Mensual</option>
        <option value="anual">Anual</option>
        <option value="otra">Otra</option>
      </select>

      <label htmlFor="fecha_inicio">Fecha inicio</label>
      <input
        id="fecha_inicio"
        type="date"
        name="fecha_inicio"
        value={formData.fecha_inicio || ''}
        onChange={handleChange}
      />

      <label htmlFor="fecha_fin">Fecha fin</label>
      <input
        id="fecha_fin"
        type="date"
        name="fecha_fin"
        value={formData.fecha_fin || ''}
        onChange={handleChange}
      />

      <label htmlFor="progreso">Progreso</label>
      <input
        id="progreso"
        type="text"
        name="progreso"
        value={formData.progreso || ''}
        onChange={handleChange}
        placeholder="Progreso"
      />

      <label htmlFor="estado">Estado</label>
      <select
        id="estado"
        name="estado"
        value={formData.estado}
        onChange={handleChange}
        required
      >
        <option value="pendiente">Pendiente</option>
        <option value="en progreso">En progreso</option>
        <option value="completada">Completada</option>
      </select>

      <button type="submit">{id ? 'Actualizar' : 'Crear'} Meta</button>
    </form>
  );
}
