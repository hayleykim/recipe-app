const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.post('/recipes/:id/reviews', ensureLoggedIn, reviewsController.create);
router.delete('/reviews/:id', ensureLoggedIn, reviewsController.delete);

module.exports = router;
