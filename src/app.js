require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const errorHandler = require("./error-handler");
const projectsRouter = require('./Projects/projects-router');

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "dev";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

/*app.post("/", (req, res) => {
  console.log(req.body);
  res.send("A POST Request");
});

app.delete("/user/:userId", (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  res.send("Got it.");
});*/

app.use(projectsRouter);

app.use(errorHandler);

module.exports = app;
