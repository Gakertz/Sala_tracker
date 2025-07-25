const express = require('express');
const router = express.Router();
const db = require('../models');
const Schedule = db.Schedule;

// Obtener todos los datos
router.get('/', async (req, res) => {
  const data = await Schedule.findAll();
  res.json(data);
});

// Insertar dato de prueba
router.post('/test', async (req, res) => {
  const nuevo = await Schedule.create({
    sala: 'Sala 1',
    docente: 'pepe pollo',
    hora_inicio: '10:30',
    hora_fin: '12:00'
  });
  res.json(nuevo);
});

module.exports = router;