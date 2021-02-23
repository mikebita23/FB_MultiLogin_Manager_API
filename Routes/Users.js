const router = require('express').Router();
const Controller = require(__controllers + 'user.controller')
const CheckAuthMiddleWare= require(__middleWares + 'userMiddleWare')



router.get('/all', CheckAuthMiddleWare.checkAuth, (req, res, next) => {
    if(!req.userData.isAdmin)
        res.status(401).json({
            message: 'Unauthorized Request !'
        })
    else next()
},Controller.getUsers);

router.post('/get', CheckAuthMiddleWare.checkAuth, (req, res) => {
    Controller.getUser(req, res);
});

router.get('/remove/:id', CheckAuthMiddleWare.checkAuth, (req, res) => {
    Controller.deleteUser(req, res);
});

router.post('/edit', CheckAuthMiddleWare.checkAuth, (req, res) => {
    Controller.editUser(req, res)
});

router.post('/add', (req, res) => {
    Controller.addUser(req, res);
});

router.get('/add/:token', Controller.save)

module.exports= router;