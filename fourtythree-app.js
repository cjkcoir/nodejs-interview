const { log } = require("console"); // Import console logging.
const express = require("express"); // Import Express for creating the server.

const moviesRouter = require("./Routes/moviesRouter");
const morgan = require("morgan"); // Import morgan for HTTP request logging.

const app = express(); // Create Express app.

const loggerMiddleware = (req, res, next) => {
  // Custom middleware for logging.
  console.log("Custom Middleware Called...");
  next(); // Continue to the next middleware.
};

app.use(express.json()); // Middleware to parse JSON request bodies.
app.use(morgan("dev")); // Use morgan for HTTP request logging.
app.use(loggerMiddleware); // Use the custom logger middleware.

app.use((req, res, next) => {
  // Custom middleware for adding request time.
  console.log("Another custom middleware called");
  req.requestedAt = new Date().toLocaleString("en-IN", {
    // Store request timestamp in IST.
    timeZone: "Asia/Kolkata",
  });
  next(); // Continue to the next middleware.
});

app.use("/api/v1/movies", moviesRouter); // Use moviesRouter for "/api/v1/movies" path.

module.exports = app;
