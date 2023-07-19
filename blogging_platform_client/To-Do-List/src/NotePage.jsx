import { Link, useLoaderData } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import NoteForm from './NoteForm';
import './App.css'; 

export async function loader({ params }) {
  const response = await fetch('http://localhost:4000/api/todos/' + params.taskId);
  const todo = await response.json();
  return todo;
}

function NotePage() {
  const todo = useLoaderData();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/todos/${todo.id}`);
        const data = await response.json();
        if (data.notes) {
          setNotes(data.notes);
        }
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      }
    };

    fetchNotes();
  }, [todo.id]);

  const handleAddNote = async (taskId, note) => {
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);

    try {
      await fetch(`http://localhost:4000/api/todos/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notes: updatedNotes }),
      });
    } catch (error) {
      console.error('Failed to save note:', error);
    }
  };

  const handleDeleteNote = async (taskId, noteIndex) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(noteIndex, 1);
    setNotes(updatedNotes);

    try {
      await fetch(`http://localhost:4000/api/todos/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notes: updatedNotes }),
      });
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  return (
   


    <div className="note-page center-content">
      <h2 className="task-id">Task ID: {todo.id}</h2>
      <NoteForm taskId={todo.id} onSubmit={handleAddNote} />
      <ul className="notes-list">
        {notes.map((note, index) => (
          <li key={index} className="note-item">
            <p>{note}</p>
            <button onClick={() => handleDeleteNote(todo.id, index)}>Delete Note</button>
          </li>
        ))}
      </ul>
      <Link to="/" className="home-link">Go back to Home</Link>
    </div>
  );
}

export default NotePage;













