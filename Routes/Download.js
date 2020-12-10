const router = require('express').Router();
const Ctrl = require(__controllers +'download.controller')

router.get('/get', Ctrl.getFiles);
router.get('/getLink/:name', Ctrl.getLink)
router.get('/getFile/:token', Ctrl.download);

module.exports = router