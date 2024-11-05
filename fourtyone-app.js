const { log } = require("console"); // Import the console logging functionality.
const express = require("express"); // Import Express framework for building the server.
const fs = require("fs"); // Import filesystem module to work with files.
const morgan = require("morgan");

const movies = JSON.parse(fs.readFileSync("./Data/movies.json")); // Read and parse movies data from movies.json.

const app = express(); // Initialize the Express application.

const loggerMiddleware = (req, res, next) => {
  // Define a custom middleware for logging.
  console.log("Custom Middleware Called...");
  next(); // Move to the next middleware or route handler.
};

app.use(express.json()); // Middleware to parse incoming JSON requests.
app.use(morgan("dev"));
app.use(loggerMiddleware); // Use the custom logger middleware.

app.use((req, res, next) => {
  // Another custom middleware.
  console.log("Another custom middleware called");
  req.requestedAt = new Date().toLocaleString("en-IN", {
    // Add the request timestamp in IST.
    timeZone: "Asia/Kolkata",
  });
  next(); // Continue to the next middleware or route handler.
});

const PORT = 3000; // Define the server port.

// Handler for retrieving all movies.
const getAllMovies = (req, res) => {
  res.status(200).json({
    status: "Success",
    requestedAt: req.requestedAt, // Include the request timestamp.
    noOfMovies: movies.length, // Number of movies in the dataset.
    data: { movies: movies }, // Send the movies data.
  });
};

// Handler for retrieving a single movie by ID.
const getMovieById = (req, res) => {
  const id = req.params.id * 1; // Convert the ID parameter to a number.

  const selectedMovie = movies.find((element) => element.id === id); // Find the movie with the specified ID.

  if (!selectedMovie) {
    // If no movie found, send a 404 error.
    return res.status(404).json({
      status: "Fail",
      requestedAt: req.requestedAt, // Include the request timestamp.
      message: `Movie with ID=${id} not found`,
    });
  }

  res.status(200).json({
    // If found, send success response with the movie.
    status: "Success",
    requestedAt: req.requestedAt,
    movie: selectedMovie,
  });
};

// Handler for creating a new movie.
const createMovie = (req, res) => {
  const newId = movies[movies.length - 1].id + 1; // Generate a new unique ID.
  const newMovie = Object.assign({ id: newId }, req.body); // Merge new ID with request body to create a new movie object.
  movies.push(newMovie); // Add the new movie to the movies array.

  fs.writeFile("./Data/movies.json", JSON.stringify(movies), () => {
    // Save the updated movies array to the file.
    res.status(201).json({
      status: "New Movie Created",
      requestedAt: req.requestedAt,
      data: { created: newMovie },
    });
  });
};

// Handler for updating a movie by ID.
const updateMovie = (req, res) => {
  const id = req.params.id * 1; // Convert ID to a number.
  const movieToUpdate = movies.find((element) => element.id === id); // Find the movie with the specified ID.

  if (!movieToUpdate) {
    // If no movie found, send a 404 error.
    return res.status(404).json({
      status: "Fail",
      requestedAt: req.requestedAt,
      message: `Movie with ID=${id} not found`,
    });
  }

  const index = movies.indexOf(movieToUpdate); // Get index of the movie to update.
  Object.assign(movieToUpdate, req.body); // Update the movie properties.
  movies[index] = movieToUpdate; // Save the updated movie in the array.

  fs.writeFile("./Data/movies.json", JSON.stringify(movies), (err) => {
    // Write updated array to the file.
    res.status(200).json({
      status: "Success, movie Updated",
      requestedAt: req.requestedAt,
      data: { updatedMovie: movieToUpdate },
    });
  });
};

// Handler for deleting a movie by ID.
const deletMovie = (req, res) => {
  const id = req.params.id * 1; // Convert ID to a number.

  const movieToDelete = movies.find((element) => element.id === id); // Find the movie with the specified ID.

  const index = movies.indexOf(movieToDelete); // Get index of the movie to delete.
  movies.splice(index, 1); // Remove the movie from the array.

  if (!movieToDelete) {
    // If no movie found, send a 404 error.
    return res.status(404).json({
      status: "Fail",
      requestedAt: req.requestedAt,
      message: `Movie with ID=${id} not found`,
    });
  }

  fs.writeFile("./Data/movies.json", JSON.stringify(movies), (err) => {
    // Save updated array to the file.
    res.status(204).json({
      status: "Success, movie deleted",
      requestedAt: req.requestedAt,
    });
  });
};

// Set up route for all movies with GET and POST methods.
app.route("/api/v1/movies").get(getAllMovies).post(createMovie);

// Set up route for single movie with GET, PATCH, and DELETE methods.
app
  .route("/api/v1/movies/:id")
  .get(getMovieById)
  .patch(updateMovie)
  .delete(deletMovie);

// Start the server.
app.listen(PORT, "127.0.0.1", () => {
  console.log("Server is running..... on PORT: ", PORT);
});
