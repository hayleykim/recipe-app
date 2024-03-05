const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const availableCountries = ['East Asian', 'South Asian', 'North Asian', 'Central Asian', 'West Asian', 'South East Asian', 'European', 'North American', 'South American', 'African', 'Oceanian', 'Other']


const favouriteSchema = new Schema({

}, {
    timestamps: true
});

const reviewSchema = new Schema({
    content: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userName: String,
    userAvatar: String
  }, {
    timestamps: true
  });

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    ingredients: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    country: {
        type: String,
        enum: availableCountries
    },
    cloudinary_id: {
        type: String
    },
    reviews: [reviewSchema],
    favourites: [favouriteSchema]
     
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);