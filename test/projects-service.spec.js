const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const ProjectsService = require("../src/Projects/projects-service");
const { makeProjectsArray } = require("./projects.fixtures");

describe("Projects service object", function () {
  let db;
  const testProjects = makeProjectsArray();

  before(() => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db);
  });

  before("clean table", () => db("projects").truncate());
  afterEach("cleanup", () => db("projects").truncate());

  before(() => {
    return db.into("projects").insert(testProjects);
  });

  after(() => db.destroy());

  it("resolves all projects from 'projects' table", () => {
    return ProjectsService.getAllProjects(db).then((actual) => {
      expect(actual).to.eql(testProjects);
    });
  });
});
