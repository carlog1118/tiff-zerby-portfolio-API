const Hero_ButtonsService = {
  getAllButtons(knex) {
    return knex.select('*').from('hero_buttons')
  },
  getById(knex, id) {
    return knex
      .from('hero_buttons')
      .select('*')
      .where('id', id)
      .first()
  },
  updateButton(knex, id, updatedFields) {
    return knex('hero_buttons')
      .where({ id })
      .update(updatedFields)
  }
}

module.exports = Hero_ButtonsService;