const app = require("./fourtythree-app"); // Importing the Express application from the specified file

const dotenv = require("dotenv"); // Importing the 'dotenv' module to handle environment variables
dotenv.config({ path: "./config.env" }); // Loading environment variables from the 'config.env' file

const PORT = process.env.PORT || 3000; // Defining the server port (use the environment variable PORT or default to 3000)

console.log(process.env); // Logging all environment variables to the console
console.log(app.get("env")); // Logging the environment mode set in the Express application (development, production, etc.)

// Start server and listen on specified port
app.listen(PORT, "127.0.0.1", () => {
  console.log("Server is running..... on PORT: ", PORT); // Logging a message to indicate the server is running
});
