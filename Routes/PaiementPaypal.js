const express = require('express');
const router = express.Router();
const Controller = require('../controllers/paiementPaypal.controller')
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
router.post('/payer', Controller.paiement)



module.exports = router