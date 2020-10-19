const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const ServicesService = require("../src/Services/services-service");
const { makeServicesArray } = require("./services-fixtures");

describe("Services service object", function () {
  let db;
  const testServices = makeServicesArray();

  before(() => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db);
  });

  before("clean table", () => db("services").truncate());
  afterEach("cleanup", () => db("services").truncate());

  before(() => {
    return db.into("services").insert(testServices);
  });

  after(() => db.destroy());

  it("resolves all services from 'services' table", () => {
    return ServicesService.getAllServices(db).then((actual) => {
      expect(actual).to.eql(testServices);
    });
  });
});
