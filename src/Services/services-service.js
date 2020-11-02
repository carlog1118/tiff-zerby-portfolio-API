const ServicesService = {
  getAllServices(knex) {
    return knex.select("*").from("services");
  },
  getById(knex, id) {
    return knex
    .from('services')
    .select('*')
    .where('id', id)
    .first()
  },
  insertServ(knex, newServ) {
    return knex
      .insert(newServ)
      .into('services')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  deleteServ(knex, id) {
    return knex('services')
      .where({ id })
      .delete()
  },
  updateServ(knex, id, updatedFields) {
    return knex('services')
      .where({ id })
      .update(updatedFields)
  }
};

module.exports = ServicesService;
