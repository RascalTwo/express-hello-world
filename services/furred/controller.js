const service = require('./service.js');

module.exports = {
  /** @type {import('express').RequestHandler} */
  async getCurrent(_, response) {
    return response.json(await service.getCurrentFurred());
  },
  /** @type {import('express').RequestHandler} */
  async randomize(_, response) {
    response.json(await service.randomizeCurrentFurred());
  },
};
