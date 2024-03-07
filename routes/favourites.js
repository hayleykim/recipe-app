const express = require('express');
const router = express.Router();
const favouritesController = require('../controllers/favourites');



router.get('/favourites', favouritesController.index);
router.post('/favourites/:id/add', favouritesController.new);
router.delete('/favourites/:id', favouritesController.delete);


module.exports = router;