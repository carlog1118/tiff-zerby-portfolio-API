const express = require('express');
const projectsRouter = express.Router();
const { projects } = require('../STORE');
//const bodyParser = express.json();

projectsRouter
  .route("/projects")
  .get((req, res) => {
    res.json(projects);
  })
  //.post((req, res) => {/*code*/})

module.exports = projectsRouter;