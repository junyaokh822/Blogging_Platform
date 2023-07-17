import React from 'react';

function TodoForm({ input, handleInputChange, addTodo }) {
  return (
    <form className="input-container" onSubmit={addTodo}>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
      />
      <button type="submit">
      Add
      </button>
    </form>
  );
}

export default TodoForm;
