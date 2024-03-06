const Recipe = require('../models/recipe');
const cloudinary = require('../utilities/cloudinary');

module.exports = {
    index,
    show,
    new: newRecipe,
    create,
    delete: deleteRecipe,
    edit,
    update
}

async function index(req, res) {
    try {
        const recipes = await Recipe.find({});
        const recipesByCountry = groupRecipesByCountry(recipes);

        res.render('recipes/index', { title: 'Recipes', recipes, recipesByCountry });
    } catch (err) {
        console.error(err);
    }
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
        //res.redirect('/recipes/${recipe._id}');
        res.redirect('/recipes');

    } catch (err) {
        console.log(err);
        res.render('recipes/new', {title: 'Recipe Detail', errorMsg: err.message});
    }
}

async function deleteRecipe(req, res) {
    try {
        const id = req.params.id;
        await Recipe.findOneAndDelete({ _id: id });
        res.redirect('/recipes');
    } catch (err) {
        console.error(err);
    }
}

async function edit(req, res) {
    try {
        const recipe = await Recipe.findById(req.params.id);
        res.render('recipes/edit', { title: 'Edit Recipe', recipe });
    } catch (err) {
        console.error(err);
    }
}

async function update(req, res) {
    try {
        await Recipe.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/recipes/${req.params.id}`);
    } catch (err) {
        console.error(err);
    }
}

function groupRecipesByCountry(recipes) {
    const recipesByCountry = {};

    recipes.forEach((recipe) => {
        const country = recipe.country;

        if (!recipesByCountry[country]) {
            recipesByCountry[country] = [];
        }

        recipesByCountry[country].push(recipe);
    });

    //sorting recipe length in decending order
    // Object.keys(recipesByCountry).forEach((country) => {
    //     recipesByCountry[country].sort((a, b) => {
    //         return recipesByCountry[b].length - recipesByCountry[a].length;
    //     });
    // });

    return recipesByCountry;
}