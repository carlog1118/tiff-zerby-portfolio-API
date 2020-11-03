const express = require("express");
const testimonialsRouter = express.Router();
const TestimonialsService = require("./testimonials-service");
const { requireAuth } = require("../Middleware/jwt-auth");
const errorHandler = require("../error-handler");
const jsonParser = express.json();

testimonialsRouter
  .route("/api/testimonials")
  .get((req, res) => {
    const knexInstance = req.app.get("db");
    TestimonialsService.getAllTestimonials(knexInstance)
      .then((testimonials) => {
        res.json(testimonials);
      })
      .catch(errorHandler);
  })
  .post(requireAuth, jsonParser, (req, res) => {
    const { client, quote, author } = req.body;
    const newTest = { client, quote, author };
    const knexInstance = req.app.get("db");
    TestimonialsService.insertTest(knexInstance, newTest)
      .then((test) => {
        res.status(201).location(`/testimonials/${test.id}`).json(test);
      })
      .catch(errorHandler);
  });

testimonialsRouter.route("/api/testimonials/:id")
  .all(requireAuth)
  .get((req, res) => {
    const knexInstance = req.app.get("db");
    const id = req.params.id;
    TestimonialsService.getById(knexInstance, id)
      .then((test) => {
        res.json(test)
      })
      .catch(errorHandler);
  })
  .delete((req, res) => {
    const knexInstance = req.app.get("db");
    const id = req.params.id;
    TestimonialsService.deleteTest(knexInstance, id)
      .then(() => {
        res.status(204).end();
      })
      .catch(errorHandler);
  })
  .patch(jsonParser,(req, res) => {
    const knexInstance = req.app.get("db")
    const { client, quote, author } = req.body;
    const updatedTest = { client, quote, author }

    const numberOfValues = Object.values(updatedTest).filter(Boolean).length;
    if(numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `request body must contain at least one of the fields.`
        }
      });
    };

    TestimonialsService.updateTest(knexInstance, req.params.id, updatedTest)
      .then(res.status(204).end())
      .catch(errorHandler)
  })

module.exports = testimonialsRouter;
