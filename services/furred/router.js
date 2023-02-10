const router = require('express').Router();

const controller = require('./controller.js');

const hasHeaderValue = require('../../middleware/has-header-value.js');
const requireUser = require('../../middleware/require-user.js');

router.get('/current', controller.getCurrent);

router.get('/randomize', hasHeaderValue('x-furred-secret', process.env.RANDOMIZE_FURRED_SECRET), controller.randomize);

router.get('/favorite/:id?', requireUser, controller.favorite);
router.get('/unfavorite/:id?', requireUser, controller.unfavorite);

module.exports = router;
