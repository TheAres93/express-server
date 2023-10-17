const express = require('express');
const router = express.Router();
let tareas = require('./listaDeTareas');

router.get('/', (req, res) => {
  if (tareas.length === 0) {
    res.status(404).send({
      mensaje: 'No hay tareas',
    });
  } else {
    res.status(200).send(tareas);
  }
});

router.get('/completadas', (req, res) => {
  const tareasCompletadas = tareas.filter((tarea) => tarea.estado == 'Completada');

  if (tareasCompletadas.length === 0) {
    res.status(404).send({
      mensaje: 'No hay tareas completadas',
    });
  } else {
    res.status(200).send(tareasCompletadas);
  }
});

router.get('/pendientes', (req, res) => {
  const tareasPendientes = tareas.filter((tarea) => tarea.estado != 'Completada');

  if (tareasPendientes.length === 0) {
    res.status(404).send({
      mensaje: 'No hay tareas pendientes',
    });
  } else {
    res.status(200).send(tareasPendientes);
  }
});


module.exports = router;
