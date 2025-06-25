import React, { useState } from 'react';
import './MonthlyCalendar.css';

export default function MonthlyCalendar({ onDateClick }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Domingo

  const getFormattedDate = (day) => {
    const d = new Date(currentYear, currentMonth, day);
    return d.toISOString().split('T')[0];
  };

  const handleMonthChange = (e) => setCurrentMonth(parseInt(e.target.value));
  const handleYearChange = (e) => setCurrentYear(parseInt(e.target.value));

  return (
    <div className="mc-calendar-wrapper">
      <div className="mc-calendar-controls">
        <select className="mc-select" value={currentMonth} onChange={handleMonthChange}>
          {months.map((m, idx) => (
            <option key={idx} value={idx}>{m}</option>
          ))}
        </select>
        <input
          className="mc-select"
          type="number"
          value={currentYear}
          onChange={handleYearChange}
          min="1900"
          max="2100"
        />
      </div>

      <div className="mc-calendar-grid">
        {daysOfWeek.map((d, i) => (
          <div key={`header-${i}`} className="mc-calendar-header">{d}</div>
        ))}

        {Array.from({ length: firstDay }, (_, i) => (
          <div key={`empty-${i}`} className="mc-calendar-empty"></div>
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => (
          <div
            key={i + 1}
            className="mc-calendar-day"
            onClick={() => onDateClick(getFormattedDate(i + 1))}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
