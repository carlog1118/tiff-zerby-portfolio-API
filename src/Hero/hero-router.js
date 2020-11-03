const express = require("express");
const heroRouter = express.Router();
const HeroService = require("./hero-service");
const { requireAuth } = require("../Middleware/jwt-auth");
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

heroRouter
  .route("/api/hero/:id")
  .all(requireAuth)
  .patch(jsonParser, (req, res) => {
    const knexInstance = req.app.get("db");
    const { content, image_url } = req.body;
    const updatedHero = { content, image_url };

    if (!updatedHero.content) {
      return res.status(400).json({
        error: {
          message: "Hero must contain some content.",
        },
      });
    }

    console.log(updatedHero);

    HeroService.updateHero(knexInstance, req.params.id, updatedHero)
      .then(() => {
        res.status(204).end();
      })
      .catch(errorHandler);
  });

module.exports = heroRouter;
