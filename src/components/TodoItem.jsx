import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onSave, isEditing, setEditing, editText, setEditText }) => {
  return (
    <div className="flex items-center justify-between p-2 border-b">
      {isEditing ? (
        <input
          className="border p-1 rounded"
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="form-checkbox h-5 w-5"
          />
          <span className={todo.completed ? 'line-through' : ''}>{todo.title}</span>
        </div>
      )}
      <div className="flex space-x-2">
        {isEditing ? (
          <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => onSave(todo.id)}>Save</button>
        ) : (
          <>
            <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => setEditing(todo.id)}>Edit</button>
            <button
              className={`bg-red-500 text-white px-2 py-1 rounded ${!todo.completed ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => onDelete(todo.id)}
              disabled={!todo.completed}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;