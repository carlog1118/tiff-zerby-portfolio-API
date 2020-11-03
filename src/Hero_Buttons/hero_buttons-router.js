const express = require("express");
const hero_buttonsRouter = express.Router();
const Hero_ButtonsService = require("./hero_buttons-service");
const { requireAuth } = require("../Middleware/jwt-auth");
const errorHandler = require("../error-handler");
const jsonParser = express.json();

hero_buttonsRouter.route("/api/buttons").get((req, res) => {
  const knexInstance = req.app.get("db");
  Hero_ButtonsService.getAllButtons(knexInstance)
    .then((buttons) => {
      res.json(buttons);
    })
    .catch(errorHandler);
});

hero_buttonsRouter
  .route("/api/buttons/:id")
  .get((req, res) => {
    const knexInstance = req.app.get("db");
    const id = req.params.id;
    Hero_ButtonsService.getById(knexInstance, id)
      .then((button) => {
        res.json(button);
      })
      .catch(errorHandler);
  })
  .patch(requireAuth, jsonParser, (req, res) => {
    const knexInstance = req.app.get("db");
    const { name } = req.body;
    
    const updatedButton = { name };

    const numberOfValues = Object.values(updatedButton).filter(Boolean).length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `request body must contain at least one of the fields.`,
        },
      });
    }

    Hero_ButtonsService.updateButton(knexInstance, req.params.id, updatedButton)
      .then(res.status(204).end())
      .catch(errorHandler);
  });

module.exports = hero_buttonsRouter;
