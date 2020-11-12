const express = require('express');
const router = express.Router();
const Controller = require('../controllers/user.controller')


router.get('/', (req, res)=>{
    res.send(`

        <h1>Users Section</h1>
        <ul>
            <li>Get All users  : <a href="/users/all">Click Here</a></li>
            <li>Get user by ID : <a href="/users/1">Click Here</a></li>
            <li>Delet user by ID  : <a href="/users/remove/">Add id to this link</a></li>
            <li>Create user : <a href="/users/add">Send post request to here</a></li>
            <li>Edit user : <a href="/users/edit">Send patch request to here (user data in post and id in link "/users/edit/5")</a></li>
            <li>Login : <a href="/users/login">Send post request to here to receive token</a></li>
        </ul>
    `);
});


router.get('/all', (req, res) => {
    Controller.getUsers(req, res);
});

router.get('/get/:id', (req, res) => {
    Controller.getUser(req, res);
});

router.get('/remove/:id', (req, res) => {
    Controller.deleteUser(req, res);
});

router.post('/add', (req, res) => {
    Controller.addUser(req, res);
});

router.patch('/edit/:id', (req, res) => {
    Controller.editUser(req, res)
});

router.post('/login', (req, res) => {
    Controller.logIn(req, res);
});

module.exports= router;