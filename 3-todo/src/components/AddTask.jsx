import React, { useState } from 'react';

const AddTask = ({ onTaskAdded }) => {
  const [title, setTitle] = useState(''); // хук useState создает состояние title, setTitle - функуия для создания title

  const handleSubmit = async (e) => {
    e.preventDefault(); // без перезагрузки
    const newTask = { title, completed: false, inProgress: false };
    await onTaskAdded(newTask);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task"
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;