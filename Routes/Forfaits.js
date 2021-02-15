const express = require('express');
const router = express.Router();
const Controller = require(__controllers + 'forfait.controller')
const authMiddleWare = require(__middleWares + 'userMiddleWare');

function adminMiddlWare(req, res, next) {
    if(!req.userData.isAdmin)
        res.status(401).json({
            message: 'Unauthorized Request !'
        })
    else next()
}

router.get('/all', Controller.getForfaits)
router.get('/:id', authMiddleWare.checkAuth, adminMiddlWare, Controller.getForfait)
router.get('/del/:id', authMiddleWare.checkAuth, adminMiddlWare, Controller.deleteForfait)
router.post('/add', authMiddleWare.checkAuth, adminMiddlWare, Controller.addForfait)
router.patch('/:id/edit', authMiddleWare.checkAuth, adminMiddlWare, Controller.updateForfait)





module.exports = router