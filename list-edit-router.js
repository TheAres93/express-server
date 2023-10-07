const express = require('express');
const router = express.Router();
let tareas = require('./listaDeTareas');

router.post('/crear', (req, res) => {
  const nuevaTarea = req.body;
  nuevaTarea.descripcion = nuevaTarea;
  nuevaTarea.estado = 'Pendiente';
  nuevaTarea.id = tareas.length + 1;
  tareas.push(nuevaTarea);
  res.status(200).send({message:`La tarea "${nuevaTarea}" ha sido agregada.`});
});

router.delete('/eliminar/:id', (req, res) => {
  const tareaId = req.params.id;
  const tarea = tareas.find(tareaId);

  if (tarea) {
    tareas.splice(tareas.indexOf(tarea), 1);
    res.status(200).send(`La tarea "${tarea.descripcion}" ha sido eliminada.`);
  } else {
    res.status(404).send('La tarea no esta en nuestra base de datos.');
  }
});

router.put('/actualizar/:id', (req, res) => {
  const tareaId = req.params.id;
  const tarea = tareas.find(tareaId);

  if (tarea) {
    tarea.estado = 'Completado';
    res.status(200).send(`La tarea "${tarea.descripcion}" ha sido actualizada.`);
  } else {
    res.status(404).send('La tarea no esta en nuestra base de datos.');
  }
});

module.exports = router;