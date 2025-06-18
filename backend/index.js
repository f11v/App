const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

let tasks = [];

app.get('/tasks', (req, res) => res.json(tasks));

app.post('/tasks', (req, res) => {
    const task = { id: uuidv4(), text: req.body.text };
    tasks.push(task);
    res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const updatedText = req.body.text;
    tasks = tasks.map(task => task.id === id ? { ...task, text: updatedText } : task);
    res.json({ id, text: updatedText });
});

app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    tasks = tasks.filter(task => task.id !== id);
    res.status(204).send();
});

app.listen(port, () => console.log(`Backend listening on port ${port}`));
