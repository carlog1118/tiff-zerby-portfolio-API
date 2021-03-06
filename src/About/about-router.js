const express = require("express");
const aboutRouter = express.Router();
const AboutService = require("./about-service");
const { requireAuth } = require("../Middleware/jwt-auth");
const errorHandler = require("../error-handler");
const jsonParser = express.json();

aboutRouter.route("/api/about").get((req, res) => {
  const knexInstance = req.app.get("db");
  AboutService.getAbout(knexInstance)
    .then((about) => {
      res.json(about);
    })
    .catch(errorHandler);
});

aboutRouter
  .route("/api/about/:id")
  .all(requireAuth)
  .patch(jsonParser, (req, res) => {
    const knexInstance = req.app.get("db");
    const { about_text, image_url } = req.body;
    const updatedAbout = { about_text, image_url };

    if (!updatedAbout.about_text) {
      return res.status(400).json({
        error: {
          message: "About must contain some content.",
        },
      });
    }

    AboutService.updateAbout(knexInstance, req.params.id, updatedAbout).then(
      () => {
        res.status(204).end();
      }
    );
  });

module.exports = aboutRouter;
