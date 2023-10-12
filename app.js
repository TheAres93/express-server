const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');
let tareas = require('./listaDeTareas');

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.use('/listar', listViewRouter);
app.use('/editar', listEditRouter);

app.get('/listar', (req, res) => {
  if (tareas.length === 0) {
    res.send({
      mensaje: 'No hay tareas',
    });
  } else {
    res.send(tareas);
  }
});

app.get('/', (req, res) => {

    res.send("Bienvenido a tu organizador de tareas.");

});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});