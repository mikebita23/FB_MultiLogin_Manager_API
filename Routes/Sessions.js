const express = require('express');
const router = express.Router();
const Controller = require('../controllers/session.controller')
const UsrMiddleWare = require('../middleWares/userMiddleWare')

// router.use(UsrMiddleWare.checkAuth);

// router.use( (req, res, next) => {
//     if(!req.userData.isAdmin)
//         res.status(401).json({
//             message: 'Unauthorized Request !'
//         })
//     else next()
// });

router.get('/forf', (req, res) => {
    res.send('on est en forfait ')
})

router.get('/all', Controller.getSessions)
router.get('/:id', Controller.getSession)
router.get('/:id/del', Controller.deleteSession)
router.post('/add', Controller.addSession)
router.patch('/:id/edit', Controller.updateSession)
// router.post('/signaler', Controller.SignBlocage)
router.get('/block/:id/:status', Controller.SignBlocage)

module.exports = router