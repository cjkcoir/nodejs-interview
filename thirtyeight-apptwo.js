// Import the express framework for creating the server and the fs module for file handling
const express = require("express");
const fs = require("fs");

// Read and parse the movies data from movies.json file, storing it in the movies array
const movies = JSON.parse(fs.readFileSync("./Data/movies.json"));

// Create an instance of the Express application
const app = express();

// Use middleware to parse JSON requests
app.use(express.json());

// Define the server port
const PORT = 3000;

// Define the function to get all movies
const getAllMovies = (req, res) => {
  res.status(200).json({
    status: "Success", // Status of response
    noOfMovies: movies.length, // Total count of movies
    data: { movies: movies }, // Data containing all movies
  });
};

// Define the function to get a movie by ID
const getMovieById = (req, res) => {
  const id = req.params.id * 1; // Convert the id from string to number

  // Find the movie with the specified ID in the movies array
  const selectedMovie = movies.find((element) => element.id === id);

  // If no movie is found, return a 404 error with an error message
  if (!selectedMovie) {
    return res.status(404).json({
      status: "Fail",
      message: `Movie with ID=${id} not found`, // Error message for missing movie
    });
  }

  // Return a successful response with the found movie
  res.status(200).json({
    status: "Success",
    movie: selectedMovie, // Data containing the found movie
  });
};

// Define the function to create a new movie
const createMovie = (req, res) => {
  const newId = movies[movies.length - 1].id + 1; // Generate a new ID
  console.log(newId);
  const newMovie = Object.assign({ id: newId }, req.body); // Merge new ID with the data from the request body
  movies.push(newMovie); // Add new movie to movies array

  // Write updated movies array to file
  fs.writeFile("./Data/movies.json", JSON.stringify(movies), () => {
    res.status(201).json({
      status: "New Movie Created", // Response message
      data: {
        created: newMovie, // Data containing the newly created movie
      },
    });
  });
};

// Define the function to update an existing movie
const updateMovie = (req, res) => {
  const id = req.params.id * 1; // Convert id from string to number
  const movieToUpdate = movies.find((element) => element.id === id); // Find the movie to update
  if (!movieToUpdate) {
    // If movie not found, return 404 error
    return res.status(404).json({
      status: "Fail",
      message: `Movie with ID=${id} not found`, // Error message for missing movie
    });
  }
  const index = movies.indexOf(movieToUpdate); // Get the index of the movie
  Object.assign(movieToUpdate, req.body); // Merge the updated data into the movie object
  movies[index] = movieToUpdate; // Update movie in array

  // Write updated movies array to file
  fs.writeFile("./Data/movies.json", JSON.stringify(movies), (err) => {
    res.status(200).json({
      status: "Success ,movie Updated", // Response message
      data: {
        updatedMovie: movieToUpdate, // Data containing the updated movie
      },
    });
  });
};

// Define the function to delete a movie by ID
const deletMovie = (req, res) => {
  const id = req.params.id * 1; // Convert id from string to number

  // Find the movie to delete
  const movieToDelete = movies.find((element) => element.id === id);

  const index = movies.indexOf(movieToDelete); // Get the index of the movie
  movies.splice(index, 1); // Remove the movie from the array
  if (!movieToDelete) {
    // If movie not found, return 404 error
    return res.status(404).json({
      status: "Fail",
      message: `Movie with ID=${id} not found`, // Error message for missing movie
    });
  }

  // Write updated movies array to file
  fs.writeFile("./Data/movies.json", JSON.stringify(movies), (err) => {
    res.status(204).json({
      status: "Success ,movie deleted", // Response message for successful deletion
    });
  });
};

// Define routes for movie-related requests
// GET and POST requests to "/api/v1/movies" use getAllMovies and createMovie functions
app.route("/api/v1/movies").get(getAllMovies).post(createMovie);

// GET, PATCH, and DELETE requests for specific movie ID
app
  .route("/api/v1/movies/:id")
  .get(getMovieById)
  .patch(updateMovie)
  .delete(deletMovie);

// Start the server, listening on defined port
app.listen(PORT, "127.0.0.1", () => {
  console.log("Server is running..... on PORT: ", PORT); // Log server start
});
