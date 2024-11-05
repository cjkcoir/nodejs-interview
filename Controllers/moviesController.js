const express = require("express"); // Import Express for creating the server.
const fs = require("fs"); // Import filesystem module.
const router = express.Router(); // Create a router for movies routes.

const movies = JSON.parse(fs.readFileSync("./Data/movies.json")); // Parse movies data from movies.json file.


// Handler to sort movies
exports.sortMovies = (req, res) => {
  const { sortBy } = req.query; // Get the sort field from the query parameters
  
  if (!sortBy) {
    return res.status(400).json({
      status: "Fail",
      message: "Sort field is not specified"
    });
  }

  const validSortFields = ['name', 'releaseYear', 'rating']; // Define valid sort fields
  if (!validSortFields.includes(sortBy)) {
    return res.status(400).json({
      status: "Fail",
      message: `Invalid sort field. Valid fields are: ${validSortFields.join(', ')}`
    });
  }

  const sortedMovies = [...movies].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -1;
    if (a[sortBy] > b[sortBy]) return 1;
    return 0;
  });

  res.status(200).json({
    status: "Success",
    requestedAt: req.requestedAt,
    data: { movies: sortedMovies }
  });
};
exports.checkID = (req, res, next, value) => {
  console.log(`Movie ID= ${value}`);

  const movie = movies.find((element) => element.id === value*1); // Find movie by ID.

  if (!movie) {
    // If not found, send 404 error.
    return res.status(404).json({
      status: "Fail",
      requestedAt: req.requestedAt,
      message: `Movie with ID=${value} not found`,
    });
  }

  next();
};

// / Handler to get all movies.
exports.getAllMovies = (req, res) => {
  res.status(200).json({
    status: "Success",
    requestedAt: req.requestedAt, // Include request timestamp.
    noOfMovies: movies.length, // Include number of movies.
    data: { movies: movies }, // Send movies data.
  });
};

// Handler to get a movie by ID.
exports.getMovieById = (req, res) => {
  const id = req.params.id * 1; // Convert ID to a number.
  const movie = movies.find((element) => element.id === id); // Find movie by ID.

//   if (!movie) {
//     // If not found, send 404 error.
//     return res.status(404).json({
//       status: "Fail",
//       requestedAt: req.requestedAt,
//       message: `Movie with ID=${id} not found`,
//     });
//   }

  res.status(200).json({
    // Send found movie.
    status: "Success",
    requestedAt: req.requestedAt,
    movie: movie,
  });
};

exports.validateBody=(req,res,next)=>{

    if(!req.body.name ||!req.body.releaseYear){

        res.status(400).json({
            status:"Failure",
            Message:"Not valide request Body"
        
        })
    }
    next()
}

// Handler to create a new movie.
exports.createMovie = (req, res) => {
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
exports.updateMovie = (req, res) => {
  const id = req.params.id * 1; // Convert ID to a number.
  const movie = movies.find((element) => element.id === id); // Find movie by ID.

//   if (!movie) {
//     // If not found, send 404 error.
//     return res.status(404).json({
//       status: "Fail",
//       requestedAt: req.requestedAt,
//       message: `Movie with ID=${id} not found`,
//     });
//   }

  const index = movies.indexOf(movie); // Get index of movie.
  Object.assign(movie, req.body); // Update movie properties.
  movies[index] = movie; // Replace movie in array.

  fs.writeFile("./Data/movies.json", JSON.stringify(movies), (err) => {
    // Save updated array to file.
    res.status(200).json({
      status: "Success, movie Updated",
      requestedAt: req.requestedAt,
      data: { updatedMovie: movie },
    });
  });
};

// Handler to delete a movie by ID.
exports.deletMovie = (req, res) => {
  const id = req.params.id * 1; // Convert ID to a number.
  const movie = movies.find((element) => element.id === id); // Find movie by ID.

  const index = movies.indexOf(movie); // Get index of movie.
  movies.splice(index, 1); // Remove movie from array.

//   if (!movie) {
//     // If not found, send 404 error.
//     return res.status(404).json({
//       status: "Fail",
//       requestedAt: req.requestedAt,
//       message: `Movie with ID=${id} not found`,
//     });
//   }

  fs.writeFile("./Data/movies.json", JSON.stringify(movies), (err) => {
    // Save updated array to file.
    res.status(204).json({
      status: "Success, movie deleted",
      requestedAt: req.requestedAt,
    });
  });
};
