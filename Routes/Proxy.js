const router = require('express').Router();
const Controller = require(__controllers + 'proxy.controller');

router.get('/get', Controller.getProxy);

module.exports = router;