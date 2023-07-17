import React, { useState, useEffect } from 'react';
import '../App.css';
import TodoForm from '../TodoForm';
import TodoItem from '../TodoItem';


function Tol() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/todos');
      const tasks = await response.json();
      setList(tasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const addTodo = async (e) => {
    e.preventDefault();

    if (input.trim() !== '') {
      try {
        const response = await fetch('http://localhost:3000/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            todo: input,
            completed: false,
          }),
        });

        if (response.ok) {
          const createdTodo = await response.json();
          setList([...list, createdTodo]);
          setInput('');
        } else {
          console.error('Failed to create todo.');
        }
      } catch (error) {
        console.error('Failed to create todo:', error);
      }
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const newList = list.filter((todo) => todo.id !== id);
        setList(newList);
      } else {
        console.error('Failed to delete todo.');
      }
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const toggleCompletion = async (id) => {
    try {
      const todoToUpdate = list.find((todo) => todo.id === id);
      const updatedTodo = {
        ...todoToUpdate,
        completed: !todoToUpdate.completed,
      };

      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });

      if (response.ok) {
        const newList = list.map((todo) => {
          if (todo.id === id) {
            return updatedTodo;
          }
          return todo;
        });
        setList(newList);
      } else {
        console.error('Failed to update todo.');
      }
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleEdit = (id) => {
    setEditTask(id);
  };

  const handleTaskEdit = async (id, updatedTask) => {
    try {
      const todoToUpdate = list.find((todo) => todo.id === id);
      const notes = todoToUpdate.notes;
      const completed = todoToUpdate.completed;

      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo: updatedTask, completed, notes }),
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        const updatedTasks = list.map((task) => {
          if (task.id === id) {
            return { ...task, todo: updatedTodo.todo };
          }
          return task;
        });
        setList(updatedTasks);
        setEditTask(null);
      } else {
        console.error('Failed to update todo.');
      }
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const completedTasks = list.filter((todo) => todo.completed);
  const incompleteTasks = list.filter((todo) => !todo.completed);

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <TodoForm
        input={input}
        handleInputChange={handleInputChange}
        addTodo={addTodo}
      />
      <div className="task-container">
        <div className="task-column">
          <h2>Incomplete Tasks</h2>
          <ul className="task-list">
            {incompleteTasks.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                toggleCompletion={toggleCompletion}
                handleEdit={handleEdit}
                handleTaskEdit={handleTaskEdit}
                editTask={editTask}
              />
            ))}
          </ul>
        </div>
        <div className="task-column">
          <h2>Completed Tasks</h2>
          <ul className="task-list">
            {completedTasks.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                toggleCompletion={toggleCompletion}
                handleEdit={handleEdit}
                handleTaskEdit={handleTaskEdit}
                editTask={editTask}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Tol;
