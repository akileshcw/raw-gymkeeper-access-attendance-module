const express = require("express");
const connectDB = require("./config/dbConfig");
const errorHandlers = require("./middleware/errorHandler");
const routes = require("./routes");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();

//Middlewares supporting cors, json, logger, bodyparser and cookieparser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger("dev"));
app.use(bodyParser.json());
dotenv.config();

//Initialize routers
app.use("/api", routes);
app.use(errorHandlers);

//Connect to the database
connectDB();

module.exports = app;
