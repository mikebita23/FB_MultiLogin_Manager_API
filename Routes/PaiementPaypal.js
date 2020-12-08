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

router.get('/success', Controller.success)
router.post('/paiement', Controller.paiement)



module.exports = router