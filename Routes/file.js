const router = require('express').Router();
const Ctrl = require(__controllers +'file.controller')

router.get('/get', Ctrl.getFiles);
router.get('/getLink/:name', Ctrl.getLink)
router.get('/downLoad/:token', Ctrl.download);
router.post('/upload/:id', Ctrl.upload)

module.exports = router