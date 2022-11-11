
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routers/router");
const app = express();
// we use JSON  for making API
app.use(bodyParser.json())


const port = process.env.port

// we use JSON  for making API
app.use(express.json())
app.use('/user',router)
// Load Routes

//set app port
app.listen(2222, () => {
  console.log(`USDT server listening at http://localhost:${2222}`);
});


