import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios.get('/api/tasks').then(res => setTasks(res.data));
  }, []);

  const addTask = () => {
    if (!text) return;
    axios.post('/api/tasks', { text }).then(res => {
      setTasks([...tasks, res.data]);
      setText('');
    });
  };

  const editTask = (id, currentText) => {
    setText(currentText);
    setEditId(id);
  };

  const updateTask = () => {
    axios.put('/api/tasks/' + editId, { text }).then(res => {
      setTasks(tasks.map(t => t.id === editId ? res.data : t));
      setText('');
      setEditId(null);
    });
  };

  const deleteTask = id => {
    axios.delete('/api/tasks/' + id).then(() => {
      setTasks(tasks.filter(t => t.id !== id));
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Todo App</h2>
      <input value={text} onChange={e => setText(e.target.value)} />
      {editId ? <button onClick={updateTask}>Update</button> : <button onClick={addTask}>Add</button>}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => editTask(task.id, task.text)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
