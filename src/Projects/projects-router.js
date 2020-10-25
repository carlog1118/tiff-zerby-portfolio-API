const express = require("express");
const projectsRouter = express.Router();
const ProjectsService = require("./projects-service");
const errorHandler = require("../error-handler");
const jsonParser = express.json();

projectsRouter
  .route("/api/projects")
  .get((req, res) => {
    const knexInstance = req.app.get("db");
    ProjectsService.getAllProjects(knexInstance)
      .then((projects) => {
        res.json(projects);
      })
      .catch(errorHandler);
  })
  .post(jsonParser, (req, res) => {
    const { name, client, description } = req.body;
    const newProject = { name, client, description };
    const knexInstance = req.app.get("db");

    ProjectsService.insertProject(knexInstance, newProject)
      .then((project) => {
        res.status(201).location(`/projects/${project.id}`).json(project);
      })
      .catch(errorHandler);
  });

projectsRouter.route("/api/projects/:id").delete((req, res) => {
  const knexInstance = req.app.get("db");
  const id = req.params.id;
  ProjectsService.deleteProject(knexInstance, id)
    .then(() => {
      res.status(204).end();
    })
    .catch(errorHandler);
});

module.exports = projectsRouter;
