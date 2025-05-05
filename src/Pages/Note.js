import React, { useState } from "react";
import "../CSS/note.css"; // Загварын файл оруулах

const Note = () => {
  const [note, setNote] = useState(""); // Тэмдэглэлийн текст хадгалах төлөв

  return (
    <div className="note-container">
      <textarea
        className="note-textarea"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Энд тэмдэглэлээ бичнэ үү..."
      />
      <button className="add-button">+</button>
    </div>
  );
};

export default Note;