const express = require('express');
const router = express.Router();
let tareas = require('./listaDeTareas');

router.get('/listar/completadas', (req, res) => {
  const tareasCompletadas = tareas.filter((tarea) => tarea.descripcion === 'completada');

  if (tareasCompletadas.length === 0) {
    res.status(404).send({
      mensaje: 'No hay tareas completadas',
    });
  } else {
    res.status(200).send(tareasCompletadas);
  }
});

router.get('/listar/pendientes', (req, res) => {
  const tareasPendientes = tareas.filter((tarea) => tarea.descripcion !== 'completada');

  if (tareasPendientes.length === 0) {
    res.status(404).send({
      mensaje: 'No hay tareas pendientes',
    });
  } else {
    res.status(200).send(tareasPendientes);
  }
});


module.exports = router;

