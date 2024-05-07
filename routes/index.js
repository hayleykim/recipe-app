var express = require('express');
var router = express.Router();
const passport = require('passport');
const Recipe = require('../models/recipe');


/* GET home page. */
router.get('/', function(req, res, next) {
  const recipes = Recipe.find({});
  const recipesByCountry = groupRecipesByCountry(recipes);

  res.render('recipes', { title: 'Recipes', recipes, recipesByCountry });
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every timeclear
    
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
