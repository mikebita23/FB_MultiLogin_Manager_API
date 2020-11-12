
// IMPORTS 
require('dotenv/config');
const Express = require('express');
const BodyParsser = require('body-parser');
const Routes = require('./Routes/Routes');
const CheckAuthMiddleWare= require('./middleWares/userMiddleWare')

// INSTANCING THE SERVER
const app = Express();

// MIDDLEWARES
app.use(BodyParsser.json());

//ROUTES
app.get('/', (req, res)=> { res.send(`

        <h1>The app is on</h1>
        <h2><Strong style="color: red;">The Authentifaction is Activated</strong></h2>

`) });
app.use('/users', CheckAuthMiddleWare.checkAuth, Routes.Users);

// START LISTENING
app.listen(process.env.LISTEN_PORT || 3003);