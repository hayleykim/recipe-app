const express = require('express');
const router = express.Router();
const favouritesController = require('../controllers/favourites');



router.get('/favourites', favouritesController.index);
router.post('/favourites/:id/add', favouritesController.new);
router.post('/favourites/:id/delete', favouritesController.delete);


module.exports = router;