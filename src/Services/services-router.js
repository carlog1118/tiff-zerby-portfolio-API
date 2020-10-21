const express = require("express");
const servicesRouter = express.Router();
const ServicesService = require("./services-service");
const errorHandler = require("../error-handler");
//const bodyParser = express.json();

servicesRouter.route("/api/services").get((req, res) => {
  const knexInstance = req.app.get("db");
  ServicesService.getAllServices(knexInstance)
    .then((services) => {
      res.json(services);
    })
    .catch(errorHandler);
});
//.post((req, res) => {/*code*/})

module.exports = servicesRouter;
