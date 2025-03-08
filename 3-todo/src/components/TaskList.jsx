import React from 'react';

const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted }) => {
  const handleMoveToInProgress = async (id) => {
    const hours = prompt('Как долго хотите выполнять эту задачу');
    if (hours) {
      await onTaskUpdated(id, { inProgress: true, completed: false, hours: parseInt(hours) });
    }
  };

  const handleMarkCompleted = async (id) => {
    await onTaskUpdated(id, { completed: true, inProgress: false });
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li
          key={task._id}
          style={{
            textDecoration: task.completed ? 'line-through' : 'none',
            backgroundColor: task.completed ? '#e8f5e9' : task.inProgress ? '#fff3e0' : 'transparent',
          }}
        >
          <span>
            {task.title} {task.inProgress && `(${task.hours} hours)`}
          </span>
          <div>
            {!task.completed && !task.inProgress && (
              <button onClick={() => handleMoveToInProgress(task._id)}>🕒</button>
            )}
            {!task.completed && (
              <button onClick={() => handleMarkCompleted(task._id)}>✅</button>
            )}
            <button onClick={() => onTaskDeleted(task._id)}>🗑️</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;