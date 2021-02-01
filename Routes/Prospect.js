const express= require('express');
const router =express.Router();
const Controller = require('../controllers/prospect.controller');

router.get('/all', Controller.getProspects);
router.get('/:id', Controller.getProspect);
router.post('/add', Controller.addProspect);
router.get('/del/:id', Controller.deleteProspect);



module.exports = router