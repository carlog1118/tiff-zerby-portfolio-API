require("dotenv").config();
const { NODE_ENV } = require('./config')
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const errorHandler = require("./error-handler");
const projectsRouter = require('./Projects/projects-router');
const testimonialsRouter = require('./Testimonials/testimonials-router');
const heroRouter = require('./Hero/hero-router');
const aboutRouter = require('./About/about-router');
const hero_buttonsRouter = require('./Hero_Buttons/hero_buttons-router');
const authRouter = require('./Auth/auth-router');
const servicesRouter = require('./Services/services-router');

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "dev";

app.use(morgan(morganOption));
app.use(express.json())
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(projectsRouter);
app.use(testimonialsRouter);
app.use(heroRouter);
app.use(aboutRouter);
app.use(servicesRouter);
app.use(authRouter);
app.use(hero_buttonsRouter);


app.use(errorHandler);

module.exports = app;
