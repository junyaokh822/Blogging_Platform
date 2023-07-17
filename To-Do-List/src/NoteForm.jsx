import React, { useState } from 'react';
import './App.css'; 

function NoteForm({ taskId, onSubmit }) {
  const [note, setNote] = useState('');

  const handleInputChange = (e) => {
    setNote(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(taskId, note);
    setNote('');
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <textarea
        className="note-input"
        value={note}
        onChange={handleInputChange}
        placeholder="Enter your note..."
      />
      <button className="add-note-button" type="submit">
        Add Note
      </button>
    </form>
  );
}

export default NoteForm;
