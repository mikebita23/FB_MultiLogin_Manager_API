const router = require('express').Router();
const Controller = require(__controllers + 'session.controller')
const CheckAuthMiddleWare= require(__middleWares + 'userMiddleWare')


router.get('/get/all', Controller.getSessions);

router.get('/get/:id', Controller.getSession);

router.get('/getData/:id', Controller.getData)

router.get('/remove/:id', Controller.deleteSession);

router.patch('/edit/:id', Controller.updateSession);

router.post('/add', Controller.create);

router.post('/setTo/:id', Controller.setToUser)

module.exports= router;
