const express= require('express');
const router =express.Router();
const Controller = require('../controllers/prospect.controller');
const UsrMiddleWare=require('../middleWares/userMiddleWare')


// router.use(UsrMiddleWare.checkAuth);
// router.use(req, res, next) => {
// if(!req.userData.isAdmin)
// res.status(401).json({
//     message: 'Unauthorized Request !'
// })
// else next()
// }


router.get('/all', Controller.getProspects);
router.get('/:id', Controller.getProspect);
router.post('/add', Controller.addProspect);
router.get('/del/:id', Controller.deleteProspect);



module.exports = router