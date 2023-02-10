const furredService = require('./furred/service.js');
const realtimeService = require('./realtime/service.js');

const Favorites = require('../models/Favorites.js');
const Furred = require('../models/Furred.js');

module.exports = {
  /** @type {import('express').RequestHandler} */
  async randomizeFurredAndNotify(_, response) {
    const newFurred = await furredService.randomizeCurrentFurred();
    await realtimeService.publish('furred', { name: 'current', data: newFurred });
    return response.json(newFurred);
  },
  /** @type {import('express').RequestHandler} */
  renderIndex(_, response) {
    return response.render('index');
  },
  /** @type {import('express').RequestHandler} */
  renderSignup(_, response) {
    return response.render('signup');
  },
  /** @type {import('express').RequestHandler} */
  renderSignin(_, response) {
    return response.render('signin');
  },
  /** @type {import('express').RequestHandler} */
  async renderFavorites(request, response) {
    const username = request.params.username ?? request.user?.username;
    if (!username) {
      if ('username' in request.params) request.flash('error', 'User not found.');
      return response.redirect('/signin');
    }

    const favorites = [];
    for (const id of (await Favorites.get(username))?.props.ids || []) {
      const furred = await Furred.get(id);
      if (furred)
        favorites.push({
          id,
          ...furred.props,
        });
    }

    const currentUserFavorites = [];
    if (request.user) {
      if (request.user.username !== username) {
        for (const id of (await Favorites.get(request.user.username))?.props.ids || []) {
          const furred = await Furred.get(id);
          if (furred)
            currentUserFavorites.push({
              id,
              ...furred.props,
            });
        }
      } else {
        for (const furred of favorites) {
          currentUserFavorites.push({
            ...furred,
          });
        }
      }
    }

    return response.render('favorites', { favorites, currentUserFavorites });
  },
};
