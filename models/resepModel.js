const mongoose = require('mongoose');

const resepSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A Recipe must have a title'],
  },
  category: {
    type: String,
    required: [true, 'A Recipe must have a category'],
  },
  tags: {
    type: [String],
    required: [true, 'A Recipe must have a tag'],
  },
  ingredients: {
    type: [String],
    required: [true, 'A Recipe must have a ingredients'],
  },
  steps: {
    type: [String],
    required: [true, 'A Recipe must have a steps'],
  },
});

const Recipe = mongoose.model('Recipe', resepSchema);

module.exports = Recipe;
