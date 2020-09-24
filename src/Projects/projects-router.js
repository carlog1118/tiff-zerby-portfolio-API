const express = require("express");
const projectsRouter = express.Router();
const ProjectsService = require("./projects-service");
const errorHandler= require("../error-handler");
//const bodyParser = express.json();

projectsRouter
  .route("/projects")
  .get((req, res) => {
    const knexInstance = req.app.get("db")
    ProjectsService.getAllProjects(knexInstance)
      .then(projects => {
        res.json(projects)
      })
      .catch(errorHandler)
  })
  //.post((req, res) => {/*code*/})

module.exports = projectsRouter;