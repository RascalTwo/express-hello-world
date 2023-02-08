const birdService = require('./bird/service.js');
const realtimeService = require('./realtime/service.js');

module.exports = {
  /** @type {import('express').RequestHandler} */
  async randomizeBirdAndNotify(_, response) {
    const newBird = await birdService.randomizeCurrentBird();
    await realtimeService.publish('bird', { name: 'current', data: newBird });
    return response.json(newBird);
  },
};
