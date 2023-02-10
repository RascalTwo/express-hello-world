const router = require('express').Router();

const controller = require('./controller.js');

router.get('/info', controller.getInfo);

module.exports = router;
