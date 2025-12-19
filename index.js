const express = require("express");
const cors = require("cors");

const authRouter = require("./Routes/authRoutes");
const recipeRouter = require("./Routes/recipeRoutes");
const userRouter = require("./Routes/userRoutes");
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/recipes", recipeRouter);
app.use("/api/users", userRouter);

module.exports = app;
