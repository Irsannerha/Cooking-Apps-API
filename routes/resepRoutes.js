const express = require('express');

const router = express.Router();
const ResepController = require('../controllers/resepController');

router
  .route('/')
  .get(ResepController.getAllRecipes)
  .post(ResepController.createRecipe);
router
  .route('/:id')
  .get(ResepController.getRecipe)
  .patch(ResepController.updateRecipe)
  .delete(ResepController.deleteRecipe);

module.exports = router;
