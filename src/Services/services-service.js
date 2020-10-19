const ServicesService = {
  getAllServices(knex) {
    return knex.select("*").from("services");
  },
};

module.exports = ServicesService;
