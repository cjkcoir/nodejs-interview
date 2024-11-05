const express = require("express"); // Importing the Express framework
const app = express(); // Initializing the Express application
const PORT = 5001; // Defining the port number the server will listen on
const router = express.Router(); // Creating a router object to handle routes

app.use(express.json()); // Middleware to parse JSON data from incoming requests
app.use("/api/v1/users", router); // Mounting the router on the "/api/v1/users" path


console.log(app.get("env"));
console.log(app.get(process.env));


const fakeAuth = (req, res, next) => {
  let authStatus = true;
  if (authStatus) {
    console.log(`Auth stattus = ${authStatus}`);
    next();
  } else {
    res.status(404).json({
      status: "Failure",
      message: "User Authentication Failed",
    });
  }
};

// Handler function for GET requests
const getAllUsers = (req, res) => {
  res.status(200).json({
    message: "Getting all the Users",
  });
};

// Handler function for POST requests
const createUser = (req, res) => {
  console.log("Create a User");
  res.status(200).json({
    message: "creating a new User",
  });
};

// Application level middleware for logging
const loggerMiddleware = (req, res, next) => {
  console.log("Custom Middleware Called...");
  console.log(
    `${new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    })} ----- RequestType: ${req.method} ----- URL: ${req.originalUrl}`
  );
  next(); // Continue to the next middleware
};

app.use(loggerMiddleware); // Adding the logging middleware to the application

router.use(fakeAuth);

// Defining routes on the router object
router.route("/").get(getAllUsers).post(createUser);

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).json({
    status: "Error",
    message: "Something went wrong!",
  });
};

app.use(errorHandler); // Adding the error handler middleware

// Starting the server
app.listen(PORT, () => {
  console.log("Server is running at PORT: ", PORT);
});
