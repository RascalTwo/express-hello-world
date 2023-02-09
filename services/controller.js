const furredService = require('./furred/service.js');
const realtimeService = require('./realtime/service.js');

module.exports = {
  /** @type {import('express').RequestHandler} */
  async randomizeFurredAndNotify(_, response) {
    const newFurred = await furredService.randomizeCurrentFurred();
    await realtimeService.publish('furred', { name: 'current', data: newFurred });
    return response.json(newFurred);
  },
};
