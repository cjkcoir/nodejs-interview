const express = require("express");
const fs = require("fs");

const movies = JSON.parse(fs.readFileSync("./Data/movies.json"));

const app = express();

app.use(express.json());

const PORT = 3000;

app.get("/api/v1/movies", (req, res) => {
  res.status(200).json({
    status: "Success",
    noOfMovies: movies.length,
    data: { movies: movies },
  });
});

app.post("/api/v1/movies", (req, res) => {
  const newId = movies[movies.length - 1].id + 1;
  console.log(newId);
  const newMovie = Object.assign({ id: newId }, req.body);
  movies.push(newMovie);
  fs.writeFile("./Data/movies.json", JSON.stringify(movies), () => {
    res.status(201).json({
      status: "New Movie Created",
      data: {
        created: newMovie,
      },
    });
  });
});


// app.get("/api/v1/movies/:id" ,(req,res)=>{

//     const id=req.params.id*1

//     let selectedMovie=movies.find((element)=>element.id===id)

//     res.status(200).json({
//         status:"Success",
//         movie:selectedMovie
//     })
// })


app.get("/api/v1/movies/:id", (req, res) => {
    const id = req.params.id * 1; // Convert id from string to number
  
    // Find the movie with the specified id
    const selectedMovie = movies.find((element) => element.id === id);
  
    // Send a 404 error if no movie is found with the given id
    if (!selectedMovie) {
      return res.status(404).json({
        status: "Fail",
        message: `Movie with ID=${id} not found`
      });
    }
  
    // Send a success response with the selected movie
    res.status(200).json({
      status: "Success",
      movie: selectedMovie
    });
  });
  

app.listen(PORT, "127.0.0.1", () => {
  console.log("Server is running..... on PORT: ", PORT);
});
