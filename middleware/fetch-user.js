const bcrypt = require('bcrypt');

const Users = require('../models/Users.js');

/** @type {(request: import('express').Request, next: import('express').NextFunction, user: object | null) => any} */
async function setUser(request, next, user) {
  request.user = user;
  next();
}

/** @type {import("express").RequestHandler} */
module.exports = async function fetchUser(request, _, next) {
  const { username } = request.session;

  if (!username) return setUser(request, next, null);

  try {
    return setUser(request, next, (await Users.get(username))?.props ?? null);
  } catch (e) {
    console.error(e);
    setUser(request, next, null);
    return next(e);
  }
};
