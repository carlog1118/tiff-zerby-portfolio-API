const express = require("express");
const heroRouter = express.Router();
const HeroService = require("./hero-service");
const errorHandler = require("../error-handler");
const jsonParser = express.json();

heroRouter.route("/api/hero").get((req, res) => {
  const knexInstance = req.app.get("db");
  HeroService.getHero(knexInstance)
    .then((hero) => {
      res.json(hero);
    })
    .catch(errorHandler);
});

heroRouter.route("/api/hero/:id").patch(jsonParser, (req, res) => {
  const knexInstance = req.app.get("db");
  const { content } = req.body;
  const updatedHero = { content };

  console.log(updatedHero)

  if(!updatedHero.content){
    return res.status(400).json({
      error: {
        message: 'Hero must contain some content.'
      }
    })
  }
  
  HeroService.updateHero(knexInstance, req.params.id, updatedHero)
    .then(numRowsAffected => {
      res.status(204).end()
    })
    .catch(errorHandler)
    ;
});

module.exports = heroRouter;
