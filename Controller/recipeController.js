const Recipe = require("./../Models/recipeModel");

// 1. Get All Recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('createdBy', 'name email');

    res.status(200).json({
      status: "success",
      results: recipes.length,
      data: { recipes },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err.message });
  }
};

// 2. Create a New Recipe
exports.createRecipe = async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json({
      status: "success",
      data: { recipe: newRecipe },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// 3. Delete a Recipe
exports.deleteRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: "Recipe not found" });
  }
};

exports.getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        status: "fail",
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: { recipe },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err.message });
  }
};
