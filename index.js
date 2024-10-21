require("dotenv").config();
const express = require("express");
const cors = require("cors");

const categoriesRoutes = require("./src/routes/categories");
const productsRoutes = require("./src/routes/products");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse the body of requests in JSON format

// Routes
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productsRoutes);

// Global error handling
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err); // Error logging
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
