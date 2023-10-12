const express = require('express');
const router = express.Router();
let tareas = require('./listaDeTareas');

router.post('/crear', (req, res) => {
  const nuevaTarea = {
    id: tareas.length + 1,
    descripcion: req.body.descripcion,
    estado: 'Pendiente',
  };

  if (!nuevaTarea.descripcion) {
    return res.send({message: 'La solicitud no tiene un valor para la propiedad "descripcion".'});
  }

  tareas.push(nuevaTarea);
  res.send({message:`La tarea "${nuevaTarea.descripcion}" ha sido agregada.`});
});

router.delete('/eliminar/:id', (req, res) => {
  const tareaId = req.params.id;
  const tarea = tareas.find((tarea) => tarea.id == tareaId);

  if (tarea) {
    tareas.splice(tareas.indexOf(tarea), 1);
    res.send(`La tarea "${tarea.descripcion}" ha sido eliminada.`);
  } else {
    res.send('La tarea no esta en nuestra base de datos.');
  }
});

router.put('/actualizar/:id', (req, res) => {
  const tareaId = req.params.id;
  const tarea = tareas.find((tarea) => tarea.id == tareaId);

  if (tarea) {
    tarea.estado = 'Completada';
    res.send(`La tarea "${tarea.descripcion}" ha sido actualizada.`);
  } else {
    res.send('La tarea no esta en nuestra base de datos.');
  }
});

module.exports = router;