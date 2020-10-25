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
  },
  deleteTest(knex, id) {
    return knex('testimonials')
      .where({ id })
      .delete()
  },
  updateTest(knex, id, updatedFields) {
    return knex('testimonials')
      .where({ id })
      .update(updatedFields)
  }
};

module.exports = TestimonialsService;
