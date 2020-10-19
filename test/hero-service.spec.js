const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const HeroService = require("../src/Hero/hero-service");
const { makeHeroArray } = require("./hero.fixtures");

describe("Hero service object", function () {
  let db;
  const testHero = makeHeroArray();

  before(() => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db);
  });

  before("clean table", () => db("hero").truncate());
  afterEach("cleanup", () => db("hero").truncate());

  before(() => {
    return db.into("hero").insert(testHero);
  });

  after(() => db.destroy());

  it("resolves hero from 'hero' table", () => {
    return HeroService.getHero(db).then((actual) => {
      expect(actual).to.eql(testHero);
    });
  });
});
