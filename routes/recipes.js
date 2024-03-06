const express = require('express');
const router = express.Router();
const upload = require('../utilities/multer');
const recipesController = require('../controllers/recipes');
const ensureLoggedIn = require('../config/ensureLoggedIn');
const searchController = require('../controllers/search');


// GET /recipes
router.get('/', recipesController.index);

// GET /recipes/search
router.get('/search', searchController.index);


// GET /recipes/new

router.get('/new', recipesController.new);

// GET /recipes/:id
router.get('/:id', recipesController.show);

// GET /recipes/:id/edit
router.get('/:id/edit', recipesController.edit);

// POST /recipes
router.post('/', upload.single('image'), recipesController.create);

// DELETE /recipes/:id
router.delete('/:id', recipesController.delete);

// PUT /recipes/:id
router.put('/:id', recipesController.update);

module.exports = router;