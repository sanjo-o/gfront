import React, { useState, useEffect } from 'react';
import '../CSS/DiarySlider.css';
import { createNote } from '../api/notesService';

const DiarySlider = ({ index }) => {
  const generateMonthDates = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dayNames = ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'];
    const monthNames = [
      'Нэгдүгээр', 'Хоёрдугаар', 'Гуравдугаар', 'Дөрөвдүгээр',
      'Тавдугаар', 'Зургадугаар', 'Долдугаар', 'Наймдугаар',
      'Есдүгээр', 'Аравдугаар', 'Арван нэгдүгээр', 'Арван хоёрдугаар'
    ];

    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const refDate = date.toISOString().split('T')[0]; // e.g., 2025-05-06
      const dayName = dayNames[date.getDay()];
      const monthName = monthNames[month];

      days.push({
        id: refDate,
        day: `${monthName} сарын ${String(i).padStart(2, '0')}-ны ${dayName}`,
        mood: '',
        notes: ''
      });
    }

    return days;
  };

  const [entries, setEntries] = useState(generateMonthDates());
  const [notification, setNotification] = useState({ show: false, message: '' });

  const handleMoodChange = (i, value) => {
    const updated = [...entries];
    updated[i].mood = value;
    setEntries(updated);
  };

  const handleNotesChange = (i, value) => {
    const updated = [...entries];
    updated[i].notes = value;
    setEntries(updated);
  };

  const handleSave = async (i) => {
    const entry = entries[i];
    const content = `${entry.mood}\n\n${entry.notes}`;
    const payload = {
      type: 'daily',
      refDate: entry.id,
      content
    };

    try {
      await createNote(payload);
      showNotification('✅ Серверт хадгалагдлаа!');
    } catch (error) {
      console.error('❌ Failed to save diary:', error);
      showNotification('❌ Алдаа гарлаа');
    }
  };

  const showNotification = (msg) => {
    setNotification({ show: true, message: msg });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
  };

  return (
    <div className="diary-slider-container">
      {notification.show && (
        <div className="diary-notification">{notification.message}</div>
      )}
      <div
        className="diary-slider"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {entries.map((entry, i) => (
          <div key={i} className="diary-card">
            <div className="diary-day">{entry.day}</div>
            <div className="diary-content">
              <div className="mood-section">
                <div className="section-header">
                  <span className="icon">↑</span> <span>Сэтгэл санаа</span>
                </div>
                <textarea
                  className="content-box"
                  value={entry.mood}
                  onChange={(e) => handleMoodChange(i, e.target.value)}
                  placeholder="Өнөөдрийн сэтгэл санаагаа бичнэ үү..."
                />
              </div>
              <div className="note-section">
                <div className="section-header">
                  <span className="icon">↓</span> <span>Тэмдэглэл</span>
                </div>
                <textarea
                  className="content-box"
                  value={entry.notes}
                  onChange={(e) => handleNotesChange(i, e.target.value)}
                  placeholder="Өнөөдрийн тэмдэглэлээ бичнэ үү..."
                />
              </div>
            </div>
            <button className="diary-save-button" onClick={() => handleSave(i)}>
              Хадгалах
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiarySlider;
