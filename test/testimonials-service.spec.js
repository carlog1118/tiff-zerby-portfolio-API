const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const TestimonialsService = require("../src/Testimonials/testimonials-service");
const { makeTestimonialsArray } = require("./testimonials.fixtures");

describe("Testimonials service object", function () {
  let db;
  const testTestimonials = makeTestimonialsArray();

  before(() => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db)
  });

  before("clean table", () => db('testimonials').truncate());
  afterEach("cleanup", () => db('testimonials').truncate());

  before(() => {
    return db.into("testimonials").insert(testTestimonials);
  });

  after(() => db.destroy());

  it("resolves all testimonials from 'testimonials' table", () => {
    return TestimonialsService.getAllTestimonials(db)
      .then(actual => {
        expect(actual).to.eql(testTestimonials)
      })
  });
});
