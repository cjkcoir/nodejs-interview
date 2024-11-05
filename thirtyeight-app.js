// Import required modules
const express = require("express");
const fs = require("fs");

// Parse movies data from movies.json file
const movies = JSON.parse(fs.readFileSync("./Data/movies.json"));

// Initialize Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Define server port
const PORT = 3000;

// GET all movies
app.get("/api/v1/movies", (req, res) => {
  res.status(200).json({
    status: "Success", // Status of response
    noOfMovies: movies.length, // Total movies count
    data: { movies: movies }, // Movies data
  });
});

// POST new movie
app.post("/api/v1/movies", (req, res) => {
  const newId = movies[movies.length - 1].id + 1; // Generate new ID
  console.log(newId); // Log new ID to console
  const newMovie = Object.assign({ id: newId }, req.body); // Merge new ID with request body
  movies.push(newMovie); // Add new movie to movies array
  fs.writeFile("./Data/movies.json", JSON.stringify(movies), () => {
    // Save updated movies array to file
    res.status(201).json({
      status: "New Movie Created", // Status of response
      data: { created: newMovie }, // Newly created movie data
    });
  });
});

// GET specific movie by ID
app.get("/api/v1/movies/:id", (req, res) => {
  const id = req.params.id * 1; // Convert id from string to number

  // Find movie by ID
  const selectedMovie = movies.find((element) => element.id === id);

  // Return 404 if movie not found
  if (!selectedMovie) {
    return res.status(404).json({
      status: "Fail",
      message: `Movie with ID=${id} not found`, // Error message
    });
  }

  // Send success response with selected movie
  res.status(200).json({
    status: "Success",
    movie: selectedMovie, // Selected movie data
  });
});

// PATCH (update) specific movie by ID
app.patch("/api/v1/movies/:id", (req, res) => {
  const id = req.params.id * 1; // Convert id from string to number
  const movieToUpdate = movies.find((element) => element.id === id); // Find movie to update
  if (!movieToUpdate) {
    // Return 404 if movie not found
    return res.status(404).json({
      status: "Fail",
      message: `Movie with ID=${id} not found`,
    });
  }
  const index = movies.indexOf(movieToUpdate); // Get index of movie to update
  Object.assign(movieToUpdate, req.body); // Update movie with new data
  movies[index] = movieToUpdate; // Save updated movie in array

  fs.writeFile("./Data/movies.json", JSON.stringify(movies), (err) => {
    // Write updated array to file
    res.status(200).json({
      status: "Success ,movie Updated", // Status of response
      data: { updatedMovie: movieToUpdate }, // Updated movie data
    });
  });
});

// DELETE specific movie by ID
app.delete("/api/v1/movies/:id", (req, res) => {
  const id = req.params.id * 1; // Convert id from string to number

  // Find movie to delete
  const movieToDelete = movies.find((element) => element.id === id);

  const index = movies.indexOf(movieToDelete); // Get index of movie to delete
  movies.splice(index, 1); // Remove movie from array
  if (!movieToDelete) {
    // Return 404 if movie not found
    return res.status(404).json({
      status: "Fail",
      message: `Movie with ID=${id} not found`,
    });
  }

  fs.writeFile("./Data/movies.json", JSON.stringify(movies), (err) => {
    // Write updated array to file
    res.status(204).json({
      status: "Success ,movie deleted", // Status of response
    });
  });
});

// Start the server on defined port
app.listen(PORT, "127.0.0.1", () => {
  console.log("Server is running..... on PORT: ", PORT);
});
