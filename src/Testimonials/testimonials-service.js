const TestimonialsService = {
  getAllTestimonials(knex) {
    return knex.select("*").from("testimonials");
  },
  getById(knex, id) {
    return knex
    .from('testimonials')
    .select('*')
    .where('id', id)
    .first()
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
