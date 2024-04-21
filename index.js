const express = require("express");
require("dotenv").config();
require("./database/connection");

// import routes
const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");

// ///////////////////////

const app = express();
const port = process.env.PORT || 2000;

// use garne
app.use("/api", userRouter);
app.use("/categoryrouter", categoryRouter);

app.listen(port, () => {
  console.log(`App is running ${port}`);
});
