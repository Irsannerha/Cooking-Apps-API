const Recipe = require('../models/resepModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.createRecipe = catchAsync(async (req, res) => {
  const { title, category, tags, ingredients, steps } = req.body;

  // Split tags, ingredients, and steps by commas
  const tagsArray = tags.split(',');
  const ingredientsArray = ingredients.split(',');
  const stepsArray = steps.split(',');

  // Your code here to create a new recipe with the split arrays
  const recipe = await Recipe.create({
    title,
    category,
    tags: tagsArray,
    ingredients: ingredientsArray,
    steps: stepsArray,
  });

  res.status(201).json({
    status: 'success',
    message: 'Recipe created successfully',
    data: {
      recipe,
    },
  });
});

exports.getAllRecipes = factory.getAll(Recipe);
// exports.createRecipe = factory.createOne(Recipe);
exports.getRecipe = factory.getOne(Recipe);
exports.updateRecipe = factory.updateOne(Recipe);
exports.deleteRecipe = factory.deleteOne(Recipe);
