const router = require('express').Router();
const Ctrl = require(__controllers +'download.controller')

router.get('/get', Ctrl.getFiles);
router.get('/get/:name', Ctrl.download);

module.exports = router