const express = require('express');
require('dotenv').config();

const movieRouter = require('./routers/movieRouter');

const app = express();
const PORT = 3000;

app.use('/images', express.static('public/images'));

app.use('/movies', movieRouter);


app.use((req, res) => {
  res.status(404).json({ error: 'Rotta non trovata' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Errore interno del server' });
});

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});