const AboutService = {
  getAbout(knex) {
    return knex.select('*').from('about');
  },
  updateAbout(knex, id, updatedAbout) {
    return knex('about')
      .where({ id })
      .update(updatedAbout)
  },
};

module.exports = AboutService;
