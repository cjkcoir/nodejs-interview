const express = require("express"); // Import the Express framework
const fs = require("fs"); // Import the File System module to read files

const movies = JSON.parse(fs.readFileSync("./Data/movies.json")); // Read and parse the movies.json file into a JavaScript object

const app = express(); // Create an Express application

const PORT = 3000; // Define the port where the server will listen

app.use(express.json())

// Define a GET route at /api/v1/movies to serve the movie data
app.get("/api/v1/movies", (req, res) => {
  res
    .status(200) // Set the HTTP status code to 200 (OK)
    .json({
      status: "Success", // Send a response with status success
      noOfMovies: movies.length, // Include the number of movies in the response
      data: { movies: movies }, // Include the movie data itself
    });
});




// Start the server and listen on the specified port
app.listen(PORT, "127.0.0.1", () => {
  console.log("Server is running..... on PORT: ", PORT); // Log a message when the server starts
});
