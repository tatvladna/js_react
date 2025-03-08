import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import './App.css'; 

const PORT = 5000;

const App = () => {
  const [tasks, setTasks] = useState([]); // изначально пустой список задач
  const [filter, setFilter] = useState('all'); // all, in-progress, completed
  const [searchQuery, setSearchQuery] = useState(''); // поиск

  // загрузка задач с сервера
  const fetchTasks = async () => {
    const response = await fetch(`http://localhost:${PORT}/api/tasks`);
    const data = await response.json();
    setTasks(data); // SetTasks хранит данные с сервера
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // добавляем задачу с помощью POST-запроса
  const handleTaskAdded = async (newTask) => {
    await fetch(`http://localhost:${PORT}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // json
      },
      body: JSON.stringify(newTask), // json -> string
    });
    fetchTasks(); // выгружаем список задач с сервера
  };

  // обновляем задачу
  const handleTaskUpdated = async (id, updatedTask) => {
    await fetch(`http://localhost:${PORT}/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });
    fetchTasks();
  };

  // удаление задачи
  const handleTaskDeleted = async (id) => {
    await fetch(`http://localhost:${PORT}/api/tasks/${id}`, {
      method: 'DELETE',
    });
    fetchTasks();
  };

  // фильтрация
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'in-progress') {
      return task.inProgress;
    } else {
      return true; // Все задачи
    }
  }).filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Счетчики
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className="stats">
        <p>Total Tasks: {totalTasks}</p>
        <p>Completed Tasks: {completedTasks}</p>
      </div>
      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('in-progress')}>In Progress</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <AddTask onTaskAdded={handleTaskAdded} />
      <TaskList
        tasks={filteredTasks}
        onTaskUpdated={handleTaskUpdated}
        onTaskDeleted={handleTaskDeleted}
      />
    </div>
  );
};

export default App;