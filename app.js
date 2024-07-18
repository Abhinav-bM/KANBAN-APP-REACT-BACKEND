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
app.use(cors({ origin: "https://kanban-app-react-frontend.vercel.app", credentials: true }));

app.use(bodyParser.json());
app.use(cookieParser());

// ROUTES
app.use("/", userRouter);

// START SERVER
const port = 3001;
app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
