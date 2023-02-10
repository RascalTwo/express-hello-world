const service = require('./service.js');
const Favorites = require('../../models/Favorites.js');
const Furred = require('../../models/Furred.js');
const { startOfThird } = require('../../functions.js');

/**
 * @param {import('express').Request} request
 * @returns {string}
 */
function getIdOfFavorite(request) {
  return request.params.id ?? startOfThird().toISOString();
}

/**
 * @param {string} username
 */
async function getCurrentFavorites(username) {
  return (
    (await Favorites.get(username))?.props ?? {
      ids: [],
    }
  );
}

module.exports = {
  /** @type {import('express').RequestHandler} */
  async getCurrent(_, response) {
    return response.json(await service.getCurrentFurred());
  },
  /** @type {import('express').RequestHandler} */
  async randomize(_, response) {
    response.json(await service.randomizeCurrentFurred());
  },
  async favorite(request, response) {
    const id = getIdOfFavorite(request);
    const favorites = await getCurrentFavorites(request.user.username);

    favorites.ids.push(id);
    if (!(await Furred.get(id))) {
      await Furred.set(id, await service.getCurrentFurred());
    }

    delete favorites.created;
    delete favorites.updated;
    await Favorites.set(request.user.username, favorites);

    return response.redirect(request.query.returnTo ?? '/');
  },
  async unfavorite(request, response) {
    const id = getIdOfFavorite(request);
    const favorites = await getCurrentFavorites(request.user.username);

    const index = favorites.ids.indexOf(id);
    if (index === -1) {
      request.flash('error', 'You have not favorited this furred yet.');
    } else {
      favorites.ids.splice(index, 1);

      delete favorites.created;
      delete favorites.updated;
      await Favorites.set(request.user.username, favorites);

      request.flash('success', 'Furred unfavorited.');
    }

    return response.redirect(request.query.returnTo ?? '/');
  },
};
