const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const AboutService = require("../src/About/about-service");
const { makeAboutArray } = require("./about.fixtures");

describe("About service object", function () {
  let db;
  const testAbout = makeAboutArray();

  before(() => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db);
  });

  before("clean table", () => db("about").truncate());
  afterEach("cleanup", () => db("about").truncate());

  before(() => {
    return db.into("about").insert(testAbout);
  });

  after(() => db.destroy());

  it("resolves about from 'about' table", () => {
    return AboutService.getAbout(db).then((actual) => {
      expect(actual).to.eql(testAbout);
    });
  });
});
