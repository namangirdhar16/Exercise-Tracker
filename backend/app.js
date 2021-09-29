const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const exerciseRouter = require("./routes/exercise");
const cookieParser = require("cookie-parser");
// database connection
const connectDB = require("./config/db");


// configuring dotenv file
require("dotenv").config({ path: "./config/config.env"});

const app = express();
const PORT = 3001 || process.env.PORT;

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/exercises", exerciseRouter);
app.use("/users", userRouter);

connectDB();

app.listen(PORT, () => {
    console.log(`Server in up and running on port: ${PORT}`);
})
