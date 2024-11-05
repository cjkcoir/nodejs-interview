const express = require("express");

const app = express();

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const ownMiddleware = (req, res, next) => {
  console.log("Custom Middleware Called...");
  next();
};

const ownMiddlewareTwo = (req, res, next) => {
  console.log("Custom Middleware Two Called...");
  next();
};

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(ownMiddleware);
app.use("/example", ownMiddlewareTwo);

app.use(express.static("./Public"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, World!", status: 200 });
});

app.get("/example", (req, res) => {
  res.status(200).json({ message: "Hello, World Programmer!", status: 200 });
});

app.listen(PORT, () => {
  console.log(`server is running on PORT: ${PORT}`);
});
