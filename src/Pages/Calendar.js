import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import '../CSS/Calendar.css';
import backButton from '../assets/ROWBUTTON.png';

const Calendar = () => {
  const navigate = useNavigate();
  const weekDays = ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'];

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="calendar-page">
      <Header />
      <div className="calendar-container">
        <div className="calendar-header">
          <button className="back-button" onClick={handleBack}>
            <img src={backButton} alt="Back" />
          </button>
          <div className="calendar-stats">
            <div className="stat-item">
              <span className="stat-icon"></span>
              <span className="stat-value"></span>
            </div>
            <div className="stat-item">
              <span className="stat-value"></span>
            </div>
            <div className="stat-item">
              <span className="stat-value"></span>
            </div>
          </div>
        </div>

        {/* First Calendar */}
        <div className="calendar-section">
          <h2 className="calendar-title">Гуравдугаар сар 2025</h2>
          <div className="calendar-grid">
            {weekDays.map(day => (
              <div key={day} className="weekday-header">
                {day}
              </div>
            ))}
            {Array.from({ length: 31 }, (_, i) => (
              <div key={i} className="calendar-day">
                <span className="day-number">{String(i + 1).padStart(2, '0')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Second Calendar */}
        <div className="calendar-section">
          <h2 className="calendar-title">Дөрөвдүгээр сар 2025</h2>
          <div className="calendar-grid calendar-bordered">
            {weekDays.map(day => (
              <div key={day} className="weekday-header">
                {day}
              </div>
            ))}
            {Array.from({ length: 30 }, (_, i) => (
              <div key={i} className="calendar-day">
                <span className="day-number">{String(i + 1).padStart(2, '0')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar; 