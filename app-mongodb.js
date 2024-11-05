const { log } = require("console"); // Import console logging
const express = require("express"); // Import Express for creating the server
const moviesRouterMongo = require("./Routes/moviesRouter-mongo");
const morgan = require("morgan"); // Import morgan for HTTP request logging

const app = express(); // Create Express app

// Custom middleware for logging
const loggerMiddleware = (req, res, next) => {
  console.log("Custom Middleware Called...");
  next(); // Continue to the next middleware
};

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(morgan("dev")); // Use morgan for HTTP request logging
app.use(loggerMiddleware); // Use the custom logger middleware

// Custom middleware for adding request time
app.use((req, res, next) => {
  console.log("Another custom middleware called");
  req.requestedAt = new Date().toLocaleString("en-IN", {
    // Store request timestamp in IST
    timeZone: "Asia/Kolkata",
  });
  next(); // Continue to the next middleware
});

app.use("/api/v1/movies", moviesRouterMongo); // Use moviesRouter for "/api/v1/movies" path

module.exports = app;
