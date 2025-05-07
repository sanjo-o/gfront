import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import { getNotesByTypeAndDate } from '../api/notesService'; // 🧠 your API handler
import '../CSS/Calendar.css';
import backButton from '../assets/ROWBUTTON.png';

const Calendar = () => {
  const navigate = useNavigate();
  const weekDays = ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'];
  const [noteDates, setNoteDates] = useState({}); // { '2025-03-01': true }

  const handleBack = () => {
    navigate('/');
  };

  const getCalendarDates = (month, year) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => {
      const date = `${year}-${String(month).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
      return date;
    });
  };

  // 🔥 Fetch calendar notes
  const loadCalendarNotes = async () => {
    const dates = [
      ...getCalendarDates(3, 2025), // March
      ...getCalendarDates(4, 2025)  // April
    ];

    const statusMap = {};
    await Promise.all(dates.map(async (date) => {
      const res = await getNotesByTypeAndDate("calendar", date);
      if (res && Array.isArray(res) && res.length > 0) {
        statusMap[date] = true;
      }
    }));
    setNoteDates(statusMap);
  };

  useEffect(() => {
    loadCalendarNotes();
  }, []);

  const renderCalendarGrid = (month, year) => {
    const days = getCalendarDates(month, year);

    return (
      <>
        {weekDays.map(day => (
          <div key={day} className="weekday-header">{day}</div>
        ))}
        {days.map((date, i) => (
          <div key={date} className="calendar-day">
            <span className="day-number">{date.split('-')[2]}</span>
            {noteDates[date] && <span className="note-indicator">📝</span>}
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="calendar-page">
      <Header />
      <div className="calendar-container">
        <div className="calendar-header">
          <button className="back-button" onClick={handleBack}>
            <img src={backButton} alt="Back" />
          </button>
        </div>

        {/* March */}
        <div className="calendar-section">
          <h2 className="calendar-title">Гуравдугаар сар 2025</h2>
          <div className="calendar-grid">
            {renderCalendarGrid(3, 2025)}
          </div>
        </div>

        {/* April */}
        <div className="calendar-section">
          <h2 className="calendar-title">Дөрөвдүгээр сар 2025</h2>
          <div className="calendar-grid calendar-bordered">
            {renderCalendarGrid(4, 2025)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
