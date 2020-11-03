const express = require("express");
const projectsRouter = express.Router();
const ProjectsService = require("./projects-service");
const errorHandler = require("../error-handler");
const { requireAuth } = require("../Middleware/jwt-auth");
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
  .post(requireAuth, jsonParser, (req, res) => {
    const { name, client, description, image_url } = req.body;
    const newProject = { name, client, description, image_url };
    const knexInstance = req.app.get("db");

    ProjectsService.insertProject(knexInstance, newProject)
      .then((project) => {
        res.status(201).location(`/projects/${project.id}`).json(project);
      })
      .catch(errorHandler);
  });

projectsRouter
  .route("/api/projects/:id")
    .get((req, res) => {
      const knexInstance = req.app.get("db");
      const id = req.params.id;
      ProjectsService.getById(knexInstance, id)
        .then((project) => {
          res.json(project)
        })
        .catch(errorHandler);
    })
    .delete(requireAuth, (req, res) => {
    const knexInstance = req.app.get("db");
    const id = req.params.id;
    ProjectsService.deleteProject(knexInstance, id)
      .then(() => {
        res.status(204).end();
      })
      .catch(errorHandler);
    })
    .patch(requireAuth,jsonParser, (req, res) => {
      const knexInstance = req.app.get("db");
      const { name, client, description, image_url } = req.body;
      const updatedProject = { name, client, description, image_url }
      
      const numberOfValues = Object.values(updatedProject).filter(Boolean).length;
      if(numberOfValues === 0) {
        return res.status(400).json({
            error: {
                message: `request body must contain at least one of the fields.`
            }
        });
      };

      ProjectsService.updateProject(knexInstance, req.params.id, updatedProject)
        .then(res.status(204).end())
        .catch(errorHandler)
    })

module.exports = projectsRouter;
