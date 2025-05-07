import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/MonthlyPlan.css';
import Header from './Header';
import backButton from '../assets/ROWBUTTON.png';
import {
  createNote,
  fetchCalendarNotes,
  deleteNoteById
} from '../api/notesService';

const MonthlyPlan = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState({});
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  const weekDays = ['Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя', 'Ня'];

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    const prevMonthDays = getDaysInMonth(currentMonth - 1, currentYear);
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, isCurrentMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const refKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({
        day: i,
        isCurrentMonth: true,
        tasks: tasks[refKey] || []
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, isCurrentMonth: false });
    }

    return days;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleAddTask = async (date, task) => {
    if (!task.trim()) return;

    const refDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    const body = { type: 'calendar', refDate, content: task.trim() };

    try {
      const saved = await createNote(body);
      const updatedTasks = {
        ...tasks,
        [refDate]: [...(tasks[refDate] || []), { _id: saved._id, content: saved.content }]
      };
      setTasks(updatedTasks);
      showNotification('✅ Даалгавар серверт хадгалагдлаа');
    } catch (err) {
      console.error("Create task failed:", err);
      showNotification('❌ Серверийн алдаа', 'error');
    }
  };

  const handleDeleteTask = async (date, noteId) => {
    const refKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    try {
      await deleteNoteById(noteId);
      const updated = { ...tasks };
      updated[refKey] = updated[refKey].filter((note) => note._id !== noteId);
      setTasks(updated);
      showNotification('🗑️ Даалгавар устгагдлаа');
    } catch (err) {
      console.error('❌ Delete task failed:', err);
      showNotification('❌ Устгал амжилтгүй', 'error');
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
  };

  useEffect(() => {
    const loadTasksFromAPI = async () => {
      try {
        const notes = await fetchCalendarNotes();
        const loaded = {};
        notes.forEach(note => {
          if (note.type === 'calendar') {
            loaded[note.refDate] = [...(loaded[note.refDate] || []), { _id: note._id, content: note.content }];
          }
        });
        setTasks(loaded);
      } catch (err) {
        console.error("Fetch calendar notes failed:", err);
      }
    };
    loadTasksFromAPI();
  }, []);

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ show: false, message: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleBack = () => navigate('/');

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

            {generateCalendarDays().map((dayObj, index) => (
              <div
                key={index}
                className={`calendar-day ${!dayObj.isCurrentMonth ? 'other-month' : ''}
                  ${selectedDate === dayObj.day ? 'selected' : ''}`}
                onClick={() => dayObj.isCurrentMonth && handleDateClick(dayObj.day)}
              >
                <span className="day-number">{dayObj.day}</span>

                {dayObj.isCurrentMonth && dayObj.tasks?.map((task, taskIndex) => (
                  <div key={task._id} className="calendar-task">
                    <span className="task-text">{task.content}</span>
                    <button
                      className="delete-task-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTask(dayObj.day, task._id);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}

                {dayObj.isCurrentMonth && selectedDate === dayObj.day && (
                  <div className="add-task-container">
                    <input
                      type="text"
                      placeholder="Шинэ даалгавар..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddTask(dayObj.day, e.target.value);
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
