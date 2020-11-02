const express = require("express");
const servicesRouter = express.Router();
const ServicesService = require("./services-service");
const errorHandler = require("../error-handler");
const jsonParser = express.json();

servicesRouter
  .route("/api/services")
  .get((req, res) => {
    const knexInstance = req.app.get("db");
    ServicesService.getAllServices(knexInstance)
      .then((services) => {
        res.json(services);
      })
      .catch(errorHandler);
  })
  .post(jsonParser, (req, res) => {
    const { name, description } = req.body;
    const newServ = { name, description };
    const knexInstance = req.app.get("db");
    ServicesService.insertServ(knexInstance, newServ)
      .then((serv) => {
        res.status(201).location(`/testimonials/${serv.id}`).json(serv);
      })
      .catch(errorHandler);
  });

servicesRouter
  .route("/api/services/:id")
  .get((req, res) => {
    const knexInstance = req.app.get("db");
    const id = req.params.id;
    ServicesService.getById(knexInstance, id)
      .then((serv) => {
        res.json(serv);
      })
      .catch(errorHandler);
  })
  .delete((req, res) => {
    const knexInstance = req.app.get("db");
    const id = req.params.id;
    ServicesService.deleteServ(knexInstance, id)
      .then(() => {
        res.status(204).end();
      })
      .catch(errorHandler);
  })
  .patch(jsonParser, (req, res) => {
    const knexInstance = req.app.get("db");
    const { name, description } = req.body;
    const updatedServ = { name, description };

    const numberOfValues = Object.values(updatedServ).filter(Boolean).length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `request body must contain at least one of the fields.`,
        },
      });
    }

    ServicesService.updateServ(knexInstance, req.params.id, updatedServ)
      .then(res.status(204).end())
      .catch(errorHandler);
  });

module.exports = servicesRouter;
