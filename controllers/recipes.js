const Recipe = require('../models/recipe');
const cloudinary = require('../utilities/cloudinary');

module.exports = {
    index,
    show,
    new: newRecipe,
    create
}

async function index(req, res) {
    const recipes = await Recipe.find({});
    res.render('recipes/index', {title: 'Recipes', recipes});
}

async function show(req, res) {
    const recipe = await Recipe.findById(req.params.id);

    res.render('recipes/show', { title: 'Recipe Detail', recipe})
}

async function newRecipe(req, res) {
    res.render('recipes/new', { title: 'Add Recipe', errorMsg: ''});
}

async function create(req, res) {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        // await Recipe.create(req.body);
        

        const recipe = new Recipe({
            ...req.body,
            image: result.secure_url,
            cloudinary_id: result.public_id
        })
        await recipe.save();
        res.redirect('/recipes/${recipe._id}');

    } catch (err) {
        console.log(err);
        res.render('recipes/new', {errorMsg: err.message});
    }
}