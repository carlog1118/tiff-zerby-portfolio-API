const express = require("express");
const testimonialsRouter = express.Router();
const TestimonialsService = require("./testimonials-service");
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
  .post(jsonParser, (req, res) => {
    const { client, quote, author } = req.body;
    const newTest = { client, quote, author };
    const knexInstance = req.app.get("db");
    TestimonialsService.insertTest(knexInstance, newTest)
      .then((test) => {
        res.status(201).location(`/testimonials/${test.id}`).json(test);
      })
      .catch(errorHandler);
  });

testimonialsRouter.route("/api/testimonials/:id").delete((req, res) => {
  const knexInstance = req.app.get("db");
  const id = req.params.id;
  TestimonialsService.deleteTest(knexInstance, id)
    .then(() => {
      res.status(204).end();
    })
    .catch(errorHandler);
});

module.exports = testimonialsRouter;
