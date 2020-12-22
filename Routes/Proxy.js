const router = require('express').Router();
const Controller = require(__controllers + 'proxy.controller');
const CheckAuthMiddleWare= require(__middleWares + 'userMiddleWare')

router.get('/get',CheckAuthMiddleWare, Controller.getProxy);

module.exports = router;