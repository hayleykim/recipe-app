const Recipe = require('../models/recipe');
const Favourite = require('../models/favourite');
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

        

        res.render('recipes/recipes', { title: 'Recipes', recipes, recipesByCountry });
    } catch (err) {
        console.error(err);
    }
}

async function show(req, res) {
    const recipe = await Recipe.findById(req.params.id);

    const favorites = await Favourite.find({  recipe: recipe._id });

    res.render('recipes/show', { title: 'Recipe Detail', recipe, favorites})
}

async function newRecipe(req, res) {
    res.render('recipes/new', { title: 'Add Recipe', errorMsg: ''});
}

async function create(req, res) {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);

        const recipe = new Recipe({
            ...req.body,
            image: result.secure_url,
            cloudinary_id: result.public_id,
            favourites: []
        })

        await recipe.save();
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
        const existingRecipe = await Recipe.findById(req.params.id);

        // Ensuring that favourites is not overwritten with an empty array
        req.body.favourites = existingRecipe.favourites;

        await existingRecipe.updateOne(req.body);
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

    
    //Countries in alphabetical order
    const sortedCountries = Object.keys(recipesByCountry).sort();

    //Recipes in each country in alphabetical order
     const sortedRecipesByCountry = {};

     sortedCountries.forEach((country) => {
        
         sortedRecipesByCountry[country] = recipesByCountry[country].sort((a, b) => {
             const titleA = a.title.toUpperCase();
             const titleB = b.title.toUpperCase();
             
             if (titleA < titleB) {
                return -1;
            } else if (titleA > titleB) {
                return 1;
            } else {
                return 0;
            }
         });
     });

    return sortedRecipesByCountry;
}