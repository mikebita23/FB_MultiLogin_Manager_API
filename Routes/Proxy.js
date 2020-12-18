const router = require('express').Router();
const Controller = require(__controllers + 'proxy.controller');
const CheckAuthMiddleWare= require(__middleWares + 'userMiddleWare')

router.get('/open', Controller.createProxy);
router.get('/close/:port', Controller.closeProxy);

module.exports = router;