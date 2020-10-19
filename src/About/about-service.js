const AboutService = {
  getAbout(knex) {
    return knex.select('*').from('about');
  },
};

module.exports = AboutService;
