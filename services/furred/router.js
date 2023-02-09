const router = require('express').Router();
const controller = require('./controller.js');
const hasHeaderValue = require('../../middleware/has-header-value.js');

router.get('/current', controller.getCurrent);

router.get('/randomize', hasHeaderValue('x-furred-secret', process.env.RANDOMIZE_FURRED_SECRET), controller.randomize);

module.exports = router;
