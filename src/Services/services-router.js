const express = require("express");
const servicesRouter = express.Router();
const ServicesService = require("./services-service");
const errorHandler = require("../error-handler");
const jsonParser = express.json();

servicesRouter.route("/api/services").get((req, res) => {
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
  })

module.exports = servicesRouter;
