const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');
let tareas = require('./listaDeTareas');

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.use('/list-view', listViewRouter);
app.use('/list-edit', listEditRouter);

app.get('/', (req, res) => {
  if (tareas.length === 0) {
    res.status(404).send({
      mensaje: 'No hay tareas',
    });
  } else {
    res.status(200).send(tareas);
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});