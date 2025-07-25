require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./config/database');
const reservasRoutes = require('./routes/reservas');
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/reservas', reservasRoutes);

sequelize.sync().then(() => {
  console.log('Base de datos conectada y sincronizada');
  app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
  });
});
