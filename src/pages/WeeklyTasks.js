import React, { useEffect, useState } from 'react';
import WeeklyBoard from '../components/WeeklyTasks/WeeklyBoard';
import WeeklyTaskForm from '../components/WeeklyTasks/WeeklyTaskForm';
import './WeeklyTasks.css';

const API_URL = 'http://localhost/task/backend/routes/weekly_task.php';

const WeeklyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const fetchTasks = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(setTasks)
      .catch(err => console.error('Error al cargar tareas:', err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSave = task => {
    const method = task.id ? 'PUT' : 'POST';

    fetch(API_URL, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    })
      .then(res => res.json())
      .then(() => {
        fetchTasks();
        setEditingTask(null);
        setIsCreating(false);
      })
      .catch(err => console.error('Error al guardar tarea:', err));
  };

  const handleDelete = id => {
    fetch(API_URL, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
      .then(() => setTasks(tasks.filter(t => t.id !== id)))
      .catch(err => console.error('Error al eliminar tarea:', err));
  };

  return (
    <div className="wt-page-container">
      <div className="wt-header-banner">
        <img
          src="https://i.pinimg.com/736x/10/c8/9a/10c89a224c18b4c7c9dbbc8a981e1bba.jpg"
          alt="Banner semanal oscuro"
        />
        <div className="wt-header-text">
          <p>¡¡Bienvenido!!</p>
          <p>Hoy es un nuevo día para cambiar tu vida</p>
        </div>
      </div>



      {!isCreating && (
        <button 
          className="wt-fab-button"
          onClick={() => {
            setIsCreating(true);
            setEditingTask(null);
          }}
          aria-label="Agregar nueva tarea"
        >
          +
        </button>
      )}

      {isCreating ? (
        <WeeklyTaskForm
          onSave={handleSave}
          onCancel={() => setIsCreating(false)}
        />
      ) : (
        <>
          <WeeklyBoard
            tasks={tasks}
            onEdit={setEditingTask}
            onDelete={handleDelete}
          />
          {editingTask && (
            <WeeklyTaskForm
              editingTask={editingTask}
              onSave={handleSave}
              onCancel={() => setEditingTask(null)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default WeeklyTasks;
