const app = require("./user-app"); // Importing the Express application from the specified file
const mongoose = require("mongoose");
const dotenv = require("dotenv"); // Importing the 'dotenv' module to handle environment variables

dotenv.config({ path: "./config.env" }); // Loading environment variables from the 'config.env' file

const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    const conn = await mongoose.connect(process.env.CONN_STR, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected successfully");
    console.log(conn.connections);
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    process.exit(1); // Exit process with failure
  }
};

connectDB();



// const testMovie = new Movie({
//   name: "Interstellar",
//   description: "It is Fiction movie",
//   duration:120,
//   rating: 3.5,
// });

// testMovie.save().then(doc=>console.log(doc)
// ).catch(err=>console.log("Error occured",err)
// )

const PORT = process.env.PORT || 3000; // Defining the server port (use the environment variable PORT or default to 3000)

// console.log(process.env); // Logging all environment variables to the console
// console.log(app.get("env")); // Logging the environment mode set in the Express application (development, production, etc.)

// Start server and listen on specified port
app.listen(PORT, "127.0.0.1", () => {
  console.log("Server is running..... on PORT: ", PORT); // Logging a message to indicate the server is running
});

// Catching unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection", err);
  process.exit(1);
});
