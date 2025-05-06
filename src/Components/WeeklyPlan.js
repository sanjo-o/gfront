import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/WeeklyPlan.css';
import Header from './Header';
import backButton from '../assets/ROWBUTTON.png';

const WeeklyPlan = () => {
  const navigate = useNavigate();
  const [days, setDays] = useState([
    {
      name: 'ДАВАА',
      tasks: [],
      newTask: ''
    },
    {
      name: 'МЯГМАР',
      tasks: [],
      newTask: ''
    },
    {
      name: 'ЛХАГВА',
      tasks: [],
      newTask: ''
    },
    {
      name: 'ПҮРЭВ',
      tasks: [],
      newTask: ''
    },
    {
      name: 'БААСАН',
      tasks: [],
      newTask: ''
    },
    {
      name: 'БЯМБА',
      tasks: [],
      newTask: ''
    },
    {
      name: 'НЯМ',
      tasks: [],
      newTask: ''
    },
    {
      name: 'ЧУХАЛ АЖИЛЫН ЖАГСААЛТ',
      tasks: [],
      newTask: '',
      isImportant: true
    }
  ]);

  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Hide notification after 3 seconds
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message, type = 'success') => {
    setNotification({
      show: true,
      message,
      type
    });
  };

  const handleTaskInput = (index, value) => {
    const newDays = [...days];
    newDays[index].newTask = value;
    setDays(newDays);
  };

  const handleAddTask = (index) => {
    if (days[index].newTask.trim() === '') return;
    
    const newDays = [...days];
    newDays[index].tasks.push(days[index].newTask);
    newDays[index].newTask = '';
    setDays(newDays);
  };

  const handleDeleteTask = (dayIndex, taskIndex) => {
    const newDays = [...days];
    newDays[dayIndex].tasks.splice(taskIndex, 1);
    setDays(newDays);
    showNotification('Даалгавар устгагдлаа', 'success');
  };

  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      handleAddTask(index);
    }
  };

  const handleSave = () => {
    try {
      localStorage.setItem('weeklyPlan', JSON.stringify({ days }));
      showNotification('Амжилттай хадгаллаа!', 'success');
    } catch (error) {
      showNotification('Хадгалахад алдаа гарлаа!', 'error');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="weekly-plan-container">
      <Header />
      <button className="back-button" onClick={handleBack}>
        <img src={backButton} alt="Back" />
      </button>
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <div className="weekly-plan">
        <div className="week-grid">
          {days.map((day, index) => (
            <div key={index} className={`day-card ${day.isImportant ? 'important-card' : ''}`}>
              <h3 className="day-title">{day.name}</h3>
              <div className="task-list">
                {day.tasks.map((task, taskIndex) => (
                  <div key={taskIndex} className={`task-item ${day.isImportant ? 'important' : ''}`}>
                    <span className="task-text">{task}</span>
                    <button 
                      className="delete-task-btn"
                      onClick={() => handleDeleteTask(index, taskIndex)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <div className="task-input-container">
                  <input
                    type="text"
                    value={day.newTask}
                    onChange={(e) => handleTaskInput(index, e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    placeholder="Шинэ даалгавар..."
                    className="task-input"
                  />
                  <button 
                    className="add-task-btn"
                    onClick={() => handleAddTask(index)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="save-button" onClick={handleSave}>
          Хадгалах
        </button>
      </div>
    </div>
  );
};

export default WeeklyPlan; 