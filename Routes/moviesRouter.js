const express = require("express"); // Import Express for creating the server.
const moviesController = require("./../Controllers/moviesController");

const router = express.Router(); // Create a router instance

// router.param("id", (req, res, next, value) => {
//   console.log(`Value of ID =${value}`);
//   next();
// });

router.param("id", moviesController.checkID); // Middleware to run checkID when 'id' parameter is present in route


  // Define route for sorting movies.
  router
  .route('/sort')
  .get(moviesController.sortMovies);
  
  module.exports = router;

// Define GET and POST routes for all movies.
router
  .route("/")
  .get(moviesController.getAllMovies)
  .post(moviesController.validateBody, moviesController.createMovie);

// Define GET, PATCH, DELETE routes for a specific movie.
router
  .route("/:id")
  .get(moviesController.getMovieById)
  .patch(moviesController.updateMovie)
  .delete(moviesController.deletMovie);


