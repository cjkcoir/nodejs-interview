const express = require("express"); // Import the Express framework
const fs = require("fs"); // Import the File System module to work with files

const movies = JSON.parse(fs.readFileSync("./Data/movies.json")); // Read and parse the movies.json file into a JavaScript array

const app = express(); // Create an Express application

app.use(express.json()); // Middleware to parse incoming JSON requests

const PORT = 3000; // Define the port where the server will listen

// Define a GET route at /api/v1/movies to retrieve all movies
app.get("/api/v1/movies", (req, res) => {
  res.status(200).json({
    status: "Success", // Status of the response
    noOfMovies: movies.length, // Number of movies in the data
    data: { movies: movies }, // Movie data being sent in the response
  });
});

// Define a POST route at /api/v1/movies to add a new movie
app.post("/api/v1/movies", (req, res) => {
  const newId = movies[movies.length - 1].id + 1; // Generate a new unique ID for the movie by incrementing the last movie ID
  console.log(newId); // Log the new movie ID to the console for debugging

  const newMovie = Object.assign({ id: newId }, req.body); // Create a new movie object by merging the new ID with request body data
  movies.push(newMovie); // Add the new movie to the movies array

  // Write the updated movies array to movies.json file
  fs.writeFile("./Data/movies.json", JSON.stringify(movies), () => {
    // Respond with status 201 (Created) and send the newly created movie data
    res.status(201).json({
      status: "New Movie Created", // Status message of the response
      data: {
        created: newMovie, // Include the newly created movie in the response data
      },
    });
  });
});

// Start the server and listen on the specified port
app.listen(PORT, "127.0.0.1", () => {
  console.log("Server is running..... on PORT: ", PORT); // Log a message when the server starts
});
