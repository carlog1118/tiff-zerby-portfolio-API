const TestimonialsService = {
  getAllTestimonials(knex) {
    return knex.select("*").from("testimonials");
  },
};

module.exports = TestimonialsService;
