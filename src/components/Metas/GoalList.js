import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GoalList.css';

export default function GoalList() {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost/task/backend/routes/goal.php')
      .then(res => {
        if (Array.isArray(res.data)) {
          setGoals(res.data);
        } else {
          console.error('Respuesta inesperada, se esperaba un array:', res.data);
          setGoals([]);
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error al cargar metas');
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar esta meta?')) {
      axios.delete('http://localhost/task/backend/routes/goal.php', {
        data: { id }
      })
        .then(() => {
          setGoals(goals.filter(goal => goal.id !== id));
          alert('Meta eliminada');
        })
        .catch(err => {
          console.error(err);
          alert('Error al eliminar');
        });
    }
  };

  return (
    <div className="goal-list">
      {goals.length === 0 ? (
        <p className="no-goals-msg">No tienes metas registradas aún.</p>
      ) : (
        goals.map(goal => (
          <div key={goal.id} className={`goal-card estado-${goal.estado.replace(/\s+/g, '-').toLowerCase()}`}>
            <div className="goal-header">
              <h3 className="goal-title">{goal.titulo}</h3>
              <span className="goal-type">{goal.tipo.toUpperCase()}</span>
            </div>

            <p className="goal-description">{goal.descripcion}</p>

            <div className="goal-dates">
              <div className="fecha inicio">
                <strong>Inicio:</strong>
                <span>{goal.fecha_inicio}</span>
              </div>
              <div className="fecha fin">
                <strong>Fin:</strong>
                <span>{goal.fecha_fin}</span>
              </div>
            </div>

            <div className="goal-extra">
              <p><strong>Progreso:</strong> {goal.progreso || '0%'}</p>
              <p><strong>Estado:</strong> <span className="estado-label">{goal.estado}</span></p>
            </div>

            <div className="goal-actions">
              <button onClick={() => navigate(`/metas/editar/${goal.id}`)} className="btn-edit" title="Editar meta">✏️</button>
              <button onClick={() => handleDelete(goal.id)} className="btn-delete" title="Eliminar meta">🗑️</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
