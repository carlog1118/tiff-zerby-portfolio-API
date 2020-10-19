require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const errorHandler = require("./error-handler");
const projectsRouter = require('./Projects/projects-router');
const testimonialsRouter = require('./Testimonials/testimonials-router');
const heroRouter = require('./Hero/hero-router');

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "dev";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(projectsRouter);
app.use(testimonialsRouter);
app.use(heroRouter);

app.use(errorHandler);

module.exports = app;
