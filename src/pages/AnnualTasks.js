import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnnualTaskList from '../components/AnnualTasks/AnnualTaskList';
import './AnnualTasks.css';

export default function AnnualTasks() {
  const navigate = useNavigate();

  return (
    <div className="annual-tasks-container">
      <div className="header">
        <h1>Tareas Anuales</h1>
        <button onClick={() => navigate('/annual-tasks/new')} className="btn-add">➕ Nueva Tarea</button>
      </div>
      <AnnualTaskList />
    </div>
  );
}
