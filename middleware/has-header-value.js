module.exports = function hasHeaderValue(header, expectedValue, responseCode = 401, responseMessage = 'Unauthorized') {
	/** @type {import('express').RequestHandler} */
	return function hasHeaderValueMiddleware(request, response, next) {
		if (request.header(header) !== expectedValue) {
			return response.status(responseCode).send(responseMessage);
		}
		next();
	};
}
