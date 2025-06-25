import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StudyList.css';
import axios from 'axios';

const colors = ['note-yellow', 'note-pink', 'note-green', 'note-blue', 'note-orange'];

export default function StudyList({ sessions = [] }) {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
      axios.delete('http://localhost/task/backend/routes/study_task.php', {
        data: { id }
      })
      .then(() => {
        alert('Tarea eliminada con éxito');
        window.location.reload();
      })
      .catch(err => {
        console.error(err);
        alert('Error al eliminar la tarea');
      });
    }
  };

  return (
    <div className="study-list-container">
      <h2 className="titulo-estudio">Notas de Estudio</h2>

      {sessions.length === 0 ? (
        <p className="empty-msg">No hay sesiones registradas.</p>
      ) : (
        <div className="notes-grid">
          {sessions.map((session, i) => {
            const colorClass = colors[i % colors.length];

            return (
              <div
                key={session.id}
                className={`session-card ${colorClass}`}
                style={{ "--i": (i % 3) / 2 }}
              >
                <div className="session-header">
                  <h3>{session.topic}</h3>
                  <div>
                    <button onClick={() => navigate(`/editar/${session.id}`)} className="btn-edit">✏️</button>
                    <button onClick={() => handleDelete(session.id)} className="btn-delete">🗑️</button>
                  </div>
                </div>

                <div className="session-meta">
                  <span className="date-box">📅 {session.date}</span>
                  <span className="time-box">⏰ {session.time}</span>
                </div>

                <hr className="divider" />

                <div className="session-info">
                  <p><strong>Temas:</strong><br /> {session.temas || '-'}</p>
                  <p>
                    <strong>Progreso:</strong><br />
                    {session.progreso || '-'}
                  </p>
                  <p><strong>Notas:</strong><br /> {session.notas || '-'}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
