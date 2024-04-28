const express = require("express");
require("dotenv").config();
require("./database/connection");

// import routes
const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const restroRouter = require("./routes/restroRoutes");

// ///////////////////////

const app = express();
const port = process.env.PORT || 2000;

app.use(express.json());
// use garne
app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", restroRouter);

app.listen(port, () => {
  console.log(`App is running ${port}`);
});
