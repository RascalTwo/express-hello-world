const router = require('express').Router();

const controller = require('./controller.js');

router.get('/current-furred-status', controller.getCurrentFurredStatus);

router.post('/signup', controller.signup);
router.post('/signin', controller.signin);
router.get('/signout', controller.signout);

module.exports = router;
