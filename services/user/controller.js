const Favorites = require('../../models/Favorites.js');
const Users = require('../../models/Users.js');
const { startOfThird } = require('../../functions.js');
const bcrypt = require('bcrypt');

module.exports = {
  /** @type {import("express").RequestHandler} */
  async signin(request, response, next) {
    const { username, password } = request.body;
    try {
      const user = await Users.get(username);
      if (!user || !(await bcrypt.compare(password, user.props.password))) {
        request.flash('error', 'Invalid credentials.');
        return response.redirect('/');
      }

      return request.session.regenerate(err => {
        if (err) return next(err);

        request.session.username = user.props.username;
        request.flash('success', 'Signed in successfully!');
        return response.redirect('/');
      });
    } catch (e) {
      console.error(e);
      return next(e);
    }
  },
  async signup(request, response, next) {
    const { username, password } = request.body;
    try {
      const existingUser = await Users.get(username);
      if (existingUser) {
        request.flash('error', 'User already exists.');
        return response.redirect('/');
      }

      await Users.set(username, {
        username,
        password: await bcrypt.hash(password, 10),
      });
      return request.session.regenerate(err => {
        if (err) return next(err);

        request.session.username = username;
        request.flash('success', 'Signed up successfully!');
        return response.redirect('/');
      });
    } catch (e) {
      console.error(e);
      next(e);
    }
  },
  signout(request, response) {
    return request.session.regenerate(err => {
      if (err) return next(err);

      request.session.username = null;
      request.flash('success', 'Signed out successfully!');
      return response.redirect('/');
    });
  },
  async getCurrentFurredStatus(request, response) {
    if (!request.user) return response.json(null);

    const key = startOfThird().toISOString();
    const favorites = await Favorites.get(request.user.username);
    if (!favorites) return response.json(false);

    return response.json(favorites.props.ids.includes(key));
  },
};
