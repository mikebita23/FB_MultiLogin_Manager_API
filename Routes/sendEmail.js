const express= require('express');
const router =express.Router();
const Controller = require('../controllers/sendEmail.controller');



router.post('/send', Controller.sendEmail);




module.exports = router