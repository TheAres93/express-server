const express = require('express');

const app = express();

app.get('/', (req, res) => {
  const tasks = [
    {
      id: '123456',
      isCompleted: false,
      description: 'Walk the dog',
    },
    {
      id: '789012',
      isCompleted: true,
      description: 'Do the laundry',
    },
  ];

  res.json(tasks);
});

app.listen(3000, () => {
  console.log('El servidor está escuchando en el puerto 3000');
});