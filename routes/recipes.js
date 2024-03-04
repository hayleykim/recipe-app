const express = require('express');
const router = express.Router();
const upload = require('../utilities/multer');
const recipesController = require('../controllers/recipes');
const ensureLoggedIn = require('../config/ensureLoggedIn');



// GET /recipes
router.get('/', recipesController.index);

// GET /recipes/new

router.get('/new', ensureLoggedIn, recipesController.new);

// GET /recipes/:id
router.get('/:id', recipesController.show);

// POST /recipes
router.post('/', upload.single('image'), recipesController.create );

module.exports = router;