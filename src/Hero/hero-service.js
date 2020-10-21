const HeroService = {
  getHero(knex) {
    return knex.select('*').from('hero');
  },
  updateHero(knex, id, updatedHero) {
    return knex('hero')
      .where({ id })
      .update(updatedHero)
  },
};

module.exports = HeroService;
