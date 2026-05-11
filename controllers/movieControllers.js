const db = require('../db');

function index(req, res) {
  const sql = 'SELECT * FROM movies';
  
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
}

function show(req, res) {
  const id = req.params.id;
  
  const movieSql = 'SELECT * FROM movies WHERE id = ?';
  const reviewsSql = 'SELECT * FROM reviews WHERE movie_id = ?';
  
  db.query(movieSql, [id], (err, movieResults) => {
    if (err) return res.status(500).json({ error: err.message });
    if (movieResults.length === 0) return res.status(404).json({ error: 'Film non trovato' });
    
    const movie = movieResults[0];
    
    db.query(reviewsSql, [id], (err, reviewsResults) => {
      if (err) return res.status(500).json({ error: err.message });
      
      movie.reviews = reviewsResults;
      res.json(movie);
    });
  });
}

module.exports = { index, show };
