const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./models');
const scheduleRoutes = require('./routes/schedule.routes');

app.use(express.json());
app.use('/api/schedule', scheduleRoutes);

const PORT = process.env.PORT || 5500;

db.sequelize.sync().then(() => {
  console.log('Base de datos conectada y sincronizada');
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
});