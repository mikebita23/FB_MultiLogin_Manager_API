const router = require('express').Router();
const Controller = require('../controllers/user.controller')
const CheckAuthMiddleWare= require('../middleWares/userMiddleWare')

router.get('/all', CheckAuthMiddleWare.checkAuth, 
(req, res) => {
    Controller.getUsers(req, res);
});

router.get('/get', CheckAuthMiddleWare.checkAuth,
 (req, res) => {
    Controller.getUser1(req, res);
});

router.get('/remove/:id',CheckAuthMiddleWare.checkAuth, 
(req, res) => {
    Controller.deleteUser(req, res);
});

router.patch('/edit/:id', CheckAuthMiddleWare.checkAuth,
(req, res) => {
    Controller.editUser(req, res)
});

router.post('/add', (req, res) => {
    Controller.addUser(req, res);
});

module.exports= router;