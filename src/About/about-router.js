const express = require("express");
const aboutRouter = express.Router();
const AboutService = require("./about-service");
const errorHandler= require("../error-handler");
//const bodyParser = express.json();

aboutRouter
  .route("/api/about")
  .get((req, res) => {
    const knexInstance = req.app.get("db")
    AboutService.getAbout(knexInstance)
      .then(about => {
        res.json(about)
      })
      .catch(errorHandler)
  })
  //.post((req, res) => {/*code*/})

module.exports = aboutRouter;