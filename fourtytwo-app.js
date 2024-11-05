const { log } = require("console"); // Import console logging.
const express = require("express"); // Import Express for creating the server.
const fs = require("fs"); // Import filesystem module.
const morgan = require("morgan"); // Import morgan for HTTP request logging.

const movies = JSON.parse(fs.readFileSync("./Data/movies.json")); // Parse movies data from movies.json file.

const app = express(); // Create Express app.

const moviesRouter = express.Router(); // Create a router for movies routes.

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

const PORT = 3000; // Define the server port.

// Handler to get all movies.
const getAllMovies = (req, res) => {
  res.status(200).json({
    status: "Success",
    requestedAt: req.requestedAt, // Include request timestamp.
    noOfMovies: movies.length, // Include number of movies.
    data: { movies: movies }, // Send movies data.
  });
};

// Handler to get a movie by ID.
const getMovieById = (req, res) => {
  const id = req.params.id * 1; // Convert ID to a number.
  const selectedMovie = movies.find((element) => element.id === id); // Find movie by ID.

  if (!selectedMovie) {
    // If not found, send 404 error.
    return res.status(404).json({
      status: "Fail",
      requestedAt: req.requestedAt,
      message: `Movie with ID=${id} not found`,
    });
  }

  res.status(200).json({
    // Send found movie.
    status: "Success",
    requestedAt: req.requestedAt,
    movie: selectedMovie,
  });
};

// Handler to create a new movie.
const createMovie = (req, res) => {
  const newId = movies[movies.length - 1].id + 1; // Generate new movie ID.
  const newMovie = Object.assign({ id: newId }, req.body); // Create new movie object.
  movies.push(newMovie); // Add new movie to array.

  fs.writeFile("./Data/movies.json", JSON.stringify(movies), () => {
    // Save updated array to file.
    res.status(201).json({
      status: "New Movie Created",
      requestedAt: req.requestedAt,
      data: { created: newMovie },
    });
  });
};

// Handler to update a movie by ID.
const updateMovie = (req, res) => {
  const id = req.params.id * 1; // Convert ID to a number.
  const movieToUpdate = movies.find((element) => element.id === id); // Find movie by ID.

  if (!movieToUpdate) {
    // If not found, send 404 error.
    return res.status(404).json({
      status: "Fail",
      requestedAt: req.requestedAt,
      message: `Movie with ID=${id} not found`,
    });
  }

  const index = movies.indexOf(movieToUpdate); // Get index of movie.
  Object.assign(movieToUpdate, req.body); // Update movie properties.
  movies[index] = movieToUpdate; // Replace movie in array.

  fs.writeFile("./Data/movies.json", JSON.stringify(movies), (err) => {
    // Save updated array to file.
    res.status(200).json({
      status: "Success, movie Updated",
      requestedAt: req.requestedAt,
      data: { updatedMovie: movieToUpdate },
    });
  });
};

// Handler to delete a movie by ID.
const deletMovie = (req, res) => {
  const id = req.params.id * 1; // Convert ID to a number.
  const movieToDelete = movies.find((element) => element.id === id); // Find movie by ID.

  const index = movies.indexOf(movieToDelete); // Get index of movie.
  movies.splice(index, 1); // Remove movie from array.

  if (!movieToDelete) {
    // If not found, send 404 error.
    return res.status(404).json({
      status: "Fail",
      requestedAt: req.requestedAt,
      message: `Movie with ID=${id} not found`,
    });
  }

  fs.writeFile("./Data/movies.json", JSON.stringify(movies), (err) => {
    // Save updated array to file.
    res.status(204).json({
      status: "Success, movie deleted",
      requestedAt: req.requestedAt,
    });
  });
};

// Define GET and POST routes for all movies.
moviesRouter.route("/").get(getAllMovies).post(createMovie);

// Define GET, PATCH, DELETE routes for a specific movie.
moviesRouter
  .route("/:id")
  .get(getMovieById)
  .patch(updateMovie)
  .delete(deletMovie);

app.use("/api/v1/movies", moviesRouter); // Use moviesRouter for "/api/v1/movies" path.

// Start server and listen on specified port.
app.listen(PORT, "127.0.0.1", () => {
  console.log("Server is running..... on PORT: ", PORT);
});
