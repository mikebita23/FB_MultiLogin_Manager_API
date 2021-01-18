const express = require('express');
const router = express.Router();
const Controller = require(__controllers + 'forfait.controller')

router.use( (req, res, next) => {
    if(!req.userData.isAdmin)
        res.status(401).json({
            message: 'Unauthorized Request !'
        })
    else next()
});

router.get('/all', Controller.getForfaits)
router.get('/:id', Controller.getForfait)
router.get('/del/:id', Controller.deleteForfait)
router.post('/add', Controller.addForfait)
router.patch('/:id/edit', Controller.updateForfait)





module.exports = router