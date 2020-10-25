const ProjectsService = {
  getAllProjects(knex) {
    return knex.select('*').from('projects');
  },
  insertProject(knex, newProject) {
    return knex
      .insert(newProject)
      .into('projects')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  deleteProject(knex, id) {
    return knex('projects')
      .where({ id })
      .delete()
  }
};

module.exports = ProjectsService;
