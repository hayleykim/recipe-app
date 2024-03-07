const Favourite = require('../models/favourite');
const Recipe = require('../models/recipe');

module.exports = {
    index,
    new: newFavourites,
    delete: deleteFavourites
  };

  async function index(req, res) {
    try {
        //use .populate() to replace recipe with actual docs from Recipe collection. - allowing to access full content of Recipe model. (in this case, not only just ID of recipe but the entire Recipe schema)
        const favourites = await Favourite.find({user: req.user._id}).populate('recipe');

        const fave = await Favourite.find({user: req.user._id});

        const recipes = await Recipe.find({});

        const favouritesByCountry = groupRecipesByCountry(favourites.map(favourite => favourite.recipe));

        res.render('favourites/index', { title: 'My Favourites', fave, favouritesByCountry, recipes });
    } catch (err) {
        console.log(err);
    }
  }

  async function newFavourites(req, res) {
    try {
        const recipeId = req.params.id;
    
        const newFavourite = new Favourite({ 
            user: req.user._id, 
            recipe: recipeId 
        });

        await newFavourite.save();
    
        res.redirect('/favourites');
      } catch (err) {
        console.error(err);
      }
  }

  async function deleteFavourites(req, res) {
    try {
        const id = req.params.id;
        await Favourite.findByIdAndDelete(id);
        res.redirect('/favourites');

        // const favourite = await Favourite.findOne({ _id: id, user: req.user._id });

        // if (!favourite) {
        //     return res.redirect('/favourites');
        // }

        // await favourite.remove();

        res.redirect('/favourites');
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

    return recipesByCountry;
}