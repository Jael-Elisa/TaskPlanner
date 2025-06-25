import React from 'react';
import './WeeklyTaskList.css';

const WeeklyTaskList = ({ tasks, onEdit, onDelete }) => (
  <div className="weekly-task-list">
    {tasks.map(task => (
      <div className={`weekly-task-card ${task.color || 'default'}`} key={task.id}>
        <h4>{task.title}</h4>
        <p>{task.description}</p>
        <small>{task.status}</small>
        <div className="actions">
          <button onClick={() => onEdit(task)}>✏️</button>
          <button onClick={() => onDelete(task.id)}>🗑️</button>
        </div>
      </div>
    ))}
  </div>
);

export default WeeklyTaskList;
