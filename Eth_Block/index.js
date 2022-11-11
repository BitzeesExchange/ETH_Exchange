
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const router = require ("./routes/userRoutes");

const app = express();
// we use JSON  for making API
app.use(bodyParser.json())

const port = process.env.port

// we use JSON  for making API
app.use(express.json())

// Load Routes
app.use("/user", router)

//set app port
app.listen(port, () => {
  console.log(`ETHEREUM server listening at http://localhost:${port}`);
});