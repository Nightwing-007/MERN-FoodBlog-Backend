const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./index');

dotenv.config({ path: "./config.env" });

mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => {
        console.error("Database connection error:", err.message);
        process.exit(1);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});