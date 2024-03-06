const Favourite = require('../models/favourite');

module.exports = {
    index,
    new: newFavourites,
    delete: deleteFavourites
  };

  async function index(req, res) {
    try {
        const favourites = await Favourite.find({user: req.user._id}).populate('recipe');
        res.render('favourites/index', {title: 'My Favourites', favourites});
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
        await Favourite.findOneAndDelete({ _id: id });
        res.redirect('/favourites');
    } catch (err) {
        console.error(err);
    }
}