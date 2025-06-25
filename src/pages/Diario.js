// Diario.js - Lista de tareas con botón "+" para agregar tarea
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/Tasks/TaskList';
import './Diario.css';

export default function Diario() {
  const navigate = useNavigate();

  return (
    <div >
      <header className="diario-header">
        <h1 className="diario-title">Mis Tareas</h1>
        <button
          className="add-task-button"
          onClick={() => navigate('/task-form')}  // <-- Cambiado a /task-form
          aria-label="Agregar tarea"
        >
          +
        </button>
      </header>
      <TaskList />
    </div>
  );
}
