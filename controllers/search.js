const Recipe = require('../models/recipe');

module.exports = {
    index
}

async function index(req, res) {
    try {
        //Getting the search query from the URL
        const query = req.query.query;

        console.log('Search Query:', query);

        //If there is a query:
        if (query) {
            const searchResults = await Recipe.find({ title: { $regex: new RegExp(query, 'i') } });

            console.log('Search Results:', searchResults);

            if (searchResults.length > 0) {
                // If there are search results, render the results
                return res.render('recipes/index', { title: 'Search Result', recipesByCountry: { 'Search Results': searchResults } });
            } else {
                // If there are no search results, render a message
                return res.render('recipes/index', { title: 'No Search Result! Please Try Again', recipesByCountry: { 'Search Results': searchResults } });
            }
        }

        // If there is no search query, render the same index as recipe controller index async function
        const recipes = await Recipe.find({});
        const recipesByCountry = groupRecipesByCountry(recipes);

        console.log('Recipes By Country:', recipesByCountry);

        res.render('recipes/index', { title: 'Recipes', recipes, recipesByCountry });

    } catch (err) {
        console.error(err);
    }
}