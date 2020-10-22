const TestimonialsService = {
  getAllTestimonials(knex) {
    return knex.select("*").from("testimonials");
  },
  insertTest(knex, newTest) {
    return knex
      .insert(newTest)
      .into('testimonials')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  }
};

module.exports = TestimonialsService;
