const express = require('express');
const router = express.Router();
const Controller = require('../controllers/signalerBlocage.controller')
const UsrMiddleWare = require('../middleWares/userMiddleWare')

// router.use(UsrMiddleWare.checkAuth);

// router.use( (req, res, next) => {
//     if(!req.userData.isAdmin)
//         res.status(401).json({
//             message: 'Unauthorized Request !'
//         })
//     else next()
// });



router.post('/add', Controller.SignBlocage)
router.get('/all', Controller.getSignalers)
router.get('/:id', Controller.getSignaler)


module.exports = router