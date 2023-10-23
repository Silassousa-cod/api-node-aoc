const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const { Pool } = require('pg');
const dbConfig = require('./dbConfig');

const pool = new Pool({
    connectionString: dbConfig.connectionString,
});

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/',(req,res) => {
    res.json({ info: 'Curriculo'})
});

app.get('/curriculum', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM curriculum');
      res.json(result.rows);
    } catch (error) {
      console.error('Não foi possível consultar o banco', error);
      res.status(500).send('Erro no servidor');
    }
});