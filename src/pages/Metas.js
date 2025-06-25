// src/pages/Metas.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import GoalList from '../components/Metas/GoalList';
import './Metas.css'; // Puedes crear estilos si deseas

export default function Metas() {
  const navigate = useNavigate();

  return (
    <div className="metas-container">
      <div className="metas-header">
        <h1>Tus Metas</h1>
        <button className="btn-add-goal" onClick={() => navigate('/metas/nueva')}>➕ Nueva Meta</button>
      </div>

      <GoalList />
    </div>
  );
}
