const router = require('express').Router();

const furredRouter = require('./furred/router.js');
const realtimeRouter = require('./realtime/router.js');
const userRouter = require('./user/router.js');

const controller = require('./controller.js');

const hasHeaderValue = require('../middleware/has-header-value.js');

router.get('/', controller.renderIndex);
router.get('/favorites/:username?', controller.renderFavorites);
router.get('/signup', controller.renderSignup);
router.get('/signin', controller.renderSignin);

router.use('/furred', furredRouter);
router.use('/realtime', realtimeRouter);
router.use('/user', userRouter);
router.get(
  '/randomizeFurredAndNotify',
  hasHeaderValue('x-furred-notify-secret', process.env.RANDOMIZE_FURRED_AND_NOTIFY_SECRET),
  controller.randomizeFurredAndNotify,
);

module.exports = router;
