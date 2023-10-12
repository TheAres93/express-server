const express = require('express');
const router = express.Router();
let tareas = require('./listaDeTareas');

router.get('/completadas', (req, res) => {
  const tareasCompletadas = tareas.filter((tarea) => tarea.estado == 'Completada');

  res.send(tareasCompletadas);
});

router.get('/pendientes', (req, res) => {
  const tareasPendientes = tareas.filter((tarea) => tarea.estado != 'Completada');

  res.send(tareasPendientes);
});


module.exports = router;