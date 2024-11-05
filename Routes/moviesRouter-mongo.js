const express = require("express"); // Import Express for creating the server.
const moviesControllermongo = require("./../Controllers/moviesController-mongo");

const router = express.Router(); // Create a router instance

// router.param("id", (req, res, next, value) => {
//   console.log(`Value of ID =${value}`);
//   next();
// });

// /router.param("id", moviesControllermongo.checkID); // Middleware to run checkID when 'id' parameter is present in route


  // Define route for sorting movies.
//   router
//   .route('/sort')
//   .get(moviesControllermongo.sortMovies);
  
  
  // Define GET and POST routes for all movies.
  router
  .route("/")
  .get(moviesControllermongo.getAllMovies)
  .post( moviesControllermongo.createMovie);
  
  // Define GET, PATCH, DELETE routes for a specific movie.
  router
  .route("/:id")
  .get(moviesControllermongo.getMovieById)
  .patch(moviesControllermongo.updateMovie)
  .delete(moviesControllermongo.deletMovie);
  
  module.exports = router;

