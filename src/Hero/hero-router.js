const express = require("express");
const heroRouter = express.Router();
const HeroService = require("./hero-service");
const errorHandler= require("../error-handler");
//const bodyParser = express.json();

heroRouter
  .route("/hero")
  .get((req, res) => {
    const knexInstance = req.app.get("db")
    HeroService.getHero(knexInstance)
      .then(hero => {
        res.json(hero)
      })
      .catch(errorHandler)
  })
  //.post((req, res) => {/*code*/})

module.exports = heroRouter;