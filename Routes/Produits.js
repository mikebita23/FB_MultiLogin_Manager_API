
const express = require('express');
const router = express.Router();
const Controller = require(__controllers + 'produits.controller')
const authMiddleWare = require(__middleWares + 'userMiddleWare');

function adminMiddlWare(req, res, next) {
    if(!req.userData.isAdmin)
        res.status(401).json({
            message: 'Unauthorized Request !'
        })
    else next()
}

router.get('/all', Controller.getProduits)
router.get('/:id',  Controller.getProduit)
router.get('/del/:id', authMiddleWare.checkAuth, adminMiddlWare, Controller.deleteProduit)
router.post('/add', authMiddleWare.checkAuth, adminMiddlWare, Controller.addProduit)
router.patch('/:id/edit', authMiddleWare.checkAuth, adminMiddlWare, Controller.updateProduit)


module.exports = router


