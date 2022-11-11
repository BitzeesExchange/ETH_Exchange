
    const express = require("express");
    const bodyParser = require("body-parser");
    const router = require("./ROUTER/routes");
    const app = express();
    // we use JSON  for making API
    app.use(bodyParser.json())
    
    
    const port = process.env.port
    
    // we use JSON  for making API
    app.use(express.json())
    app.use('/user',router)
    // Load Routes
    
    //set app port
    app.listen(4444, () => {
      console.log(`WBTC server listening at http://localhost:${4444}`);
    });
    
    
    