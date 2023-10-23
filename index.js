const express = require('express');
const app = express();
const port = 3000;
const { Pool } = require('pg-pool');

const pool = new Pool({
  user: 'kqsxvymi', 
  host: 'isabelle.db.elephantsql.com',
  database: 'kqsxvymi', 
  password: 'GYyrzinplD1d3hKaOZosIH95F0eus3el', 
  port: 5432, 
  ssl: true, 
});

app.use(express.json());

// Rota para obter informações do currículo
app.get('/curriculum', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM curriculum');
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.json({ message: 'Currículo não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar currículo' });
  }
});

app.listen(port, () => {
  console.log(`Servidor do currículo rodando na porta ${port}`);
});
