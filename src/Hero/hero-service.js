const HeroService = {
  getHero(knex) {
    return knex.select('*').from('hero');
  },
};

module.exports = HeroService;
