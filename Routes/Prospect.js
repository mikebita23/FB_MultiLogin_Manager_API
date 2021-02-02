const express= require('express');
const router =express.Router();
const Controller = require('../controllers/prospect.controller');
const CheckAuthMiddleWare= require(__middleWares + 'userMiddleWare')

function isAdminMiddlware(req, res, next){
    if(!req.userData.isAdmin)
    res.status(401).json({
        message: 'Unauthorized Request !'
    })
    else next()
}

router.get('/all', CheckAuthMiddleWare.checkAuth,isAdminMiddlware, Controller.getProspects);
router.get('/:id',CheckAuthMiddleWare.checkAuth,isAdminMiddlware, Controller.getProspect);
router.post('/add', Controller.addProspect);
router.get('/del/:id',CheckAuthMiddleWare.checkAuth,isAdminMiddlware, Controller.deleteProspect);



module.exports = router