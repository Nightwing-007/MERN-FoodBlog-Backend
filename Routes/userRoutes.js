const express = require("express");
const authController = require("./../Controller/authController");
const User = require("./../Models/userModel");

const router = express.Router();

router.post("/favorite/:recipeId", authController.protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const recipeId = req.params.recipeId;
    
    if (user.favorites.includes(recipeId)) {
      user.favorites.pull(recipeId);
    } else {
      user.favorites.push(recipeId);
    }
    
    await user.save();
    res.json({ status: "success", favorites: user.favorites });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
});

router.post("/view/:recipeId", authController.protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const recipeId = req.params.recipeId;
    
    if (!user.viewedRecipes.includes(recipeId)) {
      user.viewedRecipes.push(recipeId);
      await user.save();
    }
    
    res.json({ status: "success" });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
});

router.get("/stats", authController.protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites').populate('viewedRecipes');
    res.json({
      status: "success",
      data: {
        favoritesCount: user.favorites.length,
        viewedCount: user.viewedRecipes.length,
        favorites: user.favorites,
        viewedRecipes: user.viewedRecipes.slice(-5)
      }
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
});

// Admin routes
router.get("/admin/all", authController.protect, authController.restrictTo("admin"), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ status: "success", data: { users } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
});

router.delete("/admin/:id", authController.protect, authController.restrictTo("admin"), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
});

module.exports = router;