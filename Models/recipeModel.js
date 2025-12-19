const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A recipe must have a title"],
    trim: true,
  },
  ingredients: {
    type: [String],
    required: [true, "A recipe must have ingredients"],
  },
  instructions: {
    type: String,
    required: [true, "A recipe must have instructions"],
  },
  category: {
    type: String,
    enum: ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack"],
    default: "Dinner",
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/150",
  },
  cookingTime: {
    type: Number,
    required: [true, "Please provide cooking time"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Recipe must have a creator']
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
