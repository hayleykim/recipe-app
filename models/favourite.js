const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favouriteSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    recipe: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true,
      },
      addedDate: {
        type: Date,
        default: Date.now()
      }
  }, {
      timestamps: true
  });

  module.exports = mongoose.model('Favourite', favouriteSchema);
