import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/MonthlyPlan.css';
import Header from './Header';
import backButton from '../assets/ROWBUTTON.png';

const MonthlyPlan = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState({});
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const months = [
    "01", "02", "03", "04", "05", "06",
    "07", "08", "09", "10", "11", "12"
  ];

  const weekDays = ['Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя', 'Ня'];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Previous month days
    const prevMonthDays = getDaysInMonth(currentMonth - 1, currentYear);
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        isPrevMonth: true
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        tasks: tasks[`${currentYear}-${currentMonth + 1}-${i}`] || []
      });
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        isNextMonth: true
      });
    }

    return days;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleAddTask = (date, task) => {
    if (!task.trim()) return;

    const dateKey = `${currentYear}-${currentMonth + 1}-${date}`;
    const updatedTasks = {
      ...tasks,
      [dateKey]: [...(tasks[dateKey] || []), task]
    };
    setTasks(updatedTasks);
    showNotification('Даалгавар нэмэгдлээ', 'success');

    // Save to localStorage
    localStorage.setItem('monthlyPlanTasks', JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (date, taskIndex) => {
    const dateKey = `${currentYear}-${currentMonth + 1}-${date}`;
    const updatedTasks = { ...tasks };
    updatedTasks[dateKey] = tasks[dateKey].filter((_, index) => index !== taskIndex);
    setTasks(updatedTasks);
    showNotification('Даалгавар устгагдлаа', 'success');

    // Save to localStorage
    localStorage.setItem('monthlyPlanTasks', JSON.stringify(updatedTasks));
  };

  const showNotification = (message, type = 'success') => {
    setNotification({
      show: true,
      message,
      type
    });
  };

  useEffect(() => {
    // Load tasks from localStorage
    const savedTasks = localStorage.getItem('monthlyPlanTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <>
      <Header />
      <div className="monthly-plan-container">
        <button className="back-button" onClick={handleBack}>
          <img src={backButton} alt="Back" />
        </button>
        {notification.show && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}
        <div className="monthly-plan">
          <div className="calendar-header">
            <h2>Сарууд</h2>
            <div className="month-selector">
              {months.map((month, index) => (
                <button
                  key={month}
                  className={`month-btn ${currentMonth === index ? 'active' : ''}`}
                  onClick={() => setCurrentMonth(index)}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>

          <div className="calendar-grid">
            {weekDays.map(day => (
              <div key={day} className="weekday-header">
                {day}
              </div>
            ))}
            
            {generateCalendarDays().map((day, index) => (
              <div
                key={index}
                className={`calendar-day ${!day.isCurrentMonth ? 'other-month' : ''} 
                  ${selectedDate === day.day ? 'selected' : ''}`}
                onClick={() => day.isCurrentMonth && handleDateClick(day.day)}
              >
                <span className="day-number">{day.day}</span>
                {day.isCurrentMonth && tasks[`${currentYear}-${currentMonth + 1}-${day.day}`]?.map((task, taskIndex) => (
                  <div key={taskIndex} className="calendar-task">
                    <span className="task-text">{task}</span>
                    <button
                      className="delete-task-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTask(day.day, taskIndex);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
                {day.isCurrentMonth && selectedDate === day.day && (
                  <div className="add-task-container">
                    <input
                      type="text"
                      placeholder="Шинэ даалгавар..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddTask(day.day, e.target.value);
                          e.target.value = '';
                        }
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MonthlyPlan; 