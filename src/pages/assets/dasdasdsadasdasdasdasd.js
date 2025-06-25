import React, { useState } from "react";

const MATERIAL_ICONS_LINK = "https://fonts.googleapis.com/icon?family=Material+Icons";

const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const calendarDays = [
  // May 2023 calendar days as objects with day number and month relation (for disabled styling)
  { day: 1, inMonth: true },
  { day: 2, inMonth: true },
  { day: 3, inMonth: true },
  { day: 4, inMonth: true },
  { day: 5, inMonth: true },
  { day: 6, inMonth: true },
  { day: 7, inMonth: true },
  { day: 8, inMonth: true },
  { day: 9, inMonth: true },
  { day: 10, inMonth: true },
  { day: 11, inMonth: true },
  { day: 12, inMonth: true },
  { day: 13, inMonth: true },
  { day: 14, inMonth: true },
  { day: 15, inMonth: true },
  { day: 16, inMonth: true },
  { day: 17, inMonth: true },
  { day: 18, inMonth: true },
  { day: 19, inMonth: true },
  { day: 20, inMonth: true },
  { day: 21, inMonth: true },
  { day: 22, inMonth: true },
  { day: 23, inMonth: true },
  { day: 24, inMonth: true },
  { day: 25, inMonth: true },
  { day: 26, inMonth: true },
  { day: 27, inMonth: true },
  { day: 28, inMonth: true },
  { day: 29, inMonth: true },
  { day: 30, inMonth: true },
  { day: 31, inMonth: true },
  { day: 1, inMonth: false },  // June 1 to fill last week
  { day: 2, inMonth: false },
  { day: 3, inMonth: false },
  { day: 4, inMonth: false }
];

// Horizontal days for date selector at top of timeline
const horizontalDays = [
  { weekday: "Thu", day: 26, active: false },
  { weekday: "Fri", day: 27, active: false },
  { weekday: "Sat", day: 28, active: true },
  { weekday: "Sun", day: 29, active: true },
  { weekday: "Mon", day: 30, active: false },
  { weekday: "Tue", day: 31, active: false },
  { weekday: "Wed", day: 1, active: false },
];

// Timeline events
const timelineEvents = [
  {
    time: "08:00 am",
    events: ["Meditation and mindfulness", "Running"],
    color: "#BD9B3F"
  },
  {
    time: "09:45 am",
    events: ["Breakfast with Bob", "Check your emails for 15 minutes"],
    color: "#D9B7B9"
  },
  {
    time: "10:50 am",
    events: ["Online meeting"],
    color: "#7B1514"
  },
  {
    time: "02:40 pm",
    events: ["Cafe meetup", "Date with Thomas"],
    color: "#6D0D56"
  },
  {
    time: "04:00 pm",
    events: ["Russian language class", "Skype interview"],
    color: "#3C5B7D"
  },
  {
    time: "06:00 pm",
    events: ["Bowling"],
    color: "#103148"
  }
];

const DailyPlanner = () => {
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(18);

  return (
    <>
  {/* Load Material Icons */}
  <link href={MATERIAL_ICONS_LINK} rel="stylesheet" />

  <div className="dp-app-container" role="main" aria-label="Daily planner application">
    {/* Calendar Section */}
    <section
      className="dp-calendar-card"
      aria-labelledby="calendarTitle"
      role="region"
    >
      <div className="dp-calendar-header">
        <div id="calendarTitle" aria-live="polite">
          May 2023
        </div>
        <div className="dp-calendar-nav" role="group" aria-label="Month navigation">
          <span
            className="material-icons dp-calendar-nav-icon"
            role="button"
            tabIndex={0}
            aria-label="Previous month"
          >
            arrow_back_ios
          </span>
          <span
            className="material-icons dp-calendar-nav-icon"
            role="button"
            tabIndex={0}
            aria-label="Next month"
          >
            arrow_forward_ios
          </span>
        </div>
      </div>
      <div className="dp-calendar-grid">
        {daysOfWeek.map((d) => (
          <div key={d} className="dp-calendar-day-header" aria-hidden="true">
            {d}
          </div>
        ))}
        {calendarDays.map((dayObj, idx) => {
          const classes = [
            "dp-calendar-day",
            !dayObj.inMonth ? "disabled" : "",
            dayObj.day === selectedCalendarDay && dayObj.inMonth ? "selected" : ""
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <button
              key={idx}
              className={classes}
              onClick={() => dayObj.inMonth && setSelectedCalendarDay(dayObj.day)}
              disabled={!dayObj.inMonth}
              aria-current={dayObj.day === selectedCalendarDay && dayObj.inMonth ? "date" : undefined}
              aria-label={`Calendar day ${dayObj.day} ${dayObj.inMonth ? "May 2023" : "Adjacent month"}`}
              tabIndex={dayObj.inMonth ? 0 : -1}
            >
              {dayObj.day}
            </button>
          );
        })}
      </div>
    </section>

    {/* Mood Card Section */}
    <section
      className="dp-mood-card"
      aria-labelledby="moodTitle"
      role="region"
    >
      <h2 id="moodTitle" className="dp-mood-header">
        Your Daily Mood
      </h2>
      <div className="dp-mood-title" aria-live="polite">Motivation</div>
      <p className="dp-mood-text">
        Conquer all the peaks to our uplifting selection.
        <br />
        We believe you can do it
      </p>
      <div className="dp-mood-controls" role="group" aria-label="Music Controls">
        <button className="dp-control-button" aria-label="Previous track">
          <span className="material-icons dp-control-icon">skip_previous</span>
        </button>
        <button className="dp-control-button center" aria-label="Pause">
          <span className="material-icons dp-control-icon">pause</span>
        </button>
        <button className="dp-control-button" aria-label="Next track">
          <span className="material-icons dp-control-icon">skip_next</span>
        </button>
      </div>
    </section>

    {/* Timeline Section */}
    <section aria-label="Timeline of daily events" role="region" className="dp-timeline-container" style={{ overflow: "hidden" }}>
      <div className="dp-date-selector" aria-label="Select day of week">
        {horizontalDays.map((d, i) => (
          <button
            key={i}
            className={`dp-date-item ${d.active ? "active" : "inactive"}`}
            aria-pressed={d.active}
            aria-label={`${d.weekday} ${d.day}`}
          >
            <span>{d.weekday}</span>
            <span>{d.day}</span>
          </button>
        ))}
      </div>
      <div className="dp-timeline" >
        <div className="dp-timeline-time-column" aria-hidden="true">
          {timelineEvents.map((t, i) => (
            <div key={i} style={{ height: "56px" }}>
              {t.time}
            </div>
          ))}
        </div>
        <div className="dp-timeline-bar-column">
          {timelineEvents.map((event, idx) => (
            <div
              className="dp-timeline-event"
              key={idx}
              style={{ backgroundColor: event.color }}
            >
              {event.events.map((ev, id) => (
                <div key={id} style={{ marginBottom: id !== event.events.length - 1 ? "6px" : 0 }}>
                  {ev}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
</>

  );
};

export default DailyPlanner;

