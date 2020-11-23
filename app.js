
// IMPORTS 
require('dotenv/config');
const Express = require('express');
const BodyParsser = require('body-parser');
const Routes = require('./Routes/Routes');

// INSTANCING THE SERVER
const app = Express();

// MIDDLEWARES
app.use(BodyParsser.json());

//ROUTES
app.get('/', (req, res)=> { res.send(`

        <h1>The app is on</h1>
        <h2><Strong style="color: red;">The Authentification is Activated</strong></h2>

`) });
app.use('/users', Routes.Users);
app.use('/Msg', Routes.Messages)

// START LISTENING
app.listen(process.env.LISTEN_PORT || 3003);