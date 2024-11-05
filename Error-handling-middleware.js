const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 3000;

const errorCreatingMiddleware = (req, res, next) => {
  console.log("Error Created");

  next(new Error("error created by our own middleware"));
};

//Error handling middleware

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    status: "Error",

    message: "Something went wrong!",
  });
};

const app = express();

app.use(express.json());

app.use(errorCreatingMiddleware);
app.use(errorHandler);

// Start server and listen on specified port

app.listen(PORT, "127.0.0.1", () => {
  console.log("Server is running..... on PORT: ", PORT);
});
