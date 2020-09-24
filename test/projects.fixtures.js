function makeProjectsArray() {
  return [
    {
      id: 1,
      name: "First Project",
      client: "First Client",
      description: "First Description",
    },
    {
      id: 2,
      name: "Second Project",
      client: "Second Client",
      description: "Second Description",
    },
    {
      id: 3,
      name: "Third Project",
      client: "Third Client",
      description: "Third Description",
    },
  ];
}

module.exports = {
  makeProjectsArray,
};
