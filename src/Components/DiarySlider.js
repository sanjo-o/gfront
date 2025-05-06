import React, { useState, useEffect } from 'react';
import '../CSS/DiarySlider.css';

const DiarySlider = ({ index }) => {
  // Create an array of dates for the current month
  const generateMonthDates = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    const dayNames = ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'];
    const monthNames = [
      'Нэгдүгээр', 'Хоёрдугаар', 'Гуравдугаар', 'Дөрөвдүгээр',
      'Тавдугаар', 'Зургадугаар', 'Долдугаар', 'Наймдугаар',
      'Есдүгээр', 'Аравдугаар', 'Арван нэгдүгээр', 'Арван хоёрдугаар'
    ];
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dayName = dayNames[date.getDay()];
      const monthName = monthNames[date.getMonth()];
      days.push({
        id: `${year}-${month + 1}-${i}`,
        day: `${monthName} сарын ${String(i).padStart(2, '0')}-ны ${dayName}`,
        mood: '',
        notes: ''
      });
    }
    return days;
  };

  const [entries, setEntries] = useState(generateMonthDates());
  const [notification, setNotification] = useState({ show: false, message: '' });

  // Load saved entries when component mounts
  useEffect(() => {
    const savedEntries = localStorage.getItem('diaryEntries');
    if (savedEntries) {
      const parsedEntries = JSON.parse(savedEntries);
      // Merge saved entries with current month's entries
      const updatedEntries = entries.map(entry => {
        const savedEntry = parsedEntries.find(saved => saved.id === entry.id);
        return savedEntry || entry;
      });
      setEntries(updatedEntries);
    }
  }, []);

  const handleMoodChange = (index, value) => {
    const newEntries = [...entries];
    newEntries[index].mood = value;
    setEntries(newEntries);
  };

  const handleNotesChange = (index, value) => {
    const newEntries = [...entries];
    newEntries[index].notes = value;
    setEntries(newEntries);
  };

  const handleSave = (index) => {
    try {
      // Save all entries to maintain history
      localStorage.setItem('diaryEntries', JSON.stringify(entries));
      showNotification('Амжилттай хадгаллаа!');
    } catch (error) {
      showNotification('Хадгалахад алдаа гарлаа!');
    }
  };

  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 3000);
  };

  return (
    <div className="diary-slider-container">
      {notification.show && (
        <div className="diary-notification">
          {notification.message}
        </div>
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
                  <span className="icon">↑</span>
                  <span>Сэтгэл санаа</span>
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
                  <span className="icon">↓</span>
                  <span>Тэмдэглэл</span>
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
