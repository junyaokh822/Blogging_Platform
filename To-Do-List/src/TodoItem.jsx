import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { BiSolidSave } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

function TodoItem({ todo, deleteTodo, toggleCompletion, handleEdit, handleTaskEdit, editTask }) {
  const [editInput, setEditInput] = useState(todo.todo);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setEditInput(e.target.value);
  };

  const handleTaskUpdate = (e) => {
    e.preventDefault();
    handleTaskEdit(todo.id, editInput);
    handleEdit(null);
  };

  const handleOpenEditModal = () => {
    handleEdit(todo.id);
  };

  const handleNoteClick = () => {
    navigate(`/note/${todo.id}`);
  };

  return (
    <li>
      <span className="bullet">&bull;</span>
      {editTask === todo.id ? (
        <div className="edit-modal">
          <input type="text" value={editInput} onChange={handleInputChange} />
          <button onClick={handleTaskUpdate}><BiSolidSave /></button>
        </div>
      ) : (
        <>
          <span className={`task ${todo.completed ? 'completed' : ''}`}>{todo.todo}</span>
          <button className="edit-button" onClick={handleOpenEditModal}>
            <MdEdit />
          </button>
        </>
      )}
      <button className="note-button" onClick={handleNoteClick}>
        Note
      </button>
      <button className="delete-button" onClick={() => deleteTodo(todo.id)}>
        <AiFillDelete />
      </button>
      <button className="complete-button" onClick={() => toggleCompletion(todo.id)}>
        {todo.completed ? 'Incomplete' : 'Complete'}
      </button>
    </li>
  );
}

export default TodoItem;
