const router = require('express').Router();
const Controller = require('../controllers/message.controller')
const UsrMiddleWare = require('../middleWares/userMiddleWare')

router.use(UsrMiddleWare.checkAuth);

router.use( (req, res, next) => {
    if(!req.userData.isAdmin)
        res.status(401).json({
            message: 'Unauthorized Request !'
        })
    else next()
});

router.get('/all', Controller.getMessages)
router.get('/:id', Controller.getMessage)
router.get('/del/:id', Controller.deleteMessage)
router.post('/add', Controller.addMessage)



module.exports = router