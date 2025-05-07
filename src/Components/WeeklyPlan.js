import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/WeeklyPlan.css';
import Header from './Header';
import backButton from '../assets/ROWBUTTON.png';
import { createNote, getNotesByTypeAndDate, updateNote } from '../api/notesService';

const dayLabels = [
  'ДАВАА', 'МЯГМАР', 'ЛХАГВА', 'ПҮРЭВ', 'БААСАН', 'БЯМБА', 'НЯМ', 'ЧУХАЛ АЖИЛЫН ЖАГСААЛТ'
];

const WeeklyPlan = () => {
  const navigate = useNavigate();

  const [days, setDays] = useState(
    dayLabels.map(name => ({
      name,
      tasks: [],
      newTask: '',
      isImportant: name === 'ЧУХАЛ АЖИЛЫН ЖАГСААЛТ'
    }))
  );

  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const getCurrentISOWeek = () => {
    const now = new Date();
    const year = now.getFullYear();
    const oneJan = new Date(year, 0, 1);
    const numberOfDays = Math.floor((now - oneJan) / (24 * 60 * 60 * 1000));
    const week = Math.ceil((now.getDay() + 1 + numberOfDays) / 7);
    return `${year}-W${String(week).padStart(2, '0')}`;
  };

  const loadWeeklyNote = async () => {
    const refDate = getCurrentISOWeek();
    try {
      const res = await getNotesByTypeAndDate('weekly', refDate);
      if (res.length > 0) {
        const content = res[0].content;
        const parsed = parseWeeklyContent(content);
        setDays(parsed);
      }
    } catch (err) {
      console.error('❌ Weekly plan fetch failed:', err);
    }
  };

  const upsertWeeklyNote = async ({ refDate, content }) => {
    const existing = await getNotesByTypeAndDate('weekly', refDate);
    if (existing.length > 0) {
      return await updateNote(existing[0]._id, { content });
    } else {
      return await createNote({ type: 'weekly', refDate, content });
    }
  };

  const parseWeeklyContent = (content) => {
    const sections = content.split('\n\n');
    return dayLabels.map(label => {
      const section = sections.find(s => s.startsWith(label));
      if (!section) return { name: label, tasks: [], newTask: '', isImportant: label === 'ЧУХАЛ АЖИЛЫН ЖАГСААЛТ' };

      const tasks = section.split('\n').slice(1).map(line => line.replace('- ', '').trim()).filter(Boolean);
      return { name: label, tasks, newTask: '', isImportant: label === 'ЧУХАЛ АЖИЛЫН ЖАГСААЛТ' };
    });
  };

  useEffect(() => {
    loadWeeklyNote();
  }, []);

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ show: false, message: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
  };

  const handleTaskInput = (index, value) => {
    const newDays = [...days];
    newDays[index].newTask = value;
    setDays(newDays);
  };

  const handleAddTask = (index) => {
    if (!days[index].newTask.trim()) return;
    const newDays = [...days];
    newDays[index].tasks.push(days[index].newTask.trim());
    newDays[index].newTask = '';
    setDays(newDays);
  };

  const handleDeleteTask = (dayIndex, taskIndex) => {
    const newDays = [...days];
    newDays[dayIndex].tasks.splice(taskIndex, 1);
    setDays(newDays);
    showNotification('🗑️ Даалгавар устгагдлаа');
  };

  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      handleAddTask(index);
    }
  };

  const handleSave = async () => {
    try {
      const content = days.map(day =>
        day.tasks.length
          ? `${day.name}:\n${day.tasks.map(task => `- ${task}`).join('\n')}`
          : ''
      ).filter(Boolean).join('\n\n');

      const refDate = getCurrentISOWeek();
      const res = await upsertWeeklyNote({ refDate, content });

      if (res._id) {
        showNotification('✅ Серверт амжилттай хадгалагдлаа!');
      } else {
        throw new Error('Save error');
      }
    } catch (err) {
      console.error('❌ Save error:', err);
      showNotification('❌ Серверт хадгалахад алдаа гарлаа', 'error');
    }
  };

  const handleBack = () => navigate('/');

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
                    <button className="delete-task-btn" onClick={() => handleDeleteTask(index, taskIndex)}>×</button>
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
                  <button className="add-task-btn" onClick={() => handleAddTask(index)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="save-button" onClick={handleSave}>Хадгалах</button>
      </div>
    </div>
  );
};

export default WeeklyPlan;
