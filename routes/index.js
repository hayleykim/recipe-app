var express = require('express');
var router = express.Router();
const passport = require('passport');


/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    const recipes = Recipe.find({});
    const recipesByCountry = groupRecipesByCountry(recipes);

    

    res.render('recipes/index', { title: 'Recipes', recipes, recipesByCountry });
} catch (err) {
    console.error(err);
}
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    // prompt: "select_account"
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/recipes',
    failureRedirect: '/recipes'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/recipes');
  });
});

module.exports = router;
