const router = require('express').Router();
const Controller = require(__controllers + 'session.controller')
const CheckAuthMiddleWare= require(__middleWares + 'userMiddleWare')


router.get('/get/all', Controller.getSessions);

router.get('/get/:id', Controller.getSession);

router.get('/remove/:id', Controller.deleteSession);

router.patch('/edit/:id', Controller.updateSession);

router.post('/add', Controller.create);

module.exports= router;
