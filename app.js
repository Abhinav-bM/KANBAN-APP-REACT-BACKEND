const express = require("express");
const mongoDB = require("./config/db");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRouter");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// CONNECT TO MONGODB
mongoDB();

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// ROUTES
app.use("/", userRouter);

// START SERVER
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
