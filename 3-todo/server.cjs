const express = require('express'); // фреймвор для node.js
const mongoose = require('mongoose'); // подключение mongoose для работа с mongodb
const cors = require('cors'); // можно работать на разных портах
const bodyParser = require('body-parser'); // парсинг запросов

const app = express(); // приложение
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json()); // автоматический парсинг JSON-данных

// ======================================== database ========================================
mongoose.connect('mongodb://localhost:27017/todo-list', {
  // новые настройки
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// ================================== МОДЕЛЬ ЗАДАЧИ ========================================
// установка схемы
const taskSchema = new mongoose.Schema({
  title: String, // название - строка
  completed: Boolean,
  inProgress: Boolean,
  hours: Number, // количество часов для задач "в процессе"
});

const Task = mongoose.model('Task', taskSchema);

// ================================ API ==========================================

// получаем данные с сервера
app.get('/api/tasks', async (req, res) => {
  const { status } = req.query;
  let filter = {};

  if (status === 'in-progress') {
    filter.inProgress = true;
  } else if (status === 'completed') {
    filter.completed = true;
  }

  const tasks = await Task.find(filter);  // находим все задачи в бд
  res.json(tasks); // отправляем клиенту
});

// создание новой задачи
app.post('/api/tasks', async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

// обновление задачи
app.put('/api/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// удаление задачи
app.delete('/api/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

// =============================== ЗАПУСК ================================
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});