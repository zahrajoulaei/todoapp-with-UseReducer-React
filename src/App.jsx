import React from 'react';
import TodoList from './components/TodoList';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <TodoList />
    </div>
  );
}

export default App;