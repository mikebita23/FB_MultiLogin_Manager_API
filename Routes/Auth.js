const router = require('express').Router();
const Controller = require('../controllers/auth.controller');
const CheckAuthMiddleWare= require('../middleWares/userMiddleWare')

router.post('/login', (req, res) => {
    Controller.logIn(req, res);
});
router.get('/token',
CheckAuthMiddleWare.checkAuth,
(req, res) => {
    Controller.getToken(req, res);
});


module.exports = router
