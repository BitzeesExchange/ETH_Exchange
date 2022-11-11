const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router/routes");
const app = express();
// we use JSON  for making API
app.use(bodyParser.json())


const port = process.env.port

// we use JSON  for making API
app.use(express.json())
app.use('/user',router)
// Load Routes

//set app port
app.listen(6666, () => {
  console.log(`DAI server listening at http://localhost:${6666}`);
});