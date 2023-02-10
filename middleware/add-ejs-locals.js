/** @type {import("express").RequestHandler} */
module.exports = function addEJSLocals(request, response, next) {
  response.locals.user = request.user;
  response.locals.url = request.url;
  next();
};
