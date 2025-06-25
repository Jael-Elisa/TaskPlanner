import React, { useState, useEffect } from 'react';
import StudyList from '../components/Estudio/StudyList';
import StudyForm from '../components/Estudio/StudyForm';
import axios from 'axios';

export default function Estudio() {
  const [sessions, setSessions] = useState([]);
  const [editing, setEditing] = useState(false);
  const [current, setCurrent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios.get('http://localhost/task/backend/routes/study_task.php')
      .then(res => setSessions(res.data))
      .catch(console.error);
  }, []);

  const saveSession = (session) => {
    // Aquí deberías refrescar la lista de la base de datos o agregar localmente
    // Para ejemplo simple, agregamos localmente y cerramos form
    if(editing) {
      setSessions(prev => prev.map(s => s.id === session.id ? session : s));
      setEditing(false);
      setCurrent(null);
    } else {
      setSessions(prev => [...prev, session]);
    }
    setShowForm(false);
  };

  const editSession = (session) => {
    setCurrent(session);
    setEditing(true);
    setShowForm(true);
  };

  const deleteSession = (id) => {
    if(window.confirm('¿Eliminar esta sesión?')) {
      setSessions(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <div>
      <button
        onClick={() => { setShowForm(true); setEditing(false); setCurrent(null); }}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          fontSize: '24px',
          padding: '10px 15px',
          borderRadius: '50%',
          cursor: 'pointer',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
        }}
      >+</button>

      {showForm 
        ? <StudyForm editing={editing} current={current} onSave={saveSession} />
        : <StudyList sessions={sessions} onEdit={editSession} onDelete={deleteSession} />
        
      }
    </div>
  );
}
