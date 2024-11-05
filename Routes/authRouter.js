const express = require("express"); // Import Express for creating the server.
const usersController = require("./../Controllers/usersController");

const router = express.Router(); // Create a router instance

router.route("/signup").post(usersController.signup);
router.route("/login").post(usersController.login);

module.exports=router
