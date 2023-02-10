/** @type {import("express").RequestHandler} */
module.exports = function requireUser(request, response, next) {
  return request.user ? next() : response.status(401).end();
};
