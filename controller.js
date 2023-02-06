const router = require('express').Router();
const bird = require('./bird.js');

router.get('/current', async (_, response) => {
	return response.json(await bird.getCurrentBird());
});

router.get('/randomize', async (request, response) => {
	if (request.header('x-bird-secret') !== '123') {
		return response.status(401).send('Unauthorized');
	}
	response.json(await bird.randomizeBird());
});

module.exports = router;
