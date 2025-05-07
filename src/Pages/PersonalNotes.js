import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import '../CSS/PersonalNotes.css';
import backButton from '../assets/ROWBUTTON.png';
import { createNote, fetchNotes, updateNote, deleteNoteById } from '../api/notesService';

const PersonalNotes = () => {
  const navigate = useNavigate();
  const [note, setNote] = useState('');
  const [editId, setEditId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [savedNotes, setSavedNotes] = useState([]);
  const [showNewNote, setShowNewNote] = useState(true);
  const [loading, setLoading] = useState(true);

  const handleBack = () => navigate('/');

  const loadNotes = async () => {
    try {
      const notes = await fetchNotes();
      setSavedNotes(notes);
      setShowNewNote(notes.length === 0);
    } catch (err) {
      console.error('❌ Failed to load daily notes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleSave = async () => {
    if (!note.trim()) return;

    const today = new Date().toISOString().split('T')[0];
    const body = {
      type: 'daily',
      refDate: today,
      content: note.trim(),
    };

    try {
      let response;
      if (editId) {
        response = await updateNote(editId, body);
        setSavedNotes(prev => prev.map(n => (n._id === editId ? response : n)));
        setEditId(null);
      } else {
        response = await createNote(body);
        setSavedNotes(prev => [response, ...prev]);
      }

      setNote('');
      setShowSuccess(true);
      setShowNewNote(false);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error('❌ Note save failed:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNoteById(id);
      setSavedNotes(prev => prev.filter(note => note._id !== id));
    } catch (err) {
      console.error('❌ Note delete failed:', err);
    }
  };

  const handleEdit = (note) => {
    setNote(note.content);
    setEditId(note._id);
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
            <div className="stat-item"><span className="stat-icon">☀️</span><span className="stat-value">7</span></div>
            <div className="stat-item"><span className="stat-value">31</span></div>
            <div className="stat-item"><span className="stat-value">365</span></div>
            <div className="page-title">Өнөөдөр</div>
          </div>
        </div>

        {showSuccess && (
          <div className="success-banner">
            <span className="success-icon">✓</span> Амжилттай хадгалагдлаа!
          </div>
        )}

        {!showNewNote && savedNotes.length > 0 && (
          <div className="saved-notes">
            {savedNotes.map((savedNote) => (
              <div key={savedNote._id} className="saved-note-banner">
                <div className="banner-content">
                  <h3>{savedNote.refDate} тэмдэглэл</h3>
                  <p>{savedNote.content.substring(0, 100)}...</p>
                </div>
                <div className="note-actions">
                  <button className="edit-button" onClick={() => handleEdit(savedNote)}>✏️</button>
                  <button className="delete-button" onClick={() => handleDelete(savedNote._id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showNewNote && (
          <>
            <div className="note-paper">
              <div className="ribbon-decoration top-left"></div>
              <div className="ribbon-decoration top-right"></div>
              <div className="ribbon-decoration bottom-left"></div>
              <div className="ribbon-decoration bottom-right"></div>
              <textarea
                className="note-content"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Өнөөдрийн тэмдэглэлээ бичнэ үү..."
              />
            </div>
            <button className="save-button" onClick={handleSave}>Хадгалах</button>
          </>
        )}

        {!showNewNote && (
          <button className="new-note-button" onClick={() => {
            setShowNewNote(true);
            setEditId(null);
            setNote('');
          }}>
            + Шинэ тэмдэглэл
          </button>
        )}
      </div>
    </div>
  );
};

export default PersonalNotes;
