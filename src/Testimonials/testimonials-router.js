const express = require("express");
const testimonialsRouter = express.Router();
const TestimonialsService = require("./testimonials-service");
const errorHandler = require("../error-handler");
//const bodyParser = express.json();

testimonialsRouter.route("/api/testimonials").get((req, res) => {
  const knexInstance = req.app.get("db");
  TestimonialsService.getAllTestimonials(knexInstance)
    .then((testimonials) => {
      res.json(testimonials);
    })
    .catch(errorHandler);
});
//.post((req, res) => {/*code*/})

module.exports = testimonialsRouter;
