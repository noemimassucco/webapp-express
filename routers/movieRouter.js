const express = require('express');
const router = express.Router();
const movieControllers = require('../controllers/movieControllers');

router.get('/', movieControllers.index);
router.get('/:id', movieControllers.show);

module.exports = router;