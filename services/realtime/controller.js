const service = require('./service.js');

module.exports = {
  /** @type {import('express').RequestHandler} */
  async getInfo(_, response) {
    return response.json({ readKey: process.env.ABLY_READ_KEY });
  },
};
