const express = require("express");
const fs = require("fs");

const members = JSON.parse(fs.readFileSync("./Data/members.json"));

const app = express();

const PORT =5000;

app.get("/api/v1/members", (req, res) => {
  res
    .status(200)
    .json({
      status: "Success",
      noOfMembers: members.length,
      data: { members: members },
    });
});

app.listen(PORT, "127.0.0.1", () => {
  console.log("Server is running..... on PORT: ", PORT);
});
