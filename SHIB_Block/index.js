
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const router = require ("./router/routes");

const app = express();
// we use JSON  for making API
app.use(bodyParser.json())

const port = process.env.port

// we use JSON  for making API
app.use(express.json())

// Load Routes
app.use("/user", router)

//set app port
app.listen(3333, () => {
  console.log(`SHIB server listening at http://localhost:${3333}`);
});