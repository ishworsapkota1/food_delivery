const express = require("express");
require("dotenv").config();
require("./database/connection");



// import routes


// ///////////////////////
const app = express();
const port = process.env.PORT || 2000;

app.listen(port, () => {
  console.log(`App is running ${port}`);
});
