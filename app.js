const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

// const dummyRoute = require("./routes/dummy_test");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");

logger.info("Connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((e) => {
    logger.error("error connecting to MongoDB", e.message);
  });

// Middleware
app.use(express.static("build")); // serve the frontend
app.use(express.json());
app.use(cors());

app.use(middleware.requestLogger);

// ROUTES
app.use("/api/auth", authRoute);
app.use("/api/user/", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);

// OTHERS
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
