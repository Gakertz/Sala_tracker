
require("dotenv").config();
const express = require("express");
const app = express();
const { Pool } = require("pg");
const path = require("path");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/calendario/:fecha", async (req, res) => {
  const fecha = req.params.fecha;
  try {
    const result = await pool.query(
      "SELECT * FROM reservas WHERE fecha = $1 AND EXTRACT(DOW FROM fecha) BETWEEN 1 AND 5 ORDER BY hora_inicio",
      [fecha]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener reservas");
  }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
