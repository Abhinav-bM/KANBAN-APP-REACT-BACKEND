const express = require("express");
const mongoDB = require("./config/db")
const bodyParser = require("body-parser")
const userRouter = require('./routes/userRouter')
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config();


const app = express();

app.use(cors())


mongoDB()

app.use('/',userRouter)

app.use(bodyParser.json())
app.use(cookieParser())

const port = process.env.PORT


app.listen(port, () => {
  console.log(`Backend running on port. ${port}`);
});