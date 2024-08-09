import React, { useReducer, useState } from 'react';
import TodoItem from './TodoItem';

const initialState = [
  {
    userId: 1,
    id: 1,
    title: 'fresh vegtables',
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: 'chicken',
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: 'tomatos',
    completed: false,
  },
  {
    userId: 1,
    id: 4,
    title: 'onion',
    completed: true,
  },
  {
    userId: 1,
    id: 5,
    title: 'books',
    completed: false,
  },
];
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [{ ...action.payload }, ...state];
    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.payload);
    case 'EDIT_TODO':
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo
      );
    default:
      return state;
  }
};

const TodoList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [newTodo, setNewTodo] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      dispatch({
        type: 'ADD_TODO',
        payload: { id: Date.now(), title: newTodo, completed: false },
      });
      setNewTodo('');
    }
  };

  const handleToggle = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const handleEdit = (id) => {
    setIsEditing(id);
    const todo = state.find((todo) => todo.id === id);
    setEditText(todo.title);
  };

  const handleSave = (id) => {
    dispatch({ type: 'EDIT_TODO', payload: { id, title: editText } });
    setIsEditing(null);
    setEditText('');
  };

  return (
    <div className="max-w-xl min-w-[400px] mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>
      <div className="flex mb-4">
        <input
          className="border flex-grow p-2 rounded-l"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>
      <div className="bg-white shadow-lg rounded-lg">
        {state.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onSave={handleSave}
            isEditing={isEditing === todo.id}
            setEditing={setIsEditing}
            editText={editText}
            setEditText={setEditText}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;