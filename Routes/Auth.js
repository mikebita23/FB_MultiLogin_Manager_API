const router = require('express').Router();
const Controller = require('../controllers/auth.controller');

router.post('/login', (req, res) => {
    Controller.logIn(req, res);
});

module.exports = router
