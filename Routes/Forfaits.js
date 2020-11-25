const express = require('express');
const router = express.Router();
const Controller = require('../controllers/forfait.controller')
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

router.get('/all', Controller.getForfaits)
router.get('/:id', Controller.getForfait)
router.get('/:id/del', Controller.deleteForfait)
router.post('/add', Controller.addForfait)
router.patch('/:id/edit', Controller.updateForfait)





module.exports = router