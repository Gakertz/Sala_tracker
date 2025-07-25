const express = require('express');
const router = express.Router();
const Reserva = require('../models/Reserva');

// Obtener todas las reservas
router.get('/', async (req, res) => {
  const reservas = await Reserva.findAll();
  res.json(reservas);
});

// Crear una nueva reserva con validación
router.post('/', async (req, res) => {
  const { docente, sala, horaInicio, horaFin, fecha } = req.body;

  const reservasExistentes = await Reserva.findAll({
    where: {
      sala,
      fecha
    }
  });

  const conflicto = reservasExistentes.some(r =>
    (horaInicio < r.horaFin && horaFin > r.horaInicio)
  );

  if (conflicto) {
    return res.status(400).json({ error: 'Conflicto de horario' });
  }

  const nuevaReserva = await Reserva.create({ docente, sala, horaInicio, horaFin, fecha });
  res.json(nuevaReserva);
});

module.exports = router;
