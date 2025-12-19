const express = require("express");
const recipeController = require("./../Controller/recipeController");
const authController = require("./../Controller/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, recipeController.getAllRecipes)
  .post(authController.protect, recipeController.createRecipe);

router
  .route("/:id")
  .get(authController.protect, recipeController.getRecipe)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    recipeController.deleteRecipe
  );

module.exports = router;
