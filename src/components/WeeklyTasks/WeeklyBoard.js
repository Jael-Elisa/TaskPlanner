import React from 'react';
import WeeklyTaskList from './WeeklyTaskList';
import './WeeklyBoard.css';

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

function getDayName(dateStr) {
  const date = new Date(dateStr);
  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return dayNames[date.getDay()];
}


const WeeklyBoard = ({ tasks, onEdit, onDelete }) => {
  const grouped = days.reduce((acc, d) => {
    acc[d] = tasks.filter(t => getDayName(t.task_date) === d);
    return acc;
  }, {});

  return (
    <div className="weekly-board">
      {days.map(day => (
        <div className="day-column" key={day}>
          <h3 className="day-title">{day}</h3>
          <WeeklyTaskList tasks={grouped[day]} onEdit={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
};

export default WeeklyBoard;
