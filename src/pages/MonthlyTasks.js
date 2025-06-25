import React, { useState, useEffect } from 'react';
import MonthlyCalendar from '../components/MonthlyTasks/MonthlyCalendar';
import MonthlyTaskForm from '../components/MonthlyTasks/MonthlyTaskForm';
import MonthlyTaskList from '../components/MonthlyTasks/MonthlyTaskList';
import axios from 'axios';
import './MonthlyTask.css';

export default function MonthlyTask() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    axios.get('http://localhost/task/backend/routes/monthly_task.php')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setEditingTask(null);
  };

  const handleTaskSubmit = (task) => {
    if (editingTask) {
      axios.put('http://localhost/task/backend/routes/monthly_task.php', { ...task, id: editingTask.id })
        .then(() => {
          setTasks(tasks.map(t => (t.id === editingTask.id ? { ...task, id: editingTask.id } : t)));
          setEditingTask(null);
          setSelectedDate(null);
        })
        .catch(err => console.error(err));
    } else {
      axios.post('http://localhost/task/backend/routes/monthly_task.php', task)
        .then((res) => {
          if (res.data?.id) {
            setTasks([...tasks, { ...task, id: res.data.id }]);
          } else {
            setTasks([...tasks, task]); // Fallback si no devuelve el id
          }
          setSelectedDate(null);
        })
        .catch(err => console.error(err));
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setSelectedDate(task.fecha);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar esta tarea?')) {
      axios.delete('http://localhost/task/backend/routes/monthly_task.php', { data: { id } })
        .then(() => {
          setTasks(tasks.filter(t => t.id !== id));
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="mt-page">
      <h1 className="mt-title">📅 Tareas Mensuales</h1>

      <div className="mt-section">
        <MonthlyCalendar onDateClick={handleDateClick} selectedDate={selectedDate} />
      </div>

      {(selectedDate || editingTask) && (
        <div className="mt-form-wrapper">
          <MonthlyTaskForm
            selectedDate={selectedDate}
            task={editingTask}
            onSubmit={handleTaskSubmit}
            onCancel={() => {
              setSelectedDate(null);
              setEditingTask(null);
            }}
          />
        </div>
      )}

      <div className="mt-section">
        <MonthlyTaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}
