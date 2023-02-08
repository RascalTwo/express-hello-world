const router = require('express').Router();

const birdRouter = require('./bird/router.js');
const realtimeRouter = require('./realtime/router.js');

const controller = require('./controller.js');

const hasHeaderValue = require('../middleware/has-header-value.js');

router.use('/bird', birdRouter);
router.use('/realtime', realtimeRouter);
router.get(
  '/randomizeBirdAndNotify',
  hasHeaderValue('x-bird-notify-secret', process.env.RANDOMIZE_BIRD_AND_NOTIFY_SECRET),
  controller.randomizeBirdAndNotify,
);

module.exports = router;
