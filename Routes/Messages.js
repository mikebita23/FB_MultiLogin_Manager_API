const express = require('express');
const router = express.Router();
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

router.get('/', (req, res) => {
    res.send('Wassuuuuup ! ')
})

router.get('/all', Controller.getMessages)
router.get('/:id', Controller.getMessage)
router.get('/:id/del', Controller.deleteMessage)




module.exports = router