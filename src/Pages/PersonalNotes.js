import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import '../CSS/PersonalNotes.css';
import backButton from '../assets/ROWBUTTON.png';

const PersonalNotes = () => {
  const navigate = useNavigate();
  const [note, setNote] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [savedNotes, setSavedNotes] = useState([]);
  const [showNewNote, setShowNewNote] = useState(true);

  const handleBack = () => {
    navigate('/');
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleSave = () => {
    if (note.trim()) {
      const newNote = {
        id: Date.now(),
        content: note,
        date: new Date().toLocaleDateString('mn-MN'),
      };
      setSavedNotes([...savedNotes, newNote]);
      setNote('');
      setShowSuccess(true);
      setShowNewNote(false);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  const handleNewNote = () => {
    setShowNewNote(true);
  };

  return (
    <div className="notes-page">
      <Header />
      <div className="notes-container">
        <div className="notes-header">
          <button className="back-button" onClick={handleBack}>
            <img src={backButton} alt="Back" />
          </button>
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-icon">☀️</span>
              <span className="stat-value">7</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">31</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">365</span>
            </div>
            <div className="page-title">Өнөөдөр</div>
          </div>
        </div>

        {showSuccess && (
          <div className="success-banner">
            <span className="success-icon">✓</span>
            Амжилттай хадгалагдлаа!
          </div>
        )}

        {!showNewNote && savedNotes.length > 0 && (
          <div className="saved-notes">
            {savedNotes.map((savedNote) => (
              <div key={savedNote.id} className="saved-note-banner">
                <div className="banner-content">
                  <h3>4-р сар нэгдүгээр долоо хоног</h3>
                  <p>{savedNote.content.substring(0, 100)}...</p>
                </div>
                <div className="check-icon">✓</div>
              </div>
            ))}
          </div>
        )}

        {showNewNote ? (
          <>
            <div className="note-paper">
              <div className="ribbon-decoration top-left"></div>
              <div className="ribbon-decoration top-right"></div>
              <div className="ribbon-decoration bottom-left"></div>
              <div className="ribbon-decoration bottom-right"></div>
              <textarea
                className="note-content"
                value={note}
                onChange={handleNoteChange}
                placeholder="Өнөөдрийн тэмдэглэлээ бичнэ үү..."
              />
            </div>
            <button className="save-button" onClick={handleSave}>
              Хадгалах
            </button>
          </>
        ) : (
          <button className="new-note-button" onClick={handleNewNote}>
            + Шинэ тэмдэглэл
          </button>
        )}
      </div>
    </div>
  );
};

export default PersonalNotes; 