
const express = require('express');
const config = require('./env');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Middleware para processar JSON
app.use(express.json());

// Configuração do banco de dados
const pool = new Pool(config.database);

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
